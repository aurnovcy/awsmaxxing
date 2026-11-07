export interface KPI {
  id: string;
  name: string;
  formula: string;
  healthyBand: string;
  whyItMatters: string;
  domain: string;
  tips: string[];
}

export const KPIS: KPI[] = [
  {
    id: "cost_efficiency_score",
    name: "Cost Efficiency Score",
    formula: "From Cost Optimization Hub: 100 * (1 - Total Estimated Savings / Addressable Spend)",
    healthyBand: "Above 83 (2026 AWS benchmark median; top quartile 88+)",
    whyItMatters: "AWS-native benchmark aggregating commitments, rightsizing, idle cleanup, and modern generation upgrades into a single authoritative efficiency rating.",
    domain: "Executive",
    tips: ["VIS-17", "EC2-02", "STO-01", "COM-02"]
  },
  {
    id: "effective_savings_rate",
    name: "Effective Savings Rate (ESR)",
    formula: "1 − (Total Effective Amortized Cost ÷ On-Demand Equivalent Cost)",
    healthyBand: "20%–40% for compute-heavy architectures",
    whyItMatters: "Combines commitment coverage and discount depth into one metric. Shows the true blended percentage discount your organization achieves.",
    domain: "Commitments",
    tips: ["COM-01", "COM-05", "COM-23"]
  },
  {
    id: "commitment_coverage",
    name: "Commitment Coverage",
    formula: "Committed Compute Usage ÷ Total Eligible Compute Usage (at on-demand list price)",
    healthyBand: "70%–85% of steady-state baseline",
    whyItMatters: "Measures what percentage of your steady compute, database, and container footprint receives discount pricing.",
    domain: "Commitments",
    tips: ["COM-04", "COM-05", "COM-08"]
  },
  {
    id: "commitment_utilization",
    name: "Commitment Utilization",
    formula: "Used Commitment ($) ÷ Total Purchased Commitment ($)",
    healthyBand: "98%–100%",
    whyItMatters: "Any utilization below 98% represents unapplied commitment fees: pure financial waste from over-purchasing.",
    domain: "Commitments",
    tips: ["COM-02", "COM-03"]
  },
  {
    id: "allocation_coverage",
    name: "Allocation Coverage (Tagged Spend)",
    formula: "Allocated Spend (with valid owner/team tag) ÷ Total Billed Spend",
    healthyBand: "90%+ for Walk stage, 95%+ for Run stage",
    whyItMatters: "You cannot hold teams accountable for costs they cannot see or attribute to their engineering domains.",
    domain: "Governance",
    tips: ["TAG-01", "TAG-03", "TAG-11", "ORG-02"]
  },
  {
    id: "idle_spend_pct",
    name: "Idle Spend Percentage",
    formula: "Identified Idle & Orphaned Resource Cost ÷ Total AWS Bill",
    healthyBand: "Under 2%–3% of total spend",
    whyItMatters: "Direct operational hygiene indicator: flags unattached EBS, unused NAT Gateways, idle IPv4, and abandoned dev instances.",
    domain: "Hygiene",
    tips: ["STO-04", "NET-05", "NET-09", "EC2-05"]
  },
  {
    id: "graviton_share",
    name: "Graviton Compute Share",
    formula: "Graviton (ARM64) Instance Hours ÷ Total Eligible EC2/RDS/Lambda Hours",
    healthyBand: "Increasing quarter-over-quarter (target 60%+)",
    whyItMatters: "Graviton provides ~20% lower cost per hour with superior energy and processing efficiency across compute and databases.",
    domain: "Modernization",
    tips: ["EC2-08", "DB-03", "SLS-01", "CON-06"]
  },
  {
    id: "gp2_share",
    name: "EBS gp2 Volume Share",
    formula: "gp2 Volume GB ÷ Total EBS General Purpose GB",
    healthyBand: "0% (gp3 should be 100%)",
    whyItMatters: "gp2 is 20% more expensive than gp3 for identical or inferior performance. Running gp2 is leaving free money on the table.",
    domain: "Storage",
    tips: ["STO-01", "STO-02"]
  },
  {
    id: "memory_metrics_coverage",
    name: "EC2 Memory Metrics Coverage",
    formula: "Instances emitting memory utilization ÷ Total running EC2 instances",
    healthyBand: "90%+ of production instances",
    whyItMatters: "Compute Optimizer cannot safely rightsize memory-bound workloads without RAM metrics. Enables 8-30% more savings per recommendation.",
    domain: "Compute",
    tips: ["EC2-02", "EC2-03"]
  },
  {
    id: "non_prod_off_hours_ratio",
    name: "Non-Production Off-Hours Ratio",
    formula: "Hours Stopped ÷ Total Potential Hours (730/mo) for Staging/Dev",
    healthyBand: "50%–65% (stopped nights & weekends)",
    whyItMatters: "Development environments running 24/7 waste up to 65% of their compute and database budget while developers are asleep.",
    domain: "Compute",
    tips: ["EC2-16", "DB-02", "AUT-05"]
  },
  {
    id: "data_transfer_pct",
    name: "Data Transfer Percentage of Spend",
    formula: "Total Data Transfer & NAT Charges ÷ Total AWS Bill",
    healthyBand: "Investigate if > 10% of total bill",
    whyItMatters: "High data transfer percentage usually indicates missing S3/DynamoDB gateway endpoints, redundant cross-AZ traffic, or egress leaks.",
    domain: "Networking",
    tips: ["NET-01", "NET-02", "NET-07", "NET-12"]
  },
  {
    id: "observability_pct",
    name: "Observability Percentage of Spend",
    formula: "CloudWatch, CloudTrail, X-Ray & Telemetry Charges ÷ Total AWS Bill",
    healthyBand: "Under 8%–10% of total bill",
    whyItMatters: "Prevents situations where monitoring and logging cost more than the microservices they observe.",
    domain: "Observability",
    tips: ["OBS-01", "OBS-02", "OBS-03", "OBS-10"]
  },
  {
    id: "unit_cost",
    name: "Unit Cost (Cost Per Business Metric)",
    formula: "Total Cloud Spend ÷ Core Business Metric (MAU, Orders, API Requests)",
    healthyBand: "Flat or falling as transaction volume scales",
    whyItMatters: "Spending more is acceptable if business revenue or volume grew faster. Unit cost proves economies of scale.",
    domain: "Executive",
    tips: ["VIS-23", "CUL-01", "CUL-04"]
  },
  {
    id: "cloud_cost_pct_revenue",
    name: "Cloud Spend as % of Revenue",
    formula: "Total Monthly AWS Bill ÷ Monthly Revenue",
    healthyBand: "Context-dependent: SaaS target 3%–12%, AI-first 15%–25%",
    whyItMatters: "Primary gross margin driver for software and internet businesses evaluated by venture investors and public markets.",
    domain: "Executive",
    tips: ["STU-04", "STU-05"]
  },
  {
    id: "forecast_accuracy",
    name: "Forecast Accuracy",
    formula: "1 − (|Actual Monthly Spend − Forecasted Spend| ÷ Actual Spend)",
    healthyBand: "Within ±5% monthly variance",
    whyItMatters: "Builds financial credibility with CFOs and eliminates end-of-quarter budget surprises.",
    domain: "Governance",
    tips: ["VIS-16", "GOV-01"]
  },
  {
    id: "anomaly_mttr",
    name: "Cost Anomaly MTTR",
    formula: "Mean time from anomaly trigger to root cause remediation",
    healthyBand: "Under 2 business days",
    whyItMatters: "Quick response stops runaway bugs, infinite loops, or leaked keys before bills accumulate thousands of dollars.",
    domain: "Governance",
    tips: ["GOV-05", "GOV-08", "VIS-15"]
  },
  {
    id: "extended_support_spend",
    name: "Extended Support Tax ($/mo)",
    formula: "Sum of EKS & RDS ExtendedSupport CUR line items",
    healthyBand: "$0 (or explicitly budgeted during migration phases)",
    whyItMatters: "Direct avoidable penalty fee ($0.60/hr per cluster for EKS, $0.10-$0.20/vCPU-hr for RDS) for running old software.",
    domain: "Lifecycle",
    tips: ["CON-08", "DB-10", "EOS-01", "EOS-02"]
  },
  {
    id: "cache_hit_rate_ai",
    name: "AI Prompt Cache Hit Rate",
    formula: "Cached Input Tokens ÷ Total Input Tokens in Bedrock",
    healthyBand: "60%–90% on supported repetitive agentic / RAG workloads",
    whyItMatters: "Cached tokens are discounted up to 90% and return faster; directly cuts AI inference costs.",
    domain: "AI",
    tips: ["AI-03", "AI-04"]
  }
];
