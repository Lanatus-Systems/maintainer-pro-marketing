import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "how-to-write-a-change-request-for-ai",
  title: "How to write a change request for an AI coding agent: a template for PMs",
  seoTitle: "AI change request template: 5 lines for PMs",
  description:
    "A five-line AI change request template: how PMs and designers can prompt an AI coding agent to change an existing app, and what to leave to a developer.",
  date: "2026-10-28",
  updated: "2026-10-29",
  author: "The Butterneck team",
  tags: ["AI change request template", "change requests", "AI for product managers", "AI change requests", "product teams"],
  cover: {
    src: "/blog/cover-write-a-change-request-for-ai.png",
    alt: "Butterneck blog cover: How to write a change request for an AI coding agent. A change request in five lines: where, now, want, keep, check",
    width: 1200,
    height: 630,
  },
  body: `
> **In short:** a good change request for an AI coding agent fits in five lines. Where (the page and the element, by its visible text), Now (what it says today, quoted exactly), Want (the exact new text or behavior), Keep (what must not change) and Check (how you'll know it's right). Send one change per message, and leave login, billing, data and secrets to a developer. In Butterneck you type the request in a chat on a live preview, the Claude Code, Cursor or Antigravity CLI already signed in on a developer's computer makes the edit, and you check it on the same preview. No pull request is opened; a developer decides first what ships, and Butterneck never merges or deploys.

Most AI change requests that go wrong were not hard changes. The AI changed the wrong button, rewrote a sentence nobody asked it to touch, or made the page "cleaner" in a way nobody meant. The fix is usually in how the request was written, not in the model.

This guide is for product managers, designers, support leads and anyone else who asks for changes to a product they don't code. It gives you a five-line template, before-and-after examples, and a short list of what to leave to a developer. We make Butterneck, where people type these requests into a chat on a live preview of the app, so the last section covers what Butterneck adds to a request for you. The template works with any AI coding agent.

## Why AI change requests go wrong

A coding agent reads your message and the code. It does not see your roadmap, the meeting where this was agreed, or the screenshot in your head. Most misses come from one of four gaps:

- **Where.** "The button" could be any of twelve buttons. "The pricing page" could be the page, the section on the home page, or the email.
- **What it says now.** Without the current text, the agent has to guess which string you mean.
- **What "better" means.** "Make it clearer", "tidy this up" and "more modern" have no single right answer, so the agent picks one.
- **What must stay.** If you don't say the layout, the other pages or the mobile view must not change, a broad edit is a reasonable reading of your request.

None of this is new. A good ticket for a human developer has the same parts. An agent just acts on what you wrote faster, and with fewer questions.

## Why the Keep line matters

*Added 28 October 2026.* Coding agents are good at following detailed specs and weaker at what you leave unsaid. Cognition's [FrontierCode 2.0 benchmark](https://cognition.com/blog/frontier-code-2.0) (27 October 2026) says models "struggle to infer user intent, respect unstated constraints, and anticipate long-term consequences of their changes, forcing human intervention". Of its grading categories, "thoroughness" (conditions an agent should infer even when they aren't stated) had the highest failure rate. On the earlier FrontierCode 1.1, Cognition found "models tend to write more code and touch more files with increased effort, even when the changes may not be preferable." The benchmark uses open-source maintainers' coding tasks, not product change requests, but the lesson carries over: say what must stay. That is what the Keep and Check lines are for.

## The template: five lines

Copy this and fill it in. Most small requests fit in five short lines.

\`\`\`
Where: [page] → [the element, by its visible text]
Now: [what it says or does today, quoted exactly]
Want: [the exact new text or behavior]
Keep: [what must not change]
Check: [how you'll know it's right]
\`\`\`

A filled-in example:

\`\`\`
Where: Pricing page → the green button under the Pro plan
Now: "Start free trial"
Want: "Book a call"
Keep: Same color, size and link. Don't change the Starter button.
Check: The Pro button says "Book a call" on desktop and on mobile.
\`\`\`

The **Check** line is for you as much as for the agent. If you can't say how you'll check the change, the request is probably not ready yet.

## Before and after: eight examples

| Request | Vague | Clear |
|---|---|---|
| Copy change | Make the hero text punchier. | Home page, the line under the shop name at the top. Now: "Houseplants, pots, and advice from a corner shop on Elm Street." Want: "Houseplants and advice from a corner shop." Keep the font and size. |
| Button label | Fix the CTA. | Pricing page, the button under the Pro plan. Change "Start free trial" to "Book a call". Don't change the Starter button. |
| Color | Make it look more premium. | Change the green accent color to deep navy everywhere it is used. Keep the text colors as they are. |
| New item | Add the fig. | Add a fiddle-leaf fig for $54 in the indoor category, with the same layout as the other plants. Note: "Big leaves, likes bright light." |
| Empty state | The empty cart is confusing. | Cart page, when the cart is empty. Now it shows nothing below the heading. Add one line: "Your cart is empty." and a link "Browse plants" to the shop page. |
| Error message | Better error on signup. | Signup form, when the email is already registered. Now: "Error 409". Want: "That email already has an account. Sign in instead?" with "Sign in" linking to the sign-in page. |
| Mobile layout | The footer is broken on mobile. | Footer, on a phone-width screen. The address and the opening hours overlap. Stack them, address first. Don't change the desktop footer. |
| Scope | Update the hours. | Change the opening hours from "Tuesday to Sunday, 10 to 6" to "Tuesday to Sunday, 9 to 6". It appears in the footer and on the contact page; change both. |

The color and fig requests are based on sample prompts in Elm & Fern, the Butterneck demo shop. They work because each one names one thing and one result.

## Seven habits that help

1. **One change per message.** Two unrelated changes in one message make both harder to check and harder to undo. Send the second one after the first looks right.
2. **Quote the exact text.** Copy the current words from the screen. Code search finds an exact string; it doesn't find "the bit about delivery".
3. **Name elements by what you see.** "The green Book a call button under the Pro plan" beats "the second button".
4. **Say how far the change goes.** "Only on the pricing page" or "everywhere this appears". Both are fine. Leaving it out is not.
5. **Mention states.** Empty, loading, error, logged out, mobile. If the change only matters in one state, say which.
6. **Replace adjectives with examples.** Instead of "friendlier", write the sentence you want. Instead of "bigger", say "about the size of the heading above it".
7. **When it's wrong, say what is wrong.** "The new text is right, but it moved the button below the price. Put it back above the price." is a better follow-up than "no, try again".

## What to leave to a developer

Some requests should not start with a PM and an agent, however well they're written:

- Login, permissions and anything about who can see what.
- Billing, prices that are charged (not just displayed), and payment flows.
- Database changes, data migrations, and deleting data.
- Secrets, API keys and environment settings.
- Anything legal or compliance-related that needs sign-off first.

If your team wants this written down, start from our [AI change request policy template](/blog/ai-change-request-policy-template). For the wider process (who asks, who checks, who ships), see [AI change requests for product teams](/blog/ai-change-requests-for-product-teams). To try it with your team first, send your engineering lead a [4-week pilot proposal](/blog/pm-change-request-pilot-proposal).

## What Butterneck adds to your request

In Butterneck you type the request into a chat on a live preview of the running app. We checked the product code for what goes to the coding agent with each message, so you know what you can leave out and what you still have to write:

- **The page you have open.** Each message carries the preview's page address, the route and the page title. The agent is told to prefer changing that screen unless you clearly mean another. So "on this page" works. You still need to say which element.
- **Your attachments.** You can attach up to five files per message (images, PDF, Word or Excel, up to 8 MB each), or paste a screenshot straight into the chat box. Images go to the agent as files to inspect; for documents, the extracted text goes along with the file. A screenshot with the problem circled is often the fastest "Where" line.
- **Recent conversation.** The agent sees the most recent messages in the chat, not necessarily the whole history. If you're following up on something from much earlier, use "Reply to this message" on it, or restate the detail.
- **A Jira ticket, if that's where the request starts.** Add the label \`butterneck\` to a ticket and assign it to a teammate whose Jira account is mapped to a computer that has the project. The title, description, latest comments and attached files become the request, so the same template works in the ticket description. See the [Jira integration](/integrations/jira).

What Butterneck does not do: it doesn't know which element you mean unless you name it, and it doesn't know what you agreed in a meeting. Those parts are still yours to write.

If the request is unclear, the agent is told it may ask one short question instead of guessing. If a turn goes wrong, it can be stopped and that turn's file changes are usually rolled back; if the rollback can't be completed, the chat says so.

## After you send it

You check the change on the same preview link, using your **Check** line. Then a developer reads the conversation, reviews the change, and publishes it the way the team already does, or throws it away. Butterneck never opens a pull request, never merges and never deploys. A developer decides what goes live.

Checking the change yourself first means it reaches a developer with an owner who has already looked at it. Why that matters: the [AI PR review bottleneck](/blog/ai-prs-need-an-owner).

The coding agent runs on a developer's computer, using the Claude Code, Cursor or Antigravity CLI already signed in there (team, enterprise or API plans recommended). It sends code context to its AI provider, as it does in normal use, and chat messages and preview traffic go through Butterneck's server. More on that in [how PMs can change a live app without waiting on engineering](/blog/how-pms-can-change-a-live-app-without-waiting-on-engineering).

## FAQ

### How do I write a change request for an AI coding agent?

Say where the change is (page and element, by its visible text), what it says or does now, exactly what you want instead, what must not change, and how you'll check it. Keep it to one change per message.

### Should I attach a screenshot?

Yes, when the element is hard to name or the problem is visual. In Butterneck you can paste a screenshot straight into the chat. Still write the request in words; the screenshot shows where, and the text says what to change.

### Do I need to tell the AI which file to change?

No. The agent finds the code. Quote the exact text on the screen and say which page it's on; that is what it searches for.

### What if the AI changes the wrong thing?

Say exactly what is wrong in your next message. In Butterneck, a turn can also be stopped, and its file changes are usually rolled back. Nothing goes live until a developer publishes it.

### Can I use the same template in a Jira ticket?

Yes. With Butterneck's Jira integration, the ticket's title, description, latest comments and attached files become the request, so put the five lines in the description.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring a real request your team has been waiting on. We will run it on a live copy. Or see [pricing](/pricing) and start on the free plan; a workspace owner on Starter can also try Pro free for one month.
`,
};
