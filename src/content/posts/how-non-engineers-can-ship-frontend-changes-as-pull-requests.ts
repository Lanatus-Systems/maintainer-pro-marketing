import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "how-non-engineers-can-ship-frontend-changes-as-pull-requests",
  title: "How can non-engineers ship frontend changes as pull requests?",
  seoTitle: "How to let non-engineers ship frontend changes as pull requests",
  description: "Let designers and PMs change copy, layout and styling on a live preview. A developer reviews the diff and opens the PR, and branch rules keep main safe.",
  date: "2026-11-03",
  updated: "2026-11-17",
  author: "The Butterneck team",
  tags: ["pull requests", "non-developers", "answer", "designers"],
  cover: {
    src: "/blog/cover-live-preview-before-pull-request.png",
    alt: "Butterneck blog cover: How can non-engineers ship frontend changes as pull requests?",
    width: 1200,
    height: 630,
  },
  body: `
**Short answer:** have the non-engineer make and check the change on a live preview first, then let a developer turn the result into the pull request. The PR stays a code review step owned by someone who can read code. The non-engineer's job is to confirm the change looks and reads right before that PR exists.

## Why not let them open the PR directly?

Some tools do open a PR for a PM or designer. That can work. But a PR is a poor place to iterate on small visual tweaks, and someone still has to own the code it contains. See [AI PRs need an owner](/blog/ai-prs-need-an-owner).

Some design leaders go further and train designers to work in production code. David Siren Eisner, VP of Product Design at Datadog, makes that case in [an interview with Rosenfeld Media](https://rosenfeldmedia.com/from-designing-to-building-the-rise-of-product-design-engineering-with-david-siren-eisner/) about his book *Product Design Engineering*, due from Rosenfeld Media in November 2026. Even he says "the goal is not to turn every designer into an engineer." Intercom's design team made the same move in 2025: designers fix UI issues in their own local environment, and the fix ships "after an Engineer has approved a quick code review", as [Intercom's design leaders describe it](https://ideas.fin.ai/p/intercoms-3-point-framework-for-ai). For designers who don't want to own a branch, the workflow below keeps the pull request with a developer.

## A workflow that works

1. A developer connects a computer where the app already runs.
2. The designer, PM or support lead opens a share link to the running app and types the change: "make this button say Start free", "move the price above the fold".
3. The team's own coding agent edits the project on that computer. The preview updates on the same link.
4. They check it and ask for tweaks until it's right.
5. The developer reviews the diff in their own tools, then commits and opens the pull request. From there it goes through normal review and deploy.

This is how [Butterneck](/) works. Butterneck itself does not commit, push or open the pull request; the developer does.

**See it before you set anything up:** [create a free account and try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. On your own project, the edit runs on a developer's connected computer. Your team still decides what goes live.

## What the developer checks before opening the PR

The person who asked has already checked how the change looks. The developer's review is about the code:

- **Scope.** The files that changed match the request. The developer sees the conversation, and each request carries the page URL and route the person had open.
- **Nothing out of bounds.** No edits to sign-in, billing, data or build config unless your team agreed to it (see the list below).
- **Your usual checks.** Build, tests and lint run the way they always do before the commit.
- **A clean undo.** If a turn goes wrong while it's running, stopping it puts the files back to the baseline captured before that turn, in most cases. After that, your own git tools apply. See [how Butterneck runs the coding agent in a sandbox](/blog/run-ai-coding-agent-sandbox-on-your-machine).

Then the developer commits and opens the pull request, and your normal code review and branch rules apply.

## Which frontend changes to start with

Start with changes the person asking can judge by looking at the screen:

- Copy, labels, headings, button text and help text.
- Spacing, alignment and layout inside your existing design system.
- Small visual fixes: a wrong color, a broken link, a missing hover state.

Keep these with an engineer from the start, even when they look small: sign-in and permissions, billing and pricing logic, data and migrations, APIs other teams depend on, and build or deploy config. Our [policy template for AI change requests](/blog/ai-change-request-policy-template) has the full list, and the [pilot proposal](/blog/pm-change-request-pilot-proposal) shows how to agree on it with your engineering lead.

## What makes this go smoothly

- Read [why a live preview before the pull request](/blog/live-preview-before-pull-request) helps reviewers.
- For other tools that do open PRs for non-developers, see [AI tools that let non-developers change an existing web app](/blog/tools-for-non-developers-to-change-an-existing-app).

## FAQ

### Can designers make UI changes to the live app without an engineer?

Up to the last step, yes. A designer can ask for a copy, spacing, color or layout change on a live copy of the app and check it on the screen they mean, without waiting for an engineer. The production app only changes when a developer reviews the diff and ships it. Keep it to changes inside your existing design system; new features still start with design and scoping. The [AI change request policy template](/blog/ai-change-request-policy-template) lists what designers and PMs can ask for directly.

### Can designers prototype in the real codebase instead of Figma?

For changes to screens that already exist, yes. The designer opens the share link to the running app and asks for the change in plain words. The team's coding agent edits the real project on a developer's connected computer, and the preview updates on the same link, so what they hand over is a working version in the app's own code, not a mockup. Nothing reaches production until a developer reviews the diff and ships it, and a version nobody wants is simply discarded. New flows and features still start with design and scoping.

### Can a designer open the pull request themselves?

They can if your Git setup allows it, but with Butterneck the developer opens it after reviewing the change. Butterneck doesn't open PRs.

### How do we make sure a non-engineer's change can't reach main without review?

Use your Git host's rules. Protect the main branch so changes only land through a pull request with an approving review, and add a CODEOWNERS file so the right developer is asked to review the frontend files. GitHub documents both: [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners). Butterneck works inside those rules: it edits files on the developer's connected computer and stops. It does not commit, push or open a pull request, so the developer's own branch, review and checks stay the only path to production.

### Does the code have to be on GitHub?

No. Butterneck works on a project folder that runs on the developer's computer. Where the PR goes is up to your team.

### Is there a free plan?

Yes. Starter is free for one developer and one requester. Pro is USD 19 per person per month. See [pricing](/pricing).
`,
};
