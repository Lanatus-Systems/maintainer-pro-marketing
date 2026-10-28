import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "how-pms-can-change-a-live-app-without-waiting-on-engineering",
  title: "Small changes stuck in the backlog? How PMs can change a live app without waiting on engineering",
  seoTitle: "How PMs can change a live app without waiting on engineering",
  description:
    "Small product changes sit in the backlog because of the relay, not the code. Ask on a live preview, an AI agent makes the edit, a developer decides what ships.",
  date: "2026-10-27",
  updated: "2026-10-28",
  author: "The Butterneck team",
  tags: ["product managers", "let PMs change a live app", "small changes backlog", "AI coding agents", "workflow"],
  cover: {
    src: "/blog/cover-how-pms-can-change-a-live-app.png",
    alt: "Butterneck blog cover: Let PMs change a live app. They ask in chat, the developer's AI builds it, and you publish",
    width: 1280,
    height: 720,
  },
  body: `
A product manager spots a problem on the live app. The button label is wrong. The empty state says nothing useful. A form asks for a field nobody needs. The fix is small. Getting it done is not.

Most teams have a list of these paper cuts: wrong labels, unclear empty states, a field in the wrong order. Each one is too small to fight for in sprint planning, so the list grows.

This post is about how a PM can change a live app without waiting on engineering, and without engineering losing control of what ships.

## Why small product changes sit in the backlog (it isn't the code)

The change usually takes a developer a few minutes. The wait comes from everything around it:

- Writing a ticket that explains which page, which state, which button.
- Adding a screenshot, then a second one because the first was the wrong screen.
- Waiting for the ticket to reach the top of a sprint.
- A developer asks a clarifying question. You answer a day later.
- A staging deploy so you can check it. You find one more thing.

None of that is coding. It is relay. We wrote about this in [human-in-the-loop AI coding](/blog/human-in-the-loop-ai-coding): the change is small, the back-and-forth is what takes the week.

Paper cuts also lose every prioritisation call. Next to a feature or a bug, "rename this button" never looks urgent, so it waits behind work that does. Nobody decided the fix wasn't worth doing. It was just never worth a developer's context switch. That is the gap [AI change requests for product teams](/blog/ai-change-requests-for-product-teams) are meant to close: the person who spotted the problem asks for it directly, and a developer only steps in to decide.

## What "without waiting on engineering" should mean

It should not mean PMs pushing to production. Most engineering leads will say no to that, and they are right to. Code review, tests, and release steps exist for a reason.

What a PM actually needs is narrower:

- To describe the change on the screen where they see it.
- To see the result quickly, on the real app, not a mockup.
- To iterate ("a bit shorter", "no, the other button") without a new ticket each time.
- To hand a finished, visible change to a developer who decides whether it goes live.

That removes the waiting from the PM's side while keeping the decision with engineering.

## The options teams use today

### Tickets and screenshots

The default. Works, but every round trip costs a day. The developer still has to find the page and guess the intent.

### Give the PM a no-code tool

Fine for marketing pages built in a CMS. Not useful when the change is in the product's own code.

### Give the PM an AI coding tool

Some PMs install Cursor or Claude Code and edit the repo. This can work for technical PMs, but it means a local dev setup, git, and a PM opening pull requests. Many teams do not want that.

### Let the PM ask on a live copy

The PM asks for the change in a chat on a running copy of the app. A coding agent makes the edit. The preview updates. No pull request is opened; a developer reviews first and decides what ships. This is the approach Butterneck takes. Why the requester's check comes before any PR is covered in [live preview before the pull request](/blog/live-preview-before-pull-request).

## How it works: make changes to your live app with AI, and a developer decides

![The live app with the Butterneck chat open next to it](/blog/product-app-with-chat.png "1280x720")

1. A developer connects a project folder on their own computer to Butterneck through a small bridge app. The bridge starts the app and gets a public share link for it.
2. The PM opens the link. They see the live app with a chat beside it.
3. The PM types the change: "Make the button say Book a call."
4. A coding agent the developer already uses (Cursor, Claude Code, or Antigravity) edits the files in that folder. The app hot-reloads and the PM sees the change on the same screen.
5. The PM keeps going until it is right. If a turn goes wrong, it can be stopped and its file changes rolled back.
6. The developer reads the conversation, checks the diff in their own tools, and publishes it the usual way. Or discards it.

Butterneck never merges, never opens a pull request, and never deploys. You decide what goes live.

The share link needs no VPN or staging deploy, and viewers do not need an account. The developer chooses who can send requests: a named list, or anyone with the link. A developer can reply in the chat without starting the agent: the reply is saved and changes no files, though it can be included as context on the requester's next turn. More detail in [how to share a local app without deploying](/blog/share-local-app-without-deploying).

## What engineering keeps control of

This is the part to show your CTO.

- **The folder.** The agent works in one folder the developer chooses. That can be a git worktree, so in-flight requests do not touch the main checkout.
- **The ignore list.** \`.env\` files and any globs the team adds are put in the agent's instructions as off-limits. That is a guardrail, not an enforced block, so keep production secrets off the machine that runs the bridge.
- **The release.** Nothing is committed, pushed, or deployed by Butterneck.
- **The agent account.** The coding CLI runs under the plan it is signed in with and that provider's terms; use a team or API plan that allows use on your team's behalf. The CLI sends code context to that provider, as it does in normal use. Chat messages and preview traffic go through Butterneck's server.

For the full picture, read [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

## What a PM should still not do alone

Being clear about limits helps adoption.

- Changes to pricing logic, permissions, or data models need an engineer's eyes, even if the preview looks right. "Looks right" and "is right" are different checks.
- Big features need design and scoping. A live-copy chat is for small, visible changes.
- The developer still reviews every change. The requester sees the change on the preview in the same session, and the developer reviews it with the intent already written down in the conversation.

To write these limits down for your team, use our [policy template for non-engineers requesting changes with AI](/blog/ai-change-request-policy-template).

## A simple way to start

- Pick one app and one developer.
- Agree on the kind of changes PMs can request: copy, layout, small UI fixes.
- Share the link with one PM for a week. If you need sign-off first, our [4-week pilot proposal](/blog/pm-change-request-pilot-proposal) is written to send to an engineering lead.
- Give that PM a simple format for requests: where, what it says now, what you want, what must not change, and how you'll check it. Our [change request template for AI coding agents](/blog/how-to-write-a-change-request-for-ai) has examples.
- Pick the paper cuts first: the small copy and UI fixes that have sat in the backlog longest.
- Count how many requests went from ask to reviewed change the same day.

## FAQ

### Why do small product changes sit in the backlog?

Usually not because the code is hard. The time goes into the relay around it: writing the ticket, finding the right screenshot, waiting for a sprint, answering a clarifying question, checking a staging deploy. Small fixes also lose prioritisation calls to features and bugs, so they wait.

### Can a PM change a live app without engineering?

A PM can make the change happen and see it on a live copy without waiting. A developer still reviews it and decides whether it ships. That is deliberate.

### Does the PM need a dev environment or git?

No. The PM uses a share link in the browser. The developer's computer runs the app and the coding agent.

### Does this change the production app directly?

No. The agent edits a copy in a folder on the developer's machine. Production changes only when the developer publishes.

### What if the AI gets it wrong?

Ask again in the chat, or stop the turn and its file changes are rolled back. The developer can also just discard the change.

### Can requests come from Jira instead of chat?

Yes. Add the label \`butterneck\` to a ticket and assign it to a teammate whose Jira account is mapped to a computer that has the project. A preview link is posted back on the ticket. See [From Jira ticket to reviewable change with AI](/blog/jira-ticket-to-pr-with-ai).

### Why not use a tool that opens the pull request for you?

Butterneck runs on a developer's computer, where the project already runs, so there is no new cloud environment to set up and no need to copy secrets into a hosted machine. The person who asked sees the change on a live preview, and a developer decides what happens next. Butterneck itself never opens a pull request, merges or deploys. A tool that opens pull requests can suit teams who want a PR as the hand-off. Butterneck suits teams who want a developer to decide before anything becomes a PR.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a real change your team has been waiting on. Or check [pricing](/pricing): Starter is free for one developer and one requester. Learn more at [butterneck.com](/).
`,
};
