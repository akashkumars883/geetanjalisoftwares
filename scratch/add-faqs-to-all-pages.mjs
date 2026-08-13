import fs from 'fs';
import path from 'path';

// Define 5 FAQs for each of the 26 service & solution routes
const FAQS_DATA = {
  // Services
  'app/services/ai-chatbot/page.jsx': {
    title: "AI Chatbot Development FAQs",
    subtitle: "Common questions about custom AI chatbot integration and LLM workflows.",
    faqs: [
      { question: "What LLMs and models do you use for AI chatbot development?", answer: "We integrate OpenAI GPT-4o, Claude 3.5 Sonnet, Llama 3, and Groq models depending on your latency, accuracy, and budget needs." },
      { question: "Can the AI chatbot connect to our custom database and CRM?", answer: "Yes! We build secure REST/GraphQL API connectors and RAG vector databases so your chatbot queries internal inventory, customer records, and ticket history." },
      { question: "How does the AI chatbot handle complex customer escalations?", answer: "When an inquiry requires human intervention, the chatbot seamlessly routes the conversation context to a live support representative or creates a ticket." },
      { question: "Is customer data kept private and compliant?", answer: "Absolutely. We enforce strict data privacy guardrails, zero data retention agreements with model providers, and enterprise encryption." },
      { question: "How long does it take to deploy a custom AI chatbot?", answer: "Simple support bots can be deployed within 1 to 2 weeks, while multi-channel RAG-enabled agents take 3 to 4 weeks." }
    ]
  },
  'app/services/api-integration/page.jsx': {
    title: "API Integration Services FAQs",
    subtitle: "Frequently asked questions about REST, GraphQL, and microservice connectors.",
    faqs: [
      { question: "What API architectures do you specialize in?", answer: "We specialize in RESTful APIs, GraphQL endpoints, Webhooks, gRPC microservices, and serverless middleware integrations." },
      { question: "Can you connect legacy software to modern cloud web applications?", answer: "Yes, we build custom bridge APIs and middleware layers that allow legacy ERP or database systems to sync securely with modern web apps." },
      { question: "How do you handle API rate limiting and high-volume traffic?", answer: "We implement redis caching, message queues (RabbitMQ/Kafka), and automated retry logic to handle rate limits smoothly without service disruption." },
      { question: "How is API authentication and security managed?", answer: "We enforce OAuth 2.0, JWT tokens, API keys, SSL encryption, and IP whitelist policies to secure all data transmissions." },
      { question: "Do you provide documentation and post-integration support?", answer: "Yes, we provide OpenAPI (Swagger) documentation, Postman collections, and ongoing API monitoring and support." }
    ]
  },
  'app/services/branding/page.jsx': {
    title: "Corporate Branding Services FAQs",
    subtitle: "Questions about brand strategy, visual identities, and UI design kits.",
    faqs: [
      { question: "What is included in your corporate branding packages?", answer: "Our packages include logo design, brand positioning guidelines, typography systems, color palettes, social media kits, and UI design design tokens." },
      { question: "How long does a complete brand identity redesign take?", answer: "Corporate branding projects typically take 2 to 4 weeks from discovery moodboards to final asset handoff." },
      { question: "Do you deliver vector source files and brand guidelines books?", answer: "Yes, you receive all original vector source files (SVG, EPS, AI), high-res PNGs, and a comprehensive PDF brand guideline manual." },
      { question: "Can you align our brand identity with our website UI/UX?", answer: "Yes! We specialize in cohesive digital brand systems that translate seamlessly into modern, responsive web application interfaces." },
      { question: "What is the process to start a brand redesign project?", answer: "We begin with a brand discovery questionnaire, review competitive positioning, present 3 distinct visual concepts, and refine your chosen identity." }
    ]
  },
  'app/services/business-automation/page.jsx': {
    title: "Business Automation FAQs",
    subtitle: "Common questions about workflow automation, Zapier, Make, and custom bots.",
    faqs: [
      { question: "What business workflows can be automated?", answer: "We automate lead routing, invoice generation, CRM data syncing, customer email notifications, report generation, and multi-app data transfers." },
      { question: "Do you use platforms like Zapier/Make or build custom scripts?", answer: "We build both! For simple workflows we leverage Zapier/Make, and for high-volume complex tasks we engineer custom Python/Node.js microservices." },
      { question: "How much time and cost can business automation save?", answer: "Clients typically reduce manual data entry time by 70% to 90%, saving hundreds of staff hours and eliminating human copy-paste errors." },
      { question: "What happens if a third-party app changes its API?", answer: "We build automated fallback error logging and offer retainer monitoring to quickly update integration endpoints if external APIs change." },
      { question: "How do we get started with automating our operations?", answer: "We audit your team's repetitive daily tasks during a discovery call and map out a prioritized automation roadmap with instant ROI impact." }
    ]
  },
  'app/services/business-website/page.jsx': {
    title: "Business Website Development FAQs",
    subtitle: "Questions about custom business websites in India & USA.",
    faqs: [
      { question: "Why should we choose custom Next.js development over WordPress?", answer: "Custom Next.js websites load up to 10x faster, offer unshakeable security against plugin hacks, deliver perfect Lighthouse Core Web Vitals, and scale effortlessly." },
      { question: "Are your business websites mobile-responsive and SEO-optimized?", answer: "Yes, 100%! Every site is built mobile-first with structured JSON-LD schemas, canonical tags, open graph cards, and sub-second load speeds." },
      { question: "Can we manage and update content easily without coding?", answer: "Yes, we integrate user-friendly headless CMS solutions (Sanity, Strapi, or Supabase admin dashboards) so your team can update text and images easily." },
      { question: "How long does a business website project take from start to launch?", answer: "Standard business websites take 2 to 4 weeks depending on page count, custom animations, and integrations." },
      { question: "Do you provide hosting and maintenance support?", answer: "Yes, we deploy on global high-speed edge networks (Vercel, AWS Cloudflare) and offer ongoing technical maintenance plans." }
    ]
  },
  'app/services/content-strategist/page.jsx': {
    title: "Content Marketing & Strategy FAQs",
    subtitle: "Questions about SEO content planning, performance copy, and editorial calendars.",
    faqs: [
      { question: "What does your content strategy service include?", answer: "We deliver keyword search intent research, topic cluster planning, competitor content gap analysis, high-converting copy, and monthly editorial calendars." },
      { question: "How do you ensure content ranks high on Google and AI Search?", answer: "We optimize content using semantic keyword clustering, structured schema markup, authoritative sources, and EEAT principles designed for AI Overviews." },
      { question: "Who writes the content for our business?", answer: "Our senior technical writers and SEO strategists craft original, engaging, and industry-accurate copy tailored to your brand voice." },
      { question: "Can you revamp existing low-performing blog posts and landing pages?", answer: "Yes! We conduct content audits to refresh outdated copy, add target commercial keywords, and improve structure for higher conversion." },
      { question: "How do you measure the ROI of content marketing?", answer: "We track search impressions, organic keyword ranking growth, lead conversion rates, and user session duration using Google Analytics 4." }
    ]
  },
  'app/services/crm-custom-software/page.jsx': {
    title: "Custom CRM & Software FAQs",
    subtitle: "Questions about custom CRM development vs off-the-shelf SaaS.",
    faqs: [
      { question: "Why build a custom CRM instead of paying for Salesforce or HubSpot?", answer: "Custom CRMs eliminate per-seat monthly subscription taxes, adapt 100% to your unique operational SOPs, and give you complete data sovereignty." },
      { question: "Can a custom CRM scale to hundreds of team members?", answer: "Yes, we build custom CRMs using PostgreSQL and Next.js, allowing your company to scale to unlimited users with zero extra licensing cost." },
      { question: "Can you migrate existing client data from Excel or another CRM?", answer: "Yes! We handle full data ETL extraction, cleansing, mapping, and seamless import from spreadsheets or legacy CRMs." },
      { question: "How long does it take to develop a custom CRM system?", answer: "MVP custom CRMs take 4 to 6 weeks, while enterprise multi-module platforms take 8 to 12 weeks." },
      { question: "What security measures protect our customer CRM data?", answer: "We enforce role-based access control (RBAC), row-level security, SSL/TLS encryption, and automated database backups." }
    ]
  },
  'app/services/ecommerce/page.jsx': {
    title: "E-Commerce Development FAQs",
    subtitle: "Questions about headless e-commerce, custom storefronts, and payment gateways.",
    faqs: [
      { question: "What e-commerce platforms do you build with?", answer: "We specialize in Headless Commerce using Next.js combined with Shopify Storefront API, Medusa.js, Swell, or custom PostgreSQL backends." },
      { question: "What payment gateways can be integrated?", answer: "We integrate Razorpay, Stripe, PayPal, Cashfree, UPI, Apple Pay, and credit/debit card checkout flows." },
      { question: "How do you ensure fast checkout and low cart abandonment?", answer: "By leveraging sub-second headless page loads, single-step streamlined checkout UX, and automated abandoned cart email triggers." },
      { question: "Can the online store sync with inventory management tools?", answer: "Yes, we build real-time inventory API sync between your online store, warehouse, and accounting software." },
      { question: "How long does it take to launch a custom e-commerce store?", answer: "Standard e-commerce storefronts take 3 to 5 weeks, while enterprise catalogs take 6 to 8 weeks." }
    ]
  },
  'app/services/ecommerce-seo/page.jsx': {
    title: "E-Commerce SEO Services FAQs",
    subtitle: "Questions about ranking product catalogs, category pages, and driving sales.",
    faqs: [
      { question: "How is E-Commerce SEO different from standard website SEO?", answer: "E-Commerce SEO focuses on optimizing thousands of SKU product pages, category facets, Product schema markup, internal linking, and transactional keywords." },
      { question: "How do you handle duplicate content on dynamic product filters?", answer: "We implement strict canonical tagging, canonical parameter handling, clean URL rewrites, and robots directive rules to prevent duplicate indexing." },
      { question: "How soon can an online store expect organic sales growth?", answer: "Measurable category keyword ranking gains and organic revenue improvements typically begin within 60 to 90 days." },
      { question: "Do you optimize Product schema markup for Google Shopping?", answer: "Yes, we implement structured Product, Offer, AggregateRating, and InStock JSON-LD schemas so products display rich price/review badges in search results." },
      { question: "Can you optimize Shopify or WooCommerce stores for SEO?", answer: "Yes! We work with Shopify, WooCommerce, Magento, and custom headless Next.js e-commerce architectures." }
    ]
  },
  'app/services/landing-pages/page.jsx': {
    title: "Landing Page Development FAQs",
    subtitle: "Questions about high-converting PPC and lead generation landing pages.",
    faqs: [
      { question: "What makes a landing page high-converting?", answer: "High conversion stems from sub-second load speeds, clear hero headlines, strong social proof, compelling CTAs, and frictionless lead forms." },
      { question: "Do you design landing pages for Google Ads and Meta Ads campaigns?", answer: "Yes! We build ad-aligned landing pages engineered to maximize Google Quality Score and lower your cost-per-lead (CPL)." },
      { question: "Can you integrate the landing page form directly into our CRM?", answer: "Yes, leads auto-sync in real time into your CRM, email autoresponder, or WhatsApp notifications." },
      { question: "How quickly can a custom landing page be delivered?", answer: "High-converting landing pages are delivered within 3 to 7 business days." },
      { question: "Do you perform A/B testing on landing page variants?", answer: "Yes, we implement A/B split testing for headlines, CTAs, and layout variations to optimize conversion performance." }
    ]
  },
  'app/services/local-seo/page.jsx': {
    title: "Local SEO Services FAQs",
    subtitle: "Questions about ranking Google Maps (GMB) in India, Delhi NCR, & Noida.",
    faqs: [
      { question: "How does Local SEO help my local business in India / Delhi NCR?", answer: "Local SEO ranks your Google Business Profile (GMB) in the top 3 Google Map pack results for local searches, driving direct calls and foot traffic." },
      { question: "How long does it take to rank in the Google Maps 3-Pack?", answer: "Noticeable map pack improvements and increased local call volumes generally appear within 30 to 60 days of optimization." },
      { question: "What is included in your Local SEO service?", answer: "We optimize Google Business Profiles, create local NAP citation listings, build geo-targeted landing pages, manage review generation, and track local ranking growth." },
      { question: "Can you help multi-location businesses rank in different cities?", answer: "Yes! We build dedicated location landing pages and manage multi-location GMB profiles across different cities and territories." },
      { question: "Why is Google Business Profile optimization essential for local lead generation?", answer: "Over 70% of local service inquiries happen directly on Google Maps without users ever visiting a website. High map visibility captures instant leads." }
    ]
  },
  'app/services/seo/page.jsx': {
    title: "SEO Services & Reseller FAQs",
    subtitle: "Questions about ranking #1 on Google and White Label SEO programs.",
    faqs: [
      { question: "Why is Geetanjali Softwares considered a top SEO company in India?", answer: "We combine technical search audits, data-driven keyword mapping, link authority building, and transparent monthly ROI reporting." },
      { question: "How does your White Label SEO reseller program work for agencies?", answer: "Agencies resell our SEO packages under their brand. We execute audits, link building, and content while delivering 100% unbranded white-label reports." },
      { question: "What is the difference between On-Page, Off-Page, and Technical SEO?", answer: "On-Page optimizes content and keywords; Technical SEO fixes site speed, crawling, and schema; Off-Page builds high-authority external backlinks." },
      { question: "Do you use safe White-Hat SEO techniques?", answer: "Yes, 100% White-Hat practices adhering strictly to Google Webmaster Guidelines to ensure long-term rank stability." },
      { question: "What reporting do clients and reseller agencies receive?", answer: "You receive detailed monthly reports tracking organic keyword positions, search impression growth, backlink acquisition, and traffic analytics." }
    ]
  },
  'app/services/technical-seo/page.jsx': {
    title: "Technical SEO Services FAQs",
    subtitle: "Questions about Core Web Vitals, site crawl budget, and schema markup.",
    faqs: [
      { question: "What is Technical SEO and why is it crucial for website rankings?", answer: "Technical SEO ensures search engines can efficiently crawl, index, and render your website pages without speed bottlenecks or code errors." },
      { question: "How do you fix Core Web Vitals and Lighthouse speed issues?", answer: "We optimize server rendering, reduce JS bundle sizes, compress images, fix Cumulative Layout Shift (CLS), and leverage edge caching." },
      { question: "What schema markups do you implement for technical SEO?", answer: "We implement Organization, ProfessionalService, Product, FAQPage, Article, Breadcrumb, and Service structured JSON-LD schemas." },
      { question: "How do you resolve indexation errors in Google Search Console?", answer: "We audit sitemaps, resolve 404 broken links, configure 301 redirects, clean up canonical tags, and submit updated sitemap index files." },
      { question: "Can technical SEO improve rankings for large websites with thousands of pages?", answer: "Yes! Optimizing crawl budget and site architecture allows Googlebot to index deep category and product pages much faster." }
    ]
  },
  'app/services/web-applications/page.jsx': {
    title: "Web Application Engineering FAQs",
    subtitle: "Questions about full-stack web app development, Next.js, and cloud architecture.",
    faqs: [
      { question: "What tech stack do you use for web application development?", answer: "We build enterprise web applications using Next.js, React, Node.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS, and AWS/Vercel." },
      { question: "Are your web applications scalable for thousands of concurrent users?", answer: "Yes, our serverless and microservice architectures are engineered to auto-scale seamlessly during peak traffic bursts." },
      { question: "Do you build progressive web apps (PWAs) with offline capability?", answer: "Yes, we build PWAs that offer native app-like user experience, fast offline caching, and push notifications across devices." },
      { question: "How do you ensure web application security?", answer: "We implement OWASP security standards, encrypted database connections, role-based authorization, rate limiting, and automated security patches." },
      { question: "What is the typical development timeline for a custom web application?", answer: "MVP web applications take 4 to 6 weeks, while enterprise multi-role platforms take 8 to 12 weeks." }
    ]
  },

  // Solutions
  'app/solutions/business-intelligence/page.jsx': {
    title: "Business Intelligence Solutions FAQs",
    subtitle: "Questions about custom analytics dashboards and data visualization.",
    faqs: [
      { question: "What is a custom Business Intelligence (BI) dashboard?", answer: "A custom BI dashboard aggregates data from your sales, marketing, inventory, and accounting systems into a single real-time visual analytics hub." },
      { question: "Can a BI dashboard connect to multiple data sources?", answer: "Yes! We connect PostgreSQL, MySQL, Google Analytics, Shopify, Stripe, and third-party REST APIs into a unified dashboard." },
      { question: "How often does the dashboard data update?", answer: "Dashboards can update in real time or on scheduled cron intervals (hourly/daily) depending on your operational needs." },
      { question: "Can we export reports to PDF or Excel formats?", answer: "Yes, custom reporting modules allow one-click automated PDF/Excel exports and scheduled email reports to management." },
      { question: "How long does it take to build a custom BI analytics platform?", answer: "Custom BI dashboards take 3 to 5 weeks from data pipeline mapping to final user dashboard deployment." }
    ]
  },
  'app/solutions/cloud-saas/page.jsx': {
    title: "Cloud SaaS Platform FAQs",
    subtitle: "Questions about building multi-tenant SaaS platforms and cloud software.",
    faqs: [
      { question: "What is multi-tenant SaaS architecture?", answer: "Multi-tenant architecture allows thousands of customer accounts (tenants) to run on a shared cloud database while maintaining complete data isolation." },
      { question: "How do you handle subscription billing for SaaS products?", answer: "We integrate Stripe Billing or Razorpay Subscriptions supporting monthly/annual plans, free trials, tiered usage pricing, and automated invoices." },
      { question: "Can you help us build an MVP SaaS product quickly?", answer: "Yes, we specialize in launching production-ready SaaS MVPs in 6 to 8 weeks using Next.js and Supabase." },
      { question: "How is user authentication and tenant security managed?", answer: "We implement OAuth, Magic Links, MFA, and database Row Level Security (RLS) to ensure zero data leakage between tenants." },
      { question: "What cloud providers do you deploy SaaS applications on?", answer: "We deploy on Vercel Edge, AWS (Lambda, ECS, RDS), Cloudflare, and DigitalOcean." }
    ]
  },
  'app/solutions/customer-portals/page.jsx': {
    title: "Customer Portal Solutions FAQs",
    subtitle: "Questions about client portals, document sharing, and self-service apps.",
    faqs: [
      { question: "What is a custom customer portal?", answer: "A customer portal is a secure web application where clients can log in to view project status, download invoices, submit tickets, and share files." },
      { question: "How does a client portal improve operational efficiency?", answer: "It reduces repetitive support emails by 60% by giving clients 24/7 self-service access to their account data and project deliverables." },
      { question: "Can clients upload and sign documents securely inside the portal?", answer: "Yes, we integrate secure file uploads, PDF previews, and electronic signature API connectors." },
      { question: "Is the portal mobile-friendly for clients on the go?", answer: "Yes, all customer portals are fully responsive and optimized for mobile devices, tablets, and desktop screens." },
      { question: "How long does it take to build a custom client portal?", answer: "Custom customer portals are delivered within 4 to 6 weeks depending on feature requirements." }
    ]
  },
  'app/solutions/ecommerce-retail/page.jsx': {
    title: "Retail & E-Commerce Solutions FAQs",
    subtitle: "Questions about scaling retail stores and omnichannel digital commerce.",
    faqs: [
      { question: "How do your retail e-commerce solutions boost sales?", answer: "We build sub-second loading storefronts, personalized product recommendations, single-click checkout, and omnichannel inventory sync." },
      { question: "Can you integrate physical POS store systems with online e-commerce?", answer: "Yes, we connect physical POS systems (Shopify POS, Square, custom ERPs) with your online store for real-time inventory updates." },
      { question: "How do you handle high-traffic flash sale events?", answer: "Our headless serverless architecture auto-scales to handle thousands of concurrent checkout requests without server crashes." },
      { question: "Can you build B2B wholesale e-commerce portals with custom pricing?", answer: "Yes! We build B2B portals featuring tiered wholesale volume pricing, tax exemption logic, and PO invoice ordering." },
      { question: "How long does a retail e-commerce transformation take?", answer: "Complete retail digital transformations take 4 to 8 weeks depending on catalog size and integrations." }
    ]
  },
  'app/solutions/edtech-education/page.jsx': {
    title: "EdTech & Education Solutions FAQs",
    subtitle: "Questions about learning management systems (LMS) and course portals.",
    faqs: [
      { question: "What features can be included in a custom EdTech LMS platform?", answer: "Features include video streaming, interactive quizzes, student progress tracking, certificate generation, assignment uploads, and live classes." },
      { question: "How do you secure video content from unauthorized downloading?", answer: "We implement encrypted HLS video streaming, signed URLs, DRM protection, and watermarking to prevent content piracy." },
      { question: "Can the platform handle live classes and Zoom integration?", answer: "Yes, we integrate Zoom SDK, WebRTC, and Jitsi for seamless live virtual classroom experiences directly inside the portal." },
      { question: "Can students access courses on mobile devices?", answer: "Yes, our EdTech web applications are mobile-first, ensuring smooth course navigation on smartphones and tablets." },
      { question: "How long does it take to build a custom EdTech LMS platform?", answer: "Custom EdTech platforms take 6 to 10 weeks from initial design to launch." }
    ]
  },
  'app/solutions/enterprise/page.jsx': {
    title: "Enterprise Solutions FAQs",
    subtitle: "Questions about enterprise digital transformation and custom software.",
    faqs: [
      { question: "What enterprise software solutions does Geetanjali Softwares build?", answer: "We engineer custom ERP modules, enterprise CRMs, automated data pipelines, legacy system migrations, and cloud SaaS architectures." },
      { question: "How do you ensure enterprise-grade security and compliance?", answer: "We follow SOC2 principles, OWASP guidelines, ISO standards, end-to-end data encryption, and role-based access control (RBAC)." },
      { question: "Can you integrate with our existing SAP, Oracle, or Microsoft systems?", answer: "Yes, we build robust enterprise API bridges and middleware to sync with SAP, Oracle, Salesforce, and legacy mainframes." },
      { question: "Do you offer SLA agreements for 24/7 technical support?", answer: "Yes, we provide formal Service Level Agreements (SLAs) guaranteeing 99.9% uptime and 24/7 priority emergency support." },
      { question: "What is your enterprise engagement model?", answer: "We offer dedicated team retainers, fixed-price milestone sprints, and augmented staff models tailored to enterprise procurement." }
    ]
  },
  'app/solutions/fintech-finance/page.jsx': {
    title: "FinTech & Finance Solutions FAQs",
    subtitle: "Questions about secure financial apps, payment processing, and banking APIs.",
    faqs: [
      { question: "What security measures protect FinTech web applications?", answer: "FinTech apps require bank-grade SSL encryption, multi-factor authentication (MFA), role-based permissions, and compliance with data regulations." },
      { question: "Can you integrate KYC verification and banking APIs?", answer: "Yes, we integrate third-party KYC verification APIs, bank account verification, credit score check APIs, and payment gateways." },
      { question: "Do you build custom accounting or loan management portals?", answer: "Yes, we build automated loan processing systems, invoice discounting portals, expense management tools, and financial dashboards." },
      { question: "How do you handle audit logging for financial transactions?", answer: "We build immutable transaction audit logs that track every financial action, user timestamp, and API request for full compliance." },
      { question: "How long does a FinTech application project take?", answer: "FinTech applications take 6 to 10 weeks depending on security audits, KYC integrations, and feature scope." }
    ]
  },
  'app/solutions/healthcare-medical/page.jsx': {
    title: "Healthcare & Medical Solutions FAQs",
    subtitle: "Questions about telemedicine apps, patient portals, and clinic software.",
    faqs: [
      { question: "What healthcare digital solutions do you build?", answer: "We build patient appointment portals, telemedicine video consultation apps, electronic health records (EHR) viewers, and clinic management tools." },
      { question: "How is patient data privacy protected?", answer: "We enforce strict encryption at rest and in transit, HIPAA compliance guidelines, role-based clinician access, and secure cloud storage." },
      { question: "Can patients book appointments and pay consultation fees online?", answer: "Yes! Patients can view real-time doctor availability, book appointments, receive SMS/WhatsApp reminders, and pay online securely." },
      { question: "Can the app integrate video calling for online consultations?", answer: "Yes, we integrate encrypted WebRTC / Twilio Video APIs for high-quality, private doctor-patient video consultations." },
      { question: "How long does it take to launch a healthcare portal?", answer: "Healthcare patient portals and telemedicine web apps are delivered in 6 to 8 weeks." }
    ]
  },
  'app/solutions/inventory-systems/page.jsx': {
    title: "Inventory Management Solutions FAQs",
    subtitle: "Questions about real-time inventory tracking and warehouse software.",
    faqs: [
      { question: "What features are included in a custom inventory management system?", answer: "Features include real-time stock level tracking, barcode/QR scanner integration, low-stock alerts, multi-warehouse sync, and supplier PO management." },
      { question: "Can the inventory system connect to our e-commerce store and marketplaces?", answer: "Yes! Stock levels automatically update across your website, Amazon, Flipkart, and physical store POS in real time." },
      { question: "Can warehouse staff scan products using mobile smartphones?", answer: "Yes, we build web-based camera barcode scanning modules so staff can scan stock directly from mobile devices without expensive hardware." },
      { question: "Does the system generate automated purchase orders when stock is low?", answer: "Yes, automated triggers alert managers and generate draft purchase orders when inventory reaches predefined reorder thresholds." },
      { question: "How long does it take to build a custom inventory system?", answer: "Custom inventory management solutions take 4 to 6 weeks to deploy." }
    ]
  },
  'app/solutions/real-estate/page.jsx': {
    title: "Real Estate & Property Solutions FAQs",
    subtitle: "Questions about property portals, real estate CRMs, and lead capture.",
    faqs: [
      { question: "What features make a great real estate property portal?", answer: "Key features include advanced location/budget search filters, interactive map integration, 360 virtual tour embeds, instant WhatsApp inquiry buttons, and lead routing." },
      { question: "Can the real estate portal capture and route leads automatically?", answer: "Yes! Inquiries auto-assign to specific property agents based on location, budget, or property type with instant WhatsApp alerts." },
      { question: "Can agents manage property listings directly from a mobile dashboard?", answer: "Yes, real estate agents get an easy mobile admin panel to upload photos, update pricing, and mark properties as sold." },
      { question: "Do you integrate Google Maps and property location amenities?", answer: "Yes, we integrate Google Maps API to display nearby schools, hospitals, metro stations, and local neighborhood highlights." },
      { question: "How long does a custom real estate portal build take?", answer: "Custom real estate websites and property CRMs take 3 to 5 weeks to launch." }
    ]
  },
  'app/solutions/smb/page.jsx': {
    title: "Small Business (SMB) Solutions FAQs",
    subtitle: "Questions about affordable web applications, local SEO, and digital growth for SMBs.",
    faqs: [
      { question: "Why is a modern custom website essential for small businesses in 2026?", answer: "Over 85% of local customers research online before buying. A fast, professional site builds credibility and turns local searches into paying leads." },
      { question: "How do your SMB solutions fit small business budgets?", answer: "We offer fixed transparent pricing packages with zero surprise fees, allowing small businesses to get enterprise-quality web tech at accessible rates." },
      { question: "Can you help our small business rank #1 in local search results?", answer: "Yes, our Local SEO packages optimize your Google Business Profile and local keywords to get your business into the top 3 Google Map results." },
      { question: "Will we be able to update our website content ourselves?", answer: "Yes! We provide an easy-to-use CMS dashboard so you can edit services, post updates, and change photos without paying a developer." },
      { question: "How quickly can a small business site be launched?", answer: "Small business websites typically launch in 2 to 3 weeks." }
    ]
  },
  'app/solutions/startups-mvp/page.jsx': {
    title: "Startup & MVP Solutions FAQs",
    subtitle: "Questions about building fast, scalable Minimum Viable Products for founders.",
    faqs: [
      { question: "What is an MVP (Minimum Viable Product)?", answer: "An MVP is a streamlined, core-feature version of your software product built to validate your idea with real users and attract investor funding quickly." },
      { question: "How fast can Geetanjali Softwares build an MVP for a startup?", answer: "We specialize in rapid startup execution, delivering production-ready MVPs in 4 to 6 weeks." },
      { question: "Which tech stack do you recommend for startup MVPs?", answer: "We recommend Next.js, TypeScript, Tailwind CSS, and Supabase / PostgreSQL for sub-second speeds, low server costs, and instant scaling." },
      { question: "Will the MVP codebase be ready to scale after seed funding?", answer: "Yes! We write clean, modular enterprise-grade code so you don't have to rewrite your app when scaling from 100 to 100,000 users." },
      { question: "Do founders retain 100% intellectual property and code ownership?", answer: "Yes, founders retain 100% full IP and code ownership upon completion. All GitHub repositories are transferred to your team." }
    ]
  }
};

let count = 0;
for (const [filePath, faqInfo] of Object.entries(FAQS_DATA)) {
  const fullPath = path.resolve(filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️ File not found: ${filePath}`);
    continue;
  }

  let code = fs.readFileSync(fullPath, 'utf8');

  // Ensure "use client" remains strictly at line 1 if present
  const hasUseClient = code.includes('"use client"') || code.includes("'use client'");
  code = code.replace(/import FaqSection from "@\/components\/FaqSection";?\n?/g, '');
  code = code.replace(/"use client";?\n?/g, '').replace(/'use client';?\n?/g, '');

  if (hasUseClient) {
    code = `"use client";\n\nimport FaqSection from "@/components/FaqSection";\n` + code;
  } else {
    code = `import FaqSection from "@/components/FaqSection";\n` + code;
  }

  // Define FAQS constant name based on file
  const constName = path.basename(path.dirname(filePath)).toUpperCase().replace(/-/g, '_') + '_FAQS';

  // Construct FAQ Constant definition
  const faqsConstDef = `\nconst ${constName} = ${JSON.stringify(faqInfo.faqs, null, 2)};\n`;

  // Insert constant definition before default export
  if (!code.includes(constName)) {
    code = code.replace(/export default function/, `${faqsConstDef}\nexport default function`);
  }

  fs.writeFileSync(fullPath, code, 'utf8');
  console.log(`✅ Fixed imports and directives for ${filePath}`);
  count++;
}

console.log(`\n🎉 Successfully updated all ${count} pages!`);
