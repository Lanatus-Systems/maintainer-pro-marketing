import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "ai-change-request-policy-template",
  title: "What non-engineers can ask AI to change: a policy template for product teams",
  description:
    "A copyable policy for PMs, designers and support leads who ask an AI coding agent for changes: what they can ask for, what needs an engineer, and review tiers.",
  date: "2026-10-27",
  updated: "2026-10-31",
  author: "The Butterneck team",
  tags: [
    "AI change request policy",
    "product change request template",
    "PM code change policy",
    "review UI changes from non-engineers",
    "AI coding governance",
    "code review tiers",
  ],
  cover: {
    src: "/blog/cover-ai-change-request-policy-template.png",
    alt: "Butterneck blog cover: What non-engineers can ask AI to change. A policy template for product teams",
    width: 1200,
    height: 630,
  },
  body: `
An AI change request policy is a one-page agreement that says what non-engineers (PMs, designers, support leads) may ask an AI coding agent to change in a live web app, what must start with an engineer, and who decides what ships. In short: the person who asked checks the change on a live preview, and a developer decides whether it ships; the AI never ships on its own.

Once a PM, designer or support lead can type a change and watch an AI make it, someone will ask: what are they allowed to ask for? If nobody writes it down, every request turns into a small debate. Engineers say no to things that were fine. Requesters ask for things that should never have started in chat.

This post is a policy you can copy. It covers what non-engineers can ask for directly, what needs an engineer from the start, who reviews and who decides what ships, how previews get checked, and how secrets and production data are handled. There is a short template at the end to paste into your wiki.

It works whatever tool you use. We build Butterneck, so there is a short section on how it fits, but the policy doesn't depend on it.

## Why write it down

The real risk is rarely the AI writing bad code. It is people having different ideas about what a "small change" is. A PM sees one button label. An engineer knows that label is also used in an email template, a test and a translation file.

Jeff Gothelf's first suggestion in [How to manage the inevitable mess of running a company where everyone is a builder](https://jeffgothelf.com/blog/how-to-manage-the-inevitable-mess-of-running-a-company-where-everyone-is-a-builder/) is a good place to start: "Keep the right to build separate from the right to ship." A written policy is how you do that day to day. It says who can ask, what they can ask for, and who decides what reaches customers.

Keep it to one page. If it needs a training session, it is too long.

## 1. What requesters can ask for directly

These are changes where the requester is the best judge of "done", because they can see the result on the screen:

- Copy, labels, headings, button text and help text.
- Empty states, error messages and confirmation messages.
- Spacing, alignment and layout tweaks within the existing design system.
- Swapping or reordering items that already exist: menu items, cards, sections.
- Small visual fixes: a wrong color, a broken link, a missing hover state.
- Showing or hiding a form field when the backend already supports it.

The test is simple. If the requester can look at the preview and say "yes, that's what I meant", the change can start in chat.

## 2. What needs an engineer from the start

Some changes can look right on a preview and still be wrong. These should start with an engineer, even when an AI does some of the typing:

- Authentication, sign-in, sessions and permissions.
- Billing, pricing logic, plans, checkout and invoices.
- Data models, database migrations and anything that deletes or rewrites data.
- APIs other teams or customers depend on.
- Infrastructure, build and deploy config, environment variables.
- Anything with legal or compliance weight: consent, privacy notices, data retention.
- New features. These need design and scoping before anyone opens a chat.

A requester can still raise these. They just go to an engineer as a normal ticket, not straight to the AI.

## 3. Who reviews, and who decides what ships

Name the roles. A role that belongs to "the team" ends up belonging to nobody.

- **Requester:** asks for the change and accepts it on the preview. They own "is this what I meant?"
- **Reviewing developer:** reads the conversation and the diff in their own tools, runs the usual checks, and decides whether the change ships. They own "is this correct and safe?"
- **Engineering lead:** owns this policy and the allow-list. They settle disagreements and change the lists.

The requester never ships on their own. The AI never ships at all. A developer publishes through your normal release process, with the same reviews, tests and approvals as any other change.

If you use GitHub, branch protection can enforce part of this. Its [protected branch rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) can require approving pull request reviews before merging, including reviews from code owners. That makes "a developer decides" a setting, not just a promise.

**One caveat since 28 October 2026:** if an admin turns on [Copilot approvals](https://github.blog/changelog/2026-10-28-copilot-code-review-merge-with-confidence-with-max-and-approvals) (they're off by default), Copilot's approval also counts toward the required approvals. If your policy says a developer decides, leave that off, or limit the file paths Copilot is allowed to approve so it doesn't cover the changes a developer must decide on.

## Copy changes can skip code review. They shouldn't skip the person who asked.

Teams that ship a lot of agent-written code are starting to drop human code review for the lowest-risk changes. The Claude Code team at Anthropic [describes its setup](https://claude.dev/blog/solving-code-review-at-anthropic/) as a risk table. Its Low tier covers "Docs, copy, internal-only features, additive changes behind a flag", and the human approvals it needs are "None required once automated review and security checks are green." Medium needs one person, High needs two. "The change sets the tier, not the author," and only authors on a repo's trusted list get the lighter paths.

For code, that makes sense. A one-line copy change is rarely where bugs hide. But a copy change can be wrong in ways no automated check sees: the wrong word, the wrong tone, the right text on the wrong screen. Only the person who asked knows what they meant. The same post keeps that person in the loop: "On an agent-written PR, the person directing the agent counts as one of the required reviewers, the same as if they'd typed the code themselves."

On a product team, the person directing the agent is often a PM or designer. So the lightest tier in this policy is not "no review". It is a **requester check**: the person who asked looks at the change on a running copy and confirms it is what they meant. Code review then scales with risk:

- **Requester check:** the requester accepts it on the preview, and a developer publishes it through your normal release process. Code review can be as light as your team already allows for copy.
- **Developer check:** the requester accepts it on the preview, then a developer reviews the diff properly before it ships.
- **Two developers:** it starts with an engineer, and two developers approve it before it ships.

Here is the allow-list from sections 1 and 2 with a review tier for each row. Adjust the tiers to your own risk, and start strict.

| Change | Starts with | Review tier |
|---|---|---|
| Copy, labels, headings, button and help text | Requester, in chat | Requester check |
| Empty states, error and confirmation messages | Requester, in chat | Requester check |
| Reordering or hiding existing items | Requester, in chat | Requester check |
| Small visual fixes (color, link, hover state) | Requester, in chat | Requester check |
| Spacing and layout within the design system | Requester, in chat | Developer check |
| Showing or hiding a form field the backend already supports | Requester, in chat | Developer check |
| Legal or compliance copy | Engineer, with the content owner | Developer check, plus the content owner's sign-off |
| Auth, sessions and permissions | Engineer | Two developers |
| Billing, pricing logic and checkout | Engineer | Two developers |
| Data models, migrations, deleting data | Engineer | Two developers |
| Public or shared APIs | Engineer | Two developers |
| Infrastructure, build/deploy config, env vars | Engineer | Two developers |
| New features | Engineer, after design and scoping | Your normal feature process |

No tier lets the AI ship on its own, and no tier skips the requester.

Tiers matter more as agents open more changes than people can review. We collected the data on the [AI PR review bottleneck](/blog/ai-prs-need-an-owner) and what an owner changes.

## 4. How previews are checked

A preview is where the requester does their part of the review. Agree on what "checked" means:

1. The requester looks at the changed page on a running copy of the app, not a screenshot.
2. They check the states that matter: empty, error, loading, logged out, mobile width.
3. If something is off, they keep asking on the same request until it is right, instead of starting a new one.
4. They write a one-line summary of what they asked for and what they accepted.
5. The developer reviews only after the requester has said it is right.

Step 5 matters. It moves the "that's not what I meant" loop out of code review, where it is slowest, and onto the preview, where it is quick.

## 5. Secrets, .env files and production data

This is the section to be strict about.

- **Keep production secrets off the machine the AI works on.** Use development keys and test accounts in that environment.
- **Treat any "don't read .env" rule as a guardrail, not a wall.** Most AI tools rely on ignore lists and instructions. Those help, but they are not a guarantee. The safe setup assumes the agent could see whatever is on that computer.
- **No production data in previews.** Use seed data or a scrubbed copy. A preview link is something people share.
- **Requesters don't paste secrets, customer data or credentials into chat.** If a request needs real data to reproduce, it goes to an engineer.
- **Know where the text goes.** Requests and code context may be sent to your AI provider and to any tool in the middle. Check their terms before you roll this out.

## 6. Size, volume and undo

A few habits keep this calm:

- One change per request. "Fix the pricing page" is three requests.
- Agree a weekly limit at first, so review doesn't pile up.
- Make sure every AI turn can be stopped and its changes rolled back before anything is reviewed.
- Discarding is a normal outcome. Not every request should ship.

## The template

Copy this into your wiki and change the parts in brackets.

\`\`\`
# Requesting product changes with AI

Owner: [engineering lead]. Last reviewed: [date].

## Who can request
[PMs, designers, support leads] on [apps / projects].

## Ask directly (requester accepts on the preview)
- Copy, labels, headings, help text
- Empty states, error and confirmation messages
- Spacing and layout within the design system
- Showing or hiding a form field the backend already supports
- Reordering or hiding existing items
- Small visual fixes (color, link, hover state)

## Needs an engineer from the start (open a ticket)
- Auth, sessions, permissions
- Billing, pricing logic, checkout
- Data models, migrations, deleting data
- Public or shared APIs
- Infrastructure, build/deploy config, env vars
- Legal / compliance copy, new features

## Review and release
1. Requester checks the preview (states, mobile) and accepts it.
2. Requester writes one line: asked for / accepted.
3. A developer reviews the conversation and the diff.
4. The developer ships through the normal release process, or discards.
The requester and the AI never ship on their own.

## Secrets and data
- No production secrets on the machine the AI uses.
- .env ignore rules are a guardrail, not a guarantee.
- Seed or scrubbed data only in previews.
- Never paste secrets or customer data into chat.

## Review tiers
- Requester check: copy, labels, messages, reordering, small visual fixes
- Developer check: layout, form fields, legal/compliance copy (+ content owner)
- Two developers: auth, billing, data, shared APIs, infrastructure
Every tier includes the requester's check on the preview.

## Limits
- One change per request. [N] requests per person per week to start.
- Every AI turn can be stopped and rolled back.
\`\`\`

Review it after a month. Move items between the lists based on what actually happened, not on what people feared.

Not ready to adopt a policy yet? Start smaller: a [4-week pilot proposal](/blog/pm-change-request-pilot-proposal) you can send your engineering lead, with the same split between what requesters can ask for and what stays engineering-only.

## How Butterneck fits

Butterneck is built around this split. A developer connects a project folder on their own computer, and the running app gets a share link to a private live copy. A requester opens the link and types the change in a chat beside the app, or labels a [Jira ticket](/integrations/jira) \`butterneck\` and assigns it to a teammate whose computer has the project. The developer's own coding agent (Cursor, Claude Code or Antigravity) edits the files on that computer, and the requester sees the result on the same screen.

The developer chooses who can send requests. Any turn can be stopped, and its file changes are usually rolled back; if the rollback can't be completed, the chat says so. Butterneck never merges, never opens a pull request and never deploys: the developer reviews and publishes the usual way, which is step 4 of the template.

Two honest notes. \`.env\` files are on an ignore list the agent is told to stay out of. That is an instruction, not a hard block, so keep production secrets off that computer. And chat messages and preview traffic go through Butterneck's server, while the coding agent sends code context to its provider as it normally does. More in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

It is not a fit if you want AI to open pull requests or merge on its own, or if there is no developer with a local project folder to connect.

## FAQ

### What can non-engineers safely ask an AI to change?

Visible, low-risk changes where they can judge the result on a preview: copy, labels, empty states, error messages, spacing and small visual fixes inside the existing design system.

### What should always go to an engineer first?

Auth and permissions, billing and pricing logic, data models and migrations, shared APIs, infrastructure and deploy config, legal or compliance copy, and new features. These can look right on a preview and still be wrong.

### Can copy changes skip code review?

Some teams let them skip human code review once automated checks pass. The Claude Code team's Low tier, which includes docs and copy, needs no human approvals once automated review and security checks are green. A copy change shouldn't skip the person who asked, though: they are the one who can tell whether the words are right. In this policy, copy changes get a requester check on the preview, and a developer still publishes them.

### How should review tiers work when PMs and designers use an AI coding agent?

Set the tier from what the change touches, not from who asked. The Claude Code team at Anthropic advises writing down risk tiers "set from the change rather than the author", starting strict, and using CODEOWNERS and branch protection so that auth, billing, CI and release workflows always need a person. In this policy, copy, messages and small visual fixes get a requester check on the preview; layout and form-field changes get a developer check; and auth, billing, data, shared APIs and infrastructure start with an engineer and need two developers. Every tier includes the requester's check, and a developer still decides what ships.

### Who should decide what ships?

A developer, through your normal release process. The requester accepts the change on the preview, and the developer reviews the diff and decides whether it ships. Neither the requester nor the AI should ship on their own.

### Can an AI reviewer's approval count as the developer's decision?

On GitHub it can if an admin turns it on. Since 28 October 2026, Copilot approvals are generally available, and when they're on, Copilot's approval counts toward the repository's required approvals. They're off by default, and repository admins can limit the file paths Copilot may approve. In this policy, an AI review can add to a developer's review but doesn't replace it: a developer still decides what ships, after the requester has checked the preview.

### Is an .env ignore rule enough to protect secrets?

No. Ignore lists and instructions are guardrails, not guarantees. Keep production secrets and production data off the machine the AI works on, and use development keys and seed data instead.

### Does Butterneck open pull requests or deploy changes?

No. Butterneck never opens a pull request, never merges and never deploys. A developer reviews the change and publishes it the usual way.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring your draft policy. Or check [pricing](/pricing): Starter is free for one developer and one requester, and Pro is $19 per person per month; a workspace owner on Starter can try Pro free for one month. For the wider debate, read [should product managers ship code?](/blog/should-product-managers-ship-code)
`,
};
