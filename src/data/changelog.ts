export interface ChangelogItem {
  id: string;
  date: string;
  event: string;
  title: string;
  summary: string;
  details: string[];
  pillar: 'Track & Allocate' | 'Govern & Operate' | 'Plan & Evaluate' | 'Optimize & Save' | 'AI & Agents';
  isPreview?: boolean;
  docUrl: string;
}

export const BENCHMARK_STATS = [
  {
    metric: '83',
    unit: 'Score',
    label: 'Median Cost Efficiency Score',
    subtext: 'Mean score is 79 across 71,000+ opted-in AWS customers (May 2026 State of Cost Efficiency Report).',
    insight: 'Top quartile customers score 88+ by combining rightsizing with active commitment governance.'
  },
  {
    metric: '17.7%',
    unit: 'Adoption',
    label: 'Customers with EC2 Memory Metrics Enabled',
    subtext: 'Yet enabling memory metrics yields 8–30 percentage points higher savings per rightsizing recommendation.',
    insight: 'Without memory data, Compute Optimizer conservatively defaults to CPU-only bounds or silence.'
  },
  {
    metric: '47.1%',
    unit: 'Action Rate',
    label: 'Customers with Savings Plans Who Actively Rightsize',
    subtext: 'High SP coverage (95–100%) masks 65–80% of visible rightsizing opportunity until contract renewal.',
    insight: 'The Golden Rule: Shrink before you commit. Committing first locks discounts onto oversized capacity.'
  },
  {
    metric: '4x',
    unit: 'Faster',
    label: 'Efficiency Improvement for Dual-Lever Teams',
    subtext: 'Customers combining rightsizing with commitments modernize to newer hardware 60% faster.',
    insight: 'Rate optimization without usage discipline creates an expensive illusion of efficiency.'
  }
];

export const CHANGELOG: ChangelogItem[] = [
  {
    id: 'finops-x-2026-agent',
    date: '2026-06-18',
    event: 'FinOps X 2026',
    title: 'AWS FinOps Agent and AI Cost Investigation',
    summary: 'Autonomous AI agent investigations for cost anomalies and conversational cost assistant for engineering tooling.',
    details: [
      'AWS FinOps Agent (public preview) investigates anomalies down to specific commits, resources, and IAM roles.',
      'AI-powered cost investigation in Cost Anomaly Detection provides plain-language root-cause analysis.',
      'Credits detail page with public API provides single pane of glass for multi-program credit balances and expiry.'
    ],
    pillar: 'AI & Agents',
    isPreview: true,
    docUrl: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/category/news/launch/'
  },
  {
    id: 'finops-x-2026-idle',
    date: '2026-06-15',
    event: 'FinOps X 2026',
    title: 'Six New Idle Resource Types in Compute Optimizer',
    summary: 'Compute Optimizer expanded idle detection across six additional high-cost managed databases and compute services.',
    details: [
      'Provisioned Amazon DynamoDB tables with near-zero read/write activity.',
      'Amazon ElastiCache (Redis and Valkey) clusters with no active connections.',
      'Amazon MemoryDB and DocumentDB (provisioned and serverless) idle instances.',
      'Amazon WorkSpaces with 63-day lookback analysis for inactive virtual desktops.',
      'Amazon SageMaker real-time endpoints with zero invocations over 14 days.'
    ],
    pillar: 'Optimize & Save',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-six-new-idle-resource-recommendations-in-aws-compute-optimizer/'
  },
  {
    id: 'target-coverage-analyzer',
    date: '2026-05-10',
    event: 'AWS CFM Launch',
    title: 'Target Coverage in Savings Plans Purchase Analyzer',
    summary: 'Enter your target coverage percentage (e.g. 75%) and get the precise hourly commitment required.',
    details: [
      'Simulate exact hourly commitment needed to reach a desired coverage percentage without manual spreadsheet math.',
      'Optionally exclude expiring plans to avoid double-counting active commitments.',
      'Integrated with Cost Optimization Hub to account for pending rightsizing actions.'
    ],
    pillar: 'Plan & Evaluate',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/savingsplans/faqs'
  },
  {
    id: 'reinvent-2025-db-sp',
    date: '2025-12-03',
    event: 'AWS re:Invent 2025',
    title: 'Database Savings Plans Launched: Up to 35% Off',
    summary: 'Flexible 1-year no-upfront commitment discount floating across database services and regions.',
    details: [
      'Up to 35% discount for 1-year commitments without upfront payment.',
      'Floats across Amazon RDS, Aurora, ElastiCache (Valkey), DocumentDB, Neptune, and DynamoDB.',
      'Applies to Generation 7+ instances and serverless database usage.'
    ],
    pillar: 'Optimize & Save',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/savingsplans/database-pricing/'
  },
  {
    id: 'reinvent-2025-multi-source',
    date: '2025-12-02',
    event: 'AWS re:Invent 2025',
    title: 'Multi-Source Billing View and CFM MCP Server',
    summary: 'Multi-organization billing consolidation and natural-language cost analysis in developer IDEs.',
    details: [
      'Multi-source Billing View aggregates shared billing data from up to 20 payer accounts in one console view.',
      'Billing and Cost Management MCP Server integrates cost estimation directly into Claude, Cursor, and developer IDEs.',
      'Native Billing and Cost Management Dashboards support up to 20 shareable, permission-aware widgets.'
    ],
    pillar: 'Track & Allocate',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/aws-cloud-financial-management-key-reinvent-2025-launches-to-transform-your-finops-practice/'
  },
  {
    id: 'reinvent-2025-focus-12',
    date: '2025-12-01',
    event: 'AWS re:Invent 2025',
    title: 'FOCUS 1.2 Data Exports and EKS Split Cost Allocation',
    summary: 'Standardized multi-cloud billing columns and granular pod-level Kubernetes cost attribution.',
    details: [
      'Data Exports for FOCUS 1.2 adds capacity reservation fields, invoice IDs, and virtual currencies.',
      'Split Cost Allocation Data with Kubernetes labels imports pod labels as cost allocation tags for EKS.',
      'Forecasting extended to 18 months with up to 36 months of machine learning history.'
    ],
    pillar: 'Track & Allocate',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/reinvent-2025-hidden-cfm-announcements-guide/'
  },
  {
    id: 'free-tier-overhaul-2025',
    date: '2025-07-15',
    event: 'AWS Structural Policy',
    title: 'AWS Free Tier Structural Overhaul',
    summary: 'New accounts select Free vs Paid plan, receive $100 initial credits, and Free plan expires after 6 months.',
    details: [
      'New accounts created after July 15, 2025 choose between a Free plan and Paid plan.',
      'Includes $100 in promotional credits with up to $100 more for completing onboarding milestones.',
      'Free plan expires after 6 months or when credits deplete; legacy accounts created prior remain on 12-month model.'
    ],
    pillar: 'Govern & Operate',
    isPreview: false,
    docUrl: 'https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/'
  }
];
