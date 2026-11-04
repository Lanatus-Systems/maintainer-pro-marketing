import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "vibe-coding-for-teams",
  title: "Vibe coding for teams: how to let the whole product team ask for changes, safely",
  seoTitle: "Vibe coding for teams: ship it safely with a review step",
  description:
    "Vibe coding for teams: let PMs and designers describe changes on a live preview, have an AI coding agent make them, and keep a developer deciding what ships.",
  date: "2026-11-05",
  author: "The Butterneck team",
  tags: ["vibe coding for teams", "vibe coding", "vibe coding tools", "AI change requests", "product teams", "human in the loop"],
  cover: {
    src: "/blog/cover-vibe-coding-for-teams.png",
    alt: "Butterneck blog cover: Vibe coding for teams. Anyone asks on a live preview, and a developer decides what ships",
    width: 1200,
    height: 630,
  },
  body: `
"Vibe coding" started as a solo habit: describe what you want, let an AI coding agent write it, look at the result, and keep going without reading every line. For a weekend project that is fine. For a product a team already ships to customers, it raises fair questions. Who is allowed to ask? Who checks the result? Who decides what goes live?

This post is about vibe coding for teams: keeping the fast "describe it and see it" loop, and adding the few rules a shared codebase needs. We make Butterneck, so we explain how it does this near the end. The rules work with any setup.

> **Vibe coding for teams, in short:** Let anyone on the product team describe a change in plain words and see it on a running copy of the app, but keep one person who reads the change and decides whether it ships. In Butterneck the request is made on a live preview, the coding agent a developer already uses (Claude Code, Cursor or Antigravity) edits the project on their computer, and a developer still decides what ships.

## What changes when vibe coding moves from one person to a team

When one developer vibe codes, the person asking, the person checking and the person shipping are the same. On a team they split apart:

- **The person asking** is often a PM, designer or support lead who can describe the change but can't read the diff.
- **The person checking** needs to see the change on the real screen, not in a code review.
- **The person shipping** is a developer who knows the codebase, the tests and the release process.

Most problems with vibe coding on teams come from merging those roles by accident: a non-developer's change going live with nobody reading it, or a developer reviewing a diff with no idea whether it is what the requester meant.

## Four rules for team vibe coding

1. **Write down who can ask, and for what.** Copy, layout, empty states and small UI fixes are good candidates. Auth, payments, data models and anything security-related need an engineer from the start. Our [AI change request policy template](/blog/ai-change-request-policy-template) is a starting point.
2. **Show the change before anyone reviews code.** The requester should check it on a running copy of the app. See [live preview before the pull request](/blog/live-preview-before-pull-request).
3. **Keep a developer at the last step.** A developer reads the conversation and the diff, then commits, opens the PR, or throws it away. That is the review your team already has.
4. **Keep it small and reversible.** One request, one change. Bigger work goes through the normal ticket and planning flow.

## Vibe coding tools: where team features matter

Most vibe coding tools are built for one person driving the agent. When you compare them for a team, ask:

- Does it work on the app you already have, or does it start a new project?
- Who can send requests, and can you limit that to a list of people?
- Where is the change checked: on a running copy, in a diff, or after deploy?
- What does the tool do at the end: edit files, commit, open a PR, or deploy?
- Whose AI subscription runs the work, and do its terms allow team use?

For a longer side-by-side of tools that change an existing app, see [tools for non-developers to change an existing app](/blog/tools-for-non-developers-to-change-an-existing-app).

## How Butterneck does vibe coding for teams

Butterneck calls these requests AI change requests. A developer connects a computer that already has the project and a coding CLI signed in: Claude Code (\`claude\`), Cursor's CLI (\`agent\`) or Antigravity (\`agy\`).

1. The app runs on that computer's dev server, and Butterneck gives it a share link.
2. The developer chooses who can send requests: a list of people, or anyone with the link.
3. A teammate opens the link and types the change into a chat next to the screen they mean. Or someone labels a Jira ticket \`butterneck\`; see the [Jira integration](/integrations/jira).
4. The coding CLI edits the connected project, and the preview updates on the same link.
5. A developer reviews the change and the conversation and ships it the usual way, or discards it.

Butterneck does not commit, push or open a pull request, and it never merges or deploys. A developer decides what ships.

**See it before you set anything up:** [try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. If you sign out, you're asked to create a free account. On your own project, the edit runs on a developer's connected computer, and a developer still decides what ships.

## What to know before you try this

- **Your AI provider's terms apply.** The coding CLI on the connected computer sends code context to its own provider, under that provider's terms. The signed-in plan has to allow use on your team's behalf.
- **Not everything stays on the computer.** Files are edited on the connected computer, but chat messages and preview traffic go through Butterneck.
- **\`.env\` is a guardrail, not a hard block.** Secret settings files are on an ignore list the AI is told to stay out of. That is an instruction, so keep production secrets off that computer.
- **The computer has to be on** for the preview to load and for work to start.

## FAQ

### What is vibe coding for teams?

It is vibe coding with roles: anyone on the product team can describe a change in plain words and see it on a running copy of the app, and a developer reviews the change and decides whether it ships. It keeps the fast loop and adds a written policy and a review step.

### Is vibe coding safe for a production codebase?

It can be, if the change is checked by the person who asked and reviewed by a developer before it goes live, and if requests that touch auth, payments or data go to an engineer first. Keep production secrets off the machine the AI works on.

### Which vibe coding tools work for teams?

Look for tools that work on your existing app, let you choose who can send requests, show the change on a running copy, and leave the release decision to a developer. Butterneck is one option: requests are made on a live preview, and the developer's own Claude Code, Cursor or Antigravity makes the edit on their computer.

### Does Butterneck open pull requests?

No. It edits files in the connected project and stops. A developer decides whether to commit, open a pull request, or discard it.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and we'll run a real request with your team, or see [pricing](/pricing) and start on the free Starter plan.
`,
};
