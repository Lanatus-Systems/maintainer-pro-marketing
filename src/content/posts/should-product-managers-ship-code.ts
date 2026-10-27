import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "should-product-managers-ship-code",
  title: "Should product managers ship code? A better middle ground",
  description:
    "PMs shipping code with AI is the debate of the month. A calmer option: PMs ask for small changes on a live preview, and engineers keep control of what ships.",
  date: "2026-10-27",
  author: "The Butterneck team",
  tags: ["product managers", "should product managers write code", "PMs shipping code", "AI code review bottleneck"],
  cover: {
    src: "/blog/cover-should-product-managers-ship-code.png",
    alt: "Butterneck blog cover: Should product managers ship code? PMs ask on a live preview. Engineers decide what ships",
    width: 1200,
    height: 630,
  },
  body: `
AI coding tools have made a new question very real: should product managers ship code? Some teams are already trying it. Others are watching nervously. And engineers are asking who will review all of it.

This post looks at what the current debate is actually about, what recent data says about the review side, and a middle ground that gets PMs their small changes without handing them commit access.

## The debate, in plain terms

Guy Mor at H&B [described on LinkedIn](https://www.linkedin.com/posts/guy-mor-lin_were-starting-to-let-product-managers-ship-activity-7516032300925575169-vtdV) how his team is starting to let PMs use tools like Codex to make small changes to production systems. Their flow is careful: the PM identifies a simple change, uses AI to create a technical plan, an engineer reviews the plan, the PM uses AI to implement it, an engineer reviews the merge request, and then it goes to production.

He is honest that it is not simple. Two questions stood out:

- What exactly is a "simple change"? A PM may see a small UI tweak. An engineer may know it touches three other things.
- Are engineers being freed up, or turned into "people who review an endless stream of AI-generated merge requests"?

Jeff Gothelf comes at it from the other side in [How to manage the inevitable mess of running a company where everyone is a builder](https://jeffgothelf.com/blog/how-to-manage-the-inevitable-mess-of-running-a-company-where-everyone-is-a-builder/). His first suggestion: "Keep the right to build separate from the right to ship." Anyone can build and show a prototype. Getting it in front of customers follows a path with evidence at each step.

Both pieces land in a similar place. Building is getting cheap. Deciding what ships is still the hard, valuable part.

## What the data says about review

The engineers' worry has numbers behind it now. A [Harvard study by Fiona Chen and James Stratton](https://fion.ac/jellyfish.pdf) ("Artificial Intelligence in the Firm: Bottlenecks in Software Production", version of 4 Aug 2026) looked at 718 firms using data from the Jellyfish platform; [InfoQ covered it](https://www.infoq.com/news/2026/10/jellyfish-ai-productivity/) on 22 Oct. According to the paper:

- AI agents increased lines of code by 30%, commits by 20% and pull requests by 23%.
- Jira issues resolved per worker showed no statistically significant change with agents; the paper's estimates rule out an increase larger than 12%.
- Average PR time to review went up 49%, review comments per PR rose 35%, and the share of PRs with changes requested nearly doubled.

The authors' explanation is that writing code is only part of the job. Engineers spend 30–40% of their time writing code; the rest is planning, review, testing and deployment. Speed up the writing and the other steps become the bottleneck.

So if PMs start producing merge requests on top of what AI agents already produce, the review queue is where it will hurt. That is the AI code review bottleneck in one sentence.

## Why "PMs opening PRs" is the wrong unit

When a PM asks for a small product change, they rarely care about the code. They care that the button says the right thing, the empty state is useful, or the form stops asking for a field nobody needs.

Turning that into a PM-authored pull request adds work in the wrong places:

- The PM needs a dev setup, git, and enough context to not break things they cannot see.
- The engineer still has to review the code, and now also has to check whether it matches what the PM meant.
- The "is this what you meant?" loop happens inside code review, which is the slowest and most expensive place for it.

Gergely Orosz makes a related point in [What is happening with code reviews?](https://newsletter.pragmaticengineer.com/p/what-is-happening-with-code-reviews): automated tests are great at verifying business logic, but "they don't do a good job at verifying whether a UI looks and feels good." The small changes PMs ask for are mostly in that look-and-feel category. The best person to check them is the person who asked, looking at the running app.

## The middle ground: ask on a live preview, ship through engineering

Here is the split we think works for small, visible changes:

1. **The PM asks, in plain words, on a live copy of the app.** Not a mockup. The real app, running from the real code.
2. **A coding agent makes the edit.** The PM sees the result on the same screen and keeps going ("a bit shorter", "the other button") until it is right.
3. **An engineer decides what ships.** They read the conversation, check the diff in their own tools, and publish it the usual way. Or they discard it.

This separates asking from shipping, which is Gothelf's build-versus-ship idea applied to everyday product tweaks. The PM never needs commit access, an IDE, or a merge request. Engineering keeps every release decision.

It also changes what lands on the engineer's desk. Instead of a ticket plus three screenshots, or a PM's pull request of unknown intent, they get a change the requester has already seen working, with the full conversation attached. We cannot promise that makes review faster, and we have no data on it. But the intent question has been answered before the review starts.

## Where to draw the line

The H&B question, "where do you draw the line?", deserves a direct answer. A reasonable starting line:

- **Good for PM requests:** copy, labels, layout, spacing, empty states, small UI fixes.
- **Needs an engineer from the start:** pricing logic, permissions, data models, anything touching auth or payments. A preview can look right and still be wrong.
- **Not a chat request at all:** big features. Those need design and scoping first.

Agree the list with your engineering lead before anyone starts. It is much easier than arguing about each request later. If you want a starting point, here is [a policy template for what non-engineers can ask AI to change](/blog/ai-change-request-policy-template) that you can paste into your wiki.

## How Butterneck does this

Butterneck is one way to set up the middle ground. A developer connects a project folder on their own computer. The app gets a share link to a private live copy. A PM or other stakeholder opens the link and types the change in a chat beside the app. Or they label a Jira ticket \`butterneck\` and assign it, and a preview link is posted back on the ticket.

The developer's own coding agent (Cursor, Claude Code or Antigravity) edits the project locally on their machine. The developer reviews and publishes the usual way. Butterneck never merges, never opens a pull request and never deploys.

A few honest details. \`.env\` files are on an ignore list the agent is told to stay out of. That is a guardrail, an instruction to the agent, not a hard block, so keep production secrets off that computer. Chat messages and preview traffic go through Butterneck's server, and the coding CLI sends code context to its provider as it does in normal use. More in [how Butterneck runs an AI coding agent in a sandbox on your machine](/blog/run-ai-coding-agent-sandbox-on-your-machine).

### When it is not a fit

- You want AI to open pull requests or merge on its own. Butterneck deliberately does neither.
- There is no developer with a local project folder to connect.
- You are looking for a cloud IDE or a replacement for engineers.

## FAQ

### Should product managers write code?

Some technical PMs do, and it can work. But most PMs do not need to write code to get small changes made. What they need is to describe the change where they see it, see the result on the real app, and hand it to an engineer who decides whether it ships.

### Is it safe to let PMs ship code to production?

Teams trying it, like H&B, keep engineers reviewing both the plan and the merge request. If you want PMs involved without that overhead, let them ask on a live preview and keep the release with engineering.

### Does AI make code review the bottleneck?

The [Harvard study](https://fion.ac/jellyfish.pdf) suggests it can: pull requests went up 23% with AI agents, while average PR time to review rose 49%. Adding PM-authored PRs to that queue makes it bigger.

### Does Butterneck open pull requests for PMs?

No. Butterneck never opens a pull request, never merges and never deploys. The developer reviews the change and publishes it the usual way.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a small change your PMs have been waiting on. Or check [pricing](/#pricing): Starter is free for one developer and one requester, and Pro is $19 per person per month. Learn more at [butterneck.com](/).

Correction (27 Oct 2026): an earlier version misstated two figures from the study (Jira issues resolved and comments per PR); they now match the [paper](https://fion.ac/jellyfish.pdf).
`,
};
