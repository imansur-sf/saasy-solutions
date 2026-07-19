// SaaSy Solutions — tool catalog.
// Edit this file to add / update / remove tools. Each entry:
//   category: 'meshmesh' | 'slackbot' | 'github'
//   name:     display name
//   icon:     single character or emoji (kept short — renders large)
//   desc:     short description (1-2 sentences)
//   url:      link users click; use '#' as a placeholder

window.SAASY_TOOLS = [
  // ------- MeshMesh -------
  {
    category: 'meshmesh',
    name: 'Loyalty Portal Generator',
    icon: '⚙',
    desc: 'A reusable recipe for generating fully branded, interactive loyalty portal demo pages. Any SE can invoke this recipe to create a production-quality HTML loyalty rewards portal customized to a customer’s brand — complete with expandable profile/benefits sections, voucher cards, tier progression, badges, social clubs, offers, and an upsell banner.',
    url: 'meshmesh://view-reference?id=16804744-5cae-44e8-8233-8687565b0013'
  },
  {
    category: 'meshmesh',
    name: 'Distributed Marketing & Alerts for MCA',
    icon: '⚡',
    desc: 'Complete step-by-step recipe for setting up Distributed Marketing (DM&A) on a Salesforce Core org with Marketing Cloud on Core. Covers the full pipeline from enabling the feature through verified end-to-end email sends from CRM record pages.',
    url: 'meshmesh://view-reference?id=0dab51cd-bf1a-4ea7-a606-451b7eab086d'
  },
  {
    category: 'meshmesh',
    name: 'MC Advance Custom Content Approval example',
    icon: '✨',
    desc: 'This recipe builds a complete content approval workflow in Salesforce that governs email content created in Marketing Cloud Advanced CMS. It creates a custom Content_Review__c object as a governance wrapper around MC Advanced CMS content, with a full approval process, automated status transitions via Flow, Chatter-based collaboration, and a deployer handoff — all packaged in a dedicated Lightning App with a ready-to-use interactive demo script.',
    url: 'meshmesh://view-reference?id=947809fe-9e07-40b8-bd1e-0a6985f4c2cb'
  },

  // ------- Slackbot Skills -------
  {
    category: 'slackbot',
    name: '3D Deck Creator',
    icon: '💬',
    desc: `3D Deck Creator turns a customer brief into a fully-built, brand-compliant 12-slide HTML presentation — no PowerPoint, no design tools required.

What it does:

• Collects 17 key inputs (company name, audience, meeting stage, KPIs, Salesforce products, proof points, roadmap, CTA, and more)
• Builds a Salesforce 2026–branded, animated deck as a single self-contained .html file (~30KB) — works offline in any browser, no CDN dependencies
• Outputs slides covering: Hero → Why Now → The Gap → Connected Stack → Beachheads → Scale Story → Proof → Roadmap → Closing CTA → Attribution
• Optionally pulls live context from Salesforce (account/opportunity data) and Slack to pre-fill details`,
    url: 'https://salesforce.enterprise.slack.com/docs/TECBHJS2W/F0BE2A45VEV'
  },
  {
    category: 'slackbot',
    name: 'Admin Update',
    icon: '🤖',
    desc: `Admin Update is a two-stage Slackbot skill that automates Salesforce opportunity updates for SEs after customer calls.

What it does:

Stage 1 (auto-runs):
• Pulls your active opportunities from Salesforce
• Scans call transcripts from your Google Drive "Transcripts" folder and matches them to the right deals
• Looks up each account's linked Slack channel and reads the last 15 days of messages + any file attachments
• Generates a single review canvas with all deals populated, including:
   – SE Comments (progress, competitive intel, next steps)
   – Challenges (risks, blockers, competitive threats)
   – Solution Description
   – Product Fit & SE Engagement picklist values
   – SE Scorecard (11 criteria, scored 0–5 with evidence-based justification)

Stage 2 (you trigger it):
• After you review and edit the canvas, tell Slackbot "update Salesforce"
• It re-reads your edits and outputs a ready-to-paste copy block for each deal — formatted exactly for the Salesforce fields (with character counts for the 255-char fields)
• You paste the values into the SFR manually

Key details:
• Respects 255-char limits on SE Comments and Challenges (shows full version in canvas, condensed version for Salesforce)
• Scorecard scoring is evidence-only — never guessed
• All deals land in one canvas, organized by opportunity
• If no account channel or transcript is found for a deal, it notes it and moves on gracefully

Built for: SEs who want to batch-update their Salesforce records after a week of calls, without doing it field by field.`,
    url: 'https://salesforce.enterprise.slack.com/docs/TECBHJS2W/F0AU51AQQU9'
  },
  {
    category: 'slackbot',
    name: 'CBS Holodeck Builder',
    icon: '🔔',
    desc: `CBS Holodeck Builder is a Slackbot skill that helps AEs & Solution Engineers build a complete, story-driven pre-sales customer deck — fast. It runs a short intake interview (customer name, audience, meeting type, key pain points, products), then generates all slide content mapped to the CBS Presentation Design Toolkit: headlines, body copy, speaker notes, and AI-generated visuals. Output is delivered as both a Slack Canvas (your speaker prep reference) and a live Google Slides deck built directly from the CBS brand template — ready to present.

Works standalone, and gets even richer when connected to Salesforce (pulls account/opp data), Slack (surfaces discovery insights), and web search (recent news and "Why Now" angles).`,
    url: 'https://salesforce.enterprise.slack.com/docs/TECBHJS2W/F0ATPJYKMC2'
  },

  // ------- Generators (hosted on GitHub) -------
  {
    category: 'generators',
    name: 'Loyalty Portal Generator',
    icon: '★',
    desc: `An interactive tool designed to instantly generate, customize, and preview fully branded customer loyalty portals for client pitches and product demos.

How it works:

• AI-Powered Quick Start: Users simply paste a customer's homepage URL, and the AI automatically extracts the company's brand identity and color scheme.
• Instant Tailored Content: The generator dynamically populates the portal with industry-appropriate copy, vouchers, offers, social clubs, and badges based on the analyzed brand.
• Guided 7-Step Customization: A step-by-step wizard allows users to fine-tune the portal's details — such as membership tiers, point balances, and specific rewards.
• Real-Time Live Preview: A side-by-side interactive mock-up updates instantly as changes are made, showcasing exactly what the final consumer-facing loyalty experience will look like.

Perfect for sales teams and SEs looking to assemble rapid, highly tailored client demonstrations.`,
    url: 'https://imansur-sf.github.io/loyalty-portal-generator/'
  },
  {
    category: 'generators',
    name: 'GitHub Repo Two',
    icon: '◆',
    desc: 'Another GitHub project placeholder.',
    url: '#'
  },
  {
    category: 'generators',
    name: 'GitHub Repo Three',
    icon: '⚔',
    desc: 'Placeholder GitHub repo #3.',
    url: '#'
  },

  // ------- Holodecks -------
  {
    category: 'holodeck',
    name: 'ISACA',
    icon: '🌀',
    desc: `This presentation outlines a future state vision for an association, ISACA, focusing on data-driven personalization to maximize member value and revenue. By unifying data across various platforms, Salesforce proposes to help ISACA achieve a "360-degree" customer view and deliver tailored experiences across multiple channels.

The proposed solutions include:

• Unified Customer Profile: Consolidating disparate data silos (transactional, financial, marketing, LMS) into a single, harmonized profile using Data Cloud to eliminate data gaps and improve decision-making.
• AI-Powered Personalization: Leveraging Agentforce and Data Cloud to provide real-time, one-to-one personalization on the web, in email, and across the ISACA storefront, including "next-best-product" recommendations.
• Data-Driven Segmentation: Replacing manual SQL-based segmentation with natural language processing, allowing marketers to create targeted audience segments based on behaviors, certifications, career stage, and engagement levels.
• Proactive Career Guidance: Using AI to act as a "trusted advisor," guiding members through their career journey with personalized content, relevant course recommendations, and proactive insights.
• Marketing Optimization: Improving campaign performance by surfacing attribution insights, reducing messaging fatigue through engagement thresholds, and optimizing marketing spend.`,
    url: 'https://docs.google.com/presentation/d/1GIJcv2ywMWlNFMYm7_Q1S5ltX3qT3b8F5KPop36KNTE/edit?slide=id.g378f8dbe9f8_2_2446#slide=id.g378f8dbe9f8_2_2446'
  },
  {
    category: 'holodeck',
    name: 'Holodeck Two',
    icon: '🎮',
    desc: 'Another Holodeck placeholder. Update text and URL when ready.',
    url: '#'
  },
  {
    category: 'holodeck',
    name: 'Holodeck Three',
    icon: '🛸',
    desc: 'Placeholder Holodeck #3.',
    url: '#'
  }
];
