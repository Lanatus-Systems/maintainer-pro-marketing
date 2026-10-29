import { brand } from "@/lib/brand";
import { SUPPORT_EMAIL } from "@/lib/site";

export const LEGAL_UPDATED = "October 29, 2026";

export type LegalBlock = {
  heading: string;
  paragraphs: string[];
};

export type LegalPage = {
  path: string;
  kicker: string;
  title: string;
  description: string;
  blocks: LegalBlock[];
};

export const legalPages = {
  privacy: {
    path: "/privacy",
    kicker: brand.name,
    title: "Privacy policy",
    description:
      "How Butterneck stores accounts, chat, and previews, and what stays on the computer you connect.",
    blocks: [
      {
        heading: "Who we are",
        paragraphs: [
          "Butterneck is operated by Lanatus Systems LLP. This policy covers the Butterneck app: accounts, workspaces, sandboxes, share previews, and chat.",
        ],
      },
      {
        heading: "What we store",
        paragraphs: [
          "Account details you give us, such as your name, email, and workspace. If you sign in with Google, we receive the profile Google shares for that sign-in.",
          "Chat messages, attachments, and sandbox settings you create in the app. Butterneck runs the coding agent on the computer you connect; that agent may send code context to its own AI provider under your plan with them. We do not copy your repository to our servers to edit it.",
          "A share link opens the preview. Who can send is set on each private copy: a chosen list, or anyone with the link. New private copies start with a chosen list.",
          "On butterneck.com, including the blog, Google Analytics uses cookies to count visits and see which pages people read. It does not run inside the app or on share previews.",
          "Separately, our servers send Google Analytics a few product events: sign-up, workspace created, first change request, trial started, and paid. We use them to measure how many people go from sign-up to a paid plan. These events carry an anonymous ID and the event name, not the content of your change requests or any of your code.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "To run your workspace, show the preview, and let the connected computer apply chat requests inside the folder you assigned. We do not merge to your repository or deploy for you.",
          "If you connect an email inbox to a workspace, we read that inbox with the access you grant: Gmail through Google sign-in with read-only Gmail access, or a mailbox over IMAP with the address, server, and password you enter. We store the connection details encrypted, check messages from the senders you allow, and keep the subject and status of each email we act on.",
          "Payment details for a paid plan are handled by the payment provider. We keep the plan and billing status, not your full card number.",
        ],
      },
      {
        heading: "Sharing",
        paragraphs: [
          "We do not sell your data. We share it with providers that host the app, send sign-in, or process payment, and when the law requires it.",
          "A Jira connection is optional and covered by the Jira privacy policy.",
        ],
      },
      {
        heading: "Retention and your choices",
        paragraphs: [
          "We keep workspace data while the account is active. You can disconnect a computer, remove a sandbox, and ask us to delete an account.",
          `Email ${SUPPORT_EMAIL} for a privacy request.`,
        ],
      },
    ],
  },
  terms: {
    path: "/terms",
    kicker: brand.name,
    title: "Terms of service",
    description:
      "Terms for Butterneck: your workspace, the folder you connect, share links, plans, and who decides what goes live.",
    blocks: [
      {
        heading: "The service",
        paragraphs: [
          "Butterneck connects a project folder on your computer, shares a live preview, and lets people you invite describe changes in chat. You review the preview and publish with your own process. Butterneck does not merge or deploy.",
        ],
      },
      {
        heading: "Your account",
        paragraphs: [
          "You are responsible for the workspace, the people you invite, and the folder you connect. Do not connect a machine or folder you are not allowed to change.",
          "Share links are unlisted, not a private vault. Anyone with the link can open that preview.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Do not use Butterneck to break the law, attack other systems, or upload content you have no right to use. We may suspend an account that does.",
        ],
      },
      {
        heading: "Plans",
        paragraphs: [
          "Paid plans are billed as shown at checkout. Fees already paid are not refunded except where the law requires it.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "The preview is a working copy on your machine. You decide what goes live. Butterneck is provided as available, without a warranty that a change is correct or that the preview stays online.",
        ],
      },
    ],
  },
  contact: {
    path: "/contact",
    kicker: "Support",
    title: "Contact",
    description:
      "Email Butterneck about an account, a preview link, or a Jira site you connected.",
    blocks: [
      {
        heading: "How to reach us",
        paragraphs: [
          `Email ${SUPPORT_EMAIL}. Use this address for Butterneck and for the Jira connection: account questions, a preview link, or a site you connected by mistake.`,
          "Include the workspace name and, for a Jira issue, the issue key. We read mail on business days.",
        ],
      },
    ],
  },
  jiraPrivacy: {
    path: "/jira/privacy",
    kicker: "Jira connection",
    title: "Jira privacy policy",
    description:
      "What the optional Jira Cloud connection in Butterneck can read, store, and write back to a ticket.",
    blocks: [
      {
        heading: "What this covers",
        paragraphs: [
          "This policy covers only the optional Jira Cloud connection in Butterneck. The rest of the product is covered by the Butterneck privacy policy. Connecting a site is your choice. Butterneck works without it.",
        ],
      },
      {
        heading: "What we access",
        paragraphs: [
          "When a workspace admin connects a Jira Cloud site, Atlassian asks them to approve read and write access to Jira work, read access to Jira users, and offline access so the connection can be refreshed.",
          "We read the sites they grant, project names, and and Jira users on the connected site, found by name or email through Jira's free-text user search, so each one can be matched to a computer. For each ticket that starts work, we read its key, summary, description, status, type, priority, assignee, reporter, labels, recent comments with their author names, and attachments up to 8 MB.",
        ],
      },
      {
        heading: "What we store",
        paragraphs: [
          "The site name, site URL, and encrypted access and refresh tokens for that workspace. The link from a sandbox to an issue key, summary, and issue URL. If the app is tied to one Jira project, we store that project key and name. We also store the mapping between Jira users and computers, and the ticket events we receive from Jira webhooks, including ignored ones and the reason they were ignored.",
          "Work starts when someone picks a ticket, or automatically when a ticket in a linked project is labelled butterneck and assigned to a mapped Jira user. Starting work copies the ticket's details and link, plus its last 8 comments with author names, into a sandbox chat, and downloads the ticket's attachments up to 8 MB each and stores them as chat attachments. Larger files and duplicates are skipped. The coding agent on the connected computer reads them, and may send them to its own AI provider, as the Butterneck privacy policy says. That chat is stored like any other Butterneck conversation.",
        ],
      },
      {
        heading: "What we write back",
        paragraphs: [
          "When a linked chat finishes a turn, we comment on that Jira issue. The comment is a short line from the issue description and the preview link. It does not include the full chat. People who can see the issue can open the preview.",
        ],
      },
      {
        heading: "How long, and how to stop",
        paragraphs: [
          "Tokens stay until a workspace admin disconnects the site. Unlinking a ticket stops future comments. The sandbox chat remains. Disconnecting the site deletes the stored tokens.",
          `Email ${SUPPORT_EMAIL} to ask about Jira data we hold.`,
        ],
      },
    ],
  },
  jiraTerms: {
    path: "/jira/terms",
    kicker: "Jira connection",
    title: "Jira terms of service",
    description:
      "Terms for the optional Jira Cloud connection in Butterneck, including preview links posted on a ticket.",
    blocks: [
      {
        heading: "Optional connection",
        paragraphs: [
          "A workspace admin may connect a Jira Cloud site to the workspace. Butterneck does not require Jira. The Butterneck terms still apply. These terms cover the connection only.",
        ],
      },
      {
        heading: "Your Jira site",
        paragraphs: [
          "You must be allowed to install an app on that site and to read and comment on the issues you link. Atlassian’s own terms apply to Jira. We are not Atlassian.",
          "You choose the issues, either by picking them or by labelling them butterneck and assigning them to a mapped Jira user. We do not change issue status, fields, or attachments. We add a comment when a linked turn finishes.",
        ],
      },
      {
        heading: "Preview links",
        paragraphs: [
          "The comment includes the sandbox preview URL so someone on the issue can check the result. That URL can be opened by anyone who has it. Do not link an issue if that preview should stay private from people who can read the issue.",
        ],
      },
      {
        heading: "Disconnecting",
        paragraphs: [
          "You can unlink a ticket or disconnect the site at any time from Butterneck. After that we stop calling Jira for that connection. Comments already posted stay in Jira until you delete them there.",
        ],
      },
    ],
  },
} satisfies Record<string, LegalPage>;
