export interface Dashboard {
  id: string;
  slug: string;
  title: string;
  audience: string;
  cadence: string;
  answers: string;
  widgets: string[];
  dataSource: string;
  alerts: string;
  sampleSql: string;
  lastVerified: string;
}

export const DASHBOARDS: Dashboard[] = [
  {
    id: "D01",
    slug: "executive-cloud-pulse",
    title: "Executive Cloud Pulse",
    audience: "CEO, CFO, CTO",
    cadence: "Monthly, with a weekly glance",
    answers: "Are we on budget? Is cloud growing faster than the business? Are we efficient?",
    widgets: [
      "Month-to-date vs budget vs forecast waterfall",
      "13-month trend of total effective cost (FOCUS)",
      "Cloud cost as a percentage of revenue",
      "Top-level unit cost (cost per customer / per transaction)",
      "Cost Efficiency score trend (Cost Optimization Hub)",
      "Effective Savings Rate (ESR)",
      "Top 5 cost movers with root-cause summary",
      "Commitments expiring in the next 90 days"
    ],
    dataSource: "FOCUS export, AWS Budgets, Business KPIs, Cost Optimization Hub",
    alerts: "Forecast > 10% over budget; unit cost up > 5% MoM.",
    sampleSql: `SELECT date_trunc('month', chargeperiodstart) AS month,
       ROUND(SUM(effectivecost), 2) AS effective_cost,
       ROUND(SUM(billedcost), 2)    AS billed_cost,
       ROUND(1 - SUM(effectivecost) / NULLIF(SUM(listcost), 0), 4) AS effective_savings_rate
FROM focus_db.focus_table
WHERE chargeperiodstart >= date_add('month', -12, current_date)
GROUP BY 1
ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D02",
    slug: "unit-economics",
    title: "Unit Economics",
    audience: "Product leaders, FinOps, Finance",
    cadence: "Weekly",
    answers: "What does it cost to serve one customer, order, API call, GB, or AI conversation, and where is it trending?",
    widgets: [
      "Unit cost trend by product line",
      "Cost-to-serve per customer tier",
      "Marginal cost curve (cost vs business volume)",
      "Unit cost decomposition (Compute, Storage, Network, AI, Telemetry)",
      "Gross margin impact analysis"
    ],
    dataSource: "FOCUS joined to product analytics (orders, MAU, API requests) by day and scope",
    alerts: "Unit cost regression > 8% after a deployment.",
    sampleSql: `SELECT f.chargeperiodstart,
       f.subaccountname AS product_line,
       ROUND(SUM(f.effectivecost) / NULLIF(p.active_users, 0), 4) AS cost_per_active_user
FROM focus_db.focus_table f
JOIN analytics_db.product_metrics p ON date_trunc('day', f.chargeperiodstart) = p.metric_date
GROUP BY 1, 2, p.active_users
ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D03",
    slug: "commitment-command-center",
    title: "Commitment Command Center",
    audience: "FinOps Lead, Procurement",
    cadence: "Weekly",
    answers: "Are commitments fully used? Is coverage at target? When do they expire? What should we buy next?",
    widgets: [
      "Savings Plans & RI utilization by plan (target: >=98%)",
      "Coverage by service family (Compute, Database, SageMaker)",
      "36-month commitment expiration ladder",
      "Effective Savings Rate (ESR) trend",
      "On-demand spend eligible for commitment",
      "Purchase Analyzer target-coverage recommendations",
      "Sharing-group allocation results"
    ],
    dataSource: "CUR 2.0 savings plan columns / FOCUS commitment columns; Savings Plans Purchase APIs",
    alerts: "Utilization < 98%; coverage below target for 7 days; expiry within 60 days without queued purchase.",
    sampleSql: `SELECT date_trunc('month', chargeperiodstart) AS month,
       commitmentdiscounttype,
       ROUND(SUM(effectivecost), 2) AS unused_commitment_cost
FROM focus_db.focus_table
WHERE commitmentdiscountstatus = 'Unused'
GROUP BY 1, 2
ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D04",
    slug: "waste-and-idle-tracker",
    title: "Waste and Idle Tracker",
    audience: "Engineering Managers, FinOps",
    cadence: "Weekly",
    answers: "What are we paying for that does nothing?",
    widgets: [
      "Idle resources by type (EC2, EBS, RDS, NAT, ALBs, DynamoDB, ElastiCache, DocumentDB, SageMaker)",
      "Unattached EBS volumes and legacy snapshots",
      "Idle public IPv4 addresses ($0.005/hr each)",
      "Log groups with 'Never Expire' retention",
      "Incomplete multipart S3 uploads",
      "Resource owner attribution table"
    ],
    dataSource: "Compute Optimizer idle recommendations, Cost Optimization Hub, Storage Lens, CUR",
    alerts: "Single idle resource > $100/mo; idle spend total rising week-over-week.",
    sampleSql: `SELECT line_item_resource_id,
       line_item_usage_type,
       ROUND(SUM(line_item_unblended_cost), 2) AS monthly_idle_cost
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%PublicIPv4:IdleAddress%'
   OR line_item_usage_type LIKE '%VolumeUsage:gp%' AND line_item_line_item_type = 'Usage'
GROUP BY 1, 2
ORDER BY 3 DESC LIMIT 50;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D05",
    slug: "rightsizing-and-modernization",
    title: "Rightsizing and Modernization",
    audience: "Engineering Leads, Platform Teams",
    cadence: "Biweekly",
    answers: "How lean and modern is our infrastructure fleet?",
    widgets: [
      "Percentage of EC2/RDS hours on latest hardware generations",
      "Graviton share of compute hours and spend",
      "gp3 share of EBS storage (target: 100%)",
      "Memory-metrics coverage of EC2 fleet (target: 90%+)",
      "Open rightsizing opportunities by engineering team",
      "Realized cumulative savings from completed actions"
    ],
    dataSource: "CUR 2.0 (instance types, usage types), Compute Optimizer export, CloudWatch agent inventory",
    alerts: "gp2 storage detected in production; Graviton adoption stagnating.",
    sampleSql: `SELECT date_trunc('month', chargeperiodstart) AS month,
       ROUND(SUM(CASE WHEN skupriceid LIKE '%arm%' OR description LIKE '%Graviton%' THEN effectivecost ELSE 0 END) 
             / NULLIF(SUM(effectivecost), 0) * 100, 2) AS graviton_cost_pct
FROM focus_db.focus_table
WHERE servicename IN ('Amazon Elastic Compute Cloud', 'Amazon Relational Database Service')
GROUP BY 1 ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D06",
    slug: "allocation-health",
    title: "Allocation Health",
    audience: "FinOps, Finance Controllers",
    cadence: "Monthly",
    answers: "How much of the bill can we attribute to an owner?",
    widgets: [
      "Allocation coverage by mandatory tags (Environment, Team, CostCenter)",
      "Cost category distribution",
      "Unallocated cost waterfall by service and account",
      "Top untagged resources by monthly cost",
      "Shared-cost split charge results (networking, support, shared clusters)",
      "Kubernetes pod label split allocation coverage"
    ],
    dataSource: "CUR/FOCUS tags, Cost Categories, Split Cost Allocation Data",
    alerts: "Allocation coverage falls below 90% (Walk) or 95% (Run).",
    sampleSql: `SELECT date_trunc('month', chargeperiodstart) AS month,
       ROUND(SUM(CASE WHEN element_at(tags, 'team') IS NOT NULL THEN effectivecost ELSE 0 END)
             / NULLIF(SUM(effectivecost), 0), 4) AS pct_cost_with_team_tag
FROM focus_db.focus_table
GROUP BY 1 ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D07",
    slug: "anomaly-feed",
    title: "Anomaly Feed",
    audience: "On-call SREs, FinOps",
    cadence: "Real-time",
    answers: "What spiked, why, and who owns it?",
    widgets: [
      "Live stream of detected cost anomalies with impact and status",
      "AI cost investigation summaries and root causes",
      "Anomaly frequency and dollar impact trend by month",
      "Mean Time to Acknowledge (MTTA) and Mean Time to Resolve (MTTR)",
      "Responsible linked account and identity breakdown"
    ],
    dataSource: "Cost Anomaly Detection (dimensional monitors), AI cost investigation, PagerDuty/Slack",
    alerts: "Anomaly exceeding $250 or 25% deviation from baseline.",
    sampleSql: `SELECT anomaly_id,
       dimension_value AS account_or_tag,
       impact_total_impact_percentage,
       impact_total_actual_spend,
       impact_total_expected_spend,
       root_cause_service,
       root_cause_region
FROM ce_anomalies_table
ORDER BY start_date DESC LIMIT 25;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D08",
    slug: "data-transfer-and-network-map",
    title: "Data Transfer and Network Map",
    audience: "Network Engineers, Cloud Platform Teams",
    cadence: "Monthly",
    answers: "Where do bytes go and what do they cost?",
    widgets: [
      "Spend by transfer type (Internet egress, Inter-AZ, Inter-Region, NAT, VPC Endpoints, Direct Connect)",
      "NAT Gateway processing spend by VPC",
      "Top cross-AZ talkers and microservice flows",
      "Cost per GB transferred across external interfaces",
      "Public IPv4 address count and cost run-rate"
    ],
    dataSource: "CUR usage types ('DataTransfer', 'NatGateway-Bytes', 'Regional-Bytes', 'PublicIPv4'), VPC Flow Logs",
    alerts: "NAT Gateway data processing > $500/mo in a VPC with high S3/DynamoDB traffic; cross-AZ transfer > 15% of total EC2 bill.",
    sampleSql: `SELECT billing_period,
       line_item_usage_account_id,
       ROUND(SUM(line_item_usage_amount), 0)  AS gb_processed,
       ROUND(SUM(line_item_unblended_cost), 2) AS nat_processing_cost
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%NatGateway-Bytes%'
GROUP BY 1, 2 ORDER BY 1 DESC, 4 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D09",
    slug: "storage-lifecycle",
    title: "Storage Lifecycle",
    audience: "Data Platform Teams, Infrastructure Leads",
    cadence: "Monthly",
    answers: "Is data in the right tier, and are we keeping things we do not need?",
    widgets: [
      "S3 storage distribution by class (Standard, Intelligent-Tiering, Glacier, Deep Archive)",
      "Intelligent-Tiering tier breakdown (Frequent, Infrequent, Archive Instant)",
      "Noncurrent version and incomplete multipart upload storage bytes",
      "EBS volume type and attachment breakdown",
      "Snapshot age distribution (DLM compliance)",
      "EFS lifecycle tiering share"
    ],
    dataSource: "S3 Storage Lens export, CUR 2.0, AWS Backup reports",
    alerts: "S3 Standard storage growing while access frequency drops; incomplete multipart uploads > 1 TB.",
    sampleSql: `SELECT storage_class_name,
       ROUND(SUM(bytes_used) / 1099511627776.0, 2) AS tb_stored,
       ROUND(SUM(estimated_cost), 2) AS monthly_spend
FROM s3_storage_lens.organization_metrics
GROUP BY 1 ORDER BY 3 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D10",
    slug: "kubernetes-and-containers",
    title: "Kubernetes and Containers",
    audience: "Platform Teams, Kubernetes Service Owners",
    cadence: "Weekly",
    answers: "What does each namespace/service cost and how much cluster capacity is idle?",
    widgets: [
      "Cost by namespace, team, and pod label",
      "Requested vs actual CPU and memory utilization (slack analysis)",
      "Idle node capacity waste in dollars",
      "Spot and Graviton share of node compute hours",
      "Control plane costs including extended support flags",
      "Cost per HTTP request per container service"
    ],
    dataSource: "Split Cost Allocation Data in CUR with Kubernetes labels, Container Insights, Karpenter metrics",
    alerts: "Namespace resource slack > 50%; EKS clusters on extended support ($0.60/hr).",
    sampleSql: `SELECT element_at(tags, 'aws:eks:namespace') AS namespace,
       ROUND(SUM(effectivecost), 2) AS namespace_cost
FROM focus_db.focus_table
WHERE servicename = 'Amazon Elastic Kubernetes Service'
GROUP BY 1 ORDER BY 2 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D11",
    slug: "ai-and-genai-spend",
    title: "AI and GenAI Spend",
    audience: "AI Product Leads, FinOps",
    cadence: "Daily",
    answers: "What are tokens costing per product, model, and business outcome?",
    widgets: [
      "Bedrock spend by model and application inference profile",
      "Input vs Output vs Cached token breakdown",
      "Prompt cache hit rate (target: maximize)",
      "Batch and Flex inference share of total tokens",
      "Cost per conversation, per document, and per task",
      "Agent loop step distribution (detect runaway agents)",
      "SageMaker endpoint utilization and idle detection"
    ],
    dataSource: "Bedrock CloudWatch metrics, CUR 2.0 Bedrock line items, Application Inference Profile tags",
    alerts: "Daily AI spend doubling; prompt cache hit rate dropping below 40%; agent loop steps > 15.",
    sampleSql: `SELECT date_trunc('day', line_item_usage_start_date) AS day,
       line_item_operation AS model_operation,
       ROUND(SUM(line_item_unblended_cost), 2) AS daily_ai_spend,
       SUM(CASE WHEN line_item_usage_type LIKE '%CachedInput%' THEN line_item_usage_amount ELSE 0 END) AS cached_tokens,
       SUM(CASE WHEN line_item_usage_type LIKE '%Input%' THEN line_item_usage_amount ELSE 0 END) AS total_input_tokens
FROM cur_db.cur2
WHERE line_item_product_code = 'AmazonBedrock'
GROUP BY 1, 2 ORDER BY 1 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D12",
    slug: "databases",
    title: "Databases & Caching",
    audience: "DBAs, Service Owners",
    cadence: "Monthly",
    answers: "Are databases properly sized, modernized, and covered by commitments?",
    widgets: [
      "Database spend by engine and instance generation",
      "Database Savings Plans coverage (Gen 7+ and serverless)",
      "RDS Extended Support surcharge line items",
      "Aurora I/O share (evaluating I/O-Optimized candidates)",
      "Idle databases flagged by Compute Optimizer",
      "DynamoDB capacity mode distribution and TTL deletions"
    ],
    dataSource: "CUR 2.0, Compute Optimizer RDS recommendations, CloudWatch DB metrics",
    alerts: "RDS instance running on unsupported engine version; Aurora I/O charges > 25% of cluster bill.",
    sampleSql: `SELECT line_item_usage_type,
       ROUND(SUM(line_item_unblended_cost), 2) AS db_cost
FROM cur_db.cur2
WHERE line_item_product_code IN ('AmazonRDS', 'AmazonDynamoDB', 'AmazonElastiCache')
GROUP BY 1 ORDER BY 2 DESC LIMIT 20;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D13",
    slug: "observability-spend",
    title: "Observability Spend",
    audience: "SREs, Platform Engineering",
    cadence: "Monthly",
    answers: "Are we paying more to watch the system than to run it?",
    widgets: [
      "CloudWatch Logs ingestion and storage by log group",
      "Log groups with 'Never Expire' retention",
      "Custom metric cardinality and costs",
      "CloudTrail data event charges",
      "Third-party observability vendor spend vs AWS native",
      "Observability cost as a percentage of total infrastructure"
    ],
    dataSource: "CloudWatch Logs Insights, CUR 2.0 line items, Billing Conductor pro-forma",
    alerts: "Observability spend > 10% of total AWS bill; single log group ingesting > 100 GB/day without retention.",
    sampleSql: `SELECT line_item_resource_id AS log_group_arn,
       ROUND(SUM(line_item_unblended_cost), 2) AS monthly_log_cost
FROM cur_db.cur2
WHERE line_item_product_code = 'AmazonCloudWatch'
  AND line_item_usage_type LIKE '%DataProcessing-Bytes%'
GROUP BY 1 ORDER BY 2 DESC LIMIT 20;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D14",
    slug: "lifecycle-and-extended-support-tax",
    title: "Lifecycle and Extended Support Tax",
    audience: "CTO, VP Platform, FinOps",
    cadence: "Monthly",
    answers: "What are we paying because we did not upgrade, and what is approaching?",
    widgets: [
      "Current Extended Support charges by service (EKS, RDS, Aurora)",
      "12-month forward cost projection for upcoming deprecations",
      "Inventory of Kubernetes and database engines approaching end-of-standard-support",
      "Windows Server 2016 and SQL Server 2016 workload count",
      "Avoided surcharge scorecard from completed upgrades"
    ],
    dataSource: "CUR 2.0 (usage types containing 'ExtendedSupport'), EKS and RDS Describe APIs",
    alerts: "Cluster or database entering extended support window within 60 days.",
    sampleSql: `SELECT billing_period,
       line_item_product_code,
       line_item_usage_type,
       ROUND(SUM(line_item_unblended_cost), 2) AS extended_support_tax
FROM cur_db.cur2
WHERE line_item_usage_type LIKE '%ExtendedSupport%'
GROUP BY 1, 2, 3 ORDER BY 1 DESC, 4 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D15",
    slug: "budget-vs-forecast-variance",
    title: "Budget vs Forecast Variance",
    audience: "FP&A, Budget Owners",
    cadence: "Monthly and Quarterly",
    answers: "Where will we land at month-end, and what is driving the delta?",
    widgets: [
      "Budget vs Actual vs Forecast waterfall by cost center",
      "Variance drivers: Volume, Rate, Mix, and New Workloads",
      "18-month ML forecast with confidence intervals",
      "Accrual reconciliation view"
    ],
    dataSource: "AWS Budgets, 18-month Cost Explorer Forecast API, FOCUS 1.2",
    alerts: "Variance greater than 5% against quarterly budget.",
    sampleSql: `SELECT cost_category,
       budget_amount,
       actual_amount,
       forecast_amount,
       ROUND((actual_amount - budget_amount) / budget_amount * 100, 2) AS variance_pct
FROM finance_db.cloud_budget_tracking
WHERE fiscal_quarter = '2026-Q4'
ORDER BY variance_pct DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D16",
    slug: "team-showback-scorecard",
    title: "Team Showback Scorecard",
    audience: "Engineering Squads",
    cadence: "Weekly digest",
    answers: "How is our team performing on cloud efficiency?",
    widgets: [
      "Team spend trend and unit cost metric",
      "Open savings recommendations assigned to squad",
      "Tagging compliance percentage",
      "Cost Efficiency score for squad accounts",
      "Realized savings celebratory leaderboard"
    ],
    dataSource: "Cost Optimization Hub, CUR tags, Infracost pull request reports",
    alerts: "Squad Cost Efficiency score drops below 80.",
    sampleSql: `SELECT element_at(tags, 'team') AS team_name,
       ROUND(SUM(effectivecost), 2) AS weekly_team_spend
FROM focus_db.focus_table
WHERE chargeperiodstart >= date_add('day', -7, current_date)
GROUP BY 1 ORDER BY 2 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D17",
    slug: "credits-and-discounts-burn-down",
    title: "Credits and Discounts Burn-down",
    audience: "Founders, Finance",
    cadence: "Weekly",
    answers: "When do credits run out and what will our cash bill look like?",
    widgets: [
      "Remaining credit balance by program and expiration date",
      "Weekly credit burn rate and velocity",
      "Projected credit exhaustion date",
      "Gross on-demand run-rate vs Net bill paid",
      "Services consuming credits vs ineligible charges"
    ],
    dataSource: "AWS Credits Detail Page & API, CUR credit line items",
    alerts: "Credits expiring in < 60 days with unburned balance; credit exhaustion within 90 days.",
    sampleSql: `SELECT credit_program_name,
       expiration_date,
       remaining_balance,
       ROUND(weekly_burn_rate, 2) AS burn_rate,
       date_add('day', CAST(remaining_balance / NULLIF(weekly_burn_rate, 0) * 7 AS INT), current_date) AS projected_zero_date
FROM credits_db.active_credits;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D18",
    slug: "startup-runway-view",
    title: "Startup Runway View",
    audience: "Founders, Board of Directors",
    cadence: "Monthly",
    answers: "Is cloud spend sustainable for our current capital stage?",
    widgets: [
      "AWS spend as a percentage of total monthly cash burn",
      "Cloud cost as a percentage of Monthly Recurring Revenue (MRR)",
      "Cost per active customer",
      "Gross margin with and without cloud credits",
      "Top 5 infrastructure drivers"
    ],
    dataSource: "FOCUS 1.2, Stripe/QuickBooks MRR data, AWS Credits API",
    alerts: "Cloud spend exceeds 15% of total operating cash burn.",
    sampleSql: `SELECT month,
       mrr,
       cloud_spend_gross,
       cloud_spend_net,
       ROUND(cloud_spend_gross / NULLIF(mrr, 0) * 100, 2) AS cloud_pct_of_mrr
FROM founders_metrics_db.monthly_overview
ORDER BY month DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D19",
    slug: "marketplace-and-saas",
    title: "Marketplace and SaaS",
    audience: "Procurement, Vendor Management",
    cadence: "Quarterly",
    answers: "What 3rd-party software is billed via AWS, and does it count toward commitments?",
    widgets: [
      "Marketplace spend by vendor and software product",
      "Contract renewal calendar",
      "Contribution to PPA / EDP private pricing burn-down",
      "Duplicate tool identification"
    ],
    dataSource: "CUR 2.0 (billing entity 'AWS Marketplace'), AWS Marketplace Management Console",
    alerts: "Auto-renewing subscription for decommissioned project.",
    sampleSql: `SELECT line_item_legal_entity,
       line_item_line_item_description,
       ROUND(SUM(line_item_unblended_cost), 2) AS software_spend
FROM cur_db.cur2
WHERE line_item_legal_entity = 'AWS Marketplace'
GROUP BY 1, 2 ORDER BY 3 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D20",
    slug: "sustainability",
    title: "Sustainability and Carbon",
    audience: "Sustainability Officers, Engineering Leadership",
    cadence: "Quarterly",
    answers: "How do carbon emissions and cost savings move in tandem?",
    widgets: [
      "Estimated carbon emissions (MTCO2e) by service and region",
      "Graviton and modern-generation compute share",
      "Idle resource runtime eliminated",
      "Storage gigabytes archived or tiered"
    ],
    dataSource: "Customer Carbon Footprint Tool, Compute Optimizer, CUR 2.0",
    alerts: "Carbon emissions increasing while business transactions remain flat.",
    sampleSql: `SELECT region,
       service,
       ROUND(SUM(carbon_emissions_mtco2e), 4) AS emissions_mtco2e,
       ROUND(SUM(effective_cost), 2) AS cost
FROM sustainability_db.carbon_metrics
GROUP BY 1, 2 ORDER BY 3 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D21",
    slug: "account-and-region-sprawl",
    title: "Account and Region Sprawl",
    audience: "Cloud Governance, Security Lead",
    cadence: "Monthly",
    answers: "Where are resources running that nobody knows about?",
    widgets: [
      "Spend in non-approved geographical AWS Regions",
      "Member accounts with spend but missing Owner tag",
      "Newly created accounts and initial 30-day burn",
      "Dormant or suspended accounts still accruing fees"
    ],
    dataSource: "CUR 2.0, AWS Organizations API, AWS Config",
    alerts: "Any non-zero spend in an unapproved region; untagged account with > $50 spend.",
    sampleSql: `SELECT line_item_usage_account_id,
       line_item_availability_zone,
       ROUND(SUM(line_item_unblended_cost), 2) AS unapproved_region_cost
FROM cur_db.cur2
WHERE line_item_availability_zone NOT LIKE 'us-east-1%'
  AND line_item_availability_zone NOT LIKE 'us-west-2%'
  AND line_item_availability_zone <> ''
GROUP BY 1, 2 ORDER BY 3 DESC;`,
    lastVerified: "2026-10-31"
  },
  {
    id: "D22",
    slug: "optimization-pipeline",
    title: "Optimization Pipeline & Realized Savings",
    audience: "FinOps Lead, Executive Sponsors",
    cadence: "Monthly",
    answers: "Is our cost efficiency program delivering real financial ROI?",
    widgets: [
      "Identified vs In-Progress vs Realized savings funnel",
      "Savings breakdown by lever (Rate vs Usage)",
      "Velocity: mean days from recommendation to deployment",
      "Cost Efficiency score progression over time",
      "Cumulative realized savings vs FinOps tooling/headcount costs"
    ],
    dataSource: "Cost Optimization Hub recommendations export, Jira/Linear FinOps backlog, CUR",
    alerts: "Realized savings lower than monthly target for 2 consecutive months.",
    sampleSql: `SELECT status,
       lever_type,
       COUNT(*) AS recommendation_count,
       ROUND(SUM(estimated_monthly_savings), 2) AS total_monthly_savings
FROM finops_pipeline_db.backlog
GROUP BY 1, 2 ORDER BY 4 DESC;`,
    lastVerified: "2026-10-31"
  }
];
