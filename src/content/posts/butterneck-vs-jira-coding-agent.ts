import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "butterneck-vs-jira-coding-agent",
  title: "Butterneck vs Jira Coding Agent: label a ticket, then what?",
  description:
    "Both can start AI work from a Jira label. Jira Coding Agent opens a draft PR in a connected repo. Butterneck gives the person who asked a live preview to refine, and a developer ships it. An honest comparison.",
  date: "2026-10-27",
  author: "The Butterneck team",
  tags: ["Jira Coding Agent alternative", "Jira AI automation", "comparison", "AI change requests"],
  cover: {
    src: "/blog/cover-butterneck-vs-jira-coding-agent.png",
    alt: "Butterneck blog cover: Butterneck vs Jira Coding Agent. A draft PR from a label, or a live preview the asker can refine",
    width: 1200,
    height: 630,
  },
  body: `
If your team lives in Jira, the first question about any AI change tool is fair: why not use Atlassian's own Jira Coding Agent? It can be started from a Jira automation, including when a label is added to a ticket. Butterneck can be started by a Jira label too.

So the trigger is not the difference. What happens after the label is. This post compares the two, based on Atlassian's public documentation. We make Butterneck, so we are not neutral, and we say below where Jira Coding Agent is likely the better pick.

Everything about Jira Coding Agent here comes from Atlassian's support page [Work with Jira Coding Agent in automations](https://support.atlassian.com/jira-software-cloud/docs/work-with-jira-coding-agent-in-automations/), as read on October 27, 2026. Atlassian ships fast. Check their docs for the current details.

## What Jira Coding Agent does in automations

Atlassian describes the flow with standard Jira automation building blocks:

- A trigger, for example when a work item is updated.
- Conditions, for example when a specific label is added.
- The **Use Jira Coding Agent** action, which connects the agent to a repository you pick (or infers it from the work item) and gives it a prompt.

When the flow runs, the agent "makes code changes on a branch and creates a draft pull request in the repository you provided." Atlassian is clear that it "doesn't merge the pull request directly, but hands it back to your team for review and merge." You review the PR in the repository or from the work item's Development and Agent sessions sections.

The docs list some requirements: a Standard or Premium plan, Rovo credits (the connection owner's credits are used when the flow runs), and space admin rights to create the flow. Flows count toward your Jira plan's automation limits. In automations the agent runs in a restricted mode and does not read Confluence content.

## What Butterneck does with a Jira label

- Connect Jira Cloud once and link a Jira project to your app in Butterneck.
- Add the label \`butterneck\` to a ticket and assign it to someone whose computer has the project.
- Butterneck opens a private copy of the project named after the ticket. The title, description, comments, and attached files become the request.
- The coding agent CLI that developer already uses (Cursor \`agent\`, Claude Code \`claude\`, or Antigravity \`agy\`) edits that copy on their computer. The app runs there and gets a share link.
- When the AI is done, a short note and the preview link are posted back to the ticket. Anyone allowed can open the live copy and keep refining in chat. Updating the ticket later does not open a second copy.

Then a developer reads the conversation, checks the change, and publishes it the way the team already does. Butterneck never opens a pull request, never merges, and never deploys. The full walkthrough is in [from Jira ticket to reviewable change with AI](/blog/jira-ticket-to-pr-with-ai).

## The main differences

### What the person who asked gets back

With Jira Coding Agent, the result is a draft PR. That is useful to an engineer. For a PM who wrote the ticket, a diff does not show whether the new empty state reads well.

With Butterneck, the result is a running preview of the app on a link. The PM opens it, sees the change on the screen they meant, and types "make it shorter" if it is not right. The developer sees the finished conversation, not the first guess.

### What the developer gets

Jira Coding Agent hands the developer a branch and a draft PR to review and merge.

Butterneck hands the developer edited files in a private copy of the project, plus the conversation that led there. They commit, open the PR themselves, or throw it away. Some teams want the PR made for them. Others want the AI kept out of the repo and release pipeline entirely. That is the clearest fork.

### Where the agent runs and what it costs

Jira Coding Agent is Atlassian's agent, connected to your repository, and paid for with Rovo credits on a Standard or Premium plan.

Butterneck does not bring its own coding model. It drives the CLI your developer already pays for, on their own computer, in a folder they choose. To be exact about data: that CLI sends prompts and code context to its own AI provider, as it does when you use it directly, and chat and preview traffic pass through Butterneck's server so the share link works. More in [how the agent runs in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

Butterneck's guardrails keep the agent inside the assigned folder, block \`.env\` files, honor ignore rules, and let you stop a turn and roll back its file changes.

### Who sets it up

Jira Coding Agent flows are created by a Jira space admin, with a prompt written into the automation. After that, any Jira user can trigger them.

Butterneck's Jira link is set up once in Butterneck. Each ticket is the prompt: whatever the PM wrote, plus comments and attachments.

### Beyond Jira

Butterneck also works without a ticket. Share the live copy's link, and a PM, designer, or support lead types the change in a chat next to the screen. Viewers do not need an account, and you choose who can send requests.

## When Jira Coding Agent is likely the better fit

- You are already on Jira Standard or Premium with Rovo credits, and want to stay inside Atlassian.
- You want a draft PR created automatically for each matching ticket.
- The work is repetitive code tasks a developer will review as a diff, such as dependency bumps or small refactors, more than visual product changes.
- You do not need the person who wrote the ticket to see or refine the result before review.

## When Butterneck is likely the better fit

- Most requests are small product changes, and the slow part is explaining which page and which button.
- You want the person asking to see the change on the running app and refine it in chat.
- You want the AI to edit files and stop there. No PRs, no merges, no deploys.
- Your developers already pay for Cursor, Claude Code, or Antigravity and you want the team to use that setup.
- Some requests come from Jira and some from people who never open Jira.

## FAQ

### Can both be triggered by a Jira label?

Yes. Jira Coding Agent can run from a Jira automation with a label condition. Butterneck starts when a ticket gets the \`butterneck\` label and is assigned to someone whose computer has the project.

### Does either one merge code?

No. Atlassian says Jira Coding Agent opens a draft PR and leaves review and merge to your team. Butterneck does not open a PR at all. A developer decides what goes live.

### Do I need Rovo credits for Butterneck?

No. Butterneck uses your developer's own coding agent CLI. Butterneck has a free Starter plan for one developer and one requester, and Pro is USD 19 per person per month. See [pricing](/#pricing). You also pay for your own coding agent subscription.

### Can I use both?

Probably. Nothing stops a team from using Jira Coding Agent for repetitive code tasks and Butterneck for product changes a PM needs to see. Use different labels so each ticket goes to one tool.

## Try it

If your Jira board is full of small changes that wait on a handoff, [book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and we will label a real ticket together. Or start on the free plan from [pricing](/#pricing). More on the Jira flow at [Butterneck for Jira](/integrations/jira).
`,
};
