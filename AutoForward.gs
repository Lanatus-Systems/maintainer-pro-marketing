/**
 * Forwards mail from lanatus.auto.bot@gmail.com received in the last two hours.
 * The To address is read from a hidden <div id="auto-forward">, then that div is removed.
 * The bot is BCC'd.
 * Emoji is decoded from the original message, then written so the mail send cannot turn it into boxes. Inline images and attachments are copied from the original.
 * Forwarded threads get the label Auto-forwarded and are skipped next time.
 * The forwarded message is marked read.
 *
 * Install this in the Gmail account that receives the bot's mail.
 * script.google.com → New project → V8 → paste into Code.gs.
 * Run installTrigger once and approve Gmail access.
 */

var TARGET_SENDER = "lanatus.auto.bot@gmail.com";
var FORWARDED_LABEL = "Auto-forwarded";
var FORWARD_ID = "auto-forward";
var LOOKBACK_MS = 2 * 60 * 60 * 1000;
var PAGE_SIZE = 50;
var MAX_SCAN = 200;

function forwardLanatusEmails() {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    console.warn("Skipped; another run holds the lock.");
    return;
  }

  try {
    var me = Session.getEffectiveUser().getEmail().toLowerCase();
    if (!me) {
      throw new Error("Effective user email is blank. Nothing was forwarded.");
    }
    if (canonical_(me) === canonical_(TARGET_SENDER)) {
      throw new Error("Run this in the Gmail account that receives the bot's mail. This account is the bot, so the run stopped.");
    }

    var skip = {};
    skip[canonical_(me)] = true;
    skip[canonical_(TARGET_SENDER)] = true;
    var aliases = GmailApp.getAliases();
    for (var a = 0; a < aliases.length; a++) {
      skip[canonical_(aliases[a])] = true;
    }

    var label = getOrCreateLabel_(FORWARDED_LABEL);
    var since = Date.now() - LOOKBACK_MS;
    var query = 'from:"' + TARGET_SENDER + '" newer_than:2h';
    var stop = false;

    for (var start = 0; start < MAX_SCAN && !stop; start += PAGE_SIZE) {
      var threads = GmailApp.search(query, start, PAGE_SIZE);
      if (!threads.length) break;

      for (var t = 0; t < threads.length && !stop; t++) {
        if (processThread_(threads[t], label, since, skip) === "stop") stop = true;
      }

      if (threads.length < PAGE_SIZE) break;
    }
  } finally {
    lock.releaseLock();
  }
}

function installTrigger() {
  var existing = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existing.length; i++) {
    if (existing[i].getHandlerFunction() === "forwardLanatusEmails") {
      ScriptApp.deleteTrigger(existing[i]);
    }
  }
  ScriptApp.newTrigger("forwardLanatusEmails")
    .timeBased()
    .everyMinutes(30)
    .create();
  console.log("Trigger installed for " + Session.getEffectiveUser().getEmail());
}

function processThread_(thread, label, since, skip) {
  if (hasLabel_(thread, label.getName())) return;

  var messages = thread.getMessages();
  for (var m = 0; m < messages.length; m++) {
    var message = messages[m];
    if (message.isDraft()) continue;
    if (message.getDate().getTime() < since) continue;
    if (!listHas_(fromAddresses_(message.getFrom()), TARGET_SENDER)) continue;

    var draft;
    try {
      draft = prepareForward_(message);
    } catch (err) {
      console.error("Could not read message " + message.getId() + ": " + err);
      continue;
    }
    var recipients = draft.recipients.filter(function (email) {
      return !skip[canonical_(email)];
    });
    if (recipients.length === 0) {
      console.log("Message " + message.getId() + " has no " + FORWARD_ID + " address.");
      continue;
    }
    if (recipients.length + 1 > 50) {
      console.error("Message " + message.getId() + " has " + recipients.length + " forward addresses. Left unsent.");
      continue;
    }
    if (MailApp.getRemainingDailyQuota() < recipients.length + 1) {
      console.error("Daily recipient quota exhausted. Remaining: " + MailApp.getRemainingDailyQuota());
      return "stop";
    }

    console.log("Forward " + message.getId() + " to " + recipients.join(", ") + "; bcc " + TARGET_SENDER);
    try {
      sendForward_(draft, recipients);
    } catch (err) {
      console.error("Forward failed for " + message.getId() + ": " + err);
      continue;
    }

    try {
      message.markRead();
    } catch (err) {
      console.error("Forwarded " + message.getId() + " but could not mark it read: " + err);
    }

    try {
      thread.addLabel(label);
    } catch (err) {
      console.error("Forwarded " + message.getId() + " but could not apply " + label.getName() + ": " + err);
    }
  }
}

function prepareForward_(message) {
  var parts = {inline: {}, attachments: [], html: "", plain: "", subject: ""};
  try {
    parts = extractParts_(message.getRawContent());
  } catch (err) {
    console.warn("Could not read the original message for " + message.getId() + ": " + err);
  }

  var html = parts.html || message.getBody() || "";
  var taken = takeForwardAddress_(html);
  html = taken.html;
  var plain = stripForwardLines_(parts.plain || message.getPlainBody() || "", taken.recipients);
  var images = partitionImages_(html, parts.inline);
  if (html) html = encodeNonAscii_(html);

  return {
    recipients: taken.recipients,
    subject: parts.subject || message.getSubject() || "",
    plain: plain,
    html: html,
    attachments: parts.attachments.concat(images.extras),
    inlineImages: images.used
  };
}

function sendForward_(draft, recipients) {
  var options = {bcc: TARGET_SENDER};
  if (draft.html) options.htmlBody = draft.html;
  if (draft.attachments.length) options.attachments = draft.attachments;
  if (Object.keys(draft.inlineImages).length) options.inlineImages = draft.inlineImages;
  GmailApp.sendEmail(recipients.join(", "), draft.subject, draft.plain || " ", options);
}

function takeForwardAddress_(html) {
  if (!html) return {html: "", recipients: []};
  var idPattern = new RegExp(
    "\\bid\\s*=\\s*(?:\"" + FORWARD_ID + "\"|'" + FORWARD_ID + "'|" + FORWARD_ID + ")(?=[\\s>])",
    "i"
  );
  var openPattern = /<div\b[^>]*>/ig;
  var open;
  while ((open = openPattern.exec(html)) !== null) {
    if (!idPattern.test(open[0])) continue;
    var closeAt = html.toLowerCase().indexOf("</div>", open.index + open[0].length);
    if (closeAt < 0) break;
    var end = closeAt + "</div>".length;
    var inner = html.substring(open.index + open[0].length, closeAt);
    var text = decodeBasicEntities_(inner.replace(/<[^>]+>/g, " "));
    return {
      html: html.substring(0, open.index) + html.substring(end),
      recipients: extractAddresses_(text)
    };
  }
  return {html: html, recipients: []};
}

function stripForwardLines_(plain, recipients) {
  if (!plain || !recipients.length) return plain || "";
  var wanted = {};
  for (var i = 0; i < recipients.length; i++) wanted[recipients[i].toLowerCase()] = true;
  var lines = plain.split(/\r?\n/);
  var kept = [];
  for (var j = 0; j < lines.length; j++) {
    var compact = lines[j].replace(/\s+/g, "").toLowerCase();
    if (!wanted[compact]) kept.push(lines[j]);
  }
  return kept.join("\n").replace(/^\n+/, "");
}

function decodeBasicEntities_(text) {
  return String(text)
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(parseInt(n, 10)); })
    .replace(/&#x([0-9a-f]+);/gi, function (_, n) { return String.fromCharCode(parseInt(n, 16)); })
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function extractParts_(raw) {
  var result = {inline: {}, attachments: [], html: "", plain: "", subject: ""};
  if (!raw) return result;
  var top = splitHeader_(raw);
  if (top) {
    var headers = headerMap_(top.header);
    if (headers.subject) result.subject = decodeWords_(headers.subject);
  }
  collectParts_(raw, result);
  return result;
}

function collectParts_(raw, result) {
  var split = splitHeader_(raw);
  if (!split) return;
  var headers = headerMap_(split.header);
  var contentType = headers["content-type"] || "";
  var boundary = boundaryOf_(contentType);
  if (boundary) {
    var pieces = splitBoundary_(split.body, boundary);
    for (var i = 0; i < pieces.length; i++) collectParts_(pieces[i], result);
    return;
  }

  var type = contentType.split(";")[0].trim().toLowerCase();
  var encoding = (headers["content-transfer-encoding"] || "").toLowerCase();
  var disposition = (headers["content-disposition"] || "").toLowerCase();
  var cid = (headers["content-id"] || "").replace(/^<|>$/g, "").trim();
  if (type === "text/html" || type === "text/plain") {
    var text = decodeTextPart_(split.body, encoding, charsetOf_(contentType));
    if (type === "text/html" && text) result.html = text;
    if (type === "text/plain" && text) result.plain = text;
    return;
  }
  if (encoding.indexOf("base64") === -1) return;

  var bytes = decodeBase64_(split.body);
  var name = decodeWords_(filenameFrom_(headers) || (cid ? cid.split("@")[0] : "attachment"));
  var blob = Utilities.newBlob(bytes, type || "application/octet-stream", name);
  if (cid && (type.indexOf("image/") === 0 || disposition.indexOf("inline") !== -1)) {
    result.inline[cid] = blob;
    var localId = cid.split("@")[0];
    if (localId && localId !== cid && !result.inline[localId]) result.inline[localId] = blob;
    return;
  }
  result.attachments.push(blob);
}

function partitionImages_(html, inline) {
  var used = {};
  var extras = [];
  var blobs = [];
  var keys = Object.keys(inline);
  var i;
  for (i = 0; i < keys.length; i++) {
    var blob = inline[keys[i]];
    var seen = false;
    for (var j = 0; j < blobs.length; j++) if (blobs[j] === blob) seen = true;
    if (!seen) blobs.push(blob);
    if (html && html.indexOf("cid:" + keys[i]) !== -1) used[keys[i]] = blob;
  }
  for (i = 0; i < blobs.length; i++) {
    var referenced = false;
    for (var k = 0; k < keys.length; k++) {
      if (inline[keys[k]] === blobs[i] && used[keys[k]]) referenced = true;
    }
    if (!referenced) extras.push(blobs[i]);
  }
  return {used: used, extras: extras};
}

function splitHeader_(raw) {
  var idx = raw.indexOf("\r\n\r\n");
  var len = 4;
  if (idx < 0) {
    idx = raw.indexOf("\n\n");
    len = 2;
  }
  if (idx < 0) return null;
  return {header: raw.substring(0, idx), body: raw.substring(idx + len)};
}

function headerMap_(headerText) {
  var lines = headerText.split(/\r?\n/);
  var map = {};
  var last = "";
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/^[ \t]/.test(line) && last) {
      map[last] += " " + line.trim();
      continue;
    }
    var colon = line.indexOf(":");
    if (colon < 1) continue;
    last = line.substring(0, colon).toLowerCase();
    map[last] = line.substring(colon + 1).trim();
  }
  return map;
}

function boundaryOf_(contentType) {
  var quoted = contentType.match(/boundary="([^"]+)"/i);
  if (quoted) return quoted[1];
  var bare = contentType.match(/boundary=([^;\s]+)/i);
  return bare ? bare[1] : "";
}

function splitBoundary_(body, boundary) {
  var parts = body.split("--" + boundary);
  var chunks = [];
  for (var i = 1; i < parts.length; i++) {
    var part = parts[i];
    if (part.replace(/^\r?\n/, "").indexOf("--") === 0) continue;
    part = part.replace(/^\r\n/, "").replace(/^\n/, "").replace(/\r\n$/, "").replace(/\n$/, "");
    if (part) chunks.push(part);
  }
  return chunks;
}

function filenameFrom_(headers) {
  var sources = [headers["content-disposition"] || "", headers["content-type"] || ""];
  for (var i = 0; i < sources.length; i++) {
    var quoted = sources[i].match(/filename="([^"]+)"/i) || sources[i].match(/name="([^"]+)"/i);
    if (quoted) return quoted[1];
    var bare = sources[i].match(/filename=([^;]+)/i) || sources[i].match(/name=([^;]+)/i);
    if (bare) return bare[1].trim();
  }
  return "";
}

function decodeWords_(value) {
  if (!value || value.indexOf("=?") === -1) return value || "";
  return value.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, function (all, charset, enc, text) {
    try {
      var bytes = enc.toUpperCase() === "B" ? decodeBase64_(text) : decodeQuotedWord_(text);
      return Utilities.newBlob(bytes).getDataAsString(charset);
    } catch (err) {
      return all;
    }
  });
}

function decodeQuotedWord_(text) {
  text = text.replace(/_/g, " ");
  var bytes = [];
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) === "=" && i + 2 < text.length) {
      bytes.push(parseInt(text.substr(i + 1, 2), 16));
      i += 2;
    } else {
      bytes.push(text.charCodeAt(i));
    }
  }
  return bytes;
}

function decodeTextPart_(body, encoding, charset) {
  var bytes;
  if (encoding.indexOf("base64") !== -1) bytes = decodeBase64_(body);
  else if (encoding.indexOf("quoted-printable") !== -1) bytes = decodeQuotedPrintable_(body);
  else if (hasWideChar_(body)) return body;
  else bytes = binaryStringToBytes_(body);
  return Utilities.newBlob(bytes).getDataAsString(charset || "UTF-8");
}

function charsetOf_(contentType) {
  var match = contentType.match(/charset\s*=\s*"?([^";\s]+)"?/i);
  return match ? match[1] : "UTF-8";
}

function decodeQuotedPrintable_(text) {
  text = String(text).replace(/=\r?\n/g, "");
  var bytes = [];
  for (var i = 0; i < text.length; i++) {
    if (text.charAt(i) === "=" && /^[0-9A-Fa-f]{2}$/.test(text.substr(i + 1, 2))) {
      bytes.push(parseInt(text.substr(i + 1, 2), 16));
      i += 2;
    } else {
      bytes.push(text.charCodeAt(i) & 255);
    }
  }
  return bytes;
}

function binaryStringToBytes_(text) {
  var bytes = [];
  for (var i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i) & 255);
  return bytes;
}

function hasWideChar_(text) {
  for (var i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 255) return true;
  }
  return false;
}

function encodeNonAscii_(text) {
  var out = "";
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code >= 0xD800 && code <= 0xDBFF && i + 1 < text.length) {
      var next = text.charCodeAt(i + 1);
      if (next >= 0xDC00 && next <= 0xDFFF) {
        out += "&#" + ((code - 0xD800) * 0x400 + (next - 0xDC00) + 0x10000) + ";";
        i++;
        continue;
      }
    }
    if (code > 127) out += "&#" + code + ";";
    else out += text.charAt(i);
  }
  return out;
}

function decodeBase64_(data) {
  var clean = String(data).replace(/\s/g, "");
  while (clean.length % 4) clean += "=";
  return Utilities.base64Decode(clean);
}

function getOrCreateLabel_(name) {
  var label = GmailApp.getUserLabelByName(name);
  if (!label) label = GmailApp.createLabel(name);
  return label;
}

function hasLabel_(thread, name) {
  var labels = thread.getLabels();
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].getName() === name) return true;
  }
  return false;
}

function listHas_(addresses, target) {
  var want = canonical_(target);
  for (var i = 0; i < addresses.length; i++) {
    if (canonical_(addresses[i]) === want) return true;
  }
  return false;
}

function canonical_(email) {
  email = String(email || "").trim().toLowerCase();
  var at = email.lastIndexOf("@");
  if (at < 1) return email;
  var local = email.substring(0, at);
  var domain = email.substring(at + 1);
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.split("+")[0].replace(/\./g, "");
    domain = "gmail.com";
  }
  return local + "@" + domain;
}

function fromAddresses_(header) {
  if (!header) return [];
  var withoutQuotes = String(header).replace(/"[^"]*"/g, " ");
  if (withoutQuotes.indexOf("<") === -1) return extractAddresses_(header);
  return collectAddresses_(withoutQuotes, true);
}

function extractAddresses_(header) {
  if (!header) return [];
  return collectAddresses_(String(header).replace(/"[^"]*"/g, " "), false);
}

function collectAddresses_(source, anglesOnly) {
  var found = [];
  var seen = {};
  function add(email) {
    email = email.trim().toLowerCase();
    if (email.indexOf("@") === -1 || seen[email]) return;
    seen[email] = true;
    found.push(email);
  }
  var angleRe = /<([^>]+)>/g;
  var match;
  while ((match = angleRe.exec(source)) !== null) add(match[1]);
  if (anglesOnly) return found;
  var remainder = source.replace(/<[^>]+>/g, " ");
  var bareRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
  while ((match = bareRe.exec(remainder)) !== null) add(match[0]);
  return found;
}
