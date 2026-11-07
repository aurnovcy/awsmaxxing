export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  tipId?: string;
  effort: string;
  impact: string;
}

export interface PlaybookPhase {
  phaseName: string;
  timeframe: string;
  goal: string;
  steps: PlaybookStep[];
}

export interface Playbook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  audience: string;
  spendRange: string;
  duration: string;
  expectedOutcome: string;
  seoTitle: string;
  metaDescription: string;
  overview: string;
  phases: PlaybookPhase[];
  lastVerified: string;
}

export const PLAYBOOKS: Record<string, Playbook> = {
  'startup-30-day-plan': {
    id: 'startup-30-day-plan',
    slug: 'startup-30-day-plan',
    title: 'Startup 30-Day AWS Cost Plan',
    subtitle: 'One founder or lead engineer, a few hours a week. Cut waste without slowing product velocity.',
    audience: 'Startup (ST)',
    spendRange: 'Under $50k / month',
    duration: '4 Weeks',
    expectedOutcome: '15%–30% lower run-rate with zero architecture rewrites, guaranteed protection from leaked credential bill-shock, and clear visibility into post-credit runway.',
    seoTitle: 'AWS Cost Optimization for Startups: The 30-Day Action Plan',
    metaDescription: 'Step-by-step 30-day AWS FinOps playbook for early-stage teams: budgets, Cost Anomaly Detection, quick wins, and avoiding the post-credit cliff.',
    overview: 'At seed to Series A, engineering time is your scarcest resource. You cannot spend weeks re-architecting for micro-optimizations. This 30-day checklist focuses exclusively on high-leverage guardrails, immediate 5-minute cleanup wins, and safe rate commitments so you stop bleeding runway while shipping core features.',
    lastVerified: '2026-10-31',
    phases: [
      {
        phaseName: 'Week 1',
        timeframe: 'Days 1–7',
        goal: 'Put up critical financial guardrails and credential firewalls',
        steps: [
          {
            id: 'st-01',
            title: 'Set up a total-account budget with 50/80/100% and forecasted alerts',
            description: 'The cheapest insurance in AWS. Configure an AWS Budget alerting at 50%, 80%, 100% of your target, plus 100% FORECASTED spend to catch runaway loops within hours.',
            tipId: 'GOV-01',
            effort: '15 mins',
            impact: '$$$'
          },
          {
            id: 'st-02',
            title: 'Turn on Cost Anomaly Detection with dimensional monitors to Slack',
            description: 'One managed monitor tracks every linked account and service dimension automatically. Route alerts via SNS to your engineering Slack channel.',
            tipId: 'GOV-05',
            effort: '20 mins',
            impact: '$$$'
          },
          {
            id: 'st-03',
            title: 'Enforce MFA and remove long-lived access keys',
            description: 'Compromised developer keys spinning up G5/P4 GPU instances in remote regions is the #1 cause of startup bankruptcy bills. Enforce IAM Identity Center or short-lived STS credentials.',
            tipId: 'ORG-18',
            effort: '30 mins',
            impact: '$$$'
          },
          {
            id: 'st-04',
            title: 'Deny unused AWS Regions with an SCP or account policy',
            description: 'Lock your account down to only the regions you actively deploy to (e.g. us-east-1 and us-west-2). Blocks forgotten sandbox experiments and shadow crypto-miners.',
            tipId: 'ORG-17',
            effort: '15 mins',
            impact: '$$'
          },
          {
            id: 'st-05',
            title: 'Audit AWS Activate credits balance and expiration dates',
            description: 'Check the new Credits detail page. Verify which services credits cover (e.g. EC2/RDS vs Marketplace/Support) and note when the balance expires.',
            tipId: 'ORG-19',
            effort: '10 mins',
            impact: '$$'
          }
        ]
      },
      {
        phaseName: 'Week 2',
        timeframe: 'Days 8–14',
        goal: 'Establish baseline visibility and opt in to native intelligence',
        steps: [
          {
            id: 'st-06',
            title: 'Enable Cost and Usage Report (CUR 2.0) via Data Exports',
            description: 'Enable Parquet-formatted hourly billing exports to an S3 bucket partitioned by month. History cannot be backfilled retroactively, so turn it on now.',
            tipId: 'VIS-01',
            effort: '20 mins',
            impact: '$$'
          },
          {
            id: 'st-07',
            title: 'Activate 2–3 core cost allocation tags (Environment, Project)',
            description: 'Tags in AWS are not retroactive. Activate Environment and Project in the payer account immediately so every dollar becomes attributable.',
            tipId: 'TAG-01',
            effort: '10 mins',
            impact: '$$'
          },
          {
            id: 'st-08',
            title: 'Build one native Billing & Cost Management Dashboard',
            description: 'Create a shareable 4-widget dashboard: spend by service, spend by usage type (reveals EC2-Other), daily run-rate, and month-over-month trend.',
            tipId: 'VIS-05',
            effort: '30 mins',
            impact: '$$'
          },
          {
            id: 'st-09',
            title: 'Opt in to Compute Optimizer and Cost Optimization Hub',
            description: 'Free services that continuously analyze your EC2, EBS, Lambda, and RDS instances to generate rightsizing and idle recommendations.',
            tipId: 'EC2-01',
            effort: '5 mins',
            impact: '$$$'
          }
        ]
      },
      {
        phaseName: 'Week 3',
        timeframe: 'Days 15–21',
        goal: 'Execute zero-risk quick wins (Delete it & Shrink it)',
        steps: [
          {
            id: 'st-10',
            title: 'Migrate all gp2 EBS volumes to gp3',
            description: 'Instant 20% price reduction per GB with baseline 3000 IOPS and 125 MB/s throughput decoupled from disk size. Zero downtime live modification.',
            tipId: 'STO-01',
            effort: '30 mins',
            impact: '$$$'
          },
          {
            id: 'st-11',
            title: 'Delete unattached EBS volumes and legacy snapshots',
            description: 'Terminated EC2 instances frequently leave abandoned root and data volumes running. Audit available volumes and old snapshots.',
            tipId: 'STO-04',
            effort: '20 mins',
            impact: '$$'
          },
          {
            id: 'st-12',
            title: 'Set log retention on all CloudWatch log groups (30–90 days)',
            description: 'Kill "Never Expire". CloudWatch Logs default to keeping data forever. Setting 30-day retention halts unbounded storage growth immediately.',
            tipId: 'OBS-01',
            effort: '20 mins',
            impact: '$$$'
          },
          {
            id: 'st-13',
            title: 'Add free S3 and DynamoDB gateway endpoints to your VPC',
            description: 'Gateway endpoints are 100% free and bypass NAT Gateways entirely, eliminating the $0.045/GB data processing charge for S3 and DynamoDB traffic.',
            tipId: 'NET-02',
            effort: '15 mins',
            impact: '$$$'
          },
          {
            id: 'st-14',
            title: 'Release idle public IPv4 addresses',
            description: 'Release unattached Elastic IPs and migrate backend dev instances into private subnets to avoid the $0.005/hr ($3.65/mo) per-IP fee.',
            tipId: 'NET-09',
            effort: '20 mins',
            impact: '$$'
          },
          {
            id: 'st-15',
            title: 'Add lifecycle rule to abort incomplete S3 multipart uploads',
            description: 'Failed uploads leave invisible chunk files that bill indefinitely at full S3 Standard rates. Set a rule to purge after 7 days.',
            tipId: 'S3-09',
            effort: '10 mins',
            impact: '$$'
          },
          {
            id: 'st-16',
            title: 'Schedule non-production instances to shut down off-hours',
            description: 'Stop staging and dev EC2/RDS instances nights and weekends. Cuts dev compute and database bills by ~65%.',
            tipId: 'EC2-16',
            effort: '45 mins',
            impact: '$$$'
          }
        ]
      },
      {
        phaseName: 'Week 4',
        timeframe: 'Days 22–30',
        goal: 'Lock in rate savings and prepare for the post-credit cliff',
        steps: [
          {
            id: 'st-17',
            title: 'Model your true post-credit cash run-rate',
            description: 'Calculate the exact month your credits will expire and model the unblended cash bill that will follow. Don’t wait until credit exhaustion to act.',
            tipId: 'STU-05',
            effort: '30 mins',
            impact: '$$$'
          },
          {
            id: 'st-18',
            title: 'Purchase a small No-Upfront 1-Year Compute Savings Plan',
            description: 'Use Target Coverage in Purchase Analyzer to cover 60%–70% of your lean steady-state baseline. Do not commit to peak or volatile capacity.',
            tipId: 'COM-04',
            effort: '30 mins',
            impact: '$$$'
          },
          {
            id: 'st-19',
            title: 'If running GenAI: set Bedrock budgets and enable prompt caching',
            description: 'Cache repetitive system instructions and context prefixes in Bedrock for a 90% discount on cached input tokens; use batch inference for async runs.',
            tipId: 'AI-03',
            effort: '30 mins',
            impact: '$$$'
          }
        ]
      }
    ]
  },
  'scale-up-90-day-program': {
    id: 'scale-up-90-day-program',
    slug: 'scale-up-90-day-program',
    title: 'Scale-Up 90-Day AWS FinOps Program',
    subtitle: 'For growing engineering organizations ($50k–$1M/mo). Shift from reactive firefighting to continuous unit-economic governance.',
    audience: 'Scale-Up (SU)',
    spendRange: '$50k–$1M / month',
    duration: '90 Days',
    expectedOutcome: '20%–35% reduction in unit infrastructure costs, baseline Cost Efficiency score > 85, automated PR cost reviews, and 90%+ tag allocation.',
    seoTitle: '90-Day AWS FinOps Program for Scale-Ups: Scale Efficiently',
    metaDescription: 'A systematic 90-day roadmap for high-growth tech companies: container rightsizing, Karpenter consolidation, Graviton migration, and layered Savings Plans.',
    overview: 'As teams grow from 20 to 150+ engineers, AWS spend grows exponentially if left unchecked. The 90-day program transitions your company from informal cost awareness to institutional FinOps maturity: solid multi-account isolation, deep container allocation, proactive architecture shift-left, and multi-layered commitment ladders.',
    lastVerified: '2026-10-31',
    phases: [
      {
        phaseName: 'Days 1–30',
        timeframe: 'Month 1',
        goal: 'Architectural foundation, deep visibility, and allocation rigor',
        steps: [
          {
            id: 'su-01',
            title: 'Isolate workloads: one account per environment and product',
            description: 'Enforce clean account boundaries for production, staging, data, and dev. Accounts are the cleanest, tamper-proof allocation key AWS provides.',
            tipId: 'ORG-02',
            effort: '1 week',
            impact: '$$'
          },
          {
            id: 'su-02',
            title: 'Map Cost Categories and Organizations Tag Policies',
            description: 'Standardize tag keys (Team, Service, CostCenter). Enforce syntax via Tag Policies and map accounts/tags into Cost Categories.',
            tipId: 'TAG-03',
            effort: '3 days',
            impact: '$$'
          },
          {
            id: 'su-03',
            title: 'Deploy FOCUS 1.2 Data Export and Cloud Intelligence Dashboards (CID)',
            description: 'Stand up CUDOS and the Waste Tracker dashboard in QuickSight via Athena to provide engineering teams with rich self-service analytics.',
            tipId: 'VIS-06',
            effort: '2 days',
            impact: '$$$'
          },
          {
            id: 'su-04',
            title: 'Deploy CloudWatch Agent memory metrics across all EC2 instances',
            description: 'Without memory data, Compute Optimizer cannot recommend rightsizing memory-bound instances. Push SSM Run Command org-wide.',
            tipId: 'EC2-02',
            effort: '2 days',
            impact: '$$$'
          },
          {
            id: 'su-05',
            title: 'Baseline your organizational Cost Efficiency score and ESR',
            description: 'Benchmark your starting point against the 2026 AWS median of 83. Establish a quarterly target for each engineering squad.',
            tipId: 'VIS-17',
            effort: '1 day',
            impact: '$$'
          }
        ]
      },
      {
        phaseName: 'Days 31–60',
        timeframe: 'Month 2',
        goal: 'Decentralized usage optimization & infrastructure modernization',
        steps: [
          {
            id: 'su-06',
            title: 'Drive the Waste and Idle Tracker (D04) to near-zero',
            description: 'Purge abandoned RDS read replicas, unused NAT Gateways, idle ALBs, and aged snapshots across all development and staging accounts.',
            tipId: 'NET-05',
            effort: '1 week',
            impact: '$$$'
          },
          {
            id: 'su-07',
            title: 'Rightsize the top 20 resources by spend',
            description: 'Focus on the Pareto front: top 20 EC2 instances and database clusters representing 50%+ of compute spend.',
            tipId: 'EC2-06',
            effort: '1 week',
            impact: '$$$'
          },
          {
            id: 'su-08',
            title: 'Kick off Graviton migration for containers and databases',
            description: 'Port container images to multi-arch (arm64/amd64). Move non-prod RDS to r7g/m7g instances and benchmark latency and throughput.',
            tipId: 'EC2-08',
            effort: '2 weeks',
            impact: '$$$'
          },
          {
            id: 'su-09',
            title: 'Tune Kubernetes pod requests and enable Karpenter consolidation',
            description: 'Rightsize CPU/memory requests with VPA recommendations. Configure Karpenter with consolidationPolicy: WhenEmptyOrUnderutilized.',
            tipId: 'CON-03',
            effort: '1 week',
            impact: '$$$'
          },
          {
            id: 'su-10',
            title: 'Execute network diet: VPC interface endpoints and zone-local routing',
            description: 'Review top NAT talkers with VPC Flow Logs. Deploy interface endpoints for high-volume AWS APIs and keep microservice chatter in-AZ.',
            tipId: 'NET-03',
            effort: '1 week',
            impact: '$$$'
          },
          {
            id: 'su-11',
            title: 'Observability diet: purge debug logs and filter high-cardinality metrics',
            description: 'Eliminate DEBUG logging in production, sample high-volume web logs, and route vended logs (VPC Flow Logs) directly to S3 Parquet.',
            tipId: 'OBS-03',
            effort: '3 days',
            impact: '$$'
          }
        ]
      },
      {
        phaseName: 'Days 61–90',
        timeframe: 'Month 3',
        goal: 'Layered rate optimization, shift-left automation & cultural rituals',
        steps: [
          {
            id: 'su-12',
            title: 'Purchase layered Compute and Database Savings Plans',
            description: 'Commit to 75%–80% coverage on your newly lean baseline. Layer 1-year no-upfront Database SPs across Gen 7+ RDS and serverless.',
            tipId: 'COM-08',
            effort: '3 days',
            impact: '$$$'
          },
          {
            id: 'su-13',
            title: 'Embed Infracost cost estimates into GitHub/GitLab pull requests',
            description: 'Engineers see the monthly cost delta directly on the PR before merging Terraform changes. The ultimate shift-left tool.',
            tipId: 'AUT-01',
            effort: '2 days',
            impact: '$$'
          },
          {
            id: 'su-14',
            title: 'Launch weekly Team Showback scorecards',
            description: 'Send weekly automated Slack summaries to engineering squad leads: spend trend, unit cost metric, and open recommendations.',
            tipId: 'CUL-02',
            effort: '2 days',
            impact: '$$'
          },
          {
            id: 'su-15',
            title: 'Establish a monthly 30-minute executive FinOps review ritual',
            description: 'Regular ritual reviewing Cost Efficiency score, unit metrics, realized savings backlog, and expiring commitments.',
            tipId: 'GOV-13',
            effort: 'Ongoing',
            impact: '$$$'
          }
        ]
      }
    ]
  },
  'enterprise-12-month-program': {
    id: 'enterprise-12-month-program',
    slug: 'enterprise-12-month-program',
    title: 'Enterprise 12-Month FinOps Operating Program',
    subtitle: 'Multi-organization, multi-million-dollar estates. Institutional governance, automated remediation, commercial leverage, and AI FinOps.',
    audience: 'Enterprise (EN)',
    spendRange: 'Over $1M / month',
    duration: '12 Months (4 Quarters)',
    expectedOutcome: 'Consistent Cost Efficiency score > 90, 95%+ cost allocation coverage, multi-million dollar PPA renewal savings, and zero extended-support taxes.',
    seoTitle: 'Enterprise FinOps Operating Model: 12-Month Transformation',
    metaDescription: 'Strategic 12-month FinOps program for global enterprise AWS estates: multi-source billing, FOCUS reconciliation, PPA negotiations, and AI token controls.',
    overview: 'Enterprises manage tens of thousands of resources across hundreds of AWS accounts and multiple business units. Optimization at scale requires formal FinOps charters, policy-as-code automation, commercial discount negotiations (PPA/EDP), lifecycle modernization, and rigorous unit economics.',
    lastVerified: '2026-10-31',
    phases: [
      {
        phaseName: 'Q1: Data & Allocation',
        timeframe: 'Months 1–3',
        goal: 'Single pane of glass, FOCUS standardization, and 90%+ allocation',
        steps: [
          {
            id: 'en-01',
            title: 'Consolidate multiple organizations via Multi-Source Billing View',
            description: 'Aggregate shared billing views from up to 20 payer accounts into a single console without complex custom data pipelines.',
            tipId: 'ORG-08',
            effort: '3 weeks',
            impact: '$$'
          },
          {
            id: 'en-02',
            title: 'Adopt FOCUS 1.2 as the organizational system of record',
            description: 'Standardize all internal BI, chargeback, and reporting on the FOCUS specification for seamless invoice reconciliation.',
            tipId: 'VIS-02',
            effort: '4 weeks',
            impact: '$$'
          },
          {
            id: 'en-03',
            title: 'Implement shared-cost allocation and Kubernetes pod label split',
            description: 'Allocate support charges, shared networking hubs, and EKS multi-tenant clusters directly down to business units and apps.',
            tipId: 'CON-01',
            effort: '4 weeks',
            impact: '$$$'
          },
          {
            id: 'en-04',
            title: 'Charter FinOps steering committee aligned with Executive Strategy',
            description: 'Establish executive sponsorship, RACI matrix, and business scopes aligned with the FinOps Framework 2026 guidelines.',
            tipId: 'CUL-10',
            effort: '2 weeks',
            impact: '$$'
          }
        ]
      },
      {
        phaseName: 'Q2: Optimization at Scale',
        timeframe: 'Months 4–6',
        goal: 'Automated remediation campaigns and legacy lifecycle elimination',
        steps: [
          {
            id: 'en-05',
            title: 'Deploy Compute Optimizer Automation for EBS and idle resources',
            description: 'Automate snapshot-and-delete of unattached volumes and generation upgrades on schedule with rollback capabilities.',
            tipId: 'AUT-04',
            effort: '3 weeks',
            impact: '$$$'
          },
          {
            id: 'en-06',
            title: 'Organization-wide Graviton and latest-gen upgrade campaign',
            description: 'Modernize compute fleets to Graviton3/4 and database fleets to Gen 7+ instances with automated Jira sprint integration.',
            tipId: 'EC2-08',
            effort: '6 weeks',
            impact: '$$$'
          },
          {
            id: 'en-07',
            title: 'Eliminate Extended Support surcharges (EKS, RDS, Windows 2016)',
            description: 'Execute blue/green database upgrades, upgrade EKS clusters within 14 months, and prepare migrations off Windows Server 2016.',
            tipId: 'EOS-02',
            effort: '6 weeks',
            impact: '$$$'
          }
        ]
      },
      {
        phaseName: 'Q3: Commercial Levers',
        timeframe: 'Months 7–9',
        goal: 'Commitment portfolio management and Private Pricing Agreement (PPA)',
        steps: [
          {
            id: 'en-08',
            title: 'Configure Savings Plans prioritized group sharing preferences',
            description: 'Ensure business unit commitments benefit that unit first, while unused spillover flows to the rest of the enterprise.',
            tipId: 'GOV-17',
            effort: '1 week',
            impact: '$$'
          },
          {
            id: 'en-09',
            title: 'Structure staggered commitment ladders across Compute and Database SPs',
            description: 'Build a quarterly purchase schedule to maintain 80%+ coverage without single cliff expiration exposure.',
            tipId: 'COM-03',
            effort: '2 weeks',
            impact: '$$$'
          },
          {
            id: 'en-10',
            title: 'Prepare PPA / EDP contract renewal modeling and shortfall analysis',
            description: 'Model future growth scenarios, service-specific discounts (S3, CloudFront, Direct Connect), and Marketplace consolidation.',
            tipId: 'CML-01',
            effort: '4 weeks',
            impact: '$$$'
          }
        ]
      },
      {
        phaseName: 'Q4: Shift-Left & AI FinOps',
        timeframe: 'Months 10–12',
        goal: 'Policy-as-code guardrails, AI unit economics, and FinOps agent',
        steps: [
          {
            id: 'en-11',
            title: 'Deploy policy-as-code guardrails in CI/CD (Checkov, OPA, cfn-guard)',
            description: 'Block unapproved instance sizes, gp2 storage, untagged resources, and missing lifecycle policies prior to deployment.',
            tipId: 'AUT-03',
            effort: '3 weeks',
            impact: '$$'
          },
          {
            id: 'en-12',
            title: 'Deploy AI FinOps governance: inference profiles, token controls & caching',
            description: 'Isolate generative AI token spend by business outcome, cap agent loops, and enforce prompt caching on production models.',
            tipId: 'AI-01',
            effort: '3 weeks',
            impact: '$$$'
          },
          {
            id: 'en-13',
            title: 'Scale operations with AWS FinOps Agent and MCP developer tooling',
            description: 'Provide natural-language cost queries and automated anomaly investigations to developers directly in their IDEs.',
            tipId: 'VIS-14',
            effort: '2 weeks',
            impact: '$$'
          }
        ]
      }
    ]
  }
};
