import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "ai-change-requests-for-support-teams",
  title: "AI change requests for support teams: fix the labels behind repeat tickets",
  seoTitle: "AI change requests for support teams: fix repeat-ticket labels",
  description:
    "Support leads can fix a confusing label or error message on a live preview of the app. A developer reviews the change and decides what ships.",
  date: "2026-11-19",
  author: "The Butterneck team",
  tags: [
    "AI change requests",
    "support teams",
    "live preview",
    "error messages",
    "product wording",
    "human in the loop",
  ],
  cover: {
    src: "/blog/cover-ai-change-requests-for-support-teams.png",
    alt: "Butterneck blog cover: AI change requests for support teams. A support lead checks a label or error message on a live preview, then a developer decides what ships",
    width: 1200,
    height: 630,
  },
  body: `
Support teams see the same confusing label, missing hint or unclear error message over and over. Each ticket is small. Together they fill the queue, and each one still waits for someone to change the wording in the app.

Many of those tickets are product wording, not a new feature and not a data or permissions problem. This post is about who can ask for that kind of change, how to check it on a live preview, and what still stays with a developer. We make Butterneck, which is built this way, so we describe its flow below. The same split — the person who asked checks the preview, a developer decides what ships — works with any setup that can show the support lead a running copy of the app.

> **In short:** Support leads can ask for a small wording change — a confusing label, a missing hint, an unclear error message or an empty state — on a live preview of the existing app. In Butterneck they open a share link, type the request in the chat beside the preview, and can attach a customer's screenshot. The developer's own coding agent edits the project on a developer's connected computer, the preview updates, and the person who asked checks the result. A developer reviews the change and decides what ships. Butterneck never commits, pushes, opens a pull request, merges or deploys. A Jira ticket labeled \`butterneck\` can start the same flow. When the ticket is a bug report, let the person who reported it check the fix on the preview before a developer ships it.

## Which support tickets are really product wording

The tickets that fit are the ones you can see on a screen you can open in a preview: the button that says the wrong thing, the form field with no hint, the error message nobody understands, the empty state that doesn't say what to do next. They show up as repeat contacts because customers hit the same wording and ask the same question.

Those changes belong in the app, not only in a help article. A support lead who already knows the ticket can describe what the screen should say. What they cannot decide is whether the change is safe to ship. Shared components, tests, translations, and anything near sign-in, billing, refunds, permissions or customer data stay with a developer, as we already say in our [guide to AI change requests for product teams](/blog/ai-change-requests-for-product-teams).

If the cause isn't on the screen — data from another system, payments, permissions, something that only happens sometimes — leave it to a developer. That line is the same one in [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai#what-to-leave-to-a-developer) and in [let the reporter check the fix before it ships](/blog/reporter-checks-the-fix).

## How it works in Butterneck

A developer connects a computer that already has the project. The running app gets a share link. The support lead opens that link in a browser and types the change in the chat beside the live preview. A customer's screenshot can be attached. The coding agent the developer already uses (Cursor, Claude Code or Antigravity) edits the real project on a developer's connected computer, and the preview updates on the same link.

The support lead checks the wording on the running screen: the exact text, the spacing around it, and a phone-sized width, and that nothing else on the page moved. If it's off, they ask again on the same request. When it's right, they say so in writing where they asked. A developer then reads the diff and decides what ships. Butterneck never commits, pushes, opens a pull request, merges or deploys.

The same request can start from Jira. Add the label \`butterneck\` and assign the ticket to a teammate whose Jira account is mapped to a computer that has the project. The ticket becomes the request, and a preview link is posted back when the AI is done. If the assignee isn't mapped, nothing starts. Details are in [AI change requests in Jira](/blog/ai-change-requests-in-jira) and on the [Jira integration](/integrations/jira).

## Let the reporter check the fix

When the ticket is a bug report, the person who reported it is the one who already knows what "fixed" looks like. Let them check the fix on the preview before a developer ships it. If the reporter is a customer, not someone on the team, a support lead or teammate who can reproduce the bug does that check. The customer's later reply in your usual support thread can still matter, but the cheap check is the one done on the preview.

That is the subject of [let the reporter check the fix before it ships](/blog/reporter-checks-the-fix). The reporter's sign-off means "this is the fix I was asking for", not "ship it". A developer still decides what goes live.

## What stays with a developer

Keep anything that touches billing, refunds, permissions or customer data with a developer. The same is true of sign-in, shared components, tests and translations. The support lead's job is to confirm the wording on the preview is what they meant. The developer's job is to decide whether the change is safe to ship.

For why a developer still owns that last step, see [human-in-the-loop AI coding](/blog/human-in-the-loop-ai-coding) and [why AI pull requests need an owner](/blog/ai-prs-need-an-owner).

## How to write the request

Write what you see, what you expected and where, and attach a screenshot. The five-line template in [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai) works here: the "Now" line is the current wording or the bug, the "Want" line is what it should say, and the "Check" line is how you'll know it's right. If the first result is still off, say exactly what's still wrong on the same request instead of starting a new one.

## FAQ

### Does a support lead need an account to look at the preview, and who can send a request?

Viewers do not need an account. They open a share link in a browser, or a Jira label starts the request. The developer chooses who can send: a named list, or anyone with the link. Share links are unlisted, not a private vault. Anyone with the link can open that preview. Someone who is not allowed can request access, and you decide.

### Does Butterneck open a pull request?

No. Butterneck never commits, pushes, opens a pull request, merges or deploys. The person who asked checks the change on the live preview. A developer reviews the diff and publishes it the way the team already does, which can include a pull request, or they drop it.

### Is customer data in the preview?

The preview is the app running on a developer's connected computer. Keep production secrets and production data off that computer, and use development keys and seed data. Anything that touches customer data stays with a developer. Who can send a request, and what the share link exposes, are on the [Security](/security) page.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a repeat ticket about a label or error message. We will run it on a live copy. Or see [pricing](/pricing) and try an example change on the [sample shop](https://app.butterneck.com/trial) before connecting a computer. The wider process is in [AI change requests for product teams](/blog/ai-change-requests-for-product-teams).
`,
};
