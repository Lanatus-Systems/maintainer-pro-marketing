import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "jira-ticket-to-pr-with-ai",
  title: "From Jira ticket to reviewable change with AI",
  description:
    "Jira to PR with AI, minus the auto-PR: label a ticket, an AI coding agent makes the change on a live copy, a preview link lands on the ticket, and your developer opens the PR.",
  date: "2026-10-27",
  author: "The Butterneck team",
  tags: ["Jira to PR with AI", "Jira AI automation", "AI coding agents", "code review"],
  cover: {
    src: "/blog/cover-jira-ticket-to-reviewable-change-v2.png",
    alt: "Butterneck blog cover: from a labeled Jira ticket to a live preview that a developer reviews and ships",
    width: 1200,
    height: 630,
  },
  body: `
Plenty of tools now promise to turn a Jira ticket into a pull request with AI. The idea is good. Most tickets for small changes are clear enough that a coding agent can do the edit. The hard questions are about what happens around it: who sees the result, who checks it, and what reaches your main branch.

This post walks through a ticket-to-change workflow for product teams, and how Butterneck handles it. One honest note up front: Butterneck does not open the PR itself. It turns the ticket into a reviewable change on a live preview. Your developer opens the PR. We explain why below.

## What "Jira to PR with AI" usually means

The common pattern:

1. A ticket is assigned to an AI agent.
2. The agent reads the ticket, checks out the repo, and makes changes.
3. The agent opens a pull request.
4. An engineer reviews the diff.

That moves the code part faster. But for the person who wrote the ticket, often a PM, nothing changes. They still cannot see the result until someone deploys a preview. And the engineer reviewing the diff still has to guess whether it matches what the PM meant.

## The missing step: seeing the change

For product changes, the reviewer that matters first is the person who asked. A diff does not tell a PM whether the empty state reads well. A running app does.

So a useful ticket-to-change flow should give the ticket author a live preview, let them refine it, and only then put it in front of an engineer.

## How the Jira flow works in Butterneck

### Connect Jira once

- Sign in with Jira Cloud and choose your site.
- Link a Jira project to your app in Butterneck.
- Paste Butterneck's address into Jira, so Jira can tell Butterneck when a ticket is created or updated.

### Label a ticket to start

- Add the label \`butterneck\` to a ticket.
- Assign it to someone whose computer has the project.
- Butterneck opens a private copy of the project named after the ticket.
- The ticket's title, description, comments, and attached files become the request.

### The agent makes the change

The coding agent runs on the assignee's computer, in that private copy's folder, using the CLI they are already signed in to: Cursor, Claude Code, or Antigravity. The app runs there too, and Butterneck gives it a share link.

### The preview goes back on the ticket

When the AI is done, a short note and a link to the preview are posted back to the Jira ticket. The full conversation stays on the live copy, where anyone allowed can keep refining in chat. Updating the same ticket later does not open a second copy.

You can also paste a ticket number into an existing chat to load that ticket.

## From preview to PR

Once the change looks right, the developer:

1. Reads the conversation on the live copy.
2. Checks the diff in their own editor or git client.
3. Commits on a branch and opens a PR the way the team already does, with the Jira key in the branch name or title if that is your convention.
4. Your normal review, CI, and deploy take over.

If the private copy is a git worktree, the change is already on its own branch and checkout, separate from the main working copy.

## Why Butterneck stops before the PR

We get asked this a lot. Short version, from [human-in-the-loop AI coding](/blog/human-in-the-loop-ai-coding):

- **The person asking is often not a developer.** They should approve what they see, not a diff.
- **Your release process already exists.** Branch names, PR templates, reviewers, CI. A tool that creates PRs has to fit all of it. A developer opening the PR fits by default.
- **Mistakes stay cheap.** A bad turn can be stopped and rolled back. A wrong change can be thrown away. Nothing has touched your remote.

There is no code path in Butterneck that pushes, opens a PR, merges, or deploys. If you want PRs created automatically, a PR-generating tool is a better fit. See our [Itera comparison](/blog/itera-alternative) for one example.

## What to put in a ticket so the AI does well

The agent reads the title, description, comments, and attachments. Tickets that work well:

- Name the page or screen: "Checkout, step 2".
- Say what is there now and what it should be: "Button says Continue. Should say Review order."
- Attach a screenshot when the location is not obvious.
- Keep one change per ticket. Small tickets give small, reviewable diffs.
- Leave out anything that needs secrets or production data.

## Security notes for CTOs

- The agent works only in the folder tied to the private copy.
- \`.env\` files and team-defined globs are on an ignore list given to the agent as an instruction. It is not a hard sandbox, so keep production secrets off the bridge machine.
- The coding CLI sends prompts and code context to its own AI provider, under your agreement with that provider.
- Chat messages and preview traffic pass through Butterneck's server.
- Every turn takes a baseline first, so a stopped turn rolls its file changes back.

More in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine) and [human-in-the-loop architecture for AI product changes](/blog/human-in-the-loop-architecture-for-ai-product-changes).

## FAQ

### Can Butterneck turn a Jira ticket into a pull request?

It turns a labeled ticket into a working change on a live preview, and posts the preview link back to the ticket. A developer then opens the PR. Butterneck does not open PRs itself.

### How do I trigger it from Jira?

Add the label \`butterneck\` and assign the ticket to someone whose computer has the project.

### Which Jira versions are supported?

Jira Cloud.

### What happens if the ticket is edited later?

Updating the same ticket does not open a second copy.

### Which AI coding agents does it use?

The Cursor, Claude Code, or Antigravity CLI already installed and signed in on the developer's computer.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and we will label a real ticket together. Or see [pricing](/#pricing): the Starter plan is free. More at [butterneck.com](/).
`,
};
