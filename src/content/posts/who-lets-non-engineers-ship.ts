import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "who-lets-non-engineers-ship",
  title: "Who lets non-engineers ship? What Atlassian, Nash, Fieldguide and Carcará changed",
  seoTitle: "Who lets non-engineers ship? Four company examples",
  description:
    "How Atlassian, Nash, Fieldguide and Carcará let non-engineers ship with engineers involved, from their own posts, and how a live preview keeps that split.",
  date: "2026-11-18",
  updated: "2026-11-21",
  author: "The Butterneck team",
  tags: ["product teams", "AI change requests", "live preview", "code review", "human in the loop", "case studies"],
  cover: {
    src: "/blog/cover-who-lets-non-engineers-ship.png",
    alt: "Butterneck blog cover: Who lets non-engineers ship? The person who asked checks the result, then a developer decides what ships",
    width: 1200,
    height: 630,
  },
  body: `
A product manager or designer has a small change. The wording is wrong, the spacing is off, or a button is on the wrong screen. They can describe it clearly. They still wait for an engineer to write it, review it and ship it.

Four companies have now described, in their own words, how they let people outside engineering take that kind of change further, while engineers stay involved in review and in the standards a change must meet. This post is a reading of those posts, not a comparison of products. Atlassian, Nash, Fieldguide and Carcará are companies writing about their own practice. Nash's and Fieldguide's agents are in-house tools.

We make Butterneck, which keeps that same split but puts the check on a live preview before any pull request exists, so we describe its flow later. The idea works with any setup that lets the person who asked see the running change, and keeps a developer at the last step.

> **In short:** The person who asks is the one who can tell you whether the change is right. In these four write-ups, people outside engineering take a change further, and engineers still scope, review or keep the standard. Some of their tools and processes open pull requests; Butterneck never commits, pushes or opens a pull request. In Butterneck, the person who asked checks the change on a live preview of its own copy of the app, the coding agent runs on a developer's connected computer, and a developer decides what ships.

## The split is older than any one tool

The useful split is not "can a non-engineer write code?" It is "who checks that the change is what was meant, and who decides that it is safe to ship?"

A pull request is good at the second question. It is a poor way to ask the first, because the person who can answer it is often not the person reading the diff. The four posts below all keep engineers involved, in review or in the standards a change must meet. They differ in when the person who asked gets to see the running result, and in whose tool opens the pull request.

For a longer note on that first question, see [let product managers change the app without engineering](/blog/let-product-managers-change-the-app-without-engineering) and [should product managers ship code?](/blog/should-product-managers-ship-code).

## Atlassian: PMs and designers, engineers still reviewing

In November 2026 Atlassian wrote about an internal initiative. "PMs and designers who had never written production code used AI to take small customer-facing improvements all the way to production. Engineers helped scope the changes, reviewed the code, and upheld technical standards." In three months, "more than 50 PMs and designers shipped over 100 engineering-approved production changes" ([Atlassian, 10 November 2026](https://www.atlassian.com/blog/how-we-build/3-lessons-from-rebuilding-atlassians-product-development-lifecycle-for-people-and-agents)).

Atlassian's [AI PDLC Playbook](https://www.atlassian.com/blog/guides-research/ai-product-development-lifecycle-playbook) (November 2026) gives the breakdown: "42 bug fixes, ~31 interface improvements, and 20+ logic and feature changes", from a challenge to "take a small, low-risk customer-facing change from idea to production". It adds: "Every change underwent engineering review and the standard deployment process."

The people outside engineering used AI to make the change themselves. The number Atlassian chose to report is not how many drafts an agent produced. It is how many changes engineers approved for production. That is the split: people who know what the change should look like can take it a long way, and engineering still owns the standard.

Atlassian's write-up is about their own practice, not a product we are comparing ourselves with.

## Nash: an in-house agent opens the pull request

Nash, a deliveries company, built an in-house agent that support, customer-success and operations staff can send work to in plain English. The agent opens pull requests. "A human reviews it and merges it." Over 700 of its agent's pull requests have merged, and 97% of what it merges carries a human co-author who signed off on it ([Nash, June 2026](https://www.nash.ai/blog/everyone-ships)).

Once "anyone can ship", Nash found that "the bottleneck moves to review, particularly plan review". The agent "does its best work when the person asking knows what “done” looks like".

Two things to keep straight. It is Nash's in-house agent that opens those pull requests, not Butterneck. And the review is still a human step: someone signs off before the change is treated as done.

## Fieldguide: designers check a preview, then an engineer reviews

Fieldguide's designers describe a small visual fix on a ticket. An internal tool opens a pull request "with a preview link and visual verification". The designer checks the change on that preview, and then they "tag in an engineer for a final code review". The time to see these fixes live went "from 3-5 days to within 24 hours on average" ([Fieldguide, October 2026](https://www.fieldguide.com/blog/designers-prs)).

The designer is the person who can tell whether the spacing, type or color is right. The internal tool is what opens the pull request. An engineer still does the code review. In Butterneck the preview comes before any pull request; see [live preview before the pull request](/blog/live-preview-before-pull-request).

## Carcará: PMs and designers opening pull requests, engineers still keep the standard

Carcará wrote in August 2026 about a mobile-app rewrite. "Alongside our six engineers, two product managers and two designers were opening pull requests and merging real features on their own." None of them had to become engineers to do it. The tooling they built around the AI "took on enough of the coding that their part was deciding what to build and confirming the result was right" ([Carcará, 27 August 2026](https://carcara.dev/blog/pms-designers-shipping-mobile/)).

In their pipeline a design feeds the AI, and the generated feature goes through "a test build, a quality gate, and an automated AI review" before the change merges. "Engineers did not go away." Engineers still got pulled in for vocabulary and polish, and they "stay the gatekeepers of quality", owning the structure and the tooling that made the rest possible.

Again, it is Carcará's process that opens and merges pull requests. The check that mattered for the people asking was whether the result was right. The engineers kept the standard.

## What the four write-ups share

Read together, the four posts agree on a short list:

- The people who can describe a small change can take it further than a ticket.
- Engineers still scope, review or keep the standard. "Engineering-approved" is the number Atlassian reported. Nash has a human review and merge. Fieldguide tags in an engineer for a final code review. Carcará keeps engineers as the gatekeepers of quality.
- The team's own tools or processes are what open the pull request, where a pull request is part of the flow.

They do not agree on timing. Fieldguide's preview sits on a pull request that an internal tool already opened. Nash's review is a review of a pull request the in-house agent already opened. Atlassian's PMs and designers took small changes all the way to production, with engineers reviewing the code. The common thread is still the split, not the tooling.

## How it works in Butterneck

Butterneck is built for that split, with the check moved earlier.

The person who asked — a PM, designer, support lead or QA teammate — opens a live preview, goes to the screen they mean, and types the change in the chat. Each message carries the page address, route and page title they have open, and they can paste or attach a screenshot. The coding agent on a developer's connected computer edits the project. The change shows up on the same preview, which is its own copy of the app, and the person who asked confirms it there.

A developer then reads the conversation and the diff, and decides whether it ships. They publish it the usual way, or they discard it. Butterneck never commits, pushes or opens a pull request, and never merges or deploys.

For a request that is still vague, [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai) has a five-line template. For the same check on a bug, see [let the person who reported a bug check the fix](/blog/reporter-checks-the-fix).

## What stays with engineering

This is for small, visible changes: copy, layout, spacing, empty states, a wrong color, a button on the wrong screen. Auth, payments, data models, permissions and anything security-related still need an engineer from the start. Shared components and styles that other screens use still need a developer to read the diff. For which frontend changes to start with, and what the developer checks before opening the pull request, see [how non-engineers can ship frontend changes as pull requests](/blog/how-non-engineers-can-ship-frontend-changes-as-pull-requests).

A sign-off from the person who asked means "this is what I meant." It does not mean "ship it." The developer still decides.

Our [AI change request policy template](/blog/ai-change-request-policy-template) is a starting point for writing that down. [Vibe coding for teams](/blog/vibe-coding-for-teams) is the same split written as three roles: the person asking, the person checking, and the person shipping.

## FAQ

### Do Atlassian, Nash, Fieldguide or Carcará open pull requests?

In the write-ups we cite, yes, in some of those flows. Nash's in-house agent opens pull requests, and a human reviews and merges them. Fieldguide's internal tool opens a pull request with a preview link. Carcará's PMs and designers were opening pull requests and merging features, with engineers still the gatekeepers of quality. Atlassian's post describes PMs and designers taking small, engineering-approved changes to production, with engineers reviewing the code. Those are their tools and processes, not Butterneck's.

### Does Butterneck open a pull request for the person who asked?

No. Butterneck never commits, pushes or opens a pull request, and never merges or deploys. The person who asked checks the change on a live preview. A developer reviews the code and publishes it the usual way, or discards it.

### Who should check the result?

The person who asked for the change, or who reported the problem, on a running screen. They are the one who already knows what "done" looks like. A developer still reads the diff and decides whether it ships.

### What kinds of change is this for?

Small, visible ones: copy, layout, spacing, color, empty states, a control on the wrong screen. Data, payments, permissions, and anything that is not on a screen you can open in the preview stay with a developer from the start.

### Is this a comparison of Butterneck with those companies' products?

No. This is a reading of four companies' own posts about how they let non-engineers take a change further while engineers stay involved. Nash's and Fieldguide's agents are in-house tools. We are not comparing Butterneck to a product those companies sell.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring one small change from your backlog. We will run it on a live preview. Or see [pricing](/pricing) and try an example change on the [sample shop](https://app.butterneck.com/trial) before connecting a computer.
`,
};
