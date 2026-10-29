import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "human-in-the-loop-ai-coding",
  title: "Human-in-the-loop AI coding: why Butterneck never merges",
  description:
    "Human-in-the-loop AI coding with a gate for the person who asked: they check the change on a live preview, and a developer decides. No auto PR or merge.",
  date: "2026-10-27",
  updated: "2026-10-28",
  author: "The Butterneck team",
  tags: ["human in the loop", "AI coding agents", "code review", "AI safety", "developer workflow"],
  cover: {
    src: "/blog/cover-human-in-the-loop-ai-coding.png",
    alt: "Butterneck blog cover: Human-in-the-loop AI coding — the AI makes the change, a developer decides what goes live",
    width: 1200,
    height: 630,
  },
  body: `
Coding assistants can now edit a real project. Give Cursor, Claude Code, or Antigravity a clear request and a folder, and it will usually find the right file and make the change.

So the obvious next step is to let it go all the way: take the request, change the code, open the pull request, merge it, ship it. Some tools do that.

Butterneck doesn't. It lets the product team hand requests to the AI directly, and then it stops. It never merges. It never opens a pull request. It never deploys. A developer looks at the result and decides whether it goes live.

This post explains why.

> **Why Butterneck never merges, in short:** Butterneck lets a product manager or another stakeholder ask an AI coding agent for a change, and the agent edits the project on the developer's computer with the CLI they already use (Cursor, Claude Code or Antigravity), but Butterneck never opens a pull request, merges or deploys. The person who asked checks the result on a live preview, and a developer, who checks the code the requester can't review, decides first what ships through the team's existing release process.

> **Human-in-the-loop for coding agents** means an AI coding agent can propose and make changes, but a person approves the steps that matter before anything reaches users. The agent does the work; a human holds the decision points: the plan, risky actions, the result, and the release.

## The four approval points

A coding agent's work has four places where a person can step in:

- **Plan.** Someone approves what the agent intends to do before it starts.
- **Action.** Someone approves individual steps while it works, like running a command or touching a file.
- **Preview.** Someone checks the result on a running copy of the app.
- **Ship.** Someone decides whether the change goes live.

Butterneck puts the human at two of them. The person who asked (the requester) checks the change at the **preview**, on a live copy of the app. A developer decides at **ship**, and publishes it the usual way or leaves it. Butterneck itself never merges, opens a pull request, or deploys.

Most human-in-the-loop setups for coding agents put every gate in the developer's workflow: approving the plan, the commands, the diff, the merge. Those gates matter, but the person who asked for the change usually can't use them. Butterneck adds a gate they can use: they look at the result on a live copy of the app and say whether it's what they meant, before a developer spends time on the code.

## What "human in the loop" means here

"Human in the loop" gets used for a lot of things. In Butterneck it means one specific thing:

> The AI can change files in the project you connected. Only a person on your team can make that change live.

Everything else follows from that line.

- A product manager or another stakeholder types a request on a live copy of the app, or a Jira ticket labeled \`butterneck\` and assigned to someone whose computer has the project starts the chat.
- A coding assistant running on a developer's own computer edits the connected project folder.
- The developer reads the conversation, looks at the running app, and publishes the change the way the team already does. Or leaves it.

## Where the time actually goes

The case for full automation assumes the slow part is writing the code. For most small product changes, it isn't.

Take a request like "make the button say Book a call". The edit is one line. The week goes on the messages around it:

- Which page is the button on?
- Is it this button or the one in the footer?
- A screenshot comes back. Someone finds the file. Someone sends a link to check.

Or a Jira ticket with a description, twelve comments, a spreadsheet, and three screenshots. A developer reads all of it to work out which comment is the real request before anyone opens the project.

Butterneck goes after that part. The request is made on the live app, next to the thing it is about, or it comes straight from the ticket, files included. The AI does the reading and the edit. That is the time saved.

The last step, deciding whether the change ships, takes a minute. Automating it saves very little and removes the one check that matters.

## Why we don't merge

### 1. The person asking is often not a developer

Butterneck is built so that a product manager, a support lead, or another stakeholder can ask for a change. That is the point. But it also means the request comes from someone who can't review a diff.

If the tool merged on its own, a non-developer's sentence would become production code with no developer ever looking at it. Nobody on a product team actually wants that, even when the AI gets it right most of the time.

### 2. "Looks right" and "is right" are different checks

The product manager checks that the button now says the right thing. The developer checks the things nobody asked about: did the change touch a shared component, did it break the mobile layout, is the copy now out of sync with the email template.

Both checks are needed. Butterneck puts the first one on [a live preview before the pull request](/blog/live-preview-before-pull-request), where the person asking can see it, and leaves the second one with the developer.

### 3. Your release process already exists

Most teams already have a way to ship: a branch policy, CI, a review rule, a deploy step. A tool that merges for you has to either copy that process or go around it.

Butterneck does neither. The change sits in the project on the developer's computer. They commit, push, open a pull request, or run their deploy, the same way as any other change. Nothing about your pipeline changes.

### 4. Mistakes stay cheap

When the AI gets it wrong, and sometimes it will, the wrong change is not published; the files were edited on the connected computer. It doesn't land on a shared branch, it doesn't trigger a deploy, and nobody has to revert anything in public. You can stop a turn while it is running and roll back the file changes from that turn. If the rollback can't be completed, for example because a changed file was too large to snapshot, the chat says so.

![A product manager's request in the Butterneck chat, and the running app updating after the AI edits the project](/blog/product-chat-updates-app.gif "1280x720")

## The guardrails around the AI

Leaving the merge to a person is the main safeguard. There are a few more, all on the developer's side:

- **The AI is kept to the folder you connected.** Its working directory is the project you pointed the bridge at, and its instructions forbid touching anything outside it. Like the \`.env\` rule, that's a guardrail, not an operating-system sandbox.
- **You can add an ignore list.** Folders or files inside the project that you list go into the AI's instructions as off limits. Like the folder rule, that's an instruction, not a hard block.
- **\`.env\` is on the ignore list.** The agent is told secret settings files are off limits. That is an instruction, not a hard block, so keep production secrets off the machine.
- **You choose who can ask.** A list of people, or anyone with the link. Someone who is not allowed can request access, and you decide.
- **Developer replies don't change files.** A developer can answer in the chat without triggering the AI.
- **Each private copy is separate.** A Jira ticket gets its own copy named after the ticket, and updating the ticket later does not open a second one.

## A human in the loop can still defer

Putting a person in the loop doesn't guarantee that person decides. In a study published on 27 October 2026, Anthropic asked 50 professional analysts to do a realistic statistical analysis with Claude Code. A coin flip secretly set which option the agent leaned towards on each choice, and across four analytical choices the analysts went with the agent's lean 86% of the time ([Anthropic](https://www.anthropic.com/research/agents-judgment-calls)). It's a study of data analysts, not code reviewers, but the lesson carries: a summary from the agent is an easy thing to agree with.

So in Butterneck the check isn't the agent's account of what it did. The person who asked looks at the change themselves on a live preview of the running app, and the developer reads the diff in their own editor before anything is committed or becomes a pull request. Both are checking the actual result, not the AI's description of it.

## "Isn't this just slower than auto-merge?"

For the one step at the end, yes, by a minute or two. For the whole request, no.

Compare the two flows for "make the button say Book a call":

**The usual way**

1. The product manager writes it in Slack.
2. The developer asks which page. A screenshot comes back.
3. The developer opens the project, finds the button, changes it, and sends a link to check.
4. The product manager replies. Maybe there is another round.

**With Butterneck**

1. The product manager types that sentence on the live copy of the app.
2. The AI finds the button and changes it. The preview updates.
3. The developer opens the page and decides whether it goes live.

The developer's time goes from "find, change, send, wait" to "look and decide". That is the trade we care about.

## Who this is for, and who it is not for

It fits teams where:

- A product manager or stakeholder asks for many small changes to a product that is already running.
- A developer is happy to review and publish, but tired of being the message carrier.
- The project lives on a computer the team controls.
- Product managers, designers or support leads want to ask for changes on the app itself, next to the screen they mean.

It is not a fit if:

- You want the AI to open pull requests or merge automatically.
- There is no local project folder, for example a team that works only in a cloud IDE.
- You are looking for a replacement for developers. Butterneck assumes there is one, and that they decide.

## What it runs on

Butterneck does not ship its own model. It uses the coding assistant the developer already has signed in on their computer: Cursor, Claude Code, or Antigravity. The computer needs Node.js 22 or newer. The developer installs a small connector, points it at the project, and starts the app. Everyone else opens the live copy.

If you want the details of the sharing side, read [Share your local app with stakeholders without deploying it](/blog/share-local-app-without-deploying).

Why ownership matters for AI-written changes, with LinearB's 2026 data on AI PR merge rates and pickup times: [AI pull requests need an owner](/blog/ai-prs-need-an-owner).

## FAQ

### What is human-in-the-loop AI coding?

An AI coding agent proposes and makes changes, and a person approves the steps that matter (the plan, risky actions, the result, the release) before anything reaches users.

### Where does Butterneck put the human?

At two points. The person who asked checks the change on a live preview of the running app. A developer decides whether it ships, and ships it the team's usual way.

### Does Butterneck open pull requests or merge?

No. It never opens a pull request, never merges and never deploys. The AI edits files in the connected project on a developer's computer; the developer decides whether to commit, open a PR, or throw the change away.

### Should an AI coding agent merge its own pull request?

For most product changes, no. Since 28 October 2026, GitHub's Agent Merge can watch a pull request, fix failing checks and merge conflicts, and, combined with auto-merge, let GitHub merge it as soon as all requirements are met. That works when a person has already decided the change is wanted and branch protection requires a human review. Butterneck puts that decision earlier: the person who asked checks the change on a live preview, and a developer decides whether it becomes a commit or a pull request at all. Butterneck itself never merges.

### Can a non-developer approve a change on their own?

They can confirm it looks right on the preview, but they can't ship it. Only a developer on your team can make the change live.

## Try it

Starter is free for one developer and one person who asks for changes. Pro is USD 19 per person per month, with 20% off annual billing. See [pricing](/pricing), or [the FAQ](/#faq) for who publishes and where file changes happen. A workspace owner on Starter can also try Pro free for one month.

Let them ask. You decide what goes live.
`,
};
