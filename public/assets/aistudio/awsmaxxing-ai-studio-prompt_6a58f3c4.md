Build a polished, production-quality website called "awsmaxxing": "The Field Guide to Getting Maximum Value from Every AWS Dollar." The site must be SEO-first and dark-mode-only, with a design language inspired by Vercel's website (black canvas, hairline borders, Geist typography, restrained accents). Make it fully responsive.

## Framework (SEO-critical)
Prefer Next.js (App Router, TypeScript, Tailwind) with static generation (SSG) so every tip, calculator, playbook and landing page is pre-rendered as real HTML with its own metadata. If Next.js isn't available in this environment, use React + TypeScript + Vite + Tailwind with react-router, react-helmet-async, and a build-time prerender step (e.g. vite-plugin-ssg or react-snap) so crawlers receive fully rendered HTML. Do not ship a client-only SPA with a single shared <title>. Content must live in typed data files (tips, dashboards, KPIs, changelog, playbooks) and generate pages programmatically.

## Core idea
"Maxxing" does NOT mean "spend less." It means maximizing the business value of every dollar on the AWS bill. Sometimes that's cutting waste, sometimes committing harder, and sometimes spending MORE on something (memory metrics, a VPC endpoint, a newer instance generation) to save far more elsewhere. Tone: confident, practical, slightly irreverent, never fear-mongering.

## Audience
- Startup (ST): under $50k/month
- Scale-up (SU): $50k–$1M/month
- Enterprise (EN): over ~$1M/month

## Pages and information architecture (clean, keyword-rich, lowercase-hyphen URLs)

1. **/** Home: hero with tagline, the "What's your monthly AWS bill?" selector (Under $50k / $50k–$1M / Over $1M) routing to the matching playbook, the Order of Operations visual, 3–4 benchmark stat cards, featured calculators, latest "What's New" items, and an FAQ section (with FAQ schema).

2. **/playbooks/startup-30-day-plan**, **/playbooks/scale-up-90-day-program**, **/playbooks/enterprise-12-month-program**: interactive checklists with progress saved in localStorage (try/catch, graceful fallback). Each is also a fully readable, indexable article with HowTo structured data.
   - Startup 30-day plan: Week 1 Guardrails (budgets at 50/80/100% plus forecasted 100%, Cost Anomaly Detection to Slack, MFA and no long-lived keys, deny unused Regions, check credit expiry). Week 2 Visibility (enable CUR 2.0, activate 2–3 cost allocation tags, one native dashboard by service/account/usage type, opt in to Compute Optimizer and Cost Optimization Hub). Week 3 Quick wins (gp2→gp3, delete unattached volumes and old snapshots, set log retention, S3 and DynamoDB gateway endpoints, release idle public IPs, abort incomplete multipart uploads, schedule non-prod). Week 4 Rate (model the post-credit bill, small no-upfront Compute Savings Plan using Target Coverage, Bedrock budget plus prompt caching and batch if running AI). Expected outcome: 15–30% lower run-rate; results vary.
   - Scale-up 90-day program: Days 1–30 Foundation (account per environment/product, cost categories mirroring teams, tag policy, FOCUS export, Cloud Intelligence Dashboards, EC2 memory metrics, baseline Cost Efficiency score). Days 31–60 Usage optimization (idle waste to near zero, rightsize top 20 resources by spend, start Graviton, Kubernetes requests plus Karpenter consolidation, NAT/data transfer reduction, observability diet). Days 61–90 Rate and governance (layered Compute and Database Savings Plans on the leaner baseline, team showback, cost estimates in PRs, monthly review ritual, optimization backlog with realized-savings tracking).
   - Enterprise 12-month program: Q1 Data and allocation (multi-org Billing View, FOCUS as system of record, invoice reconciliation, 90%+ allocation including Kubernetes and shared costs, FinOps charter and RACI). Q2 Optimization at scale (org-wide idle and rightsizing campaigns, Compute Optimizer Automation, Graviton/generation upgrades, extended-support elimination including Windows Server 2016 and SQL Server 2016 exits). Q3 Rate and commercial (commitment portfolio with sharing preferences, Database and SageMaker Savings Plans, PPA renewal prep, Marketplace consolidation). Q4 Shift-left and AI (policy-as-code and PR cost checks, AI FinOps with unit metrics and token controls, FinOps Agent and MCP tooling, efficiency targets in team goals).

3. **/tips** Tips Library, plus **/tips/[id]-[slug]** detail pages (e.g. /tips/net-02-s3-dynamodb-gateway-endpoints). Filters: domain, audience, effort, impact, lever (rate vs usage), service. Filter state lives in query params (shareable), but the canonical URL for the filtered view points back to /tips. Each tip page: summary, how-to (console steps, Terraform snippet, CLI snippet), "how to verify the savings," related tips, linked dashboards and KPIs, sources, and a visible "Last verified" date. Seed at least 30 realistic tips (more will be added later) using this schema:

```json
{
  "id": "NET-02",
  "slug": "s3-dynamodb-gateway-endpoints",
  "title": "Add S3 and DynamoDB gateway endpoints everywhere",
  "domain": "networking",
  "audience": ["startup","scaleup","enterprise"],
  "effort": "low",
  "impact": 3,
  "lever": "usage",
  "services": ["Amazon VPC","Amazon S3","Amazon DynamoDB"],
  "summary": "Free endpoints that remove NAT Gateway processing charges for S3 and DynamoDB traffic.",
  "seo_title": "Cut NAT Gateway Costs with S3 and DynamoDB Gateway Endpoints",
  "meta_description": "Gateway endpoints are free and remove NAT processing charges for S3 and DynamoDB traffic. Setup steps, Terraform, and how to verify the savings.",
  "how_to": ["console steps","Terraform snippet","CLI snippet"],
  "verify": "CUR usage type NatGateway-Bytes falls the following week",
  "related": ["NET-03","NET-07","CON-13"],
  "dashboard": ["D08"],
  "kpi": ["data_transfer_pct"],
  "sources": ["https://aws.amazon.com/vpc/pricing/"],
  "last_verified": "2026-10-31"
}
```

   ID prefixes: ORG, VIS, TAG, GOV, COM, EC2, CON, SLS, S3, STO, DB, NET, OBS, ANA, AI, SEC, EOS, LIC, CML, AUT, CUL, STU.

   Domains: Account/org/billing foundations; Visibility and reporting; Tagging and allocation; Governance, budgets and anomaly detection; Commitments (Savings Plans and RIs); Compute (EC2); Containers (ECS/EKS/Fargate); Serverless and integration; S3; Block/file/backup storage; Databases; Networking and data transfer; Observability; Analytics and data platforms; AI/ML/GPU; Security and compliance services; Lifecycle and the "extended support tax"; Licensing and Marketplace; Commercial levers and programs; Automation and shift-left; Culture and process; Startup quick wins.

4. **Programmatic landing pages** (auto-generated from tip data, each with a unique H1, intro paragraph, and a list of matching tips):
   - /tips/domain/[domain] (e.g. /tips/domain/networking)
   - /tips/service/[service] (e.g. /tips/service/nat-gateway, /tips/service/eks, /tips/service/s3)
   - /for/startups, /for/scale-ups, /for/enterprises
   Each needs a unique intro (not templated boilerplate) so pages aren't thin or duplicate.

5. **/dashboards** gallery plus **/dashboards/[id]-[slug]** detail pages: mock Recharts visualization with fake data, widget list, KPIs, data sources, and an example Athena SQL query. Include D01 Executive Cloud Pulse, D02 Unit Economics, D03 Commitment Command Center, D04 Waste and Idle Tracker, D05 Rightsizing and Modernization, D06 Allocation Health, D07 Anomaly Feed, D08 Data Transfer and Network Map, D09 Storage Lifecycle, D10 Kubernetes and Containers, D11 AI and GenAI Spend, D12 Databases, D13 Observability Spend, D14 Lifecycle and Extended Support Tax, D15 Budget vs Forecast Variance, D16 Team Showback Scorecard, D17 Credits and Discounts Burn-down, D18 Startup Runway View, D19 Marketplace and SaaS, D20 Sustainability, D21 Account and Region Sprawl, D22 Optimization Pipeline.

6. **/calculators** index plus one page per calculator (working interactive tool PLUS 300+ words of explanatory, indexable copy: how it works, assumptions, worked example, and a 3–5 question FAQ). Labeled "estimates, verify on the AWS pricing page":
   - /calculators/nat-gateway-vs-vpc-endpoint
   - /calculators/gp2-to-gp3-savings
   - /calculators/aws-public-ipv4-cost
   - /calculators/eks-rds-extended-support-cost
   - /calculators/savings-plans-coverage-simulator
   - /calculators/database-savings-plans-vs-reserved-instances
   - /calculators/non-production-scheduling-savings
   - /calculators/bedrock-cost-estimator
   - /calculators/s3-lifecycle-intelligent-tiering
   - /calculators/startup-post-credit-cliff
   Keep all pricing constants in one editable config with a "last verified" date and source link per constant.

7. **/kpis** KPI glossary (definitions and formulas): Cost Efficiency score, Savings Plans coverage and utilization, effective savings rate, tag/allocation coverage, unit cost, data transfer % of spend, waste %, etc. One anchor per KPI.

8. **/whats-new** dated changelog of AWS cost-management features, plus an RSS/Atom feed at /feed.xml.

9. **/maturity-model** Crawl/Walk/Run table with a short self-assessment quiz that outputs the user's stage and recommended tips.

10. **/ask** Gemini-powered assistant (see below), **/sources**, **/about**, **/disclaimer**.

## SEO requirements (implement all of these)
- **Per-page metadata:** unique <title> (50–60 chars) and meta description (140–160 chars) on every page, driven by `seo_title` / `meta_description` fields in the data files, with sensible generated fallbacks. Title pattern: "{Page title} | awsmaxxing".
- **Canonical URLs** on every page, plus `robots` meta (noindex on /ask results and any filtered or search-result variants).
- **Open Graph and Twitter Card tags** on every page, with auto-generated OG images per tip, calculator and playbook (dark background, Geist type, tip ID, title, and impact chips; use Next.js `ImageResponse`/`opengraph-image` or a build-time script).
- **Structured data (JSON-LD):**
  - WebSite with SearchAction (sitewide search)
  - Organization
  - BreadcrumbList on every non-home page
  - Article on tip pages (with `dateModified` = `last_verified`)
  - HowTo on playbooks and tips with step-by-step how-to
  - FAQPage on calculators and the home page
  - SoftwareApplication / WebApplication on calculator pages
  - ItemList on listing pages
  Validate that the JSON-LD matches visible page content.
- **Crawlability:** generate `sitemap.xml` (with `lastmod`) from the data files, a `robots.txt` that references it, and clean semantic HTML: exactly one H1 per page, logical H2/H3 hierarchy, `<main>`, `<nav>`, `<article>`, `<header>`/`<footer>`, descriptive anchor text (never "click here"), and visible breadcrumbs.
- **Internal linking:** every tip links to related tips, its domain page, its service pages, its dashboards and its KPIs; every calculator links to the relevant tips and playbooks; every playbook step links to its tip page. Add "Next / Previous in this domain" links and a "Popular tips" block.
- **Target keywords** (weave naturally into titles, H1s, intros and FAQs; no keyword stuffing): "reduce AWS bill", "AWS cost optimization checklist", "AWS FinOps for startups", "NAT Gateway vs VPC endpoint cost", "gp2 to gp3 savings", "AWS Savings Plans vs Reserved Instances", "Database Savings Plans", "AWS public IPv4 cost", "EKS extended support cost", "Bedrock cost optimization", "AWS Cost Anomaly Detection setup", "Compute Optimizer rightsizing", "Graviton migration savings".
- **Performance and Core Web Vitals:** ship minimal JS, code-split heavy components (Recharts only on dashboard and calculator pages), use `next/font` or `font-display: swap` for Geist, preload critical fonts, reserve space to avoid layout shift, lazy-load below-the-fold content, and target Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO.
- **Freshness signals:** show "Last verified: {date}" on every tip, calculator and What's New entry, and keep `dateModified` in structured data and the sitemap in sync with that value.
- **Content quality:** each page needs unique, substantive copy. Calculators and landing pages must have explanatory text and FAQs, not just a widget or a list. Avoid duplicate meta descriptions.
- **Optional:** add `/llms.txt` summarizing the site structure and key resources for AI crawlers, and add `rel="noopener noreferrer"` plus descriptive `title` attributes to external source links.

## Design system: Vercel-inspired dark theme (dark mode ONLY, no light toggle)
Take inspiration from Vercel's visual language without copying their branding or logo.
- **Canvas:** pure black background (#000000) with a very subtle radial glow or faint dot/grid pattern in the hero; surfaces in near-black (#0a0a0a, #111111).
- **Borders:** 1px hairline borders everywhere (#1f1f1f–#333333) instead of heavy shadows; cards gain a lighter border (#444–#666) on hover, with an optional soft glow gradient that follows the cursor.
- **Typography:** Geist Sans for UI/body and Geist Mono for tip IDs, tags, code, KPIs and numbers (load from Google Fonts or the `geist` package). Tight letter-spacing and large, bold, high-contrast headlines (e.g. 56–72px hero with -0.04em tracking), body text in muted gray (#a1a1a1) and primary text in white or near-white (#ededed).
- **Color:** monochrome base with ONE sharp accent for highlights, links, active filters and chart emphasis. Use a vivid green (#00dc82 or similar) by default. Use semantic colors sparingly: amber for "Preview" badges and red for waste/alerts. Avoid purple-gradient SaaS clichés.
- **Buttons:** primary = white background with black text, 6px radius, subtle hover; secondary = transparent with 1px border. Pill-shaped chips for audience (ST/SU/EN), effort (Low/Med/High) and impact ($/$$/$$$) in mono type.
- **Layout:** generous whitespace, a max-width container (~1200px), a sticky top nav with a translucent blurred black background and a hairline bottom border, a command-palette style search (⌘K) over tips, calculators and playbooks, and a minimal multi-column footer.
- **Components:** bento-style grid cards for the feature sections; code blocks with a dark theme (Shiki or Prism "vercel/github-dark"), a copy button and filename tabs; stat cards with large mono numbers; a timeline component for playbooks; subtle fade/slide-in animations only (respect `prefers-reduced-motion`).
- **Charts:** Recharts styled for dark mode (transparent background, gray gridlines, accent-colored primary series, no chart junk).
- **Order of Operations visual (signature element):** an animated horizontal stepper on a dark background with connecting hairlines: 1 See it → 2 Own it → 3 Delete it → 4 Shrink it → 5 Schedule it → 6 Commit to it → 7 Re-architect it → 8 Govern it. Highlight the callout: "Commit AFTER you shrink. If you commit first, rightsizing later frees commitment instead of lowering the bill, and you've locked a discount onto oversized capacity."
- **Accessibility:** WCAG AA contrast on the dark palette, visible focus rings in the accent color, full keyboard navigation, ARIA labels on interactive widgets, skip-to-content link.

## Also include (content)
- Two-lever explainer: every line item is price × quantity. Rate optimization lowers price (Savings Plans, RIs, Spot, private pricing, credits). Usage optimization lowers quantity (idle cleanup, rightsizing, scheduling, architecture).
- Maturity table: Crawl / Walk / Run across Visibility, Allocation, Optimization, Governance.
- **Benchmark stat cards** (AWS State of Cost Efficiency Report, May 2026, 71,000+ opted-in customers): median Cost Efficiency score 83 (mean 79); only 17.7% of eligible customers have EC2 memory metrics enabled, yet enabling them is associated with 8–30 percentage points higher savings per rightsizing recommendation; customers who customize Compute Optimizer preferences score a median 3–4 points higher; very high Savings Plans coverage (95–100%) is associated with 65–80% less visible rightsizing and Graviton opportunity because commitments mask oversized resources; only 47.1% of customers with Savings Plans coverage actively rightsize.
- **What's New seed:** re:Invent 2025 (Dec 2025): Multi-source Billing View (up to 20 payers), native Billing and Cost Management Dashboards (up to 20 widgets), Data Exports for FOCUS 1.2, Split Cost Allocation Data with Kubernetes labels, Cost Anomaly Detection dimensional monitors, AWS Billing Transfer, forecasting extended to 18 months, Compute Optimizer Automation for EBS, unused NAT Gateway detection, Cost Efficiency metric in Cost Optimization Hub, RI/Savings Plans sharing preferences, Database Savings Plans (up to 35% off, 1-year no-upfront, Gen 7+ and serverless), Billing and Cost Management MCP Server. FinOps X 2026 (June 2026): AWS FinOps Agent (public preview), AI-powered cost investigation in Anomaly Detection, Credits detail page with API, six new idle-resource types in Compute Optimizer (provisioned DynamoDB, ElastiCache, MemoryDB, DocumentDB, WorkSpaces, SageMaker endpoints), Target Coverage in Savings Plans Purchase Analyzer, intelligent cost explanations in Cost Explorer, the first State of Cost Efficiency Report. Also: Free Tier overhaul (July 15, 2025: Free vs Paid plan, $100 credits plus up to $100 more for onboarding, Free plan expires after 6 months or when credits run out; older accounts stay on the 12-month model); FinOps Framework 2026 adds Executive Strategy Alignment and renames Workload Optimization to Usage Optimization.

## Gemini-powered feature
Build "Ask awsmaxxing" at /ask. The user describes their situation (monthly bill range, top services, team size, commitments) or pastes a Cost Explorer CSV. Call Gemini with a system prompt that: (a) enforces the order of operations and the "commit after you shrink" rule, (b) recommends specific tips from the tips library by ID and links to their pages, (c) returns structured JSON (prioritized actions with effort, impact, tip ID) rendered as cards, (d) reminds users to verify prices and features on AWS pages, and (e) never invents AWS prices or features it isn't sure about. Mark this page noindex and keep the API call server-side (route handler) so the key is not exposed.

## Editorial rules (build into the UI)
- Every price or feature claim shows a date stamp and a "verify on the pricing page" link.
- Preview features get a visible amber "Preview" badge.
- Visually separate AWS-published benchmarks from third-party claims.
- Footer note: "Unless stated otherwise, prices are US East (N. Virginia) on-demand list prices observed 2025–2026. Content reviewed quarterly and after every re:Invent. Research current to October 31, 2026."
- /sources lists AWS primary sources (AWS Cloud Financial Management blog, State of Cost Efficiency Report, Savings Plans FAQs, EKS and Bedrock pricing pages) and FinOps Foundation sources (FinOps Framework 2026).
- Disclaimer: not affiliated with or endorsed by AWS.

## Build order
Phase 1: design system, layout, nav, ⌘K search, SEO infrastructure (metadata helper, JSON-LD helpers, sitemap, robots, OG image generation), Home, Tips Library with 30 seed tips and generated detail pages. Phase 2: Playbooks, the NAT-vs-endpoint and gp2→gp3 calculators with full explanatory content, domain/service/audience landing pages. Phase 3: remaining calculators, dashboards gallery, KPI glossary, What's New plus RSS, maturity model, and the Gemini assistant. Scaffold the unbuilt routes with real navigation and placeholder content so they can be expanded.
