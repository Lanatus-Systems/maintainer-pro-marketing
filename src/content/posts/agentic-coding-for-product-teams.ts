import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "agentic-coding-for-product-teams",
  title: "Agentic coding for product teams: what it is, and how non-developers can use it",
  seoTitle: "Agentic coding for product teams and non-developers",
  description:
    "What agentic coding means, how it differs from autocomplete, and how PMs and designers can use a developer's coding agent on a live preview without a terminal.",
  date: "2026-11-05",
  author: "The Butterneck team",
  tags: ["agentic coding", "AI coding agents", "AI change requests", "product teams", "Claude Code", "Cursor"],
  cover: {
    src: "/blog/cover-agentic-coding-for-product-teams.png",
    alt: "Butterneck blog cover: Agentic coding for product teams. Ask a developer's coding agent on a live preview, and a developer decides what ships",
    width: 1200,
    height: 630,
  },
  body: `
"Agentic coding" is the word for AI that doesn't just suggest the next line, but takes a task, reads the codebase, edits several files, runs commands and checks its own work. Claude Code, Cursor's agent and Antigravity all work this way. For developers it changes how work gets done. For the rest of the product team, it raises a new question: if the agent can do the edit, does a PM or designer still have to wait in the backlog for a small change?

This post explains agentic coding in plain terms, what it does well and badly, and how non-developers can use it without a terminal. We make Butterneck, so we say how it fits near the end.

> **Agentic coding, in short:** An AI coding agent takes a goal in plain words, plans the steps, edits files across the project and checks the result, instead of completing one line at a time. In Butterneck, a PM or designer can give that goal on a live preview of the app, the coding agent a developer already uses makes the edit on their computer, and a developer still decides what ships.

## Agentic coding vs AI autocomplete

| | AI autocomplete | Agentic coding |
|---|---|---|
| What you give it | The code you're typing | A task in plain words |
| What it does | Suggests the next lines | Reads the project, plans, edits several files, can run commands |
| Who drives it | A developer, line by line | A developer, or anyone allowed to send it a task |
| What you check | Each suggestion | The finished change |

The shift matters because the input is now plain language. Plain language is something a PM, designer or support lead can already write.

## What agentic coding is good at, and where it needs a person

Good fits are small, well-described changes on an app that already runs: copy, layout, a clearer error message, an empty state, a missing field on a form. The agent can find the right files faster than someone new to the codebase.

It needs a person when the request is ambiguous, when the change touches auth, payments or data, or when "correct" depends on context the agent can't see. That is why most teams keep two checks: the person who asked confirms it's what they meant, and a developer reviews the diff. Read more in [human-in-the-loop AI coding](/blog/human-in-the-loop-ai-coding).

## How non-developers can use agentic coding today

There are two common ways:

1. **Run the agent yourself.** Get a seat for Claude Code or Cursor, access to the repo and a way to run the app. It suits PMs who want to learn the codebase; see [Claude Code for product managers](/blog/claude-code-for-product-managers).
2. **Ask on a running app and let a developer's agent do the edit.** No repo, terminal or AI seat for the requester. A developer still reviews and ships.

## How Butterneck uses agentic coding

A developer connects a computer that already has the project and a coding CLI signed in: Claude Code (\`claude\`), Cursor's CLI (\`agent\`) or Antigravity (\`agy\`). The app runs on that computer's dev server, and Butterneck gives it a share link.

- A teammate opens the link and types the request in a chat next to the screen they mean, or labels a Jira ticket \`butterneck\`.
- The agent edits the connected project, and the preview updates on the same link.
- If a turn goes wrong it can be stopped, and its file changes are usually rolled back (if not, the chat says so).
- A developer reads the conversation, checks the change, and ships it through the team's normal process, or discards it.

Butterneck does not commit, push or open a pull request, and it never merges or deploys. We call these requests AI change requests; see [AI change requests for product teams](/blog/ai-change-requests-for-product-teams).

**See it before you set anything up:** [try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. If you sign out, you're asked to create a free account. On your own project, the edit runs on a developer's connected computer, and a developer still decides what ships.

## What to know before you try this

- **Your AI provider's terms apply.** The coding CLI on the connected computer sends code context to its own provider, under that provider's terms. The signed-in plan has to allow use on your team's behalf.
- **Not everything stays on the computer.** Files are edited on the connected computer, but chat messages and preview traffic go through Butterneck.
- **\`.env\` is a guardrail, not a hard block.** Secret settings files are on an ignore list the AI is told to stay out of. That is an instruction, so keep production secrets off that computer.
- **The computer has to be on** for the preview to load and for work to start.

## FAQ

### What is agentic coding?

Agentic coding is when an AI coding agent takes a task in plain words, reads the project, plans the steps, edits several files and checks the result, rather than suggesting one line at a time. Claude Code, Cursor's agent and Antigravity are examples.

### Can non-developers use agentic coding?

Yes. They can run an agent themselves if they have repo access and a seat, or ask for a change on a running copy of the app and let a developer's agent do the edit. Either way, a developer should still review the change and decide what ships.

### Does agentic coding replace code review?

No. The agent can check its own work, but someone still needs to confirm the change is what was asked for and a developer needs to decide whether it ships.

### Which coding agents does Butterneck work with?

Claude Code, Cursor's agent CLI and Antigravity, signed in on the developer's connected computer.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9), or see [pricing](/pricing) and start on the free Starter plan.
`,
};
