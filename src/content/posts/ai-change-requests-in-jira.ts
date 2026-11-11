import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "ai-change-requests-in-jira",
  title: "AI change requests in Jira: how to start one from a ticket",
  description: "How to turn a Jira ticket into an AI-made change the requester can check on a live preview, with a developer deciding what ships.",
  date: "2026-11-03",
  author: "The Butterneck team",
  tags: ["Jira", "AI change requests", "answer"],
  cover: {
    src: "/blog/cover-ai-change-requests-in-jira.png",
    alt: "Butterneck blog cover: AI change requests from a ticket — How to start one from a ticket.",
    width: 1200,
    height: 630,
  },
  body: `
**Short answer:** add a label to the ticket and assign it. With Butterneck's Jira Cloud integration, a ticket labelled \`butterneck\` and assigned to a teammate whose Jira account is mapped to a connected computer starts an AI change on that computer. A preview link is posted back to the ticket so the requester can check it.

## What happens, step by step

1. Someone writes a normal Jira ticket: what should change, on which screen.
2. They add the label \`butterneck\` and assign it to a mapped teammate.
3. A private copy of the app opens on that teammate's computer, named after the ticket. The title, description, latest comments and attachments become the request.
4. The team's own coding agent (Cursor, Claude Code or Antigravity) makes the edit.
5. When it's done, a short note and a preview link are posted back to the ticket.
6. The requester checks the preview and can ask for tweaks. A developer reviews the diff and ships it the team's usual way.

Butterneck does not commit, push, open a pull request or deploy. The ticket stays the record; the preview is where the change gets checked.

**See it before you set anything up:** [create a free account and try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. On your own project, the edit runs on your computer. Your team still decides what goes live.

## Tips

- Write the ticket so a new teammate could act on it. Our [change request guide](/blog/how-to-write-a-change-request-for-ai) has a template.
- Keep it to one change per ticket. One ticket starts one run.
- Use a dedicated dev machine for the connected computer, with no production secrets.

More detail on the integration is on the [Jira page](/integrations/jira), and the longer walkthrough is [from Jira ticket to a reviewable change](/blog/jira-ticket-to-pr-with-ai).

## FAQ

### Does it work with Jira Data Center?

The integration is for Jira Cloud.

### Who can start a run?

A run starts only in a linked Jira project, when the ticket has the \`butterneck\` label and is assigned to a mapped user.

### Does it open a pull request from the ticket?

No. The edit runs on your computer and a preview link goes back to the ticket. A developer decides whether to commit and open a PR.
`,
};
