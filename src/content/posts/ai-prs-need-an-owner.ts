import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "ai-prs-need-an-owner",
  title: "The AI PR review bottleneck: why AI pull requests need an owner (2026 data)",
  description:
    "The AI PR review bottleneck in numbers: LinearB (8.1M PRs), CircleCI, DX and a 196,212-PR CMU/Stanford study. Why AI PRs wait, and what an owner changes.",
  date: "2026-10-27",
  updated: "2026-10-29",
  author: "The Butterneck team",
  tags: [
    "AI code review bottleneck",
    "AI PR review bottleneck",
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

> **The AI PR review bottleneck, in short:** In LinearB's 2026 benchmarks, AI PRs merged within 30 days 32.7% of the time against 84.4% for manual PRs, and the report says AI PRs often lack "a natural human owner"; it frames its findings as correlation, not causation. Butterneck's answer is to leave no bot PR to own: it runs on the developer's computer with the coding agent they already use, the person who asked checks a live preview, no pull request is opened, and a developer decides first what ships.

## What is the AI PR review bottleneck?

AI coding agents now open pull requests faster than people can review them, so the slow step has moved from writing code to reviewing and merging it. In LinearB's 2026 benchmarks, AI PRs merged within 30 days 32.7% of the time, against 84.4% for manual PRs. In a Carnegie Mellon/Stanford study of 196,212 PRs at one company, per-reviewer load roughly doubled as AI PR volume grew.

Key numbers:

- **5.3×:** how much longer Agentic AI PRs waited to be picked up for review than Unassisted PRs, at P75 (LinearB, 2026).
- **105%:** how much longer organizations generating high volumes of AI code wait for a first review than those at the bottom (DX, Q3 2026).
- **89% to 68%:** the fall in the share of PRs with any human review at the company in the Carnegie Mellon/Stanford study.

Each is a correlation, not proof of cause. The sources and their caveats are below.

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

LinearB's own follow-up post puts the same benchmark this way: AI-generated pull requests are accepted at 32.7%, "compared with 84.4% for human-owned ones" ([LinearB, 13 Oct 2026](https://linearb.io/blog/move-prs-to-production)).

That matches how review works in practice. A PR from a teammate comes with a person who answers questions, nudges the reviewer, fixes the nit and gets it over the line. A PR opened by a bot comes with nobody. Reviewers can tell, and it goes to the bottom of the pile.

## Correlation, not causation

LinearB is careful here, and so should we be. The report says plainly that correlation does not indicate causation, and its benchmarks page asks anyone citing the data to "Frame every AI finding as correlation rather than causation."

So the data does not prove that missing ownership causes low merge rates. Size, task priority and reviewer trust all play a part, and the report names each one. What the data does show is a large, consistent gap between AI and manual PRs, and LinearB's own reading that unclear ownership is likely part of it.

That's enough to act on, as long as nobody promises a number.

## More data on the AI PR review bottleneck

LinearB isn't the only source pointing at review and merge rather than writing. Several independent data sets, measured in different ways, show a similar shape.

**CircleCI: more work on branches, less reaching main.** CircleCI's [2026 State of Software Delivery report](https://circleci.com/blog/five-takeaways-2026-software-delivery-report/) analysed more than 28 million CI/CD workflows (September 2025 data). For the median team, feature-branch throughput rose 15% year over year, while throughput on the main branch fell 7%. CircleCI's reading: "Writing code is no longer the constraint. Review, validation, integration, recovery." This is pipeline data, not PR authorship, so it doesn't separate AI-written changes from human ones.

**MSR 2026 study: AI-only review merges less often.** [A study presented at MSR 2026](https://arxiv.org/html/2604.03196) (Chowdhury, Banik, Ferdous and Shamim) looked at 3,109 pull requests from the AIDev dataset of agent-authored PRs on GitHub. Among PRs whose reviews only left comments, without an approval or a change request, those reviewed only by code review agents merged **45.20%** of the time (127 of 281). Those reviewed only by humans merged **68.37%** (804 of 1,176). The agent-only group was also closed unmerged more often: 34.88% against 21.60%.

**Carnegie Mellon/Stanford: review load doubled, and review got thinner.** Researchers at Carnegie Mellon and Stanford [followed 802 developers and 196,212 pull requests](https://arxiv.org/abs/2607.01904) at one mid-sized B2B company under a "2×" AI mandate, from January 2024 to April 2026. Per-capita PRs reached 2.09× the baseline. PR volume grew 3.1× while the pool of reviewers grew 1.5×, so per-reviewer load roughly doubled. The share of PRs with any human review fell from 89% to 68%, while automated AI review rose from about 19% to about 84%. After the mandate, AI-authored PRs took about 22% longer in total cycle time. The authors' summary: the company "absorbed the queue by routing work around substantive human review, not by reviewing faster." It is one AI-forward company, which the authors call "an upper envelope", and the per-PR comparisons are correlational.

**DX: first reviews wait longer where more code is AI-written.** DX's [State of AI Impact in Engineering Q3 report](https://getdx.com/report/state-of-ai-impact-in-engineering-q3-report/) (500+ companies, July to September 2026) found that organizations generating high volumes of AI code "wait 105% longer for a first review than those at the bottom." Median time to first review was 40 minutes where 20 to 40% of code was AI-written and 82 minutes where it was 80% or more. That compares companies with each other at one point in time, not the same teams over time.

**Faros: low vs high AI adoption.** Faros's [AI Engineering Report 2026](https://pages.faros.ai/hubfs/AI_Engineering_Report_2026_The_Acceleration_Whiplash_Faros.pdf) (PDF; 22,000 developers, 4,000 teams, two years of data) compares low and high AI adoption, not one year with the next. Moving from low to high adoption, median time to first PR review was 156.6% higher, median time in PR review 441.5% higher, and PRs merged without any review were up 31.3%.

All of them come with the same caveat as LinearB. The MSR study's authors note that correlation does not imply causation, and their data comes from open-source repositories. CircleCI's numbers describe pipelines, not who wrote the code. The Carnegie Mellon/Stanford study covers a single company. DX and Faros are vendor reports that compare teams by how much they use AI. Read together, they point the same way: the slow part is getting a change reviewed, trusted and merged, not writing it. None of them measured Butterneck.

**Update, 28 October 2026: Jellyfish.** Jellyfish's [AI Engineering Trends](https://jellyfish.co/ai-engineering-trends/) report (October 2026) shows agents writing a growing share of the code while people still sign off on nearly all of it. At the median company, 28% of merged PRs now involve an agent (58% at leading companies), but only 0.5% merge with AI-only review; lead adopters of that workflow merge 9% with no human review. Over the past year the median company's cost per merged PR fell from $1,202 to $820, and it ended the third quarter at 98% of its first-quarter headcount while spending 3.8x as much per engineer. So humans still own the merge. The useful question is whether that sign-off is a real decision. Butterneck moves it earlier: the person who asked checks the change on a live preview, and a developer decides before there's a PR at all. Jellyfish didn't measure Butterneck either.

**Update, 28 October 2026: GitHub Universe.** GitHub's Octoverse 2026 report says that by September 2026, "more than 40% of pull requests on GitHub started with an agent's first draft, up from 17% in March" ([GitHub](https://github.blog/news-insights/octoverse/octoverse-commits-pushes-reach-new-highs-in-2026-as-developers-build-with-agents/)). The same day, Copilot approvals became generally available: when an admin turns them on, Copilot can approve a pull request, and "that approval counts toward your repository's required approvals" ([GitHub changelog](https://github.blog/changelog/2026-10-28-copilot-code-review-merge-with-confidence-with-max-and-approvals)). More of the review can now be done by agents. What an agent can't confirm is whether the change is what the person who asked meant, and that check still needs an owner.

**Update, 29 October 2026: GitLab.** In GitLab's AI Accountability Report (an April 2026 survey of 1,528 DevSecOps professionals, summarised in its [AI-native engineering playbook post](https://about.gitlab.com/blog/redesign-how-your-team-ships-software-with-ai-agents/)), 85% agreed that AI has shifted the bottleneck from writing code to reviewing and validating it, and 78% agreed that existing code review processes were not designed for the scale of code AI tools enable. GitLab's advice starts with diagnosis: "Take one small, real change and trace it from request to production, marking every wait and every handoff." It's a survey of agreement, not measured review times, so read it alongside the data above.

## How teams reduce the AI PR review bottleneck

Faros puts the problem plainly: "the code arriving for review is often not review-ready." You don't need a new tool to start. Some options teams use:

- **Assign a human at creation.** Every agent-opened PR gets a named owner who is expected to drive it to merge or close it.
- **Keep AI changes small.** The report links AI PRs to larger diffs. Small, scoped requests are easier to own and easier to review.
- **Close what nobody wants.** An AI PR with no one pushing for it is a signal. Close it rather than let it rot.
- **Sort changes into review lanes.** Not every change needs the same depth of review. A small, low-risk change (copy, a label, a color) can take a light path, most changes get a standard developer review, and anything touching auth, billing, data or infrastructure gets a deep review. Our [policy template](/blog/ai-change-request-policy-template) has a review-tier table you can adapt.
- **Have the person who asked check the result before review.** If a PM or designer asked for the change, they look at it running and confirm it's what they meant before a developer spends time on the diff. A clear request makes that check easier: see [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai).
- **Agree on what AI should be asked for.** We wrote a [policy template for AI change requests](/blog/ai-change-request-policy-template) that says who can ask, for what, and who decides what ships.

## How Butterneck handles ownership

Butterneck takes a different route: there is no bot PR to own.

A PM, designer or support lead asks for a change on a live preview of the app, or labels a Jira ticket \`butterneck\` and assigns it to a developer whose Jira account is mapped to a computer that has the project. A coding agent the developer already uses (Cursor, Claude Code or Antigravity) runs on that developer's computer and edits the connected folder. A preview link comes back on the ticket, and the requester can keep refining the change in plain words. See [the Jira integration](/integrations/jira) for the full flow, and [AI change requests for product teams](/blog/ai-change-requests-for-product-teams) for how the requester and the developer split the checks.

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
- **The coding agent that's already signed in.** Butterneck doesn't ship its own model. It uses the Cursor, Claude Code or Antigravity CLI your team already pays for (team or API plans recommended), under that tool's own provider terms.

What it costs:

- **The computer has to be on.** If the connected computer is off or asleep, requests wait and the preview link doesn't load. A cloud sandbox doesn't have that problem.
- **.env handling is a guardrail, not a hard block.** \`.env\` files and any paths you add are on an ignore list the agent is told to stay out of. That's an instruction to the agent, not an operating-system lock, so keep production secrets off that computer.
- **Code still goes to your AI provider.** The coding CLI sends code context to its provider, the same as when the developer uses it directly. Chat messages and preview traffic go through Butterneck's server so the share link works.

More detail in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

## FAQ

### What is the AI PR review bottleneck?

AI coding agents now open pull requests faster than people can review them, so the slow step has moved from writing code to reviewing and merging it. In LinearB's 2026 benchmarks, AI PRs merged within 30 days 32.7% of the time, against 84.4% for manual PRs.

### How can teams reduce the AI PR review bottleneck?

Give every AI PR a named human owner, keep AI changes small, sort changes into review lanes by risk, and have the person who asked check the result before a developer reviews it. Our [policy template for AI change requests](/blog/ai-change-request-policy-template) includes a review-tier table you can adapt.

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

Starter is free for one developer and one requester. Pro is $19 per person per month. See [pricing](/pricing), or [book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a small change that has been waiting on review.

Source: LinearB, [2026 Software Engineering Benchmarks Report](https://assets.linearb.io/image/upload/v1777392920/resources/LinearB_2026_Software_Engineering_Benchmarks_Report.pdf) (PDF) and [benchmarks page](https://linearb.io/library/engineering-benchmarks-and-research), read on 27 Oct 2026, and [How to move more AI-generated pull requests to production](https://linearb.io/blog/move-prs-to-production) (13 Oct 2026). Figures are as published by LinearB. CircleCI, [5 key takeaways from the 2026 State of Software Delivery](https://circleci.com/blog/five-takeaways-2026-software-delivery-report/), Chowdhury et al., [From Industry Claims to Empirical Reality: An Empirical Study of Code Review Agents in Pull Requests](https://arxiv.org/html/2604.03196) (MSR 2026), He et al. (Carnegie Mellon / Stanford), [AI Writes Faster Than Humans Can Review: A Longitudinal Study of an Enterprise "2×" Mandate](https://arxiv.org/abs/2607.01904), DX, [State of AI Impact in Engineering: Q3 Report](https://getdx.com/report/state-of-ai-impact-in-engineering-q3-report/) (public summary page), and Faros, [AI Engineering Report 2026: The Acceleration Whiplash](https://pages.faros.ai/hubfs/AI_Engineering_Report_2026_The_Acceleration_Whiplash_Faros.pdf) (PDF), all read on 28 Oct 2026.
`,
};
