import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "let-product-managers-change-the-app-without-engineering",
  title: "Can product managers change the app without engineering?",
  description: "Short answer: PMs can make and check small app changes themselves with an AI agent, but engineering should still decide what ships. Here is a setup that works.",
  date: "2026-11-03",
  updated: "2026-11-10",
  author: "The Butterneck team",
  tags: ["product managers", "AI change requests", "answer", "AI app builder"],
  cover: {
    src: "/blog/cover-how-pms-can-change-a-live-app.png",
    alt: "Butterneck blog cover: Can product managers change the app without engineering?",
    width: 1200,
    height: 630,
  },
  body: `
**Short answer:** for small changes, yes, mostly. A product manager can describe a change in plain words, have an AI coding agent make it on a live copy of the app, and check the result, without waiting in the engineering queue. What a PM should not do alone is decide what ships. Keep a developer on the last step.

## What "without engineering" can mean

- **Without waiting on engineering** to make a first attempt at copy, layout, a missing field or a broken link. This is realistic today.
- **Without engineering review** before it reaches users. This is where teams get hurt. AI edits can touch more than you asked for.

The useful goal is the first one: the PM does the back-and-forth on a preview, and the developer gets a change that has already been checked by the person who asked for it.

## A setup that works

1. A developer connects a computer where the app already runs and picks who can send requests.
2. The PM opens a share link to that running app and types the change next to the screen they mean.
3. The team's own coding agent (Cursor, Claude Code or Antigravity) edits the project on that computer, and the preview updates.
4. The PM checks it and asks for tweaks. The developer reviews the diff and ships it the usual way.

That is how [Butterneck](/) works. Butterneck does not commit, push, open a pull request or deploy.

**See it before you set anything up:** [create a free account and try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. On your own project, the edit runs on your computer. Your team still decides what goes live.

## What to watch for

- Agree which kinds of changes PMs can request. Our [AI change request policy template](/blog/ai-change-request-policy-template) is a starting point.
- Write requests the way you would to a person. See [how to write a change request for AI](/blog/how-to-write-a-change-request-for-ai).
- Be clear on data: files are edited on the developer's computer, but the coding CLI sends code context to its AI provider, and preview and chat traffic pass through Butterneck's server.

For the longer version, read [how PMs can change a live app without waiting on engineering](/blog/how-pms-can-change-a-live-app-without-waiting-on-engineering).

## FAQ

### Can product managers build apps without engineering or writing code?

A new app, often yes: AI app builders can generate a prototype or an internal tool from a plain-language description, and many also host it. The product your customers already use is different. It has a codebase, tests and a release process, so the realistic version is the setup above: the PM describes the change and checks it on a live copy, the team's own coding agent edits the existing project, and a developer decides what ships. See [AI app builder or change the app you already have?](/blog/ai-app-builder-vs-changing-your-existing-app)

### Do product managers need to learn to code?

No. They describe the change in plain words and check the result on the preview. A developer reads the code.

### Will the AI push changes to production?

Not with Butterneck. It edits files on the developer's computer and stops. A developer decides what becomes a commit and what goes live.

### What does it cost?

Butterneck Starter is free for one developer and one person requesting changes. Pro is USD 19 per person per month. You also pay for your own coding agent. See [pricing](/pricing).
`,
};
