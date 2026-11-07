# awsmaxxing — The Field Guide to Getting Maximum Value from Every AWS Dollar

**Version 1.0 · Research current to October 31, 2026 · Built as the source content for awsmaxxing**

> **What “maxxing” means here.** The goal is not to spend more or to spend less; it is to maximize the business value of each dollar that hits the AWS bill. Sometimes that means cutting waste, sometimes it means committing harder, and sometimes it means spending *more* on something (memory metrics, a VPC endpoint, a better instance generation) to save far more elsewhere.

> **Pricing note.** Unless stated otherwise, prices are US East (N. Virginia) on-demand list prices observed in 2025–2026. AWS changes prices and launches features constantly; every number in this guide should carry a “verify on the pricing page” link on the website.

---

## How to use this repository

The guide has six parts. Part 1 explains what changed in 2025–2026 and why it matters. Part 2 is the operating model: the order of operations and the FinOps practice that keeps savings from evaporating. Part 3 is the tip repository, about 370 entries across 22 domains. Part 4 is the dashboard library: 22 dashboard proposals with KPIs, data sources and example SQL. Part 5 is the KPI catalog. Part 6 contains playbooks for startups, scale-ups and enterprises, plus a proposed content model for the website.

Every tip uses the same header so it can be parsed straight into a CMS or a JSON file:

`ID · Title` — followed by a tag line `[Audience · Effort · Impact]`

- **Audience:** `ST` startup (under ~~$50k/month), `SU` scale-up (~~$50k–$1M/month), `EN` enterprise (multi-org, over \~$1M/month), `All`.
- **Effort:** `Low` (minutes to a day, no architecture change), `Med` (days to weeks, some engineering), `High` (a project).
- **Impact:** `$` (nice to have), `$$` (noticeable line-item reduction), `$$$` (can move the total bill by double-digit percent).

---

# Part 1 — What’s new in AWS cost management (late 2025 to late 2026)

The native AWS tooling changed more in the last twelve months than in the previous three years. Anyone writing about AWS costs from older material will miss these.

**Re:Invent 2025 (December 2025) launches.** AWS grouped its Cloud Financial Management launches into four pillars (track and allocate, govern and operate, plan and evaluate, optimize and save) plus AI.

- **Multi-source Billing View** aggregates shared billing views from up to 20 payer accounts in one console view, removing custom pipelines for multi-org enterprises and resellers.
- **Billing and Cost Management Dashboards** are native, shareable dashboards of up to 20 widgets, with predefined and custom widgets; recipients see data according to their own access permissions.
- **Data Exports for FOCUS 1.2** adds capacity reservation fields, invoice IDs for reconciliation, and virtual currency support.
- **Split Cost Allocation Data with Kubernetes labels** lets you import native Kubernetes labels as cost allocation tags to allocate shared EKS costs down to the application.
- **Cost Anomaly Detection dimensional monitors** can track every value in a dimension (all member accounts, a cost category, or a tag key) with one monitor that auto-includes new values.
- **AWS Billing Transfer** lets one payer centrally manage billing and payments for multiple organizations, with Billing Conductor integration to protect discount terms.
- **E-invoice delivery** to SAP Ariba and Coupa with automatic PO matching.
- **Forecasting** extends to 18 months and can learn from up to 36 months of history (opt-in), with AI explanations in preview.
- **Compute Optimizer Automation** applies EBS recommendations (snapshot and delete unattached volumes, upgrade generations) on a schedule.
- **Unused NAT Gateway detection** in Compute Optimizer distinguishes idle gateways from DR/backup ones.
- **Cost Efficiency metric** in Cost Optimization Hub: a single score of potential savings over addressable spend, covering commitments, rightsizing, idle and migration opportunities.
- **RI and Savings Plans sharing preferences**: share with everyone (default), prioritized group sharing, or restricted sharing.
- **Database Savings Plans**: up to 35% off with a 1-year, no-upfront commitment, floating across database services and Regions, for Gen 7+ instances and serverless.
- **Billing and Cost Management MCP Server** and expanded **Amazon Q Developer** cost analysis bring natural-language cost queries into IDEs and the CLI.

**FinOps X 2026 (June 2026) launches.**

- **AWS FinOps Agent (public preview)**: an agentic assistant that investigates cost anomalies to root cause and answers cost questions for engineers in the tools they already use.
- **AI-powered cost investigation** inside Cost Anomaly Detection, with plain-language root-cause analysis and conversational drill-down.
- **Credits detail page** with a public API, giving one place to see and control credit balances from multiple programs.
- **Six new idle-resource types** in Compute Optimizer: provisioned DynamoDB tables, ElastiCache (Redis/Valkey), MemoryDB, DocumentDB (provisioned and serverless), WorkSpaces (63-day lookback) and SageMaker endpoints.
- **Target Coverage in Savings Plans Purchase Analyzer**: enter the coverage percentage you want and get the hourly commitment required, with the option to exclude expiring plans.
- **Intelligent cost explanations** in Cost Explorer (“Analyze with Amazon Q” on any report).
- **The AWS State of Cost Efficiency Report**, the first public benchmark built on the Cost Efficiency metric.

**Benchmark headline numbers from that report (May 2026, 71,000+ opted-in customers).** These are worth quoting on the website because they turn vague advice into targets.

- Median Cost Efficiency score is 83; mean is 79.
- Only 17.7% of eligible customers have EC2 memory metrics enabled, yet doing so is associated with 8–30 percentage points higher savings per rightsizing recommendation.
- Customers who customize Compute Optimizer preferences score a median 3–4 points higher.
- Very high Savings Plans coverage (95–100%) is associated with 65–80% less *visible* rightsizing and Graviton opportunity, because commitments mask oversized resources until renewal.
- Larger customers who combine rightsizing with commitments run about 60% more instances on newer hardware and improve their score 4x faster than those using Savings Plans alone. Only 47.1% of customers with Savings Plans coverage actively rightsize.

**Other structural changes to know.**

- **Free Tier overhaul (July 15, 2025):** new accounts choose a Free plan or Paid plan, receive $100 in credits with up to $100 more for onboarding activities, and the Free plan expires after 6 months or when credits run out. Accounts created before that date stay on the legacy 12-month model.
- **FinOps Framework 2026** adds an *Executive Strategy Alignment* capability, deepens *FinOps Scopes* (segments of spend tied to a business question), adds Technology Category pages, and renames Workload Optimization to *Usage Optimization*.
- **FOCUS** is now the default lingua franca for multi-source cost data; FOCUS 1.3 conformance certification opened in 2026.

---

# Part 2 — The operating model

## 2.1 The order of operations (the single most important idea in this guide)

Most AWS savings programs fail because they do the right things in the wrong order. The AWS benchmark data confirms the sequence that practitioners have long advocated:

1. **See it.** Turn on the data (CUR 2.0 or FOCUS export, Cost Optimization Hub, Compute Optimizer, memory metrics). You cannot optimize what you cannot attribute.
2. **Own it.** Allocate every dollar to a team, product or environment through accounts, tags and cost categories.
3. **Delete it.** Remove idle and orphaned resources. Lowest risk, fastest payback.
4. **Shrink it.** Rightsize and modernize (newer generations, Graviton, gp3, serverless where it fits).
5. **Schedule it.** Turn non-production off when nobody is using it.
6. **Commit to it.** Buy Savings Plans and reservations against the *lean* baseline, in small and frequent increments.
7. **Re-architect it.** Tackle data transfer, storage tiering and service-level design.
8. **Govern it.** Budgets, anomaly detection, policies and shift-left checks so the waste does not come back.

Commit *after* you shrink. If you commit first, rightsizing later frees commitment rather than lowering the bill, and you have locked a discount onto oversized capacity.

## 2.2 The two levers: rate and usage

Every AWS line item is `price × quantity`. **Rate optimization** lowers the price (Savings Plans, RIs, Spot, private pricing, credits). **Usage optimization** lowers the quantity (idle cleanup, rightsizing, scheduling, architecture). Rate work is usually centralized in a FinOps team; usage work is decentralized and lives with engineering. A healthy program runs both continuously.

## 2.3 The FinOps loop

The FinOps Foundation framework organizes the practice into three iterative phases: **Inform** (visibility, allocation, benchmarking, forecasting), **Optimize** (rate and usage), and **Operate** (governance, policy, automation, culture). Run the loop monthly at minimum; mature teams run it weekly for operations and quarterly for strategy.

## 2.4 Who does what

- **Engineering** owns usage: rightsizing, scheduling, architecture, tagging at creation.
- **FinOps / cloud platform** owns rates, data, tooling, policies, and the optimization backlog.
- **Finance** owns budgets, forecasts, chargeback and accruals.
- **Leadership** owns targets (unit cost, efficiency score) and the trade-off between speed and cost.
- **Procurement** owns the private pricing agreement, Marketplace and license strategy.

For startups, one founder or senior engineer usually holds all five hats; Part 6 includes a 30-day plan sized for that reality.

## 2.5 Maturity at a glance

| Stage | Visibility | Allocation | Optimization | Governance |
| --- | --- | --- | --- | --- |
| Crawl | Cost Explorer, Budgets | Account per environment | Delete idle, gp3, basic Savings Plan | Budget alerts to email |
| Walk | CUR 2.0/FOCUS in Athena, native dashboards | Tag policy, cost categories, 80%+ tag coverage | Rightsizing with memory metrics, Graviton, scheduling, layered commitments | Anomaly detection to Slack, SCP guardrails, monthly reviews |
| Run | Cloud Intelligence Dashboards, unit economics | 95%+ allocated incl. shared costs and Kubernetes | Automated remediation, architecture-level savings, AI cost controls | Shift-left cost checks in CI, efficiency targets per team, chargeback |

---

# Part 3 — The tip repository

## 3.1 Account, organization and billing foundations

**ORG-01 · Use AWS Organizations from day one** — `[All · Low · $$]` Consolidated billing aggregates usage across accounts for volume tiers and lets Savings Plans and RIs float across accounts. There is no extra charge for Organizations.

**ORG-02 · One account per workload per environment** — `[All · Med · $$]` Account boundaries are the cleanest, most tamper-proof allocation key AWS offers. Separate prod, staging and dev at minimum; split prod by product once you have more than one team.

**ORG-03 · Keep the management (payer) account empty** — `[All · Low · $]` Run no workloads there. It simplifies security, keeps billing data clean, and avoids SCPs not applying to the management account.

**ORG-04 · Create a dedicated FinOps / data-collection account** — `[SU, EN · Low · $]` Replicate CUR/FOCUS data there and host Athena, QuickSight and dashboards so FinOps staff need no payer-account access.

**ORG-05 · Delegate administrators for cost services** — `[EN · Low · $]` Use delegated administration for Compute Optimizer, Cost Optimization Hub and other services so FinOps can work without management-account credentials.

**ORG-06 · Turn on IAM access to billing for the right roles** — `[All · Low · $]` Billing is invisible to IAM users until enabled. Give engineers read-only Cost Explorer access; visibility drives behavior.

**ORG-07 · Use Billing View to share scoped cost data** — `[SU, EN · Low · $$]` Custom billing views let you share exactly the slice of cost data each stakeholder should see, inside or outside the organization, without creating new accounts or IAM gymnastics.

**ORG-08 · Consolidate multiple orgs with multi-source Billing View** — `[EN · Low · $$]` If acquisitions or business units left you with several payers, aggregate up to 20 of them in one view instead of building a pipeline.

**ORG-09 · Use Billing Transfer for payer-of-payers** — `[EN · Med · $]` Centralize invoice payment and cost management across organizations while keeping each org’s security controls independent; useful in M&A and for resellers.

**ORG-10 · Map Cost Categories to your org chart** — `[All · Low · $$]` Cost categories turn accounts, tags and services into business dimensions (team, product, cost center) that appear in Cost Explorer, Budgets, CUR and anomaly monitors. Build them once; update them as the org changes.

**ORG-11 · Use Cost Category split charges for shared costs** — `[SU, EN · Med · $$]` Distribute shared platform, networking or support charges proportionally, evenly or by fixed percentage so team totals reflect true cost.

**ORG-12 · Pick billing currency and payment method deliberately** — `[EN · Low · $]` Non-USD invoicing is available; align with treasury to avoid FX surprises. Set up e-invoicing and PO matching if procurement uses Ariba or Coupa.

**ORG-13 · Set up purchase orders and invoice routing** — `[EN · Low · $]` Mapping invoices to POs and billing contacts prevents late payment and unallocated invoices in finance systems.

**ORG-14 · Close dormant accounts properly** — `[All · Low · $]` Suspended accounts keep some resources (and charges) until closure completes. Audit for orphaned accounts quarterly.

**ORG-15 · Record account metadata as tags on accounts** — `[SU, EN · Low · $]` Tag accounts in Organizations with owner, cost center and environment so cost categories and dashboards can join on them.

**ORG-16 · Use Billing Conductor for showback with custom rates** — `[EN · Med · $]` If you resell or charge back with blended or marked-up rates, Billing Conductor produces pro-forma bills per billing group without changing what you pay AWS.

**ORG-17 · Keep a region allow-list** — `[All · Low · $]` Use an SCP to deny unused Regions. It stops forgotten resources (and crypto-mining from leaked keys) in regions nobody watches.

**ORG-18 · Protect against leaked-credential bill shock** — `[ST · Low · $$$]` Enforce MFA, no long-lived access keys, and Budgets alerts at low thresholds. Compromised keys spinning up GPU instances is still the most common startup cost catastrophe.

**ORG-19 · Track credits and their expiry** — `[ST · Low · $$]` Use the Credits detail page (and its API) to see balances, programs and expiry dates. Credits that expire unused are pure loss; plan experiments to use them before they lapse.

**ORG-20 · Understand which credits apply to what** — `[ST · Low · $$]` Many credit programs exclude Marketplace, Support, RIs or certain services. Read the terms before building a runway plan around them.

## 3.2 Visibility, data and reporting

**VIS-01 · Enable CUR 2.0 via Data Exports** — `[All · Low · $$]` CUR 2.0 is the most detailed record of your bill (hourly, resource-level, consistent schema). Turn it on even if you will not use it for months; history cannot be backfilled indefinitely.

**VIS-02 · Also export FOCUS 1.2** — `[SU, EN · Low · $$]` FOCUS gives you normalized columns like BilledCost and EffectiveCost, which makes amortized reporting far simpler and lets you merge AWS with other clouds, SaaS and AI providers.

**VIS-03 · Include resource IDs and split cost allocation data** — `[All · Low · $$]` Without resource IDs you can see that EC2 is expensive but not which instance. Split cost allocation data allocates EC2 cost to ECS tasks and EKS pods.

**VIS-04 · Store exports as Parquet and partition by billing period** — `[All · Low · $]` Parquet plus partitions cuts Athena scan costs by orders of magnitude compared with CSV.

**VIS-05 · Use the native Billing and Cost Management Dashboards first** — `[ST, SU · Low · $$]` Up to 20 widgets, shareable, permission-aware, no infrastructure. Ideal before you invest in a BI stack.

**VIS-06 · Deploy the Cloud Intelligence Dashboards (CID)** — `[SU, EN · Med · $$$]` The open-source CID framework (CUDOS, CID, KPI, Trends and more) deploys onto CUR 2.0, Athena and QuickSight in minutes with the `cid-cmd` tool or CloudFormation. Advanced dashboards add Compute Optimizer, Trusted Advisor and Health data.

**VIS-07 · Learn the five cost views** — `[All · Low · $$]` Unblended (what was charged that hour), amortized (upfront fees spread over term), net (after discounts), blended (averaged across the org; rarely useful), and effective cost (FOCUS). Use amortized or effective cost for team reporting; use unblended for invoice reconciliation.

**VIS-08 · Report net of credits, separately from gross** — `[ST · Low · $]` Credits hide real run-rate. Show both, or you will be surprised when credits end.

**VIS-09 · Use Cost Explorer hourly and resource-level granularity selectively** — `[All · Low · $]` Hourly and resource-level data in Cost Explorer carries a small charge per usage record; enable it for the accounts where it pays off, not everywhere.

**VIS-10 · Remember Cost Explorer API calls cost money** — `[All · Low · $]` Each paginated API request is billed. Pull CUR into Athena for heavy automated analysis instead of hammering the API.

**VIS-11 · Group by usage type, not just service** — `[All · Low · $$]` “EC2-Other” hides EBS, snapshots, NAT, data transfer and IPv4 charges. Usage type reveals the real drivers.

**VIS-12 · Make “EC2-Other” its own report** — `[All · Low · $$]` A standing report filtered to EC2-Other grouped by usage type catches NAT processing, idle EBS and snapshot sprawl early.

**VIS-13 · Use Cost Explorer’s “Analyze with Amazon Q”** — `[All · Low · $]` Intelligent cost explanations summarize drivers and anomalies for any report and let you ask follow-ups; a fast way to brief non-specialists.

**VIS-14 · Wire the Billing and Cost Management MCP server into your IDE** — `[SU, EN · Low · $$]` Engineers can ask cost questions and estimate changes in natural language where they code, which is the most practical form of shift-left visibility.

**VIS-15 · Pilot the AWS FinOps Agent** — `[SU, EN · Low · $$]` The preview agent investigates anomalies to root cause and answers engineer questions in their own tools. Use it to scale FinOps without scaling headcount, but keep a human reviewing actions.

**VIS-16 · Forecast with 18 months and 36 months of history** — `[SU, EN · Low · $]` Opt in to longer history so the ML forecast captures seasonality; align its horizon with your fiscal planning.

**VIS-17 · Benchmark yourself with the Cost Efficiency score** — `[All · Low · $$]` It updates daily in Cost Optimization Hub. The 2026 median is 83; set a target and track it per account.

**VIS-18 · Reconcile CUR to the invoice monthly** — `[EN · Low · $]` FOCUS 1.2 InvoiceId makes reconciliation direct. Finance trust in the data is a prerequisite for chargeback.

**VIS-19 · Keep 13+ months of history** — `[All · Low · $]` You need year-over-year comparisons for seasonality and commitment planning.

**VIS-20 · Track Marketplace spend separately** — `[SU, EN · Low · $]` Marketplace charges appear on the AWS invoice under billing entity “AWS Marketplace.” Report them alongside, not inside, infrastructure spend.

**VIS-21 · Use the Customer Carbon Footprint Tool** — `[All · Low · $]` Carbon and cost usually move together. Reporting both helps sustainability teams fund efficiency work.

**VIS-22 · Build a “top 20 movers” weekly report** — `[All · Low · $$]` Week-over-week change by service/usage type/account catches drift before month-end.

**VIS-23 · Normalize to unit costs early** — `[All · Med · $$$]` Total spend going up is not bad if revenue or usage grew faster. Cost per customer, per order, per API call or per GB processed is the metric that matters.

**VIS-24 · Show cost next to performance** — `[SU, EN · Med · $$]` Put cost on the same dashboards engineers use for latency and errors. People optimize what they see daily.

**VIS-25 · Enable cost allocation tags in the payer account** — `[All · Low · $$]` User-defined tags appear in billing only after activation, and only from that point forward. Activate early.

## 3.3 Tagging and allocation

**TAG-01 · Keep the mandatory tag set small** — `[All · Low · $$]` Four or five keys (owner/team, application, environment, cost-center, data-classification) beat twenty that nobody fills in.

**TAG-02 · Standardize key names and case** — `[All · Low · $]` `CostCenter`, `costcenter` and `cost-center` are three different tags to AWS billing. Pick one convention and enforce it.

**TAG-03 · Enforce with Tag Policies** — `[SU, EN · Low · $$]` Organizations tag policies define allowed keys and values and can block non-compliant tagging on supported resources.

**TAG-04 · Enforce at creation with IaC** — `[All · Med · $$]` Default tags in Terraform providers and CDK aspects make tagging automatic rather than a chore.

**TAG-05 · Block untagged creation with SCPs where it matters** — `[EN · Med · $$]` Deny `RunInstances` or `CreateDBInstance` without required tags in production accounts. Start in audit mode.

**TAG-06 · Backfill with Tag Editor** — `[All · Low · $]` Find untagged resources across Regions and tag them in bulk.

**TAG-07 · Activate AWS-generated tags** — `[All · Low · $]` `aws:createdBy` and `aws:cloudformation:stack-name` help attribute resources nobody tagged.

**TAG-08 · Use AppRegistry / myApplications tags** — `[SU, EN · Low · $]` Resources associated with an application get an application tag that is automatically activated for cost allocation.

**TAG-09 · Import Kubernetes labels for EKS split costs** — `[SU, EN · Low · $$$]` Pod labels such as `team` or `app` can become cost allocation tags, so shared clusters stop being a single unallocated blob.

**TAG-10 · Tag what cannot be tagged with cost categories** — `[All · Low · $$]` Some charges (support, some data transfer, tax) carry no tags. Use cost category rules and split charges to allocate them.

**TAG-11 · Measure tag coverage as a KPI** — `[All · Low · $$]` Report the percentage of cost (not of resources) that carries each mandatory tag. Target 90%+ for walk maturity, 95%+ for run.

**TAG-12 · Publish an “unallocated” line on every report** — `[All · Low · $$]` Making unallocated spend visible creates social pressure to fix it.

**TAG-13 · Tag for lifecycle: expiry dates on temporary resources** — `[All · Low · $$]` An `expires-on` tag plus a nightly Lambda that alerts or stops expired resources kills most experiment sprawl.

**TAG-14 · Propagate tags to EBS volumes and snapshots** — `[All · Low · $]` Launch templates can tag volumes at creation; Data Lifecycle Manager can copy tags to snapshots.

**TAG-15 · Tag ECS tasks and services** — `[All · Low · $]` Enable managed tags and propagate tags from the service or task definition so Fargate cost is attributable.

## 3.4 Governance, budgets and anomaly detection

**GOV-01 · Create a total-account budget on day one** — `[ST · Low · $$$]` A monthly cost budget with alerts at 50%, 80%, 100% and forecasted 100% is the cheapest insurance in AWS.

**GOV-02 · Create per-team and per-account budgets** — `[SU, EN · Low · $$]` Budgets by cost category or tag push accountability to the people who can act.

**GOV-03 · Add usage and coverage budgets, not just cost** — `[SU, EN · Low · $$]` Savings Plans utilization and coverage budgets alert when commitments are wasted or coverage drops.

**GOV-04 · Use Budget Actions carefully** — `[All · Med · $$]` Budgets can apply an IAM or SCP policy or stop EC2/RDS instances when thresholds hit. Great for sandboxes; dangerous for production.

**GOV-05 · Turn on Cost Anomaly Detection with dimensional monitors** — `[All · Low · $$$]` One managed monitor can now cover every linked account, cost category value or tag value and auto-include new ones.

**GOV-06 · Route anomalies to chat, not email** — `[All · Low · $$]` Send alerts through SNS to Slack or Teams channels owned by the responsible team.

**GOV-07 · Tune anomaly thresholds by absolute and percentage impact** — `[All · Low · $]` Use both, so small accounts are not noisy and big accounts do not hide large dollar spikes behind small percentages.

**GOV-08 · Use AI cost investigation for anomaly triage** — `[All · Low · $$]` Root-cause summaries that point to the resource and identity responsible turn a 2-hour investigation into minutes.

**GOV-09 · Run sandboxes with hard caps** — `[All · Med · $$]` Give developers sandbox accounts with budget actions that apply a deny policy at the cap, plus automated nightly cleanup.

**GOV-10 · Restrict expensive instance families by SCP** — `[SU, EN · Low · $$]` Deny GPU, high-memory or bare-metal launches outside approved accounts.

**GOV-11 · Require approval for commitments** — `[SU, EN · Low · $$]` Restrict Savings Plans and RI purchase actions to the FinOps role to avoid uncoordinated purchases.

**GOV-12 · Set service quotas as a guardrail** — `[ST · Low · $$]` Low vCPU or GPU quotas in non-production accounts cap blast radius from runaway automation.

**GOV-13 · Run a monthly cost review with engineering leads** — `[All · Low · $$$]` Thirty minutes, the same dashboard each time: trend, unit cost, top movers, open recommendations, decisions.

**GOV-14 · Keep an optimization backlog** — `[SU, EN · Low · $$]` Treat savings opportunities like tickets with owner, estimate and status. Track realized savings, not just identified.

**GOV-15 · Use AWS Config rules for cost hygiene** — `[SU, EN · Med · $]` Detect gp2 volumes, unattached EIPs, untagged resources and public IPv4 drift; remediate with SSM Automation.

**GOV-16 · Write a decommissioning standard** — `[All · Low · $$]` Every project gets an end-of-life checklist: snapshots, logs, DNS, IPs, endpoints, alarms, and IAM.

**GOV-17 · Govern commitments with sharing preferences** — `[EN · Low · $$]` Use prioritized group sharing so a business unit’s commitment benefits that unit first while unused benefit still flows to the rest of the org.

**GOV-18 · Define an exceptions process** — `[EN · Low · $]` Some resources must look idle (DR, compliance). Mark them with an exemption tag and an expiry so recommendation tools and humans can ignore them consistently.

## 3.5 Commitments: Savings Plans and Reserved Instances

**COM-01 · Know the menu** — `[All · Low · $$$]` Compute Savings Plans (EC2, Fargate, Lambda; up to 66% off; any family, size, Region, OS). EC2 Instance Savings Plans (one family in one Region; up to 72%). Database Savings Plans (up to 35%; 1-year no-upfront; floats across database services and Regions). SageMaker Savings Plans. Reserved Instances for RDS (older generations), ElastiCache, OpenSearch, Redshift and DynamoDB reserved capacity.

**COM-02 · Shrink first, then commit** — `[All · Low · $$$]` Rightsize and clean up before buying. AWS’s own benchmark shows rightsizing plus commitments compounds; commitments alone mask waste until renewal.

**COM-03 · Buy in small, frequent tranches** — `[All · Low · $$]` Monthly or quarterly purchases build a staggered ladder that tracks your baseline and avoids a single expiration cliff.

**COM-04 · Use Target Coverage in Purchase Analyzer** — `[All · Low · $$]` Specify the coverage you want (say 75%) and get the hourly commitment required, excluding plans that are about to expire.

**COM-05 · Target coverage of the steady baseline, not peak** — `[All · Low · $$$]` Typical targets: 70–85% coverage of eligible compute for stable businesses; lower for startups with volatile usage. Utilization should stay at or near 100%.

**COM-06 · Prefer Compute Savings Plans unless the family is truly stable** — `[All · Low · $$]` The extra few points of EC2 Instance SP discount are rarely worth losing flexibility to move to Graviton, a new generation, Fargate or Lambda.

**COM-07 · Layer EC2 Instance SPs under Compute SPs for rock-solid fleets** — `[SU, EN · Low · $$]` Cover the long-lived, family-locked core with Instance SPs and float Compute SPs on top.

**COM-08 · Evaluate Database Savings Plans for serverless and DynamoDB** — `[All · Low · $$$]` Aurora Serverless v2, DocumentDB, Neptune and ElastiCache Serverless had no commitment discount before; DynamoDB on-demand and provisioned throughput are also eligible.

**COM-09 · Check DB SP eligibility rules** — `[All · Low · $$]` Coverage is for Generation 7+ instances; ElastiCache coverage is Valkey only. Older-generation RDS fleets stay on RIs or should be upgraded first.

**COM-10 · Upgrade generations before committing databases** — `[All · Med · $$]` Moving RDS from r5/m5 to r7g/m7g lowers on-demand price and makes the usage eligible for Database Savings Plans.

**COM-11 · Compare DB SP to RIs on a like-for-like basis** — `[SU, EN · Low · $$]` Some 3-year RIs still beat a 1-year DB SP for very stable, old-engine fleets. Model both; flexibility has a value.

**COM-12 · Choose payment option by your cost of capital** — `[All · Low · $]` All-upfront yields the deepest discount; no-upfront preserves cash. Startups should almost always pick no-upfront.

**COM-13 · Choose 1-year vs 3-year by confidence, not discount** — `[All · Low · $$]` Three years roughly doubles the discount gap over one year but assumes architecture stability. A common pattern is 3-year for the floor you would bet the company on, 1-year above that.

**COM-14 · Use the Savings Plans return window** — `[All · Low · $]` Recently purchased small Savings Plans can be returned within a short window under specific conditions; check current terms before relying on it.

**COM-15 · Queue purchases ahead of expirations** — `[All · Low · $$]` Savings Plans can be scheduled to start when an old one expires, preventing on-demand gaps.

**COM-16 · Watch commitment expiry ladders** — `[All · Low · $$]` A calendar of expiring commitments with renewal decisions 60 days ahead is a must-have dashboard.

**COM-17 · Sell unneeded Standard RIs on the RI Marketplace** — `[SU, EN · Low · $]` EC2 Standard RIs can be sold; convertible RIs can be exchanged for different families.

**COM-18 · Use regional RIs for flexibility** — `[All · Low · $]` Regional EC2 RIs apply across AZs and sizes within a family (for Linux), unlike zonal RIs.

**COM-19 · Pair On-Demand Capacity Reservations with commitments** — `[EN · Low · $$]` ODCRs bill whether used or not; cover them with Savings Plans or regional RIs so reserved capacity is at least discounted, and release unused ones.

**COM-20 · Don’t commit to what Spot should run** — `[All · Low · $$]` Commit the steady on-demand floor; let Spot absorb flexible batch and stateless capacity.

**COM-21 · Reconsider commitments before big migrations** — `[All · Low · $$]` Planned moves to containers, serverless or Graviton change eligibility. Compute SPs survive most of these; Instance SPs and RIs may not.

**COM-22 · Allocate commitment benefits fairly** — `[SU, EN · Med · $$]` Report amortized/effective cost so teams see the discount applied to their usage, and charge unused commitment to a central FinOps line.

**COM-23 · Track Effective Savings Rate (ESR)** — `[All · Low · $$]` ESR = savings from discounts ÷ what the same usage would cost on-demand. It captures both coverage and discount depth in one number.

**COM-24 · Consider third-party commitment managers carefully** — `[SU, EN · Low · $$]` Automated commitment tools can raise ESR, often for a share of savings. Model the fee against what Target Coverage and a monthly purchase cadence achieve natively.

**COM-25 · Use the programmatic purchase APIs for repeatable buying** — `[EN · Med · $]` Script recommendations, approvals and purchases into a monthly workflow with change control.

## 3.6 Compute: EC2

**EC2-01 · Opt in to Compute Optimizer at the organization level** — `[All · Low · $$$]` It is free for standard recommendations and feeds Cost Optimization Hub with rightsizing, idle and Graviton findings.

**EC2-02 · Enable memory metrics** — `[All · Med · $$$]` Install the CloudWatch agent (or ingest from a supported observability tool). Without memory data Compute Optimizer stays conservative or silent; with it, savings per recommendation rise 8–30 points in AWS’s benchmark, yet fewer than 1 in 5 eligible customers do this.

**EC2-03 · Customize recommendation preferences** — `[All · Low · $$]` Set lookback period, CPU headroom and preferred families (for example, “Graviton only” or “exclude burstable”) so engineers trust the recommendations.

**EC2-04 · Consider enhanced infrastructure metrics** — `[SU, EN · Low · $]` The paid 93-day lookback captures monthly and quarterly cycles; worth it for large or seasonal fleets.

**EC2-05 · Terminate idle instances** — `[All · Low · $$]` Compute Optimizer flags an EC2 instance as idle when peak CPU stays under 5% and network I/O under 5 MB/day for 14 days. Snapshot, tag, stop, then terminate after a grace period.

**EC2-06 · Rightsize one size down, then re-measure** — `[All · Low · $$]` Each size step roughly halves cost. Move one step at a time with load testing.

**EC2-07 · Move to the latest generation** — `[All · Med · $$]` Newer generations typically deliver better price-performance at the same or lower hourly price. Gen 7+ also unlocks Database Savings Plans on the database side.

**EC2-08 · Migrate to Graviton** — `[All · Med · $$$]` Graviton instances usually cost less per hour than comparable x86 and often perform better. Interpreted languages, Java, Go, containers and most open-source databases port easily. Benchmark your workload.

**EC2-09 · Prefer AMD where Graviton is not possible** — `[All · Low · $]` AMD variants (the “a” suffix) are typically cheaper per hour than the Intel equivalent.

**EC2-10 · Use burstable instances only for genuinely bursty work** — `[All · Low · $]` T-family instances in unlimited mode can cost more than a fixed instance if they run hot constantly. Watch CPU credit surplus charges.

**EC2-11 · Run fault-tolerant work on Spot** — `[All · Med · $$$]` Up to 90% off on-demand. Batch, CI/CD, rendering, stateless web tiers behind load balancers, and big-data workers are prime candidates.

**EC2-12 · Diversify Spot across many instance types** — `[All · Low · $$]` Use attribute-based instance selection and the price-capacity-optimized allocation strategy to reduce interruptions.

**EC2-13 · Handle the 2-minute notice and rebalance signals** — `[All · Med · $]` Drain gracefully on interruption notices and use capacity rebalancing in Auto Scaling groups.

**EC2-14 · Mix On-Demand and Spot in one Auto Scaling group** — `[All · Low · $$]` Keep a small on-demand base (covered by Savings Plans) and fill the rest with Spot.

**EC2-15 · Use predictive and target-tracking scaling** — `[All · Med · $$]` Scale on real demand; predictive scaling pre-warms for daily patterns so you can run leaner minimums.

**EC2-16 · Schedule non-production** — `[All · Low · $$$]` Running dev/test 12 hours on weekdays instead of 24/7 cuts its compute by about 65%. Use Instance Scheduler on AWS, Systems Manager, or simple EventBridge schedules.

**EC2-17 · Hibernate instead of keeping warm** — `[All · Low · $]` Hibernation preserves memory state so you can stop long-boot instances overnight.

**EC2-18 · Kill unattached Elastic IPs and public IPv4 sprawl** — `[All · Low · $]` Every public IPv4 address costs $0.005/hour (about $3.65/month) whether in use or idle. Use VPC IP Address Manager’s Public IP Insights to find them.

**EC2-19 · Use instance store for scratch data** — `[All · Low · $]` NVMe instance store is included in the instance price; using it for temp/cache data avoids paying for extra EBS.

**EC2-20 · Optimize CPUs for per-core licensing** — `[EN · Low · $$]` Disabling hyper-threading or reducing active cores via Optimize CPUs lowers license counts for per-core software like SQL Server or Oracle.

**EC2-21 · Turn off detailed monitoring you don’t use** — `[All · Low · $]` One-minute detailed monitoring is billed per metric; enable it only where autoscaling needs it.

**EC2-22 · Clean up AMIs and their snapshots** — `[All · Low · $]` Deregistering an AMI does not delete its snapshots. Use Recycle Bin rules plus a periodic sweep.

**EC2-23 · Use EC2 Capacity Blocks for short GPU jobs** — `[SU, EN · Low · $$]` Reserve GPU capacity for days or weeks for training runs instead of holding on-demand GPUs or long commitments.

**EC2-24 · Consider Lambda Managed Instances for steady functions** — `[SU, EN · Med · $$]` Running Lambda functions on managed EC2 capacity makes them eligible for EC2 pricing models such as Savings Plans for steady-state workloads.

**EC2-25 · Reassess Dedicated Hosts** — `[EN · Med · $$]` Only keep them where licensing or compliance requires; otherwise shared tenancy is cheaper. If you need them, pack them densely and use Host Resource Groups.

## 3.7 Containers: ECS, EKS and Fargate

**CON-01 · Allocate shared cluster cost with split cost allocation data** — `[All · Low · $$$]` Turn it on for ECS and EKS so pod and task costs appear in CUR with their labels.

**CON-02 · Set requests that match reality** — `[All · Med · $$$]` Over-requested CPU and memory are the largest Kubernetes waste source. Use VPA recommendations or Compute Optimizer’s ECS-on-Fargate rightsizing.

**CON-03 · Use Karpenter for node provisioning** — `[SU, EN · Med · $$$]` Karpenter consolidates workloads onto fewer, right-sized nodes and mixes Spot and Graviton automatically.

**CON-04 · Enable consolidation and empty-node removal** — `[All · Low · $$]` Idle nodes are the second-biggest container waste. Consolidate aggressively outside peak hours.

**CON-05 · Run stateless pods on Spot** — `[All · Low · $$]` Spot node pools for stateless services and batch; on-demand for stateful and system pods.

**CON-06 · Build multi-arch images** — `[All · Med · $$]` Multi-architecture images let the scheduler place pods on cheaper Graviton nodes without code changes.

**CON-07 · Evaluate EKS Auto Mode honestly** — `[SU · Low · $]` Auto Mode adds a management fee on top of EC2. It can be cheaper than the engineering time it replaces for small teams, more expensive for large well-run platforms.

**CON-08 · Stay off EKS extended support** — `[All · Med · $$]` The control plane costs $0.10/cluster-hour in standard support and $0.60 in extended support, six times more (about $438/month per cluster). Upgrade inside the 14-month standard window.

**CON-09 · Consolidate small clusters** — `[SU, EN · High · $$]` Each cluster carries control plane fees, add-ons, NAT and observability overhead. Fewer, larger multi-tenant clusters are usually cheaper.

**CON-10 · Fargate for spiky or small, EC2 for dense and steady** — `[All · Low · $$]` Fargate removes idle node cost but charges more per vCPU-hour; it wins at low utilization and loses at high bin-packing density.

**CON-11 · Use Fargate Spot for interruptible tasks** — `[All · Low · $$]` Steep discounts for batch and queue workers that tolerate interruption.

**CON-12 · Use Graviton for Fargate** — `[All · Low · $]` ARM64 Fargate is cheaper per vCPU and GB than x86.

**CON-13 · Pull images through VPC endpoints** — `[All · Low · $$]` ECR pulls through a NAT Gateway pay $0.045/GB processing. Interface endpoints for ECR plus the free S3 gateway endpoint for layers cut that sharply.

**CON-14 · Keep images small and cached** — `[All · Low · $]` Smaller images reduce pull data, start time and storage. Use ECR lifecycle policies to expire old tags.

**CON-15 · Keep traffic zone-local** — `[All · Med · $$]` Topology-aware routing and zone-aware service meshes avoid $0.01/GB each-way cross-AZ charges between chatty microservices.

**CON-16 · Right-size DaemonSets** — `[All · Low · $]` Logging, security and monitoring agents run on every node; their requests multiply by node count.

**CON-17 · Schedule dev clusters to zero** — `[All · Low · $$]` Scale node groups to zero overnight and on weekends for non-production clusters.

**CON-18 · Watch persistent volume sprawl** — `[All · Low · $]` Deleting a StatefulSet does not delete its EBS volumes by default; sweep released PVs.

**CON-19 · Use ECS capacity providers with managed scaling** — `[All · Low · $$]` Let ECS scale the underlying ASG to fit tasks instead of running fixed node counts.

**CON-20 · Track cost per namespace and per request** — `[SU, EN · Med · $$]` Join split cost data with request metrics to produce unit cost per service.

## 3.8 Serverless and integration

**SLS-01 · Run Lambda on arm64** — `[All · Low · $$]` Arm-based Lambda is priced lower per GB-second and often runs faster.

**SLS-02 · Power-tune memory** — `[All · Low · $$]` Lambda allocates CPU proportionally to memory. The open-source AWS Lambda Power Tuning tool finds the cheapest memory setting; sometimes more memory is cheaper because it runs faster.

**SLS-03 · Cut duration, not just invocations** — `[All · Med · $]` Reuse connections, initialize SDK clients outside the handler, and avoid synchronous waiting on other services.

**SLS-04 · Avoid Lambda calling Lambda synchronously** — `[All · Med · $]` You pay for both functions while one waits. Use Step Functions, queues or events.

**SLS-05 · Use Step Functions Express for high-volume short workflows** — `[All · Low · $$]` Standard workflows bill per state transition; Express bills by duration and requests and is far cheaper at high volume.

**SLS-06 · Batch SQS and Kinesis event sources** — `[All · Low · $]` Larger batch sizes and batching windows reduce invocations.

**SLS-07 · Filter events at the source** — `[All · Low · $]` Event source mapping filters and EventBridge rules stop you paying to invoke functions that immediately exit.

**SLS-08 · Use HTTP APIs instead of REST APIs in API Gateway when you can** — `[All · Low · $$]` HTTP APIs are substantially cheaper per million requests for the many use cases that don’t need REST-only features.

**SLS-09 · Cache at API Gateway or CloudFront** — `[All · Low · $]` Caching removes backend invocations entirely for repeatable reads.

**SLS-10 · Set log retention for every function** — `[All · Low · $$]` Lambda log groups default to never expire. See OBS tips.

**SLS-11 · Watch provisioned concurrency utilization** — `[All · Low · $$]` Provisioned concurrency bills whether used or not; schedule it to business hours and size it to p95, not peak.

**SLS-12 · Cover steady Lambda and Fargate with Compute Savings Plans** — `[All · Low · $$]` Both are eligible; many startups forget this.

**SLS-13 · Prefer SNS/SQS fan-out over polling** — `[All · Low · $]` Long polling and event-driven design cut empty receive requests.

**SLS-14 · Use SQS long polling** — `[All · Low · $]` Set `ReceiveMessageWaitTimeSeconds` to 20 to avoid paying for empty polls.

**SLS-15 · Know when serverless stops being cheaper** — `[SU, EN · Med · $$]` Consistently high-throughput functions may be cheaper on containers or Lambda Managed Instances. Recheck the math as traffic grows.

## 3.9 Object storage: Amazon S3

**S3-01 · Turn on S3 Storage Lens** — `[All · Low · $$]` The free tier shows bucket growth, incomplete multipart uploads and noncurrent versions across the org; advanced metrics add activity and recommendations.

**S3-02 · Default to Intelligent-Tiering for unknown access patterns** — `[All · Low · $$$]` It moves objects between Frequent, Infrequent (about 40% cheaper after 30 days) and Archive Instant Access tiers (a further 68% cheaper after 90 days) automatically, with no retrieval fees.

**S3-03 · Remember the Intelligent-Tiering fine print** — `[All · Low · $]` There is a small per-object monitoring fee, and objects smaller than 128 KB are not monitored or tiered. Huge counts of tiny objects may be better left in Standard or compacted.

**S3-04 · Enable the optional archive tiers** — `[All · Low · $$]` Opt in to Archive Access and Deep Archive Access tiers within Intelligent-Tiering for data that can tolerate asynchronous retrieval.

**S3-05 · Use lifecycle rules for known patterns** — `[All · Low · $$]` Logs and backups with predictable aging should transition explicitly to Standard-IA, Glacier Instant Retrieval, Flexible Retrieval or Deep Archive, then expire.

**S3-06 · Respect minimum storage durations** — `[All · Low · $]` Standard-IA bills at least 30 days; Glacier Instant and Flexible Retrieval 90 days; Deep Archive 180 days. Moving short-lived data into them costs more.

**S3-07 · Respect minimum object sizes** — `[All · Low · $]` IA classes bill a 128 KB minimum per object. Aggregate small objects before tiering.

**S3-08 · Watch lifecycle transition request costs** — `[All · Low · $]` Transitions are billed per object. Transitioning billions of tiny objects can cost more than it saves.

**S3-09 · Abort incomplete multipart uploads** — `[All · Low · $$]` Add a lifecycle rule to abort them after 7 days. They are invisible in the console but fully billed.

**S3-10 · Expire noncurrent versions** — `[All · Low · $$]` Versioning without a noncurrent-version expiration rule silently doubles storage over time.

**S3-11 · Delete expired delete markers** — `[All · Low · $]` Expired object delete markers slow listing and add clutter; a lifecycle rule removes them.

**S3-12 · Use S3 Bucket Keys with SSE-KMS** — `[All · Low · $$]` Bucket Keys cut KMS request costs dramatically for high-request buckets.

**S3-13 · Use the free S3 gateway endpoint** — `[All · Low · $$$]` Traffic from private subnets to S3 through a NAT Gateway pays $0.045/GB processing; the gateway endpoint makes it free.

**S3-14 · Keep compute and buckets in the same Region** — `[All · Low · $$]` Cross-Region reads incur inter-Region transfer charges.

**S3-15 · Review replication** — `[SU, EN · Low · $$]` Cross-Region Replication doubles storage and adds transfer and replication time control fees. Replicate only prefixes that need it.

**S3-16 · Use Requester Pays for shared datasets** — `[SU, EN · Low · $]` Shift download costs to the consumer for public or partner data.

**S3-17 · Reduce request costs** — `[All · Med · $]` LIST and PUT requests add up for small-object workloads. Batch writes, use larger objects, and cache reads behind CloudFront.

**S3-18 · Compress and use columnar formats** — `[All · Med · $$]` Parquet/ORC with compression shrinks storage and dramatically reduces Athena/Redshift Spectrum scan costs.

**S3-19 · Use Intelligent-Tiering for S3 Tables** — `[SU, EN · Low · $]` Managed Iceberg tables in S3 Tables can now tier automatically without retrieval fees.

**S3-20 · Consider S3 Express One Zone only for latency** — `[SU, EN · Low · $]` It lowers request costs and latency for hot data but storage is pricier and single-AZ; use it for scratch and hot caches, not as a default.

**S3-21 · Find and delete orphaned buckets** — `[All · Low · $]` Sort buckets by size and last access in Storage Lens; empty ones from old projects still accrue request and versioning charges.

## 3.10 Block, file and backup storage

**STO-01 · Migrate gp2 to gp3** — `[All · Low · $$$]` gp3 is about 20% cheaper per GB than gp2 and includes a 3,000 IOPS / 125 MB/s baseline independent of size. The change is live, with no downtime.

**STO-02 · Stop overprovisioning size to buy IOPS** — `[All · Low · $$]` With gp3, provision IOPS and throughput separately instead of inflating volume size.

**STO-03 · Review io1/io2 volumes** — `[All · Low · $$]` Many provisioned-IOPS volumes run far below their provisioned IOPS. gp3 handles up to 16,000 IOPS.

**STO-04 · Delete unattached EBS volumes** — `[All · Low · $$]` Compute Optimizer Automation can snapshot and delete them on a schedule with rollback support.

**STO-05 · Use sc1/st1 for large sequential cold data** — `[All · Low · $]` Throughput-optimized and cold HDD volumes are far cheaper per GB for logs and big sequential scans.

**STO-06 · Manage snapshots with Data Lifecycle Manager** — `[All · Low · $$]` Automate creation and, crucially, deletion. Unmanaged snapshots are one of the most common silent costs.

**STO-07 · Archive long-retention snapshots** — `[All · Low · $$]` EBS Snapshots Archive is about 75% cheaper for snapshots kept 90+ days (for example, yearly compliance copies).

**STO-08 · Use Recycle Bin with short retention** — `[All · Low · $]` Protects against accidental deletes without keeping everything forever.

**STO-09 · Use AWS Backup policies centrally** — `[SU, EN · Med · $$]` Organization backup policies standardize retention and stop teams from keeping daily backups for years.

**STO-10 · Use cold storage tiers in AWS Backup** — `[All · Low · $]` Supported resources can move to cold storage after a set period at a lower rate (subject to minimum retention).

**STO-11 · EFS: enable lifecycle management to IA and Archive** — `[All · Low · $$]` Most file systems have a hot minority of files. Lifecycle tiering cuts storage costs substantially.

**STO-12 · EFS: use Elastic Throughput unless steady and heavy** — `[All · Low · $]` Pay for throughput when used rather than provisioning it.

**STO-13 · EFS One Zone for non-critical data** — `[All · Low · $]` Single-AZ storage classes are cheaper for dev, build caches and reproducible data.

**STO-14 · FSx: right-size throughput capacity and enable data deduplication** — `[SU, EN · Low · $$]` FSx for Windows supports deduplication and HDD tiers; FSx for NetApp ONTAP and OpenZFS offer capacity pool tiering.

**STO-15 · Remove EBS from stopped instances you don’t need** — `[All · Low · $]` Stopped instances still pay for attached volumes.

## 3.11 Databases

**DB-01 · Turn on Compute Optimizer for RDS and Aurora** — `[All · Low · $$]` It rightsizes instances and storage and flags idle databases with no connections.

**DB-02 · Stop idle databases, but know they restart** — `[All · Low · $$]` Stopped RDS and DocumentDB instances restart automatically after 7 days. For long idleness, snapshot and delete.

**DB-03 · Move to Graviton database instances** — `[All · Med · $$$]` Graviton RDS/Aurora instances are typically cheaper with better price-performance, and Gen 7+ makes them eligible for Database Savings Plans.

**DB-04 · Choose Aurora I/O-Optimized when I/O is a big share** — `[SU, EN · Low · $$]` When I/O charges exceed roughly a quarter of an Aurora cluster’s cost, the I/O-Optimized configuration usually wins. Switch once and re-measure.

**DB-05 · Use Aurora Serverless v2 for variable or dev workloads** — `[All · Low · $$]` It scales in fine-grained capacity units and can pause at zero capacity for idle environments. Serverless usage is now eligible for Database Savings Plans.

**DB-06 · Rightsize read replicas** — `[All · Low · $$]` Replicas created for a peak that never returned are common waste. Check connections and CPU.

**DB-07 · Reconsider Multi-AZ in non-production** — `[All · Low · $$]` Multi-AZ roughly doubles instance cost. Dev and test rarely need it.

**DB-08 · Migrate RDS gp2 storage to gp3** — `[All · Low · $$]` Same benefits as EBS: decoupled IOPS and lower price.

**DB-09 · Trim backup retention and manual snapshots** — `[All · Low · $]` Automated backups beyond the free allocation and old manual snapshots bill per GB-month.

**DB-10 · Avoid RDS Extended Support charges** — `[All · Med · $$$]` When an engine major version passes end of standard support, RDS auto-enrolls it and adds a per-vCPU-hour charge that doubles in year three. Upgrade before the deadline, or budget for it explicitly.

**DB-11 · Disable Extended Support enrollment where allowed** — `[All · Low · $$]` For new clusters you can opt out at creation; that forces an upgrade decision rather than a silent surcharge.

**DB-12 · Use license-included vs BYOL deliberately** — `[EN · Med · $$]` For SQL Server and Oracle, compare license-included RDS with BYOL on EC2 or RDS Custom. License often dominates compute cost.

**DB-13 · Use SQL Server Developer/Express editions in non-production** — `[All · Low · $$]` Enterprise edition in dev and test is a classic and expensive mistake.

**DB-14 · DynamoDB: pick the right capacity mode** — `[All · Low · $$]` On-demand is simplest and was repriced substantially lower in late 2024; provisioned with auto scaling wins for steady, predictable traffic.

**DB-15 · DynamoDB: use Standard-IA table class for cold tables** — `[All · Low · $$]` Much lower storage price with higher request price; ideal when storage dominates.

**DB-16 · DynamoDB: use TTL to delete for free** — `[All · Low · $]` TTL deletions do not consume write capacity.

**DB-17 · DynamoDB: review GSIs** — `[All · Low · $$]` Each global secondary index duplicates writes and storage. Project only needed attributes and drop unused indexes.

**DB-18 · ElastiCache: switch to Valkey** — `[All · Med · $$]` Valkey is priced lower than Redis OSS on ElastiCache, and only Valkey is eligible for Database Savings Plans.

**DB-19 · ElastiCache: use data tiering for large caches** — `[SU, EN · Low · $]` r6gd-class nodes tier less-used data to SSD at a lower cost per GB.

**DB-20 · Delete idle caches, document stores and graph clusters** — `[All · Low · $$]` Compute Optimizer now detects idle ElastiCache, MemoryDB, DocumentDB and provisioned DynamoDB tables; start with its findings.

**DB-21 · Consolidate small databases** — `[SU, EN · Med · $$]` Ten t-class databases for ten microservices may cost more than one well-sized cluster with per-service schemas.

**DB-22 · Use RDS Proxy only where connection churn demands it** — `[All · Low · $]` It is billed per vCPU of the underlying database; worth it for Lambda-heavy workloads, waste elsewhere.

## 3.12 Networking and data transfer

**NET-01 · Draw your data-transfer map** — `[All · Med · $$$]` List every flow (internet egress, cross-AZ, cross-Region, NAT, endpoints, Direct Connect) with GB/month. Data transfer is the most misunderstood line on the bill.

**NET-02 · Add S3 and DynamoDB gateway endpoints everywhere** — `[All · Low · $$$]` Free, and they remove NAT Gateway processing ($0.045/GB) for the two most common destinations.

**NET-03 · Add interface endpoints for high-volume AWS APIs** — `[All · Low · $$]` Interface endpoints cost about $0.01/hour per AZ plus $0.01/GB, much less than NAT processing for ECR, CloudWatch Logs, STS, Secrets Manager and SSM at volume. Do the break-even math for low-volume services.

**NET-04 · Share endpoints centrally** — `[EN · Med · $$]` Host interface endpoints in a shared-services VPC with Route 53 Resolver rules instead of per-VPC duplicates.

**NET-05 · Remove unused NAT Gateways** — `[All · Low · $$]` Each costs about $33/month before traffic. Compute Optimizer now flags unused NAT Gateways and separates DR ones.

**NET-06 · Right-size NAT topology** — `[All · Med · $$]` One NAT per AZ avoids cross-AZ charges and is more resilient; one shared NAT is cheaper for low-traffic dev. Pick per environment.

**NET-07 · Find who is pushing traffic through NAT** — `[All · Med · $$]` Use VPC Flow Logs (sampled) to identify top talkers: package mirrors, container registries, telemetry agents and third-party APIs.

**NET-08 · Cache dependencies inside the VPC** — `[All · Med · $$]` Pull-through caches for container images and artifact repositories avoid paying NAT and egress repeatedly for the same packages.

**NET-09 · Release idle public IPv4 addresses** — `[All · Low · $$]` At $0.005 per IP-hour, a fleet with hundreds of public IPs pays thousands per year. Put instances in private subnets behind load balancers.

**NET-10 · Adopt IPv6 where possible** — `[SU, EN · High · $$]` IPv6 addresses carry no hourly charge, and egress-only internet gateways have no processing fee.

**NET-11 · Bring your own IP (BYOIP) for large estates** — `[EN · Med · $]` BYOIP addresses avoid the AWS public IPv4 charge.

**NET-12 · Keep chatty services in one AZ where resilience allows** — `[All · Med · $$]` Cross-AZ traffic costs $0.01/GB in each direction. Batch jobs and dev environments rarely need multi-AZ spread.

**NET-13 · Prefer AZ-local reads** — `[All · Med · $$]` Read from same-AZ replicas, use AZ-aware client routing for Kafka (rack awareness) and Elasticsearch.

**NET-14 · Put CloudFront in front of public content** — `[All · Low · $$$]` Origin fetches from AWS origins to CloudFront are free, CloudFront egress is usually cheaper than direct EC2/S3 egress, and caching cuts origin load.

**NET-15 · Evaluate CloudFront flat-rate plans** — `[ST, SU · Low · $$]` Bundled monthly plans that include CDN, WAF and DDoS protection can make costs predictable for small and mid-sized sites; compare against pay-as-you-go for your traffic.

**NET-16 · Use CloudFront security savings bundle or committed pricing** — `[SU, EN · Low · $$]` Commit to CloudFront spend for a discount if traffic is steady; enterprise private pricing can apply to CloudFront.

**NET-17 · Compress responses** — `[All · Low · $$]` Gzip/Brotli at CloudFront or the application cuts egress bytes 60–80% for text.

**NET-18 · Avoid cross-Region chatter** — `[All · Med · $$]` Inter-Region transfer is charged per GB. Replicate only what DR and latency truly require.

**NET-19 · Use Direct Connect for heavy hybrid traffic** — `[EN · High · $$$]` Data transfer out over Direct Connect is priced well below internet egress; at tens of TB/month the port fee pays back fast.

**NET-20 · Right-size Transit Gateway usage** — `[EN · Med · $$]` TGW charges per attachment-hour and per GB processed. VPC peering has no processing charge for same-AZ traffic and may be cheaper for a few high-volume pairs.

**NET-21 · Allocate shared network costs fairly** — `[EN · Low · $]` Use Transit Gateway and Network Firewall flexible cost allocation (metering policies) to charge data processing to the consuming accounts.

**NET-22 · Delete idle load balancers** — `[All · Low · $$]` Each ALB/NLB carries an hourly fee plus capacity units. Old environments leave them behind.

**NET-23 · Consolidate ALBs with host and path rules** — `[All · Med · $$]` One ALB can front many services; you do not need one per microservice.

**NET-24 · Watch Global Accelerator and VPN hourly fees** — `[All · Low · $]` Idle accelerators and VPN connections bill per hour regardless of traffic.

**NET-25 · Use the free 100 GB monthly egress allowance strategically** — `[ST · Low · $]` AWS includes a monthly free internet egress allowance across services; startups can keep small apps nearly free on egress.

**NET-26 · Mind Route 53 query and health check costs** — `[All · Low · $]` Alias records to AWS resources are free to query; health checks on non-AWS endpoints cost more.

## 3.13 Observability

**OBS-01 · Set retention on every CloudWatch log group** — `[All · Low · $$$]` Log groups never expire by default. A 30- to 90-day default (and archive to S3 if needed) is one of the fastest wins on many bills.

**OBS-02 · Use the Infrequent Access log class** — `[All · Low · $$]` Roughly half the ingestion price for logs you rarely query interactively, such as audit or debug logs.

**OBS-03 · Reduce log volume at the source** — `[All · Med · $$$]` Drop DEBUG in production, sample high-volume access logs, and stop logging full request/response bodies.

**OBS-04 · Route vended logs straight to S3** — `[All · Low · $$]` VPC Flow Logs and other vended logs delivered to S3 (in Parquet) are much cheaper than CloudWatch Logs ingestion.

**OBS-05 · Watch custom metric cardinality** — `[All · Low · $$]` Each unique metric name and dimension combination is a billable metric. High-cardinality dimensions such as user ID explode costs.

**OBS-06 · Use Embedded Metric Format thoughtfully** — `[All · Low · $]` EMF is convenient but every dimension set creates metrics. Aggregate before emitting.

**OBS-07 · Batch PutMetricData and prefer GetMetricData** — `[All · Low · $]` API request charges add up for chatty agents and dashboards.

**OBS-08 · Delete unused alarms and dashboards** — `[All · Low · $]` Alarms and custom dashboards beyond the free count are billed monthly.

**OBS-09 · Use Contributor Insights and Logs Insights selectively** — `[All · Low · $]` Logs Insights bills per GB scanned; narrow time ranges and log groups.

**OBS-10 · Don’t duplicate telemetry** — `[SU, EN · Med · $$]` Sending the same logs to CloudWatch and a third-party tool doubles ingestion. Choose a system of record per signal.

**OBS-11 · Use subscription filters to ship only what you need** — `[All · Low · $]` Filter before forwarding to SIEMs and observability vendors that charge by volume.

**OBS-12 · CloudTrail: one organization trail for management events** — `[All · Low · $$]` The first copy of management events is free; additional trails that duplicate it are not.

**OBS-13 · CloudTrail: scope data events** — `[All · Low · $$]` S3 and Lambda data events can be huge. Use advanced event selectors to log only sensitive buckets or functions.

**OBS-14 · X-Ray: sample** — `[All · Low · $]` Use sampling rules rather than tracing every request.

**OBS-15 · Check Container Insights and Application Signals pricing** — `[All · Low · $]` Enhanced observability features charge per observation or metric; enable deliberately.

## 3.14 Analytics and data platforms

**DAT-01 · Athena: partition, compress, and use columnar formats** — `[All · Med · $$$]` Athena bills per TB scanned. Parquet plus partition pruning routinely cuts scans by 90%+.

**DAT-02 · Athena: set workgroup data-scan limits** — `[All · Low · $$]` Per-query and per-workgroup limits stop runaway queries.

**DAT-03 · Athena: consider capacity reservations for heavy steady use** — `[EN · Low · $$]` Provisioned capacity can be cheaper than per-TB pricing for constant query loads; newer controls make reservations easier to manage.

**DAT-04 · Glue: right-size DPUs and use auto scaling** — `[All · Low · $$]` Default DPU counts are often too high. Enable auto scaling and use Flex execution for non-urgent jobs.

**DAT-05 · Glue: stop interactive sessions and dev endpoints** — `[All · Low · $]` Set idle timeouts; forgotten sessions bill continuously.

**DAT-06 · EMR: run task nodes on Spot and use Graviton** — `[All · Low · $$$]` Instance fleets with Spot for task nodes and Graviton instances cut EMR compute dramatically.

**DAT-07 · EMR Serverless or EMR on EKS for spiky jobs** — `[All · Med · $$]` Pay per job instead of keeping clusters warm.

**DAT-08 · Redshift: pause, resize and use Serverless for intermittent use** — `[All · Low · $$]` Pause provisioned clusters off-hours; Serverless bills only when queries run, with max RPU limits as a guardrail.

**DAT-09 · Redshift: reserve RA3 nodes for steady clusters** — `[SU, EN · Low · $$]` Reserved nodes give large discounts for always-on warehouses.

**DAT-10 · Redshift: offload cold data to S3** — `[SU, EN · Med · $$]` Use Spectrum or data sharing to keep only hot data on managed storage.

**DAT-11 · OpenSearch: use the right instance and storage tiers** — `[All · Med · $$]` Newer OpenSearch-optimized instances, UltraWarm and cold storage reduce cost for log analytics with long retention.

**DAT-12 · OpenSearch: delete old indices with ISM** — `[All · Low · $$]` Index State Management policies roll indices through tiers and delete them automatically.

**DAT-13 · Kinesis Data Streams: pick on-demand vs provisioned by traffic shape** — `[All · Low · $$]` On-demand is simple for spiky streams; provisioned shards are cheaper for steady throughput.

**DAT-14 · MSK: evaluate Express brokers and tiered storage** — `[SU, EN · Med · $$]` Tiered storage moves older Kafka data to cheaper storage; right-size brokers to partition and throughput needs.

**DAT-15 · QuickSight: manage reader pricing and idle authors** — `[All · Low · $]` Audit inactive authors and choose the reader pricing model that fits usage.

## 3.15 AI, ML and GPU workloads

**AI-01 · Treat AI as its own FinOps scope** — `[All · Low · $$$]` The FinOps Foundation reports nearly all practices now track AI spend. Give it dedicated budgets, anomaly monitors and unit metrics (cost per conversation, per document, per agent task).

**AI-02 · Pick the smallest model that meets quality** — `[All · Med · $$$]` Model choice is the biggest Bedrock cost lever. Evaluate with a test set; most traffic does not need the frontier model.

**AI-03 · Use prompt caching** — `[All · Low · $$$]` Cache stable prefixes (system prompts, tool definitions, documents) to cut cached-input token costs by up to 90% on supported models and reduce latency.

**AI-04 · Use batch inference for anything asynchronous** — `[All · Low · $$$]` Bedrock batch inference is priced at 50% of on-demand for supported models. Enrichment, classification, summarization and evaluation jobs belong here.

**AI-05 · Use the Flex service tier for latency-tolerant traffic** — `[All · Low · $$]` Flex trades processing time for a discount; Priority charges a premium. Set `service_tier` per request based on user-facing vs background work.

**AI-06 · Route by complexity** — `[All · Med · $$]` Intelligent Prompt Routing sends simple prompts to cheaper models within a family; a custom router can span families.

**AI-07 · Cap output tokens** — `[All · Low · $$]` Output tokens are typically several times the price of input tokens. Set `max_tokens`, ask for concise formats, and avoid verbose reasoning where not needed.

**AI-08 · Trim RAG context** — `[All · Med · $$]` Better retrieval (reranking, smaller chunks, fewer documents) reduces input tokens per call.

**AI-09 · Watch agent loops** — `[All · Med · $$]` Agentic workflows can multiply calls per user task. Set step limits, track tokens per task, and alert on outliers.

**AI-10 · Tag and attribute inference** — `[All · Med · $$]` Use application inference profiles with cost allocation tags so Bedrock costs land on the right team and product.

**AI-11 · Use Provisioned Throughput or Reserved tier only at steady high volume** — `[SU, EN · Low · $$]` Committed capacity wins only when it is highly utilized; measure first on on-demand.

**AI-12 · Consider distillation or fine-tuned small models** — `[SU, EN · High · $$]` A distilled smaller model can match a large one on a narrow task at a fraction of inference cost; factor in custom-model hosting charges.

**AI-13 · Delete idle SageMaker endpoints** — `[All · Low · $$$]` Compute Optimizer now flags endpoints with zero invocations over 14 days. Idle real-time endpoints are a top ML waste source.

**AI-14 · Use serverless or asynchronous inference for spiky traffic** — `[All · Low · $$]` SageMaker Serverless Inference and Async Inference scale to zero.

**AI-15 · Pack models with multi-model endpoints and inference components** — `[SU, EN · Med · $$]` Share instances across many models instead of one endpoint per model.

**AI-16 · Train on Spot with checkpointing** — `[All · Med · $$$]` Managed Spot Training can cut training cost dramatically when jobs checkpoint.

**AI-17 · Use Trainium and Inferentia where supported** — `[SU, EN · High · $$]` AWS’s ML chips offer lower cost per training step and per inference for supported model architectures.

**AI-18 · Cover steady SageMaker usage with SageMaker Savings Plans** — `[SU, EN · Low · $$]` Applies across instance families, sizes and Regions for SageMaker usage.

**AI-19 · Shut down notebooks and Studio apps** — `[All · Low · $$]` Idle notebook instances and Studio apps with GPUs burn money overnight. Use lifecycle configurations for auto-shutdown.

**AI-20 · Reserve GPUs only for planned runs** — `[SU, EN · Low · $$]` Use EC2 Capacity Blocks or SageMaker training plans for dated jobs instead of holding GPUs on-demand.

**AI-21 · Measure cost per outcome, not per token** — `[All · Med · $$$]` Cost per resolved ticket or per accepted code suggestion tells you whether AI spend is creating value.

## 3.16 Security and compliance services

**SEC-01 · Enable security services deliberately, per account type** — `[All · Low · $$]` GuardDuty, Security Hub, Inspector, Macie and Config all scale with usage. Turn on what each environment’s risk requires, and review the cost per account monthly.

**SEC-02 · Use AWS Config periodic recording where possible** — `[All · Low · $$]` Continuous recording bills every configuration change; periodic (daily) recording is far cheaper for resource types that churn, such as ephemeral instances in autoscaling groups.

**SEC-03 · Exclude noisy resource types from Config** — `[All · Low · $]` Record only the resource types your rules and audits need.

**SEC-04 · Scope Macie to sensitive buckets** — `[All · Low · $$]` Use automated sensitive data discovery sampling instead of full scans of every bucket.

**SEC-05 · Review GuardDuty protection plans** — `[All · Low · $]` S3, EKS, runtime, malware and RDS protection plans each carry their own charges; enable based on actual exposure.

**SEC-06 · Consolidate KMS keys** — `[All · Low · $]` Each customer-managed key costs a monthly fee plus requests. Share keys per application or data class, not per resource.

**SEC-07 · Use Parameter Store for non-rotating config** — `[All · Low · $]` Standard parameters are free; Secrets Manager charges per secret per month and is best reserved for credentials that need rotation.

**SEC-08 · Cache secrets in clients** — `[All · Low · $]` Client-side caching libraries cut Secrets Manager and KMS API calls.

**SEC-09 · Right-size WAF rules** — `[All · Low · $]` WAF bills per web ACL, per rule and per million requests; managed rule groups and bot control add more. Remove unused ACLs and rules.

**SEC-10 · Use Shield Advanced only where justified** — `[EN · Low · $$]` It carries a substantial monthly subscription per organization; make sure the protected surface and cost-protection benefit justify it.

## 3.17 Lifecycle and the “extended support tax”

End-of-support software quietly becomes one of the fastest-growing lines on many bills. AWS bills extended support per hour and enrolls automatically, so the invoice is often the first notification.

**EOS-01 · Inventory every versioned managed service** — `[All · Low · $$$]` Track engine and version for RDS, Aurora, EKS, ElastiCache, OpenSearch, MSK, Lambda runtimes and EC2 operating systems, with end-of-standard-support dates.

**EOS-02 · Budget for EKS extended support or upgrade before month 14** — `[All · Med · $$]` Extended support raises the control plane from $0.10 to $0.60 per cluster-hour. Twenty-five clusters on extended support cost roughly an extra $100,000 per year in control plane fees alone.

**EOS-03 · Track RDS Extended Support per vCPU** — `[All · Low · $$$]` Charges for MySQL and PostgreSQL past end of standard support are billed per vCPU-hour, rising in year three, and apply to each instance, including Multi-AZ standbys and replicas. Large instances make the surcharge add up fast.

**EOS-04 · Build an extended-support dashboard** — `[SU, EN · Low · $$]` Filter CUR for usage types containing “ExtendedSupport” and project 12 months forward. The Cloud Intelligence Dashboards family includes an extended support cost projection view.

**EOS-05 · Make upgrades cheaper than not upgrading** — `[All · Med · $$]` Blue/green deployments for RDS and Aurora and in-place EKS upgrades reduce the effort. Put the avoided surcharge in the upgrade ticket so it gets prioritized.

**EOS-06 · Plan Windows Server 2016 end of support** — `[EN · Med · $$]` Windows Server 2016 extended support ends January 12, 2027. Decide now between in-place or rebuild upgrades, modernization (containers, Linux, managed services), or paying for Extended Security Updates.

**EOS-07 · Plan for SQL Server 2016 after end of support** — `[EN · Med · $$]` SQL Server 2016 reached end of extended support on July 14, 2026. Running it now means either paying for Extended Security Updates or accepting unpatched risk; upgrading or migrating to RDS on a supported version (or to Aurora PostgreSQL) removes both.

**EOS-08 · Compare ESU cost against modernization cost** — `[EN · Med · $$]` ESUs escalate year over year. A modernization that also removes license fees (for example, SQL Server Enterprise to Aurora PostgreSQL) can pay for itself within the ESU window.

**EOS-09 · Retire deprecated Lambda runtimes** — `[All · Low · $]` Deprecated runtimes stop receiving patches and eventually block updates; upgrading often brings performance gains that reduce duration cost.

**EOS-10 · Put EOS dates into the FinOps calendar** — `[All · Low · $$]` Review upcoming end-of-support dates quarterly with the same rigor as commitment expirations.

## 3.18 Licensing and Marketplace

**LIC-01 · Use License Manager to track BYOL** — `[EN · Med · $$]` Track license consumption and enforce limits for Windows, SQL Server and Oracle.

**LIC-02 · Use Compute Optimizer license recommendations** — `[EN · Low · $$]` It identifies SQL Server workloads that can downgrade from Enterprise to Standard edition.

**LIC-03 · Prefer Linux and open-source engines where feasible** — `[All · High · $$$]` Windows and commercial database licenses frequently cost more than the compute they run on.

**LIC-04 · Use Windows license-included only when cheaper than BYOL** — `[EN · Med · $$]` Compare license-included per-hour pricing against BYOL with Software Assurance or license mobility.

**LIC-05 · Consolidate SQL Server onto fewer, larger instances** — `[EN · Med · $$]` Per-core licensing rewards density; pair with Optimize CPUs.

**LIC-06 · Buy third-party software through AWS Marketplace when it burns down commitments** — `[SU, EN · Low · $$]` Eligible Marketplace purchases can count toward private pricing commitments, turning existing software spend into commitment progress.

**LIC-07 · Use Marketplace private offers** — `[SU, EN · Low · $$]` Negotiate custom pricing and terms with sellers through private offers.

**LIC-08 · Audit Marketplace subscriptions quarterly** — `[All · Low · $]` Auto-renewing SaaS contracts and AMI subscriptions persist after projects end.

**LIC-09 · Track license-included vs infrastructure split in RDS** — `[EN · Low · $]` Separate visibility into license fees helps you see what modernization would save.

**LIC-10 · Use Dedicated Hosts only for license-bound workloads** — `[EN · Low · $$]` Pack them densely and release unused hosts.

## 3.19 Commercial levers and programs

**CML-01 · Negotiate a Private Pricing Agreement at scale** — `[EN · High · $$$]` At sustained multi-million-dollar annual spend, AWS offers private pricing (formerly EDP) with discounts in exchange for spend commitments. Commit to what your forecast supports with margin for error.

**CML-02 · Model PPA shortfall risk** — `[EN · Med · $$]` Missing the commitment means paying the difference. Build a forecast with downside cases before signing.

**CML-03 · Ask for service-specific discounts** — `[EN · Med · $$]` Discounts on specific heavy services (data transfer, CloudFront, S3, a database) can be negotiated alongside the overall commitment.

**CML-04 · Use migration programs** — `[SU, EN · Med · $$$]` The Migration Acceleration Program and related programs can provide credits and funded partner help for qualifying migrations.

**CML-05 · Apply for AWS Activate** — `[ST · Low · $$$]` Startups can receive credits through Activate, often via accelerators, VCs and partners. Note that new accounts on the Free plan are not eligible for promotional credit programs until they upgrade to the Paid plan.

**CML-06 · Understand the new Free Tier** — `[ST · Low · $$]` Since July 15, 2025, new accounts get $100 in credits plus up to $100 more for onboarding activities; the Free plan expires after 6 months or when credits run out. Choose the Paid plan when you are building something real.

**CML-07 · Ask your account team for proof-of-concept credits** — `[All · Low · $$]` Credits for evaluating a new service or architecture are commonly available; ask before you start.

**CML-08 · Right-size the Support plan** — `[All · Low · $$]` Support is priced as a percentage of spend, so it grows with the bill. Reassess tier annually; make sure you use what you pay for (TAM time, reviews, Trusted Advisor checks).

**CML-09 · Use your account team’s free cost reviews** — `[SU, EN · Low · $$]` Account teams and Solutions Architects run cost optimization reviews and Well-Architected reviews at no charge.

**CML-10 · Run a Well-Architected Cost Optimization Pillar review** — `[All · Low · $$]` The free Well-Architected Tool includes a cost pillar question set that structures the conversation.

**CML-11 · Align purchases with fiscal timing** — `[EN · Low · $]` Time commitment purchases and PPA renewals to your budget cycle and negotiation leverage.

**CML-12 · Keep a vendor-neutral benchmark** — `[EN · Med · $]` Benchmark unit costs and discount levels against peers (FinOps Foundation community, AWS efficiency benchmarks) before negotiating.

## 3.20 Automation and shift-left

**AUT-01 · Estimate cost in pull requests** — `[SU, EN · Med · $$]` Tools such as Infracost comment the cost delta of Terraform changes on each PR, so engineers see the price before merging. The 2026 State of FinOps names pre-deployment architecture costing as the most-wanted capability.

**AUT-02 · Use the in-console Pricing Calculator with your real rates** — `[All · Low · $$]` The authenticated calculator inside Billing and Cost Management can model changes against your historical usage and discounts, not just list prices.

**AUT-03 · Encode cost policies as code** — `[SU, EN · Med · $$]` Use OPA/Conftest, Checkov or cfn-guard to block gp2, untagged resources, oversized instances or missing lifecycle rules in CI.

**AUT-04 · Automate idle cleanup with Compute Optimizer Automation** — `[All · Low · $$]` Start with EBS rules in non-production, with snapshots and rollback.

**AUT-05 · Automate scheduling** — `[All · Low · $$$]` Instance Scheduler on AWS or simple EventBridge plus Lambda/SSM can stop and start EC2, RDS and ASGs on tags.

**AUT-06 · Automate log retention** — `[All · Low · $$]` A Lambda on log-group creation (or a Config remediation) sets default retention so nothing is ever “never expire.”

**AUT-07 · Automate expiring-resource cleanup** — `[All · Low · $$]` Nightly job reads the `expires-on` tag, warns owners, then stops or deletes.

**AUT-08 · Automate Spot fallbacks** — `[All · Med · $$]` Auto Scaling mixed-instance policies and Karpenter handle Spot gracefully; no custom code needed.

**AUT-09 · Pipe Cost Optimization Hub into your ticketing system** — `[SU, EN · Med · $$]` Use the ListRecommendations API to open tickets for the owning team with estimated savings attached.

**AUT-10 · Use the AWS Cost Optimization Hub and Compute Optimizer APIs for weekly digests** — `[All · Low · $]` Send each team a weekly email or Slack digest of its top three savings opportunities.

**AUT-11 · Build ephemeral environments with TTL** — `[SU, EN · Med · $$]` Preview environments per pull request should destroy themselves after merge or a time limit.

**AUT-12 · Keep human approval for destructive actions** — `[All · Low · $]` Automation should snapshot, notify and wait before deleting production-adjacent resources.

## 3.21 Culture and process

**CUL-01 · Make cost a non-functional requirement** — `[All · Low · $$$]` Put a cost target (for example, cost per 1,000 requests) in design docs alongside latency and availability.

**CUL-02 · Show engineers their own costs** — `[All · Low · $$]` Team-level dashboards and weekly digests change behavior more than central mandates.

**CUL-03 · Celebrate savings publicly** — `[All · Low · $]` A monthly “savings leaderboard” or shout-out makes optimization status-worthy work.

**CUL-04 · Set efficiency targets, not just budgets** — `[SU, EN · Low · $$]` Budgets cap spend; efficiency targets (Cost Efficiency score, unit cost, ESR) reward doing more with the same.

**CUL-05 · Run FinOps game days** — `[All · Low · $]` A two-hour session hunting waste in a sandbox or a real non-prod account teaches more than documentation. AWS runs Frugal Architect game days at events.

**CUL-06 · Read the Frugal Architect** — `[All · Low · $]` Werner Vogels’ laws (cost as a requirement, systems that align cost to business, observability for cost, and more) are a good shared vocabulary.

**CUL-07 · Train finance on cloud mechanics** — `[SU, EN · Low · $]` Finance partners who understand amortization, commitments and variable spend produce better forecasts.

**CUL-08 · Give FinOps a seat in architecture reviews** — `[SU, EN · Low · $$]` The cheapest time to fix cost is before the design is built.

**CUL-09 · Use showback before chargeback** — `[SU, EN · Low · $]` Show teams their costs for a quarter or two before charging them; it builds trust in the allocation model.

**CUL-10 · Tie cloud spend to business strategy** — `[EN · Low · $$]` The 2026 FinOps Framework’s Executive Strategy Alignment capability formalizes this: scopes should start from business questions, not from what the data happens to show.

## 3.22 Startup-specific quick wins

**STU-01 · Use one region and few AZs at first** — `[ST · Low · $$]` Multi-Region from day one multiplies cost and complexity for little benefit at seed stage.

**STU-02 · Default to managed and serverless** — `[ST · Low · $$]` Pay-per-use services track usage closely when traffic is low and engineering time is your scarcest resource.

**STU-03 · Avoid NAT Gateways in dev** — `[ST · Low · $]` Public subnets with tight security groups, or a NAT instance, are acceptable for non-production at seed stage.

**STU-04 · Keep a cloud cost line in the runway model** — `[ST · Low · $$]` Track AWS spend as a percentage of burn and plan for credits ending.

**STU-05 · Model the post-credit cliff** — `[ST · Low · $$$]` Forecast the month credits run out and the on-demand bill that follows; buy no-upfront Savings Plans before the cliff, not after.

**STU-06 · Don’t over-engineer high availability for prototypes** — `[ST · Low · $]` Single-AZ non-production databases and caches are fine.

**STU-07 · Keep the free-tier mindset** — `[ST · Low · $]` Use Always Free allowances (Lambda, DynamoDB, CloudWatch basics) for side services.

**STU-08 · Watch AI token spend from day one** — `[ST · Low · $$$]` AI features can outgrow all infrastructure spend within months. Put Bedrock in its own budget and anomaly monitor.

**STU-09 · Use AWS Activate perks beyond credits** — `[ST · Low · $]` Technical support, training and partner offers come with the program.

**STU-10 · Review the bill weekly** — `[ST · Low · $$]` Fifteen minutes in Cost Explorer every Monday catches problems while they are cheap.

---

# Part 4 — Dashboard library

## 4.1 Choosing a dashboard stack

| Option | Best for | Data | Effort | Cost |
| --- | --- | --- | --- | --- |
| Billing and Cost Management Dashboards (native) | Startups, exec views, quick sharing | Cost Explorer data | Minutes | Free |
| Cost Explorer saved reports | Ad-hoc analysis, engineers | Cost Explorer data | Minutes | Free (API and hourly granularity extra) |
| Cloud Intelligence Dashboards (CUDOS, CID, KPI, Trends, Compute Optimizer, TAO and more) | Scale-ups and enterprises wanting depth without building | CUR 2.0 / FOCUS + Athena + QuickSight, optional data collection | Hours | QuickSight users + Athena scans |
| Custom BI (QuickSight, Grafana, Superset, Looker, Power BI) on FOCUS | Unit economics, multi-cloud, product analytics joins | FOCUS + business data | Weeks | Varies |
| Third-party FinOps platforms | Multi-cloud, allocation rules, automation | Billing APIs and exports | Days | Usually a percentage of spend or subscription |

A sensible path: native dashboards in week one, CID once you have a FinOps owner, custom unit-economics views once you have business metrics flowing into the warehouse.

## 4.2 Design principles

1. One dashboard per audience and decision. Executives, FinOps, engineering teams and finance need different views.
2. Always show amortized or effective cost for team views and unblended cost for invoice reconciliation, and label which is which.
3. Every chart should have a comparison: last period, budget, forecast or target.
4. Put unit cost next to total cost.
5. Show “unallocated” and “unused commitment” explicitly; never bury them.
6. Make every number clickable down to account, service, usage type and resource.
7. Add the action: each waste widget should link to the recommendation or the runbook.

## 4.3 Twenty-two dashboard proposals

### D01 · Executive Cloud Pulse

**Audience:** CEO, CFO, CTO · **Cadence:** monthly, with a weekly glance **Answers:** Are we on budget? Is cloud growing faster than the business? Are we efficient? **Widgets:** month-to-date vs budget vs forecast; 13-month trend of total effective cost; cloud cost as a percentage of revenue; top-level unit cost (cost per customer or per transaction); Cost Efficiency score trend; Effective Savings Rate; top 5 cost movers with a one-line explanation; commitments expiring in the next 90 days. **Data:** FOCUS export, budgets, business KPIs, Cost Optimization Hub. **Alerts:** forecast more than 10% over budget; unit cost up more than 5% month over month.

### D02 · Unit Economics

**Audience:** product leaders, FinOps, finance · **Cadence:** weekly **Answers:** What does it cost to serve one customer, order, API call, GB, or AI conversation, and where is it trending? **Widgets:** unit cost trend by product; cost-to-serve per customer tier; marginal cost curve (cost vs volume); breakdown of unit cost into compute/storage/network/AI/observability; gross margin impact. **Data:** FOCUS joined to product metrics (orders, MAU, requests) by day and scope. **Alerts:** unit cost regression after a deployment.

### D03 · Commitment Command Center

**Audience:** FinOps, procurement · **Cadence:** weekly **Answers:** Are commitments fully used? Is coverage at target? When do they expire? What should we buy next? **Widgets:** Savings Plans and RI utilization by plan; coverage by service family (compute, database, SageMaker); expiry ladder by month for 36 months; Effective Savings Rate trend; on-demand spend eligible for commitment; Purchase Analyzer target-coverage recommendation; sharing-group allocation. **Data:** CUR 2.0 savings plan and reservation columns or FOCUS commitment columns; Savings Plans recommendations API. **Alerts:** utilization below 98%; coverage below target for 7 days; expiry within 60 days with no queued replacement.

### D04 · Waste and Idle Tracker

**Audience:** engineering managers, FinOps · **Cadence:** weekly **Answers:** What are we paying for that does nothing? **Widgets:** idle resources by type (EC2, EBS, RDS, NAT, load balancers, DynamoDB, ElastiCache, DocumentDB, WorkSpaces, SageMaker endpoints) with monthly cost; unattached EBS and old snapshots; idle public IPv4 addresses; log groups without retention; incomplete multipart uploads; ownership of each item. **Data:** Compute Optimizer idle recommendations, Cost Optimization Hub, Storage Lens, CUR. **Alerts:** any single idle resource above a dollar threshold; idle total rising week over week.

### D05 · Rightsizing and Modernization

**Audience:** engineering, platform teams · **Cadence:** biweekly **Answers:** How lean and modern is our fleet? **Widgets:** percentage of EC2/RDS hours on current generation; Graviton share of compute hours and spend; gp3 share of EBS; memory-metrics coverage of EC2 fleet; open rightsizing savings by team; realized savings from actions taken. **Data:** CUR (instance type, usage type), Compute Optimizer export, CloudWatch agent inventory. **Targets:** Graviton share rising quarter over quarter; gp2 at zero; memory metrics on all production instances.

### D06 · Allocation Health

**Audience:** FinOps, finance · **Cadence:** monthly **Answers:** How much of the bill can we attribute to an owner? **Widgets:** percentage of cost allocated by each mandatory tag and by cost category; unallocated cost by service and account; top untagged resources by cost; shared-cost split results; Kubernetes split allocation coverage. **Data:** CUR/FOCUS tags, cost categories, split cost allocation data. **Targets:** 90%+ allocated (walk), 95%+ (run).

### D07 · Anomaly Feed

**Audience:** on-call engineers, FinOps · **Cadence:** real time **Answers:** What spiked, why, and who owns it? **Widgets:** list of anomalies with impact, root cause, owner, status; anomaly count and dollar impact by month; mean time to acknowledge and resolve. **Data:** Cost Anomaly Detection (dimensional monitors), AI cost investigation summaries, ticketing.

### D08 · Data Transfer and Network Map

**Audience:** platform and network teams · **Cadence:** monthly **Answers:** Where do bytes go and what do they cost? **Widgets:** spend by transfer type (internet egress, inter-AZ, inter-Region, NAT processing, endpoint processing, Transit Gateway, CloudFront); NAT processing by VPC; top cross-AZ talkers; cost per GB served; public IPv4 count and cost. **Data:** CUR usage types (for example those containing `DataTransfer`, `NatGateway-Bytes`, `Regional-Bytes`, `PublicIPv4`), VPC Flow Logs aggregated in Athena.

### D09 · Storage Lifecycle

**Audience:** data and platform teams · **Cadence:** monthly **Answers:** Is data in the right tier, and are we keeping things we don’t need? **Widgets:** S3 storage by class and by bucket; Intelligent-Tiering tier distribution; noncurrent version and multipart bytes; EBS by type and attachment state; snapshot age histogram; backup storage by vault and age; EFS tier mix. **Data:** Storage Lens (with export), CUR, AWS Backup reports.

### D10 · Kubernetes and Containers

**Audience:** platform team, service owners · **Cadence:** weekly **Answers:** What does each namespace/service cost and how much cluster capacity is idle? **Widgets:** cost by namespace and label; requested vs used CPU/memory; idle node capacity cost; Spot and Graviton share of node hours; control plane fees including extended support; cost per request per service. **Data:** split cost allocation data in CUR with Kubernetes labels, Container Insights or Prometheus.

### D11 · AI and GenAI Spend

**Audience:** AI product leads, FinOps · **Cadence:** daily **Answers:** What are tokens costing per product, model and outcome? **Widgets:** spend by model and inference profile; input vs output vs cached tokens; cache hit rate; batch and Flex share of tokens; cost per conversation/task/document; agent steps per task distribution; SageMaker endpoint utilization; GPU instance hours by team. **Data:** CUR (Bedrock usage types), Bedrock invocation logs and CloudWatch metrics, application inference profile tags. **Alerts:** cost per task above threshold; cache hit rate drops; any model’s daily spend doubling.

### D12 · Databases

**Audience:** DBAs, service owners · **Cadence:** monthly **Answers:** Are databases sized, current and covered? **Widgets:** spend by engine and instance generation; Database Savings Plans coverage; RDS Extended Support charges; Aurora I/O share (I/O-Optimized candidates); idle databases; storage and backup growth; DynamoDB capacity mode and utilization.

### D13 · Observability Spend

**Audience:** SRE, platform · **Cadence:** monthly **Answers:** Are we paying more to watch the system than to run it? **Widgets:** CloudWatch Logs ingestion and storage by log group; log groups without retention; custom metric count by namespace; CloudTrail data event cost; third-party observability spend; observability cost as a percentage of total.

### D14 · Lifecycle and Extended Support Tax

**Audience:** CTO, platform, FinOps · **Cadence:** monthly **Answers:** What are we paying because we didn’t upgrade, and what is coming? **Widgets:** current extended support charges by service (EKS, RDS, others); 12-month projection; inventory of versions with end-of-support dates; Windows/SQL Server versions approaching end of support; ESU costs. **Data:** CUR usage types containing “ExtendedSupport,” EKS/RDS inventory APIs, CMDB.

### D15 · Budget vs Forecast Variance

**Audience:** finance, budget owners · **Cadence:** monthly and quarterly **Answers:** Where will we land, and why are we off? **Widgets:** budget vs actual vs forecast by cost center; variance waterfall (volume, rate, mix, new workloads); 18-month forecast with confidence band; accrual view.

### D16 · Team Showback Scorecard

**Audience:** each engineering team · **Cadence:** weekly digest **Answers:** How is my team doing? **Widgets:** team spend and unit cost trend; open savings recommendations with owners; tag compliance; Cost Efficiency score for team accounts; rank among teams (optional, use carefully).

### D17 · Credits and Discounts Burn-down

**Audience:** startup founders, finance · **Cadence:** weekly **Answers:** When do credits run out and what happens then? **Widgets:** credit balance by program and expiry; burn rate; projected exhaustion date; post-credit run-rate; services not covered by credits. **Data:** Credits detail page and API, CUR credit line items.

### D18 · Startup Runway View

**Audience:** founders · **Cadence:** monthly **Answers:** Is cloud cost sustainable for our stage? **Widgets:** cloud spend as a percentage of burn and of revenue; cost per active customer; gross margin with and without credits; top five services.

### D19 · Marketplace and SaaS

**Audience:** procurement · **Cadence:** quarterly **Answers:** What third-party software are we paying for through AWS, and does it count toward commitments? **Widgets:** Marketplace spend by seller and product; renewal calendar; commitment burn-down contribution.

### D20 · Sustainability

**Audience:** sustainability team, leadership · **Cadence:** quarterly **Answers:** How do carbon and cost move together? **Widgets:** carbon emissions by service and Region (Customer Carbon Footprint Tool); Graviton and modern-generation share; idle resource hours; data stored per user.

### D21 · Account and Region Sprawl

**Audience:** cloud governance · **Cadence:** monthly **Answers:** Where are resources we did not expect? **Widgets:** spend in non-approved Regions; accounts with spend but no owner tag; new accounts and their first-month spend; dormant accounts.

### D22 · Optimization Pipeline

**Audience:** FinOps lead, leadership · **Cadence:** monthly **Answers:** Is the program delivering? **Widgets:** identified vs in-progress vs realized savings; savings by lever (rate vs usage); time from recommendation to action; Cost Efficiency score progression; cumulative realized savings vs FinOps program cost.

## 4.4 Example queries

The examples use the FOCUS export in Athena (column names are case-insensitive in Athena; extension columns and tag key formats can vary by export version, so check your table schema). Replace `focus_db.focus_table` with your table.

**Monthly effective cost by service (amortized view)**

```sql
SELECT date_trunc('month', chargeperiodstart) AS month,
       servicename,
       ROUND(SUM(effectivecost), 2) AS effective_cost,
       ROUND(SUM(billedcost), 2)    AS billed_cost
FROM focus_db.focus_table
WHERE chargeperiodstart >= date_add('month', -12, current_date)
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;
```

**Effective Savings Rate (headline)**

```sql
SELECT date_trunc('month', chargeperiodstart) AS month,
       ROUND(1 - SUM(effectivecost) / NULLIF(SUM(listcost), 0), 4) AS effective_savings_rate
FROM focus_db.focus_table
WHERE chargecategory = 'Usage'
GROUP BY 1
ORDER BY 1 DESC;
```

**Unused commitment cost (waste from over-committing)**

```sql
SELECT date_trunc('month', chargeperiodstart) AS month,
       commitmentdiscounttype,
       ROUND(SUM(effectivecost), 2) AS unused_commitment_cost
FROM focus_db.focus_table
WHERE commitmentdiscountstatus = 'Unused'
GROUP BY 1, 2
ORDER BY 1 DESC;
```

**Commitment coverage of eligible compute**

```sql
SELECT date_trunc('week', chargeperiodstart) AS week,
       ROUND(SUM(CASE WHEN pricingcategory = 'Committed' THEN listcost ELSE 0 END)
             / NULLIF(SUM(listcost), 0), 4) AS coverage_by_list_cost
FROM focus_db.focus_table
WHERE chargecategory = 'Usage'
  AND servicename IN ('Amazon Elastic Compute Cloud', 'AWS Lambda', 'Amazon Elastic Container Service')
GROUP BY 1
ORDER BY 1 DESC;
```

**Tag allocation coverage by cost**

```sql
SELECT date_trunc('month', chargeperiodstart) AS month,
       ROUND(SUM(CASE WHEN element_at(tags, 'team') IS NOT NULL THEN effectivecost ELSE 0 END)
             / NULLIF(SUM(effectivecost), 0), 4) AS pct_cost_with_team_tag
FROM focus_db.focus_table
GROUP BY 1
ORDER BY 1 DESC;
```

**Extended support charges (CUR 2.0)**

```sql
SELECT billing_period,
       line_item_product_code,
       line_item_usage_type,
       ROUND(SUM(line_item_unblended_cost), 2) AS cost
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%ExtendedSupport%'
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 4 DESC;
```

**NAT Gateway processing by account (CUR 2.0)**

```sql
SELECT billing_period,
       line_item_usage_account_id,
       ROUND(SUM(line_item_usage_amount), 0)  AS gb_processed,
       ROUND(SUM(line_item_unblended_cost), 2) AS cost
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%NatGateway-Bytes%'
GROUP BY 1, 2
ORDER BY 1 DESC, 4 DESC;
```

**Public IPv4 cost by account (CUR 2.0)**

```sql
SELECT billing_period,
       line_item_usage_account_id,
       ROUND(SUM(line_item_unblended_cost), 2) AS ipv4_cost
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%PublicIPv4%'
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;
```

**Amortized cost from CUR 2.0 (when you don’t have FOCUS)**

```sql
SELECT billing_period,
       line_item_usage_account_id,
       ROUND(SUM(CASE line_item_line_item_type
         WHEN 'SavingsPlanCoveredUsage' THEN savings_plan_savings_plan_effective_cost
         WHEN 'SavingsPlanRecurringFee' THEN savings_plan_total_commitment_to_date - savings_plan_used_commitment
         WHEN 'SavingsPlanNegation'     THEN 0
         WHEN 'SavingsPlanUpfrontFee'   THEN 0
         WHEN 'DiscountedUsage'         THEN reservation_effective_cost
         WHEN 'RIFee'                   THEN reservation_unused_amortized_upfront_fee_for_billing_period
                                             + reservation_unused_recurring_fee
         ELSE CASE WHEN line_item_line_item_type = 'Fee'
                    AND reservation_reservation_a_r_n <> '' THEN 0
                   ELSE line_item_unblended_cost END
       END), 2) AS amortized_cost
FROM cur_db.cur2
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;
```

---

# Part 5 — KPI catalog

| KPI | Formula | Healthy band (starting point) | Why it matters |
| --- | --- | --- | --- |
| Cost Efficiency score | From Cost Optimization Hub | Above 83 (2026 median); top quartile higher | AWS-native benchmark of optimized vs optimizable spend |
| Effective Savings Rate (ESR) | 1 − effective cost ÷ on-demand-equivalent cost | 20–40% for compute-heavy estates | Combines coverage and discount depth |
| Commitment coverage | Committed usage ÷ eligible usage (at on-demand rates) | 70–85% of steady baseline | Rate optimization reach |
| Commitment utilization | Used commitment ÷ purchased commitment | 98–100% | Over-commitment waste |
| Unused commitment $ | Sum of unused SP/RI cost | Near zero | Direct waste |
| Allocation coverage | Allocated cost ÷ total cost | 90%+ walk, 95%+ run | Accountability |
| Idle spend % | Idle resource cost ÷ total cost | Under 2–3% | Hygiene |
| Graviton share | Graviton compute hours ÷ eligible compute hours | Rising each quarter | Price-performance |
| Current-generation share | Latest-two-generation hours ÷ total instance hours | 80%+ | Modernization |
| gp2 share | gp2 GB ÷ total EBS GB | 0% | Easy win completed |
| Memory metrics coverage | EC2 instances with memory metrics ÷ total | 90%+ of production | Unlocks rightsizing |
| Non-prod off-hours ratio | Hours stopped ÷ total hours for non-prod | 50%+ | Scheduling discipline |
| Data transfer % | Data transfer cost ÷ total cost | Track trend; investigate above 10% | Architecture signal |
| Observability % | Monitoring/logging cost ÷ total cost | Track trend; investigate above 10% | Telemetry bloat |
| Unit cost | Cost ÷ business driver | Flat or falling with growth | Value delivered |
| Cloud cost % of revenue | Cloud cost ÷ revenue | Context-dependent; track trend | Business sustainability |
| Forecast accuracy | 1 − abs(actual − forecast) ÷ actual | Within ±5% monthly | Finance trust |
| Anomaly MTTR | Mean time from anomaly to resolution | Under 2 business days | Governance speed |
| Realized savings | Sum of verified monthly savings from actions | Growing quarter over quarter | Program outcome |
| Extended support $ | Sum of extended support charges | Zero, or budgeted | Lifecycle discipline |
| AI cost per outcome | AI spend ÷ successful tasks | Falling over time | AI value |
| Cache hit rate (AI) | Cached input tokens ÷ total input tokens | As high as the use case allows | Token efficiency |

The bands are starting points for discussion, not industry standards; calibrate them to your business model and revisit quarterly.

---

# Part 6 — Playbooks and website content model

## 6.1 Startup: the 30-day plan (one person, a few hours a week)

**Week 1 — Guardrails.** Create a total budget with alerts at 50/80/100% and forecasted 100% (GOV-01). Turn on Cost Anomaly Detection (GOV-05) to a Slack channel. Enforce MFA and remove long-lived keys (ORG-18). Deny unused Regions (ORG-17). Check credit balances and expiry dates (ORG-19).

**Week 2 — Visibility.** Enable CUR 2.0 (VIS-01) and activate two or three cost allocation tags (VIS-25, TAG-01). Build one native dashboard with spend by service, by account and by usage type (VIS-05, VIS-11). Opt in to Compute Optimizer and Cost Optimization Hub (EC2-01).

**Week 3 — Quick wins.** gp2 to gp3 (STO-01), delete unattached volumes and old snapshots (STO-04, STO-06), set log retention everywhere (OBS-01), add S3 and DynamoDB gateway endpoints (NET-02), release idle public IPs (NET-09), abort incomplete multipart uploads (S3-09), schedule non-production (EC2-16).

**Week 4 — Rate.** Model the post-credit bill (STU-05). If baseline compute is steady, buy a small no-upfront Compute Savings Plan using Target Coverage (COM-04), and plan monthly top-ups. If you run AI features, set up a Bedrock budget and enable prompt caching and batch where possible (STU-08, AI-03, AI-04).

**Expected outcome:** for a typical early-stage account, 15–30% lower run-rate without architecture changes, and no risk of a surprise bill. Results vary with workload mix.

## 6.2 Scale-up: the 90-day program

**Days 1–30 — Foundation.** Account structure per environment and product (ORG-02), cost categories mirroring teams (ORG-10), tag policy and IaC default tags (TAG-03, TAG-04), FOCUS export (VIS-02), Cloud Intelligence Dashboards (VIS-06), memory metrics on EC2 (EC2-02), Compute Optimizer preferences customized (EC2-03). Baseline the Cost Efficiency score and ESR.

**Days 31–60 — Usage optimization.** Work the Waste and Idle Tracker (D04) to near zero. Rightsize the top 20 instances and databases by spend. Start Graviton migration with the easiest services (EC2-08, DB-03, CON-06). Kubernetes requests and Karpenter consolidation (CON-02, CON-03). Data transfer map and NAT reduction (NET-01, NET-07). Observability diet (OBS-01 to OBS-05).

**Days 61–90 — Rate optimization and governance.** Layered Compute and Database Savings Plans on the leaner baseline (COM-02, COM-03, COM-08). Team showback dashboards and weekly digests (D16, AUT-10). Cost estimates in pull requests (AUT-01). Monthly cost review ritual (GOV-13). Optimization backlog with realized-savings tracking (GOV-14, D22).

## 6.3 Enterprise: the 12-month operating program

**Quarter 1 — Data and allocation.** Consolidate multi-org visibility (ORG-08, ORG-09), FOCUS as the system of record, invoice reconciliation (VIS-18), allocation coverage to 90%+ including Kubernetes and shared costs (TAG-09, ORG-11). Stand up the FinOps team charter, RACI and executive steering forum aligned to the 2026 Framework’s Executive Strategy Alignment capability (CUL-10).

**Quarter 2 — Optimization at scale.** Organization-wide idle and rightsizing campaigns with automated ticketing (AUT-09), Compute Optimizer Automation in non-production then production (AUT-04), Graviton and generation upgrade program, lifecycle program to eliminate extended support charges and plan Windows Server 2016 and SQL Server 2016 exits (EOS-01 to EOS-08).

**Quarter 3 — Rate and commercial.** Commitment portfolio strategy with sharing preferences (GOV-17), Database and SageMaker Savings Plans, PPA renewal preparation with forecast scenarios (CML-01, CML-02), Marketplace consolidation (LIC-06).

**Quarter 4 — Shift-left and AI.** Policy-as-code and PR cost checks across all pipelines (AUT-01, AUT-03), AI FinOps scope with unit metrics and token controls (AI-01 to AI-10), FinOps Agent and MCP tooling for engineers (VIS-14, VIS-15), and efficiency targets embedded in team goals (CUL-04).

## 6.4 Proposed content model for the awsmaxxing website

**Tip schema (one record per tip, ready for a static-site generator or headless CMS):**

```json
{
  "id": "NET-02",
  "title": "Add S3 and DynamoDB gateway endpoints everywhere",
  "domain": "networking",
  "audience": ["startup", "scaleup", "enterprise"],
  "effort": "low",
  "impact": 3,
  "lever": "usage",
  "services": ["Amazon VPC", "Amazon S3", "Amazon DynamoDB"],
  "summary": "Free endpoints that remove NAT Gateway processing charges for S3 and DynamoDB traffic.",
  "how_to": ["console steps", "Terraform snippet", "CLI snippet"],
  "verify": "CUR usage type NatGateway-Bytes falls the following week",
  "related": ["NET-03", "NET-07", "CON-13"],
  "dashboard": ["D08"],
  "kpi": ["data_transfer_pct"],
  "sources": ["https://aws.amazon.com/vpc/pricing/"],
  "last_verified": "2026-10-31"
}
```

**Information architecture.**

- **Home:** “What’s your monthly AWS bill?” selector that routes to the startup, scale-up or enterprise path.
- **Playbooks:** the three plans in 6.1–6.3, each a checklist with progress saved in the browser.
- **Tips library:** filterable by domain, audience, effort, impact, lever and service; each tip page with how-to, IaC snippet, verification query and related tips.
- **Dashboards gallery:** each of the 22 dashboards with a mock screenshot, widget list, SQL and deployment notes.
- **KPI glossary:** definitions and formulas from Part 5.
- **What’s new:** a dated changelog of AWS cost features (seeded with Part 1) so the site stays current.
- **Calculators:** small interactive tools.

**High-value calculators to build first.**

1. NAT Gateway vs VPC endpoint break-even (GB/month per service).
2. gp2 → gp3 savings from a list of volumes.
3. Public IPv4 annual cost from IP count.
4. EKS and RDS extended support cost projector (clusters, vCPUs, months).
5. Savings Plans target coverage simulator (hourly spend profile → commitment → ESR).
6. Database Savings Plans vs RIs comparator.
7. Non-production scheduling savings (hours/day, days/week).
8. Bedrock cost estimator with caching, batch and Flex toggles.
9. S3 lifecycle and Intelligent-Tiering estimator (object size distribution matters).
10. Post-credit cliff estimator for startups.

**Editorial rules for the site.** Date-stamp every price and feature claim; link to the AWS pricing or documentation page; mark preview features as preview; separate AWS-published benchmarks from third-party claims; review the whole tip library quarterly and after every re:Invent (the next one is in early December 2026).

---

# Sources

AWS primary sources:

- AWS Cloud Financial Management: Key 2025 re:Invent launches — [https://aws.amazon.com/blogs/aws-cloud-financial-management/aws-cloud-financial-management-key-reinvent-2025-launches-to-transform-your-finops-practice/](https://aws.amazon.com/blogs/aws-cloud-financial-management/aws-cloud-financial-management-key-reinvent-2025-launches-to-transform-your-finops-practice/)
- AWS Cloud Financial Management blog, Launch category (FinOps Agent, AI cost investigation, Credits detail page, idle recommendations, Target Coverage, intelligent cost explanations; June 2026) — [https://aws.amazon.com/blogs/aws-cloud-financial-management/category/news/launch/](https://aws.amazon.com/blogs/aws-cloud-financial-management/category/news/launch/)
- The AWS State of Cost Efficiency Report (June 2026) — [https://aws.amazon.com/blogs/aws-cloud-financial-management/the-aws-state-of-cost-efficiency-report/](https://aws.amazon.com/blogs/aws-cloud-financial-management/the-aws-state-of-cost-efficiency-report/)
- Six new idle resource recommendations in Compute Optimizer (June 2026) — [https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-six-new-idle-resource-recommendations-in-aws-compute-optimizer/](https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-six-new-idle-resource-recommendations-in-aws-compute-optimizer/)
- re:Invent 2025 hidden CFM announcements guide — [https://aws.amazon.com/blogs/aws-cloud-financial-management/reinvent-2025-hidden-cfm-announcements-guide/](https://aws.amazon.com/blogs/aws-cloud-financial-management/reinvent-2025-hidden-cfm-announcements-guide/)
- Savings Plans FAQs (Database Savings Plans coverage) — [https://aws.amazon.com/savingsplans/faqs](https://aws.amazon.com/savingsplans/faqs)
- Database Savings Plans pricing — [https://aws.amazon.com/savingsplans/database-pricing](https://aws.amazon.com/savingsplans/database-pricing)
- Amazon EKS pricing — [https://aws.amazon.com/eks/pricing/](https://aws.amazon.com/eks/pricing/)
- AWS Free Tier update (July 2025) — [https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/](https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/)
- Amazon Bedrock pricing — [https://aws.amazon.com/bedrock/pricing/](https://aws.amazon.com/bedrock/pricing/)
- Bedrock service tiers documentation — [https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html](https://docs.aws.amazon.com/bedrock/latest/userguide/service-tiers-inference.html)
- Cloud Intelligence Dashboards FAQ — [https://docs.aws.amazon.com/guidance/latest/cloud-intelligence-dashboards/faq.html](https://docs.aws.amazon.com/guidance/latest/cloud-intelligence-dashboards/faq.html)
- Cloud Intelligence Dashboards deployment tool (cid-cmd) — [https://pypi.org/project/cid-cmd/](https://pypi.org/project/cid-cmd/)

FinOps community sources:

- FinOps Foundation, FinOps Framework 2026 — [https://www.finops.org/insights/2026-finops-framework/](https://www.finops.org/insights/2026-finops-framework/)
- FinOps Foundation, AWS re:Invent 2025 FinOps updates — [https://www.finops.org/insights/aws-reinvent-2025-finops-updates/](https://www.finops.org/insights/aws-reinvent-2025-finops-updates/)
- State of FinOps 2026 summaries (FinOps Foundation survey) — [https://finout.io/blog/state-of-finops-2026-report-key-trends-insights-and-what-comes-next](https://finout.io/blog/state-of-finops-2026-report-key-trends-insights-and-what-comes-next)

Third-party analyses used for pricing cross-checks (verify against AWS pages before publishing):

- Database Savings Plans analyses — [https://www.prosperops.com/blog/aws-database-savings-plans-everything-you-need-to-know/](https://www.prosperops.com/blog/aws-database-savings-plans-everything-you-need-to-know/) and [https://cloudburn.io/blog/database-savings-plans](https://cloudburn.io/blog/database-savings-plans)
- VPC and NAT Gateway pricing analyses — [https://cloudburn.io/blog/amazon-vpc-pricing](https://cloudburn.io/blog/amazon-vpc-pricing) and [https://cloudburn.io/blog/aws-nat-gateway-pricing](https://cloudburn.io/blog/aws-nat-gateway-pricing)
- Extended support cost analyses — [https://www.infracost.io/blog/are-you-paying-for-unnecessary-extended-support-fees](https://www.infracost.io/blog/are-you-paying-for-unnecessary-extended-support-fees)
- Bedrock cost optimization guide — [https://www.doit.com/blog/the-engineering-guide-to-amazon-bedrock-cost-optimization](https://www.doit.com/blog/the-engineering-guide-to-amazon-bedrock-cost-optimization)