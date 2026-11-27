import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "let-product-managers-change-the-app-without-engineering",
  title: "Can product managers change the app without engineering?",
  seoTitle: "Can product managers build apps without engineering?",
  description: "Yes, for small changes: a PM asks an AI coding agent on a live copy of the app and checks the result, and a developer decides what ships. Setup and cost.",
  date: "2026-11-03",
  updated: "2026-11-27",
  author: "The Butterneck team",
  tags: ["product managers", "AI change requests", "answer", "AI app builder", "AI prototyping for product managers"],
  cover: {
    src: "/blog/cover-let-product-managers-change-the-app-without-engineering.png",
    alt: "Butterneck blog cover: Can product managers change the app without engineering? — A developer still decides what ships.",
    width: 1200,
    height: 630,
  },
  body: `
**Short answer:** for a new app, often yes: an AI app builder can get a PM a working prototype. For small changes to the app your team already runs, yes, mostly. A product manager can describe a change in plain words, have an AI coding agent make it on a live copy of the app, and check the result, without waiting in the engineering queue. What a PM should not do alone is decide what ships. Keep a developer on the last step.

## What "without engineering" can mean

- **Without waiting on engineering** to make a first attempt at copy, layout, a missing field or a broken link. This is realistic today.
- **Without engineering review** before it reaches users. This is where teams get hurt. AI edits can touch more than you asked for.

The useful goal is the first one: the PM does the back-and-forth on a preview, and the developer gets a change that has already been checked by the person who asked for it.

**One company's numbers.** On 30 October 2026, Manus co-founder and CPO Tao Zhang [wrote](https://manus.im/en/blog/rebuilding-manus-with-manus): "Today about half of our PMs ship features on their own, and every PM has committed code." It still isn't "without engineering" in the second sense. In his example, "An engineer with release rights reviewed the code", and "An agent can open a pull request, but it can't merge into our main branch without explicit approval from a person." Manus did this with its own agent and internal tooling, not Butterneck.

**Across many teams.** Linear's 2026 report on how teams build counts who attaches pull requests to issues in Linear: "The share of product managers attaching pull requests rose from 3% to 10% in two years, and designers from 1% to 8%." Linear only counts repositories connected to Linear, so it calls these numbers "floors rather than ceilings" ([Linear, How teams build](https://linear.app/data)). Attaching a pull request doesn't show who reviewed or merged it, so the figure answers the first kind of "without engineering" above, not the second.

PMs who have done this at work describe the same split. At Remote, a senior product manager used Claude Code to prepare a production change and open the merge request, and wrote: "The human involvement is reviewing the merge request and approving it, which is where it should be" ([Remote, 20 August 2026](https://remote.com/blog/people/shipping-to-production-as-a-non-engineer)). At Tipalti, a PM's engineering Team Lead "reviewed the plan before a single line of code was written", and the feature "went through all the regular testing and review cadences with the engineering team" ([Tipalti, 12 August 2026](https://tipalti.com/blog/non-technical-pm-ships-feature-ai/)). Atlassian reports the same split at scale: in an internal initiative, "PMs and designers who had never written production code used AI to take small customer-facing improvements all the way to production. Engineers helped scope the changes, reviewed the code, and upheld technical standards." In three months, "more than 50 PMs and designers shipped over 100 engineering-approved production changes" ([Atlassian, 10 November 2026](https://www.atlassian.com/blog/how-we-build/3-lessons-from-rebuilding-atlassians-product-development-lifecycle-for-people-and-agents)). In all three cases, people outside engineering used AI to make the change themselves. With Butterneck the agent runs on a developer's connected computer instead, but the last step is the same: a developer decides what ships. [Who lets non-engineers ship?](/blog/who-lets-non-engineers-ship) reads Atlassian's post alongside Nash, Fieldguide and Carcará.

## A setup that works

1. A developer connects a computer where the app already runs and picks who can send requests.
2. The PM opens a share link to that running app and types the change next to the screen they mean.
3. The team's own coding agent (Cursor, Claude Code or Antigravity) edits the project on that computer, and the preview updates.
4. The PM checks it and asks for tweaks. The developer reviews the diff and ships it the usual way.

That is how [Butterneck](/) works. Butterneck does not commit, push, open a pull request or deploy.

**See it before you set anything up:** [try an example change on a sample shop](https://app.butterneck.com/trial), no account needed, before connecting a computer. On your own project, the edit runs on a developer's connected computer. Your team still decides what goes live.

## What to watch for

- Agree which kinds of changes PMs can request. Our [AI change request policy template](/blog/ai-change-request-policy-template) is a starting point.
- Write requests the way you would to a person. See [how to write a change request for AI](/blog/how-to-write-a-change-request-for-ai).
- Be clear on data: files are edited on the developer's computer, but the coding CLI sends code context to its AI provider, and preview and chat traffic pass through Butterneck's server.

For the longer version, read [how PMs can change a live app without waiting on engineering](/blog/how-pms-can-change-a-live-app-without-waiting-on-engineering).

Designers can use the same setup; see [how non-engineers can ship frontend changes as pull requests](/blog/how-non-engineers-can-ship-frontend-changes-as-pull-requests). To compare tools for this, including ones that open a pull request for you, see [AI tools that let non-developers change an existing web app](/blog/tools-for-non-developers-to-change-an-existing-app).

## FAQ

### What tools let product managers make small changes to a live web app without waiting on engineering?

Butterneck is one. A developer connects a computer where the app already runs, and the product manager types the change on a live copy of the app: new wording, a layout fix, a small feature. The team's own coding agent (Cursor, Claude Code or Antigravity) makes the change on that computer, and the PM checks it on the live preview and asks for tweaks. Butterneck doesn't commit, push, open a pull request, merge or deploy. A developer reviews the diff and ships it the usual way, so the wait is one review instead of a long hand-off. Other tools in this category run a copy of your app in the cloud and open a pull request for you, and some are visual editors that a designer or PM runs on their own computer. We compare them side by side in [AI tools that let non-developers change an existing web app](/blog/tools-for-non-developers-to-change-an-existing-app).

### Can product managers build apps without engineering or writing code?

A new app, often yes: AI app builders can generate a prototype or an internal tool from a plain-language description, and many also host it. The product your customers already use is different. It has a codebase, tests and a release process, so the realistic version is the setup above: the PM describes the change and checks it on a live copy, the team's own coding agent edits the existing project, and a developer decides what ships. See [AI app builder or change the app you already have?](/blog/ai-app-builder-vs-changing-your-existing-app). If you are weighing Lovable for this, see [our comparison for teams with an existing app](/blog/lovable-alternative).

### Can product managers prototype in the real codebase instead of a mockup?

For changes to screens that already exist, yes. The PM opens the share link to the running app and describes the change in plain words. The team's coding agent edits the real project on a developer's connected computer, and the preview updates on the same link, so the PM can show stakeholders a working version in the app's own code, not a mockup. Nothing reaches production until a developer reviews the diff and ships it, and a version nobody wants is simply discarded. A brand-new product or flow is a different job: start it with design and scoping, or an AI app builder.

### Is this the same as an A/B testing, feature-flag or website-builder tool?

No. Those tools do a different job: testing versions of a page against each other, switching finished features on and off, or editing content that lives in a CMS or page builder. Butterneck is for changes to the app's own code. The product manager asks for the change on a live copy of the app, the team's coding agent (Cursor, Claude Code or Antigravity) edits the project on the developer's connected computer, and a developer reviews the diff and ships it the usual way. Butterneck doesn't commit, push, open a pull request, merge or deploy. If the change is wording on a marketing page your team already edits in a CMS, the CMS is the quicker route.

### Do product managers need to learn to code?

No. They describe the change in plain words and check the result on the preview. A developer reads the code.

### Do product managers or designers need GitHub or repository access?

No. They don't clone the code, open the repository or sign in to a coding tool. A developer connects the project on their own computer, and the requester opens the share link to the running app and types the change in the chat. The developer chooses whose messages start the AI: a list of people, or anyone with the link. Someone who only looks at the preview doesn't need an account. The coding agent already signed in on a developer's connected computer (Claude Code, Cursor or Antigravity) edits the project, and a developer reviews the diff and decides what ships, through the team's usual Git process. Butterneck doesn't commit, push or open a pull request. If you were weighing a Claude Code or Cursor seat for each PM instead, see [Claude Code for product managers](/blog/claude-code-for-product-managers).

### Will the AI push changes to production?

Not with Butterneck. It edits files on the developer's computer and stops. A developer decides what becomes a commit and what goes live.

### What if the AI gets the change wrong?

Ask again on the same preview until it's right, or stop the turn. Each turn records a baseline first, so a stopped turn's file changes are usually rolled back; if the rollback can't be completed, the chat says so. Nothing reaches your users until a developer decides it ships. More in [how Butterneck runs the coding agent in a sandbox](/blog/run-ai-coding-agent-sandbox-on-your-machine).

### What does it cost?

Butterneck Starter is free for one developer and one person requesting changes. Pro is USD 19 per person per month. You also pay for your own coding agent. See [pricing](/pricing).
`,
};
