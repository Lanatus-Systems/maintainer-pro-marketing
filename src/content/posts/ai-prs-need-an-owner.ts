import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "ai-prs-need-an-owner",
  title: "AI pull requests need an owner: what LinearB's 2026 data says about the AI code review bottleneck",
  description:
    "LinearB's 2026 benchmarks (8.1M PRs) show AI PRs merging at 32.7% vs 84.4% for manual PRs, and agentic AI PRs waiting 5.3x longer for pickup. The report points to ownership. Here is what that means for teams.",
  date: "2026-10-27",
  author: "The Butterneck team",
  tags: [
    "AI code review bottleneck",
    "AI pull requests",
    "AI PR merge rate",
    "code review",
    "LinearB benchmarks",
  ],
  cover: {
    src: "/blog/cover-ai-prs-need-an-owner.png",
    alt: "Butterneck blog cover: AI PRs need an owner. 32.7% of AI PRs vs 84.4% of manual PRs merged within 30 days. Source: LinearB 2026 Software Engineering Benchmarks Report",
    width: 1200,
    height: 630,
  },
  body: `
AI coding agents can now open pull requests faster than teams can review them. Plenty of engineering leads have said this for a while. LinearB's 2026 Software Engineering Benchmarks Report now puts numbers on it, and the report's own explanation is not "the code is bad". It is that nobody owns the PR.

This post goes through what the report found, what it does and doesn't show, and one practical response: make sure every AI-written change has a human owner before it reaches review. We build Butterneck, so we say how it fits near the end. The idea applies whatever tools you use.

**Update, 28 October 2026:** On 26 October, Entire, the company led by former GitHub CEO Thomas Dohmke, [launched Trails](https://entire.com/news/entire-launches-an-independent-git-forge-for-agent-human-collaboration), a replacement for the pull request built around the same review bottleneck. Its answer runs the other way from ours: agents generate evals on every push, so line-by-line human review becomes optional, while repositories can still require human approvals and other checks through [Gates](https://docs.entire.com/guides/trails/gates). Butterneck moves the human decision earlier instead: the person who asked sees the change on a live preview, and a developer decides before any PR exists.

## What LinearB measured

The [2026 Software Engineering Benchmarks Report](https://linearb.io/library/engineering-benchmarks-and-research) covers 8,109,244 pull requests from 4,813 teams and 163,820 active contributors. Most of its benchmarks are aggregated at the 75th percentile (P75). This year it splits PRs into three types: Agentic AI PRs, AI-Assisted PRs, and Unassisted PRs.

Two findings stand out for anyone thinking about the AI code review bottleneck.

**AI PRs merge far less often.** The report's new Acceptance Rate benchmark is the share of PRs merged within 30 days of being created (or moved out of draft). Manual PRs merged at **84.4%**. AI PRs merged at **32.7%**.

**Agentic AI PRs wait much longer to be picked up.** At P75, Agentic AI PRs sat for 1,055 minutes (about **17.6 hours**) before a reviewer opened them. For Unassisted PRs it was 201 minutes (about **3.4 hours**). The report calls that a pickup time "5.3x longer". Once review starts, the gap mostly closes. The report says the review itself is "only somewhat slower".

So the problem isn't mainly that reviews of AI code drag on. It's that AI PRs sit unopened, and most of them never merge.

## "A natural human owner"

LinearB gives several reasons for the gap. AI PRs tend to be larger. Agentic flows are often pointed at low-priority backlog work. Reviewers are more hesitant. The reason that interested us most is ownership:

> "Some of this gap likely stems from unclear ownership: the AI PRs don't typically have a natural human owner whose goal is to get them approved and merged. Without this push, they tend to get ignored and left to rot."

On pickup time, the report also says "there is often no clear owner for the PR who will push to finalize the review and get the PR accepted."

That matches how review works in practice. A PR from a teammate comes with a person who answers questions, nudges the reviewer, fixes the nit and gets it over the line. A PR opened by a bot comes with nobody. Reviewers can tell, and it goes to the bottom of the pile.

## Correlation, not causation

LinearB is careful here, and so should we be. The report says plainly that correlation does not indicate causation, and its benchmarks page asks anyone citing the data to "Frame every AI finding as correlation rather than causation."

So the data does not prove that missing ownership causes low merge rates. Size, task priority and reviewer trust all play a part, and the report names each one. What the data does show is a large, consistent gap between AI and manual PRs, and LinearB's own reading that unclear ownership is likely part of it.

That's enough to act on, as long as nobody promises a number.

## What "giving AI PRs an owner" can look like

You don't need a new tool to start. Some options teams use:

- **Assign a human at creation.** Every agent-opened PR gets a named owner who is expected to drive it to merge or close it.
- **Keep AI changes small.** The report links AI PRs to larger diffs. Small, scoped requests are easier to own and easier to review.
- **Close what nobody wants.** An AI PR with no one pushing for it is a signal. Close it rather than let it rot.
- **Agree on what AI should be asked for.** We wrote a [policy template for AI change requests](/blog/ai-change-request-policy-template) that says who can ask, for what, and who decides what ships.

## How Butterneck handles ownership

Butterneck takes a different route: there is no bot PR to own.

A PM, designer or support lead asks for a change on a live preview of the app, or labels a Jira ticket \`butterneck\` and assigns it to a developer whose computer has the project. A coding agent the developer already uses (Cursor, Claude Code or Antigravity) runs on that developer's computer and edits the connected folder. A preview link comes back on the ticket, and the requester can keep refining the change in plain words. See [the Jira integration](/integrations/jira) for the full flow.

Butterneck never opens a pull request, never merges and never deploys. The developer who checked the preview commits the change as their own work and ships it through the team's normal process. So the change has an owner from the start: a named developer who has already looked at it.

To be clear about what we are and aren't claiming:

- We have no data showing that Butterneck changes merge rates or pickup times, and we're not claiming it does.
- The code is still AI-written. The developer still has to review it properly. Ownership doesn't replace review.
- What changes is who is on the hook. It's a person on your team, not a bot account.

The reasoning behind keeping a human at the end is in [why Butterneck never merges](/blog/human-in-the-loop-ai-coding). If PMs are the ones asking, [should product managers ship code?](/blog/should-product-managers-ship-code) covers the review-load side.

## Why a connected computer instead of a cloud sandbox

Many AI coding tools run each task in a cloud sandbox. Butterneck runs the agent on a developer's computer that is connected to your workspace. Both are reasonable choices. Here's the trade-off as we see it.

What you get:

- **No environment setup per ticket.** There's no base image, service list or secrets store to configure for each task. The project already runs on that computer.
- **The real dev setup.** The agent works with the same dependencies, local data and dev server the developer uses every day, and the preview is that running app.
- **The coding agent that's already signed in.** Butterneck doesn't ship its own model. It uses the developer's existing Cursor, Claude Code or Antigravity CLI and that tool's own provider terms.

What it costs:

- **The computer has to be on.** If the connected computer is off or asleep, requests wait and the preview link doesn't load. A cloud sandbox doesn't have that problem.
- **.env handling is a guardrail, not a hard block.** \`.env\` files and any paths you add are on an ignore list the agent is told to stay out of. That's an instruction to the agent, not an operating-system lock, so keep production secrets off that computer.
- **Code still goes to your AI provider.** The coding CLI sends code context to its provider, the same as when the developer uses it directly. Chat messages and preview traffic go through Butterneck's server so the share link works.

More detail in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

## FAQ

### Why do AI pull requests take longer to review?

In LinearB's 2026 data, most of the delay is before review starts. At P75, Agentic AI PRs waited about 17.6 hours to be picked up against about 3.4 hours for Unassisted PRs, while the review itself was only somewhat slower. The report links this to larger diffs, reviewer hesitation and unclear ownership, and it frames these findings as correlation, not causation.

### What is the AI PR merge rate in LinearB's benchmarks?

LinearB measures Acceptance Rate as the share of PRs merged within 30 days. In the 2026 report, manual PRs merged at 84.4% and AI PRs at 32.7%.

### Does Butterneck improve merge rates or pickup time?

We don't have data on that and don't claim it. What Butterneck changes is ownership. It never opens a PR. The developer who checked the preview commits the change as their own work, so the change has a human owner from the start.

### Does Butterneck open pull requests?

No. Butterneck never opens pull requests, never merges and never deploys. The AI edits files in the connected folder. The developer decides whether to commit, open a PR, or throw the change away.

### Why does Butterneck use a connected computer instead of a cloud sandbox?

So there's no environment to set up per ticket, and the agent uses the developer's real dev setup and already-signed-in coding CLI. The trade-off is that the computer has to be on, and \`.env\` handling is a guardrail, not a hard block.

## Try it

Starter is free for one developer and one requester. Pro is $19 per person per month. See [pricing](/#pricing), or [book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a small change that has been waiting on review.

Source: LinearB, [2026 Software Engineering Benchmarks Report](https://assets.linearb.io/image/upload/v1777392920/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf) (PDF) and [benchmarks page](https://linearb.io/library/engineering-benchmarks-and-research), read on 27 Oct 2026. Figures are as published by LinearB.
`,
};
