import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "jira-ticket-to-pr-with-ai",
  title: "Jira ticket to pull request with AI: check a live preview before anyone opens the PR",
  seoTitle: "AI change requests: Jira ticket to pull request with AI",
  description:
    "AI change requests from a Jira ticket: a label starts the work, the requester checks a live preview, and a developer decides whether to open the PR.",
  date: "2026-10-27",
  updated: "2026-11-10",
  author: "The Butterneck team",
  tags: ["Jira ticket to pull request", "Jira to PR with AI", "Jira AI automation", "AI coding agents", "code review", "link Jira ticket to PR", "Jira tickets for AI agents"],
  cover: {
    src: "/blog/cover-jira-ticket-to-pr-with-ai.png",
    alt: "Butterneck blog cover: From a ticket to a pull request with AI — Check a live preview before anyone opens the PR.",
    width: 1200,
    height: 630,
  },
  body: `
Butterneck lets a product person turn a Jira ticket into a change to a live web app and check it on a live preview. Butterneck does not commit, push or open a pull request; a developer decides first. For "Jira ticket to pull request", that means a label starts the work, an AI coding agent makes the change on a private copy of your app on the developer's computer, the person who asked checks the preview, and then a developer decides whether to open a pull request. Butterneck never opens the PR itself.

Plenty of tools now promise to turn a Jira ticket into a pull request with AI. The idea is good. Most tickets for small changes are clear enough that a coding agent can do the edit. The hard questions are about what happens around it: who sees the result, who checks it, and what reaches your main branch.

This post walks through a ticket-to-change workflow for product teams, and how Butterneck handles it. One honest note up front: Butterneck does not open the PR itself. It turns the ticket into a reviewable change on a live preview. Your developer opens the PR. We explain why below.

> **Jira ticket to pull request, in short:** Add the \`butterneck\` label to a Jira ticket assigned to a mapped teammate, and an AI coding agent makes the change on a private copy of your app on that developer's computer, with the coding agent they already use (Cursor, Claude Code or Antigravity). A preview link goes back on the ticket and the person who asked checks it. Butterneck does not commit, push or open a pull request; a developer decides first whether to open one, and Butterneck never merges or deploys.

## Jira ticket to pull request: where Butterneck fits

The path from a ticket to a PR has three steps, and Butterneck covers the first two:

1. **The ticket starts the work.** Adding the \`butterneck\` label to a ticket assigned to a mapped teammate opens a private copy named after the ticket, and the agent works from the ticket's text and attachments.
2. **The requester checks a live preview.** A link to the running app with the change goes back on the ticket. The requester looks at it and keeps refining in chat until it is right.
3. **A developer decides about the PR.** The developer reads the conversation and the diff. If the change is worth keeping, they commit on a branch and open the PR with your usual process. If not, the change is thrown away and no PR ever exists.

So if you want a tool that creates the pull request for you, Butterneck is not it. If you want the person who wrote the ticket to see the change before anyone spends review time on a PR, that is the gap it fills.

## What "Jira to PR with AI" usually means

The common pattern:

1. A ticket is assigned to an AI agent.
2. The agent reads the ticket, checks out the repo, and makes changes.
3. The agent opens a pull request.
4. An engineer reviews the diff.

That moves the code part faster. But for the person who wrote the ticket, often a PM, nothing changes. They still cannot see the result until someone deploys a preview. And the engineer reviewing the diff still has to guess whether it matches what the PM meant.

## The missing step: seeing the change

For product changes, the reviewer that matters first is the person who asked. A diff does not tell a PM whether the empty state reads well. A running app does.

So a useful ticket-to-change flow should give the ticket author a live preview, let them refine it, and only then put it in front of an engineer. (More on what to check in [a live preview before the PR](/blog/live-preview-before-pull-request).)

## How the Jira flow works in Butterneck

### Connect Jira once

- Sign in with Jira Cloud and choose your site.
- Link a Jira project to your app in Butterneck.
- Paste Butterneck's address into Jira, so Jira can tell Butterneck when a ticket is created or updated.
- Map each developer's Jira account to their computer.

### Label a ticket to start

- Add the label \`butterneck\` to a ticket.
- Assign it to a teammate whose Jira account is mapped to a computer that has the project. If the assignee isn't mapped, nothing starts; the Jira page in Butterneck shows why.
- Butterneck opens a private copy of the project named after the ticket.
- The ticket's title, description, latest comments, and attached files become the request.

### The agent makes the change

The coding agent runs on the assignee's computer, in that private copy's folder, using the CLI they are already signed in to: Cursor, Claude Code, or Antigravity (team, enterprise or API plans recommended). The app runs there too, and Butterneck gives it a share link.

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

## How to link a Jira ticket to a PR

Once a developer opens the pull request, you will want it to show up on the Jira ticket. Butterneck doesn't do this step, because it doesn't open the PR. Jira's own development integrations do. With Jira Cloud connected to GitHub (through the GitHub for Jira app), Bitbucket or GitLab, Jira links development work to an issue when the issue key appears in it ([Atlassian: reference issues in your development work](https://support.atlassian.com/jira-software-cloud/docs/reference-issues-in-your-development-work/)):

- **Branch name:** for example \`PROJ-123-update-pricing-copy\`.
- **Commit message:** for example \`PROJ-123 Update pricing copy\`.
- **Pull request title:** for example \`PROJ-123: Update pricing copy\`.

Use the key in capitals, exactly as Jira shows it. Once linked, the PR appears in the ticket's Development panel. So the full path for a labelled ticket is: the AI coding agent makes the change on a live copy, the requester checks the preview, and the developer commits on a branch named with the ticket key and opens the PR. The ticket then shows the preview link Butterneck posted and the PR your Git provider linked.

## Why Butterneck stops before the PR

We get asked this a lot. Short version, from [human-in-the-loop AI coding](/blog/human-in-the-loop-ai-coding):

- **The person asking is often not a developer.** They should approve what they see, not a diff.
- **Your release process already exists.** Branch names, PR templates, reviewers, CI. A tool that creates PRs has to fit all of it. A developer opening the PR fits by default.
- **Mistakes stay cheap.** A bad turn can be stopped and, in most cases, rolled back. A wrong change can be thrown away. Nothing has touched your remote.

There is no code path in Butterneck that pushes, opens a PR, merges, or deploys. If you want PRs created automatically, a PR-generating tool is a better fit. See our [Clogless comparison](/blog/clogless-alternative) or [Itera comparison](/blog/itera-alternative) for examples.

## What to put in a ticket so the AI does well

The agent reads the title, description, latest comments, and attachments. Tickets that work well:

- Name the page or screen: "Checkout, step 2".
- Say what is there now and what it should be: "Button says Continue. Should say Review order."
- Attach a screenshot when the location is not obvious.
- Keep one change per ticket. Small tickets give small, reviewable diffs.
- Leave out anything that needs secrets or production data.

For a copy-ready version, put the five-line template from [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai) in the ticket description.

## Security notes for CTOs

For the full picture of folders, the ignore list and what leaves the machine, read [how Butterneck runs the coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

- The agent works only in the folder tied to the private copy.
- \`.env\` files and team-defined globs are on an ignore list given to the agent as an instruction. It is not a hard sandbox, so keep production secrets off the bridge machine.
- The coding CLI sends prompts and code context to its own AI provider, under your agreement with that provider.
- Chat messages and preview traffic pass through Butterneck's server.
- Every turn takes a baseline first, so a stopped turn usually rolls its file changes back. If the rollback can't be completed, for example because a changed file was too large to snapshot, the chat says so.

More in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine) and [human-in-the-loop architecture for AI product changes](/blog/human-in-the-loop-architecture-for-ai-product-changes).

**See it before you set anything up:** [create a free account and try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. On your own project, the edit runs on your computer. Your team still decides what goes live.

## FAQ

### Can Butterneck turn a Jira ticket into a pull request?

It turns a labeled ticket into a working change on a live preview, and posts the preview link back to the ticket. A developer then opens the PR. Butterneck does not open PRs itself.

### How do I link a Jira ticket to a pull request in GitHub?

Connect Jira Cloud to GitHub with the GitHub for Jira app, then put the issue key (for example PROJ-123) in the branch name, a commit message or the PR title. Jira then shows the PR in the ticket's Development panel. With Butterneck, a developer opens that PR after the requester has checked the change on a live preview; Butterneck doesn't open it.

### Which AI tools turn a Jira ticket into a pull request?

Several do. Atlassian's own Jira Coding Agent can generate code from a work item and open a draft pull request for your team to review and merge. In Jira you can also assign a work item to Cursor, which starts a Cursor Cloud Agent and, if it opens a pull request, links it on the ticket, or to Atlassian's Claude Agent for Jira (Beta), which typically opens a draft GitHub pull request. Clogless opens a pull request with your Git provider when the change is ready. Butterneck stops one step earlier: a labeled ticket opens a private copy of the app, the developer's own coding agent makes the change, and a preview link goes back on the ticket. A developer then decides whether to commit it and open a PR. Butterneck never opens a pull request, merges or deploys. Our [Jira integration page](/integrations/jira) explains how this differs from assigning the ticket to Cursor or Claude.

### How do I trigger it from Jira?

Add the label \`butterneck\` and assign the ticket to a teammate whose Jira account is mapped to a computer that has the project. Mapping each developer's Jira account to their computer is part of connecting Jira.

### Does the AI read the ticket's comments and attachments?

Yes. The ticket's title, description, latest comments and attached files become the request, so a screenshot on the ticket reaches the coding agent. Leave secrets and production data out of the ticket.

### Which Jira tickets should you give an AI coding agent?

Small, visible changes that the person who asked can check on screen: copy and labels, spacing and layout, an empty state, a new column or filter. Write the ticket as where it is, what it says now, what it should say and what must stay the same. Keep login and permissions, billing, database changes and secrets with a developer. More in [how to write a change request for AI](/blog/how-to-write-a-change-request-for-ai).

### Which Jira versions are supported?

Jira Cloud.

### What happens if the ticket is edited later?

Updating the same ticket does not open a second copy.

### Which AI coding agents does it use?

The Cursor, Claude Code, or Antigravity CLI already installed and signed in on the developer's computer.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and we will label a real ticket together. Or see [pricing](/pricing): the Starter plan is free and allows one private copy at a time (so one ticket or one chat copy). Each labeled ticket opens its own copy, so regular Jira use needs Pro. Pro is USD 19 per person per month, and a workspace owner on Starter can try Pro free for one month. More at [butterneck.com](/).
`,
};
