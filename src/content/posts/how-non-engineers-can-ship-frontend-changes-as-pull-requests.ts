import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "how-non-engineers-can-ship-frontend-changes-as-pull-requests",
  title: "How can non-engineers ship frontend changes as pull requests?",
  description: "Short answer: let non-engineers make and check the change on a live preview, then have a developer turn it into the pull request. Here is the workflow.",
  date: "2026-11-03",
  author: "The Butterneck team",
  tags: ["pull requests", "non-developers", "answer"],
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

## A workflow that works

1. A developer connects a computer where the app already runs.
2. The designer, PM or support lead opens a share link to the running app and types the change: "make this button say Start free", "move the price above the fold".
3. The team's own coding agent edits the project on that computer. The preview updates on the same link.
4. They check it and ask for tweaks until it's right.
5. The developer reviews the diff in their own tools, then commits and opens the pull request. From there it goes through normal review and deploy.

This is how [Butterneck](/) works. Butterneck itself does not commit, push or open the pull request; the developer does.

**See it before you set anything up:** you can [try a request on a sample shop](https://app.butterneck.com/trial) before connecting a computer. On your own project, the edit runs on your computer. Your team still decides what goes live.

## What makes this go smoothly

- Agree on which changes are in scope (copy, layout, styling, small fields). Our [pilot proposal](/blog/pm-change-request-pilot-proposal) helps.
- Read [why a live preview before the pull request](/blog/live-preview-before-pull-request) helps reviewers.
- For other tools that do open PRs for non-developers, see [AI tools that let non-developers change an existing web app](/blog/tools-for-non-developers-to-change-an-existing-app).

## FAQ

### Can a designer open the pull request themselves?

They can if your Git setup allows it, but with Butterneck the developer opens it after reviewing the change. Butterneck doesn't open PRs.

### Does the code have to be on GitHub?

No. Butterneck works on a project folder that runs on the developer's computer. Where the PR goes is up to your team.

### Is there a free plan?

Yes. Starter is free for one developer and one requester. Pro is USD 19 per person per month. See [pricing](/pricing).
`,
};
