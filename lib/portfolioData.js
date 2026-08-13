export const PORTFOLIO_PROJECTS = [
  {
    slug: "vesper-crm",
    title: "Vesper CRM – Custom Real Estate Automation",
    category: "Custom CRM & Automation",
    categorySlug: "crm",
    client: "Vesper Properties Group",
    industry: "Real Estate & Commercial Brokerage",
    year: "2026",
    summary: "A custom real-estate customer relationship management system engineered to automate lead parsing, document flows, and agent task scheduling.",
    image: "/service-1.jpg",
    tags: ["Next.js", "Node.js", "PostgreSQL", "CRM Automation", "Tailwind CSS"],
    metrics: [
      { label: "Lead Response Time", value: "-85%" },
      { label: "Monthly Active Agents", value: "320+" },
      { label: "Deals Closed / Qtr", value: "+42%" },
    ],
    challenge: `
Vesper Properties Group relied on fragmented spreadsheets, generic SaaS CRM software, and manual email follow-ups to manage high-value real estate leads. Key operational bottlenecks included:

- Delayed lead response times (average 4+ hours per inquiry)
- High per-seat monthly SaaS subscription overheads
- Inability to automate custom multi-stage deal approvals and contract generation
    `,
    solution: `
Geetanjali Softwares engineered a bespoke CRM architecture tailored specifically to real estate brokerage workflows:

1. **Instant Webhook Lead Parsing**: Connected MLS and web lead capture forms directly to PostgreSQL, assigning agents instantly based on zip code and inventory type.
2. **Automated Document Workflows**: Built dynamic PDF contract generators and e-signature status trackers.
3. **Agent Mobile Dashboard**: Fast, responsive Next.js Progressive Web App (PWA) allowing brokers to update pipeline stages on the go.
    `,
    keyFeatures: [
      "Custom multi-pipeline lead tracking & automated scoring",
      "Instant WhatsApp & Email notification webhooks",
      "Interactive analytics dashboard for brokerage directors",
      "100% full data ownership with zero per-seat licensing fees",
    ],
  },
  {
    slug: "aether-ai",
    title: "Aether AI – Autonomous Customer Support Agent",
    category: "AI & Agents",
    categorySlug: "ai",
    client: "Aether Tech Global",
    industry: "SaaS & Consumer Tech",
    year: "2026",
    summary: "Autonomous LLM-driven customer support agent integrated with enterprise database systems for instant semantic resolution.",
    image: "/service-1.jpg",
    tags: ["AI Agents", "OpenAI API", "Vector Search", "FastAPI", "Python"],
    metrics: [
      { label: "Support Ticket Deflection", value: "68%" },
      { label: "Avg Resolution Time", value: "12 sec" },
      { label: "Customer CSAT Score", value: "4.9/5" },
    ],
    challenge: `
Aether Tech Global faced skyrocketing customer support volumes as their user base grew 400% year-over-year. Traditional chatbot decision trees failed to resolve complex user queries, forcing human support teams to handle repetitive password resets, invoice lookups, and account tier upgrades manually.
    `,
    solution: `
We designed and deployed an autonomous AI support engine featuring Retrieval-Augmented Generation (RAG) and function calling APIs:

1. **Semantic Knowledge Base**: Vectorized product documentation, API references, and over 50,000 historical support logs using Qdrant vector database.
2. **Function Calling Engine**: Granted the agent secure scoped API access to check subscription states, trigger password reset links, and process refunds automatically.
3. **Graceful Escalation**: Automatically hands off unresolved queries to human agents with summarized context tickets.
    `,
    keyFeatures: [
      "Sub-second semantic vector similarity search",
      "Multi-turn conversation memory with strict security guardrails",
      "Real-time analytics dashboard monitoring agent deflection rate",
      "Seamless Zendesk & Salesforce Service Cloud API integration",
    ],
  },
  {
    slug: "apex-commerce",
    title: "Apex Commerce – Headless Next.js Storefront",
    category: "E-Commerce",
    categorySlug: "ecommerce",
    client: "Apex Retail International",
    industry: "Fashion & Direct-to-Consumer",
    year: "2026",
    summary: "A high-performance, headless commerce engine with near-instant page transitions, customized checkout flows, and technical SEO architecture.",
    image: "/service-1.jpg",
    tags: ["Headless Commerce", "Next.js", "GraphQL", "Shopify API", "Tailwind CSS"],
    metrics: [
      { label: "Lighthouse Performance", value: "99/100" },
      { label: "Organic Search Traffic", value: "+210%" },
      { label: "Mobile Conversion Rate", value: "+3.4%" },
    ],
    challenge: `
Apex Retail suffered from slow page loads (4.5s average initial load) on their monolithic e-commerce setup, leading to high cart abandonment rates on mobile devices and dropping search engine rankings.
    `,
    solution: `
We re-engineered their entire digital storefront into a decoupled Headless Commerce architecture:

1. **Next.js App Router & ISR**: Static pre-rendering of 10,000+ product detail pages for sub-300ms page transitions.
2. **Shopify Storefront API Integration**: Seamless real-time cart state synchronization and secure checkout redirection.
3. **Technical SEO Polish**: Perfect Core Web Vitals, dynamic OpenGraph image rendering, and rich Product JSON-LD schema markup.
    `,
    keyFeatures: [
      "Sub-second client page navigations and instant search filtration",
      "Custom localized multi-currency pricing and payment gateways",
      "Strict Core Web Vitals optimization (LCP < 1.2s, CLS = 0)",
      "Automated XML sitemap and dynamic schema generation",
    ],
  },
  {
    slug: "zenith-analytics",
    title: "Zenith Analytics – Enterprise Intelligence Platform",
    category: "Analytics & SaaS",
    categorySlug: "analytics",
    client: "Zenith Logistics Corp",
    industry: "Supply Chain & Supply Intelligence",
    year: "2025",
    summary: "Real-time supply chain analytics and business intelligence dashboard processing high-frequency telemetry data.",
    image: "/service-1.jpg",
    tags: ["React", "TypeScript", "ClickHouse", "Node.js", "Redis"],
    metrics: [
      { label: "Data Ingestion Speed", value: "10M/day" },
      { label: "Query Response Time", value: "< 80ms" },
      { label: "Ops Efficiency Gain", value: "+35%" },
    ],
    challenge: `
Zenith Logistics managed fleet telemetry and inventory flows across 50+ warehouses using legacy SQL databases that took minutes to render operational charts, causing delays in fleet dispatch decisions.
    `,
    solution: `
Geetanjali Softwares constructed a real-time columnar analytics platform powered by ClickHouse and WebSocket streams, enabling real-time map visualization, instant aggregate query charting, and anomaly alerts.
    `,
    keyFeatures: [
      "Columnar data store for instant aggregate analytics",
      "Interactive data visualizations with customizable widget grid",
      "Role-based access control (RBAC) and SSO integration",
    ],
  },
  {
    slug: "novus-health",
    title: "Novus Health – Patient Telehealth Portal",
    category: "Industry Portals",
    categorySlug: "portals",
    client: "Novus Healthcare Network",
    industry: "Healthcare & Digital Medicine",
    year: "2025",
    summary: "HIPAA-compliant web platform for remote patient appointments, electronic health records (EHR), and secure doctor messaging.",
    image: "/service-1.jpg",
    tags: ["React", "WebRTC", "PostgreSQL", "Node.js", "Tailwind CSS"],
    metrics: [
      { label: "Patient Onboarding Time", value: "2 min" },
      { label: "Virtual Consultations", value: "50,000+" },
      { label: "Uptime Reliability", value: "99.99%" },
    ],
    challenge: `
Novus Healthcare required a secure, intuitive digital portal allowing patients to schedule virtual appointments, consult doctors over encrypted video, and view lab reports seamlessly on desktop and mobile.
    `,
    solution: `
We engineered a HIPAA-compliant WebRTC telehealth portal with automated appointment reminders, prescription generation, and encrypted patient file storage.
    `,
    keyFeatures: [
      "Encrypted WebRTC HD video consultation room",
      "Automated SMS/Email appointment scheduling",
      "Secure patient medical document vault with audit logs",
    ],
  },
];
