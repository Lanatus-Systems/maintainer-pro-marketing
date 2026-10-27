import { brand } from "@/lib/brand";
import { SUPPORT_EMAIL } from "@/lib/site";

export const LEGAL_UPDATED = "September 25, 2026";

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
          "Butterneck is operated by Lanatus. This policy covers the Butterneck app: accounts, workspaces, sandboxes, share previews, and chat.",
        ],
      },
      {
        heading: "What we store",
        paragraphs: [
          "Account details you give us, such as your name, email, and workspace. If you sign in with Google, we receive the profile Google shares for that sign-in.",
          "Chat messages, attachments, and sandbox settings you create in the app. Project files stay on the computer you connect. We do not copy your repository to our servers to edit it.",
          "A share link opens the preview. Who can send is set on each private copy: a chosen list, or anyone with the link. Website hosts start open.",
          "On our public pages (the home page, our work, and pricing), Google Analytics uses cookies to count visits and see which pages people read. It does not run inside the app or on share previews.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "To run your workspace, show the preview, and let the connected computer apply chat requests inside the folder you assigned. We do not merge to your repository or deploy for you.",
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
          "The preview is a working copy on your machine. You decide what ships. Butterneck is provided as available, without a warranty that a change is correct or that the preview stays online.",
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
          "When a partner admin connects a Jira Cloud site, Atlassian asks them to approve read and write access to Jira work, plus offline access so the connection can be refreshed.",
          "We read the sites they grant, project names, and the issue key, summary, description, and status they pick. We do not browse Jira beyond that search.",
        ],
      },
      {
        heading: "What we store",
        paragraphs: [
          "The site name, site URL, and encrypted access and refresh tokens for that client. The link from a sandbox to an issue key, summary, and issue URL. If the app is tied to one Jira project, we store that project key and name.",
          "Starting work copies the issue summary, description, and link into a sandbox chat so the assistant can act on it. That chat is stored like any other Butterneck conversation.",
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
          "Tokens stay until a partner disconnects the site. Unlinking a ticket stops future comments. The sandbox chat remains. Disconnecting the site deletes the stored tokens.",
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
          "A partner admin may connect a Jira Cloud site to a client. Butterneck does not require Jira. The Butterneck terms still apply. These terms cover the connection only.",
        ],
      },
      {
        heading: "Your Jira site",
        paragraphs: [
          "You must be allowed to install an app on that site and to read and comment on the issues you link. Atlassian’s own terms apply to Jira. We are not Atlassian.",
          "You choose the issues. We do not change issue status, fields, or attachments. We add a comment when a linked turn finishes.",
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
