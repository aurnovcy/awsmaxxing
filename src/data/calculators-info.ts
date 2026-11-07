export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  metaDescription: string;
  howItWorks: string;
  assumptions: string[];
  workedExample: string;
  faqs: CalculatorFAQ[];
  relatedTips: string[];
  relatedPlaybook: string;
  lastVerified: string;
}

export const CALCULATORS_LIST: CalculatorInfo[] = [
  {
    id: 'nat-vs-endpoint',
    slug: 'nat-gateway-vs-vpc-endpoint',
    title: 'NAT Gateway vs VPC Endpoint Break-Even Calculator',
    subtitle: 'Determine the exact GB/month crossover point where VPC Interface or Gateway Endpoints cost less than NAT Gateways.',
    seoTitle: 'NAT Gateway vs VPC Endpoint Cost Calculator & Break-Even Analysis',
    metaDescription: 'Calculate when VPC interface and gateway endpoints beat NAT Gateway data processing fees ($0.045/GB vs $0.01/GB). Interactive calculator with worked examples.',
    howItWorks: `NAT Gateways charge a fixed hourly fee (~$0.045/gateway-hour or ~$32.85/month in us-east-1) plus a steep data processing charge of $0.045 per gigabyte. When private instances interact with high-volume AWS APIs (such as Amazon S3, DynamoDB, ECR, CloudWatch Logs, STS, or Secrets Manager), routing that traffic through a NAT Gateway creates an unnecessary monthly tax.

VPC Gateway Endpoints for Amazon S3 and DynamoDB are completely free: $0.00/hour and $0.00/GB. Adding them immediately saves 100% of the NAT data processing fee for all bucket and database traffic.

For other AWS services, VPC Interface Endpoints (powered by AWS PrivateLink) cost ~$0.01/AZ-hour (~$7.30/month per AZ) and only $0.01/GB for data processing. Because the data processing fee is $0.035/GB cheaper than NAT ($0.01 vs $0.045), high-throughput API endpoints pay for their fixed hourly cost rapidly. This calculator computes the exact break-even point across any number of Availability Zones and traffic volumes.`,
    assumptions: [
      'NAT Gateway data processing rate is $0.045/GB (US East N. Virginia).',
      'NAT Gateway fixed hourly rate is $0.045/hour (~$32.85/month per AZ).',
      'VPC Interface Endpoint fixed hourly rate is $0.01/AZ-hour (~$7.30/month per AZ).',
      'VPC Interface Endpoint data processing fee is $0.01/GB.',
      'S3 and DynamoDB Gateway Endpoints are 100% free with no hourly or per-GB charges.'
    ],
    workedExample: `Suppose you operate a microservices cluster in 2 Availability Zones transferring 2,000 GB/month to Amazon ECR (pulling container images) through a NAT Gateway.
- Current NAT Data Processing: 2,000 GB × $0.045 = $90.00/month.
- Interface Endpoint Cost: (2 AZs × $7.30) + (2,000 GB × $0.01) = $14.60 + $20.00 = $34.60/month.
- Net Monthly Savings: $90.00 − $34.60 = $55.40/month (61% savings).
- Break-even threshold: In 2 AZs, the break-even is approximately 417 GB/month. Any volume above 417 GB pays for the endpoint.`,
    faqs: [
      {
        question: 'Are S3 and DynamoDB gateway endpoints really 100% free?',
        answer: 'Yes. AWS provides VPC Gateway Endpoints for Amazon S3 and DynamoDB with zero hourly fee and zero data processing charge. Every private subnet communicating with S3 should have a gateway endpoint.'
      },
      {
        question: 'When should I keep NAT Gateway instead of creating interface endpoints?',
        answer: 'If you have an API that transfers less than 200–400 GB/month across multiple AZs, the fixed hourly cost of the interface endpoints may exceed the data processing savings. Also, generic internet traffic (GitHub, Stripe, external SaaS) still requires a NAT Gateway.'
      },
      {
        question: 'Can I share VPC Interface Endpoints across multiple VPCs?',
        answer: 'Yes. Centralizing interface endpoints in a shared-services VPC with Route 53 Resolver Private Hosted Zones eliminates duplicate endpoint hourly fees across accounts.'
      }
    ],
    relatedTips: ['NET-02', 'NET-03', 'NET-04', 'NET-07', 'CON-13'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  },
  {
    id: 'gp2-to-gp3',
    slug: 'gp2-to-gp3-savings',
    title: 'EBS gp2 to gp3 Savings Calculator',
    subtitle: 'Calculate instant 20% storage cost savings and performance gains from migrating General Purpose SSD volumes.',
    seoTitle: 'EBS gp2 to gp3 Cost Savings Calculator: Save 20% on Storage',
    metaDescription: 'Calculate savings from upgrading AWS EBS gp2 to gp3 volumes. gp3 is 20% cheaper with 3,000 baseline IOPS and zero migration downtime.',
    howItWorks: `Amazon EBS General Purpose SSD (gp2) volumes couple IOPS directly to storage size (3 IOPS per GB). To get 3,000 IOPS on gp2, engineers had to provision an oversized 1,000 GB volume, costing $100/month regardless of actual disk utilization.

Amazon EBS gp3 decouples storage capacity from IOPS and throughput. gp3 costs $0.08/GB-month (20% cheaper than gp2 at $0.10/GB-month) and provides a free baseline of 3,000 IOPS and 125 MB/s throughput on every volume, even a 20 GB disk. Upgrading takes effect in place with zero volume downtime or reboot.`,
    assumptions: [
      'EBS gp2 storage price is $0.10/GB-month in us-east-1.',
      'EBS gp3 storage price is $0.08/GB-month in us-east-1 (20% baseline savings).',
      'gp3 includes 3,000 IOPS and 125 MB/s baseline throughput free.',
      'Additional gp3 IOPS beyond 3,000 are billed at $0.005/provisioned IOPS-month.',
      'Additional gp3 throughput beyond 125 MB/s is billed at $0.04/provisioned MB/s-month.'
    ],
    workedExample: `A team has 50 development and production instances totaling 10,000 GB of gp2 storage.
- Current gp2 Monthly Cost: 10,000 GB × $0.10 = $1,000.00/month ($12,000/year).
- Equivalent gp3 Monthly Cost: 10,000 GB × $0.08 = $800.00/month ($9,600/year).
- Immediate Annual Cash Savings: $2,400.00/year with superior I/O throughput.`,
    faqs: [
      {
        question: 'Does migrating from gp2 to gp3 require any server downtime?',
        answer: 'No. AWS EBS Elastic Volumes enables modifying volume type, size, and performance on the fly while the EC2 instance is actively running.'
      },
      {
        question: 'Can RDS databases also migrate from gp2 to gp3?',
        answer: 'Yes. Amazon RDS and Aurora support gp3 storage. Modifying RDS storage to gp3 delivers identical 20% storage savings without requiring database restarts.'
      },
      {
        question: 'Is there any reason to keep gp2 volumes?',
        answer: 'None. gp3 is strictly superior in cost, latency predictability, and throughput flexibility for all general-purpose workloads.'
      }
    ],
    relatedTips: ['STO-01', 'STO-02', 'STO-04', 'DB-08'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  },
  {
    id: 'public-ipv4',
    slug: 'aws-public-ipv4-cost',
    title: 'Public IPv4 Annual Cost Calculator',
    subtitle: 'Measure the annual expense of public IPv4 addresses ($0.005/hr) across EC2, ALBs, and NAT Gateways.',
    seoTitle: 'AWS Public IPv4 Address Cost Calculator ($0.005/hr)',
    metaDescription: 'Calculate total spend on AWS public IPv4 addresses. Every public IP costs $3.65/month ($43.80/year). Find ways to eliminate public IP waste.',
    howItWorks: `Starting February 1, 2024, AWS instituted a charge of $0.005 per IP per hour for all public IPv4 addresses—whether in use, attached to EC2 instances, assigned to Application Load Balancers, or sitting idle.

At $0.005/hour, each public IPv4 address costs ~$3.65/month or ~$43.80/year. For organizations running hundreds of public EC2 instances, staging servers, and test environments, this creates an unexpected five-figure annual expense. Moving instances into private subnets behind centralized load balancers or adopting IPv6 removes these charges completely.`,
    assumptions: [
      'Rate is $0.005 per IP per hour ($0.12/day, $3.65/month, $43.80/year per IP).',
      'Applies to in-use public IPs on EC2, EKS nodes, ALBs, NAT Gateways, and unattached Elastic IPs.',
      'BYOIP (Bring Your Own IP) addresses and IPv6 addresses carry zero hourly charge.'
    ],
    workedExample: `An organization with 120 public EC2 instances and 15 unattached Elastic IPs:
- Total Public IPv4 Count: 135 addresses.
- Monthly Cost: 135 × $3.65 = $492.75/month.
- Annual Cost: $5,913.00/year.
- Remediation: Moving 100 non-facing instances to private subnets behind ALBs and releasing 15 unattached EIPs saves $5,037/year immediately.`,
    faqs: [
      {
        question: 'Do AWS Free Tier accounts get free public IPv4 addresses?',
        answer: 'AWS provides 750 hours of public IPv4 address usage per month for the first 12 months on eligible Free Tier EC2 micro instances; all other instances are billed.'
      },
      {
        question: 'How do I locate all public IPv4 addresses in my account?',
        answer: 'Use Amazon VPC IPAM Public IP Insights (free feature in the VPC console) to view all public IPv4 addresses and their usage types across your organization.'
      }
    ],
    relatedTips: ['NET-09', 'NET-10', 'NET-11'],
    relatedPlaybook: 'scale-up-90-day-program',
    lastVerified: '2026-10-31'
  },
  {
    id: 'eks-rds-extended-support',
    slug: 'eks-rds-extended-support-cost',
    title: 'EKS & RDS Extended Support Cost Projector',
    subtitle: 'Project the financial penalty of lagging behind Kubernetes and PostgreSQL/MySQL major version upgrades.',
    seoTitle: 'EKS and RDS Extended Support Cost Calculator: Avoid the Surcharge',
    metaDescription: 'Calculate the 6x price increase on EKS control planes and $0.10-$0.20/vCPU-hr charges for older RDS versions under Extended Support.',
    howItWorks: `Both Amazon EKS and Amazon RDS enforce strict support windows. When versions pass end of standard support:
- EKS Control Plane jumps from standard $0.10/cluster-hour (~$73/mo) to $0.60/cluster-hour (~$438/mo): a 600% increase per cluster.
- RDS Extended Support bills an additional $0.10/vCPU-hour in Years 1 & 2 (~$73/mo per vCPU), which doubles to $0.20/vCPU-hour in Year 3 (~$146/mo per vCPU) on top of standard instance pricing.

This calculator projects your exposure over 12 months so engineering leads can justify upgrade tickets in sprint planning.`,
    assumptions: [
      'EKS standard support: $0.10/hr (~$73/month).',
      'EKS extended support: $0.60/hr (~$438/month), an incremental surcharge of $365/cluster-month.',
      'RDS extended support Years 1-2: $0.10/vCPU-hour (~$73/vCPU-month).',
      'RDS extended support Year 3: $0.20/vCPU-hour (~$146/vCPU-month).'
    ],
    workedExample: `A scale-up operates 6 EKS clusters and 8 RDS database instances (averaging 8 vCPUs each) running deprecated versions for 12 months:
- Incremental EKS Extended Support Surcharge: 6 clusters × $365/mo × 12 = $26,280/year.
- Incremental RDS Extended Support Surcharge: 64 vCPUs × $73/mo × 12 = $56,064/year.
- Total Avoidable Support Penalty: $82,344/year.`,
    faqs: [
      {
        question: 'Does RDS Extended Support enroll automatically?',
        answer: 'Yes. Unless opted out at cluster creation, AWS automatically enrolls expired engines into Extended Support and begins billing the per-vCPU fee.'
      },
      {
        question: 'How can I perform zero-downtime upgrades on RDS?',
        answer: 'Use Amazon RDS Blue/Green Deployments to stage the new engine version on a synchronized green environment, test thoroughly, and switch over in under 60 seconds.'
      }
    ],
    relatedTips: ['CON-08', 'DB-10', 'EOS-01', 'EOS-02', 'EOS-03'],
    relatedPlaybook: 'scale-up-90-day-program',
    lastVerified: '2026-10-31'
  },
  {
    id: 'savings-plans-simulator',
    slug: 'savings-plans-coverage-simulator',
    title: 'Savings Plans Target Coverage & ESR Simulator',
    subtitle: 'Model hourly commitment commitments, coverage percentages, and resulting Effective Savings Rate (ESR).',
    seoTitle: 'AWS Savings Plans Coverage Simulator & Target Commitment Calculator',
    metaDescription: 'Simulate Savings Plans commitments, compute vs EC2 instance savings plans, and calculate Effective Savings Rate without over-committing.',
    howItWorks: `Savings Plans are committed spend denominated in dollars per hour (e.g. $10.00/hour commitment for 1 or 3 years). The secret to high returns is committing against the lean steady-state baseline—never against peak or bursty traffic.

Target Coverage of 70%–85% on compute provides optimal risk-adjusted savings. This simulator models your on-demand hourly spend curve, calculates the required hourly commitment, and outputs the resulting Effective Savings Rate (ESR).`,
    assumptions: [
      'Compute Savings Plans offer ~20%–45% discount across EC2, Fargate, and Lambda.',
      'EC2 Instance Savings Plans offer ~40%–65% discount locked to one family and region.',
      'Target coverage represents the percentage of eligible on-demand spend covered.',
      '100% commitment utilization is targeted to prevent unapplied fee waste.'
    ],
    workedExample: `A business has an eligible compute spend of $20,000/month (~$27.40/hour on-demand).
- Target Coverage: 75% ($20.55/hour addressable baseline).
- Average discount on 1-Year No-Upfront Compute SP: ~28%.
- Hourly commitment to purchase: $20.55 × (1 - 0.28) = $14.80/hour ($10,804/month commitment).
- Monthly on-demand remainder: $27.40 - $20.55 = $6.85/hr ($5,000/month).
- New Monthly Bill: $10,804 + $5,000 = $15,804/month.
- Net Monthly Savings: $4,196/month ($50,352/year). Effective Savings Rate: 21.0%.`,
    faqs: [
      {
        question: 'What is the risk of buying 95%+ coverage?',
        answer: 'AWS benchmark data proves that high coverage (95%+) masks oversized instances. Rightsizing later will not lower your bill—it only frees up unapplied commitment.'
      },
      {
        question: 'Should early-stage startups choose All-Upfront or No-Upfront?',
        answer: 'Almost always No-Upfront. Preserving cash runway is more important than saving an extra 2-3% discount with upfront capital.'
      }
    ],
    relatedTips: ['COM-01', 'COM-02', 'COM-03', 'COM-04', 'COM-05'],
    relatedPlaybook: 'scale-up-90-day-program',
    lastVerified: '2026-10-31'
  },
  {
    id: 'db-sp-vs-ri',
    slug: 'database-savings-plans-vs-reserved-instances',
    title: 'Database Savings Plans vs Reserved Instances',
    subtitle: 'Compare the new Database Savings Plans (up to 35% off, floats across engines) against 1-year and 3-year RIs.',
    seoTitle: 'Database Savings Plans vs Reserved Instances: Full Comparison',
    metaDescription: 'Evaluate Database Savings Plans against traditional RDS Reserved Instances. Break down discounts, flexibility, Gen 7+ eligibility, and serverless coverage.',
    howItWorks: `Introduced at re:Invent 2025, Database Savings Plans offer up to 35% discount for a 1-year No-Upfront commitment. Unlike traditional RDS Reserved Instances which lock you to a single database engine, family, and region, Database Savings Plans float automatically across:
- Amazon RDS and Aurora (Gen 7+ instances: r7g, m7g, c7g)
- Aurora Serverless v2, ElastiCache Serverless, and DocumentDB
- Amazon DynamoDB provisioned and on-demand throughput

Traditional 3-Year RIs offer higher discounts (up to 60%) but lock you to older hardware generations and rigid architectures. This tool models both approaches.`,
    assumptions: [
      'Database Savings Plans: 1-Year No-Upfront, up to 35% discount on Gen 7+ and serverless.',
      'RDS 1-Year Standard RI: ~30%–38% discount, locked to engine and family.',
      'RDS 3-Year Standard RI: ~50%–60% discount, locked for 36 months.'
    ],
    workedExample: `A fleet with $10,000/month spend on RDS PostgreSQL and Aurora Serverless v2:
- On Database Savings Plan (1-Yr No-Upfront, 32% discount): Save $3,200/month with complete freedom to adopt Graviton4 or switch to DynamoDB.
- On Traditional 1-Yr RI (34% discount): Save $3,400/month but unable to cover serverless or switch engines.
- Flexibility Premium: Forfeiting only $200/month to protect against architectural lock-in is overwhelmingly favored.`,
    faqs: [
      {
        question: 'Are older RDS generations (r5, m5) eligible for Database Savings Plans?',
        answer: 'No. Database Savings Plans require Gen 7+ instances (r7g, m7g). Upgrade to Graviton first, then apply Database Savings Plans.'
      },
      {
        question: 'Does ElastiCache Redis qualify?',
        answer: 'ElastiCache Valkey qualifies; Redis OSS does not. Migrating to Valkey unlocks Database Savings Plans eligibility.'
      }
    ],
    relatedTips: ['COM-08', 'COM-09', 'COM-10', 'COM-11', 'DB-03'],
    relatedPlaybook: 'scale-up-90-day-program',
    lastVerified: '2026-10-31'
  },
  {
    id: 'non-prod-scheduling',
    slug: 'non-production-scheduling-savings',
    title: 'Non-Production Off-Hours Scheduling Savings',
    subtitle: 'Measure exact monthly savings from shutting down staging, test, and dev instances nights and weekends.',
    seoTitle: 'Dev/Test Environment Scheduling Savings Calculator: Save 65%',
    metaDescription: 'Calculate how much you save by shutting down dev and staging EC2 and RDS instances off-hours (nights and weekends).',
    howItWorks: `A standard calendar month has 730 hours. A developer working 12 hours a day (7 AM to 7 PM), 5 days a week uses only ~260 hours per month.
Leaving development and staging clusters running 24/7 wastes 470 hours per month (64.4% of total runtime) while engineers are asleep.

By tagging non-production resources and automating start/stop actions using AWS Instance Scheduler or EventBridge, companies routinely cut non-production compute bills by 60%–65%.`,
    assumptions: [
      'Month = 730 hours total.',
      'Business hours schedule (12 hrs/day, Mon–Fri) = 260 hours/month (64.4% savings).',
      'Minimal schedule (10 hrs/day, Mon–Fri) = 216 hours/month (70.4% savings).',
      'Applies to EC2, RDS, and ECS/EKS non-production node groups.'
    ],
    workedExample: `A development environment contains 20 t4g.xlarge EC2 instances and 4 db.r6g.xlarge RDS instances totaling $1,800/month on-demand.
- 24/7 Runtime Cost: $1,800.00/month.
- Scheduled Runtime (7 AM–7 PM, M–F): $1,800 × (260 ÷ 730) = $641.10/month.
- Net Monthly Savings: $1,158.90/month ($13,906.80/year) achieved with zero architectural changes.`,
    faqs: [
      {
        question: 'What happens to RDS storage fees when an instance is stopped?',
        answer: 'Stopping an RDS instance pauses compute and license fees. Allocated EBS storage and backup storage continue to be billed.'
      },
      {
        question: 'Does a stopped RDS instance turn back on automatically?',
        answer: 'Yes. AWS automatically restarts stopped RDS instances after 7 consecutive days for maintenance. Scheduling cron jobs daily prevents this.'
      }
    ],
    relatedTips: ['EC2-16', 'DB-02', 'AUT-05'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  },
  {
    id: 'bedrock-estimator',
    slug: 'bedrock-cost-estimator',
    title: 'Amazon Bedrock GenAI Cost & Caching Estimator',
    subtitle: 'Model monthly LLM inference costs and simulate savings from prompt caching, batch processing, and Flex tier.',
    seoTitle: 'Amazon Bedrock LLM Cost Calculator: Prompt Caching & Batch Savings',
    metaDescription: 'Estimate Amazon Bedrock token spend for Claude, Titan, and Llama models. Model up to 90% savings from prompt caching and 50% from batch inference.',
    howItWorks: `Generative AI inference expenses can rapidly exceed all other infrastructure bills if prompts are unoptimized.
Amazon Bedrock provides three high-impact cost optimization levers:
1. Prompt Caching: Cache deterministic prompt prefixes (system prompts, tool specs, large documents) for up to 90% off cached input tokens.
2. Batch Inference: Process asynchronous summarization, classification, and backfills for 50% off standard token pricing.
3. Model Routing / Flex Tier: Send background workloads to latency-tolerant queues or smaller foundation models for dramatic unit cost reduction.`,
    assumptions: [
      'Claude 3.5 Sonnet: Input $3.00/1M tokens, Output $15.00/1M tokens, Cached Input $0.30/1M tokens (90% off).',
      'Claude 3.5 Haiku: Input $0.80/1M tokens, Output $4.00/1M tokens, Cached Input $0.08/1M tokens.',
      'Bedrock Batch Inference provides 50% discount on both input and output tokens.'
    ],
    workedExample: `An AI agent processes 100,000 tasks/month. Each task contains a 4,000-token system prompt/document prefix + 500 new user tokens, generating 600 output tokens on Claude 3.5 Sonnet.
- Uncached Standard On-Demand:
  Input: (4,500 × 100k) ÷ 1M × $3.00 = $1,350.00
  Output: (600 × 100k) ÷ 1M × $15.00 = $900.00
  Total: $2,250.00/month.
- With Prompt Caching (80% cache hit on 4,000 prefix tokens):
  Cached Input: (3,200 × 100k) ÷ 1M × $0.30 = $96.00
  Remaining Input: (1,300 × 100k) ÷ 1M × $3.00 = $390.00
  Output: $900.00
  New Total: $1,386.00/month ($864/month savings, 38.4% bill reduction).`,
    faqs: [
      {
        question: 'Which models support prompt caching on Bedrock?',
        answer: 'Anthropic Claude models (3.5 Sonnet, 3.5 Haiku, 3 Opus) and select Amazon Titan models support prompt caching on Bedrock via the Converse API.'
      },
      {
        question: 'Is output token generation discounted by prompt caching?',
        answer: 'No. Prompt caching strictly discounts input tokens that match cached prefixes. Output tokens are billed at standard generation rates.'
      }
    ],
    relatedTips: ['AI-01', 'AI-02', 'AI-03', 'AI-04', 'AI-07'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  },
  {
    id: 's3-intelligent-tiering',
    slug: 's3-lifecycle-intelligent-tiering',
    title: 'S3 Lifecycle & Intelligent-Tiering Estimator',
    subtitle: 'Model object storage cost reductions across S3 Standard, Intelligent-Tiering, and Glacier archives.',
    seoTitle: 'S3 Intelligent-Tiering Savings Estimator & Object Size Calculator',
    metaDescription: 'Calculate savings from transitioning Amazon S3 buckets to Intelligent-Tiering. Factor in monitoring fees, object sizes, and zero retrieval fees.',
    howItWorks: `Amazon S3 Standard costs $0.023/GB-month. S3 Intelligent-Tiering monitors access patterns and automatically transitions objects:
- Frequent Access: $0.023/GB-month
- Infrequent Access (after 30 days of no access): $0.0125/GB-month (~45% cheaper)
- Archive Instant Access (after 90 days of no access): $0.004/GB-month (~82% cheaper)
- Zero retrieval fees when cold objects are accessed!

Important Fine Print: Intelligent-Tiering charges a monitoring fee of $0.0025 per 1,000 objects, and objects smaller than 128 KB are never tiered. This calculator models your total object count and size distribution to verify positive net savings.`,
    assumptions: [
      'S3 Standard: $0.023/GB-month.',
      'S3 Intelligent-Tiering Infrequent: $0.0125/GB-month.',
      'S3 Intelligent-Tiering Archive Instant: $0.004/GB-month.',
      'Monitoring fee: $0.0025 per 1,000 objects per month (only for objects >= 128 KB).'
    ],
    workedExample: `A bucket contains 100 TB of log and media data across 500,000 objects (average object size: 200 KB). 60% of data is older than 90 days, 25% is accessed monthly, and 15% is hot.
- S3 Standard Cost: 100,000 GB × $0.023 = $2,300.00/month.
- S3 Intelligent-Tiering Cost:
  Hot (15 TB): 15,000 × $0.023 = $345.00
  Infrequent (25 TB): 25,000 × $0.0125 = $312.50
  Archive Instant (60 TB): 60,000 × $0.004 = $240.00
  Monitoring Fee (500k objects): 500 × $0.0025 = $1.25
  Total Tiered Cost: $898.75/month.
- Net Monthly Savings: $1,401.25/month (60.9% savings).`,
    faqs: [
      {
        question: 'When is Intelligent-Tiering NOT recommended?',
        answer: 'When a bucket consists of hundreds of millions of tiny files under 128 KB. In that scenario, monitoring fees accumulate without tiering benefits. Compact small files into larger archives first.'
      },
      {
        question: 'Are there minimum storage duration charges?',
        answer: 'Unlike Glacier which enforces 90 to 180 day minimums, S3 Intelligent-Tiering has no minimum storage duration for Frequent and Infrequent tiers.'
      }
    ],
    relatedTips: ['S3-01', 'S3-02', 'S3-03', 'S3-09'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  },
  {
    id: 'post-credit-cliff',
    slug: 'startup-post-credit-cliff',
    title: 'Startup Post-Credit Cliff & Runway Calculator',
    subtitle: 'Calculate the exact calendar date credits deplete and model the resulting monthly cash bill.',
    seoTitle: 'Startup AWS Credit Cliff Calculator: Avoid the Cash Shock',
    metaDescription: 'Forecast the day your AWS Activate credits expire and calculate the net cash impact on startup runway. Plan rightsizing and Savings Plans ahead.',
    howItWorks: `Startups often build infrastructure under the illusion of "free" computing with $50k or $100k in AWS Activate credits. When credits run out or hit their expiration date, the full unblended invoice hits company bank accounts with zero warning.

This calculator computes your current monthly burn velocity against remaining credits, projects the exact exhaustion date, models the unblended cash bill, and shows how pre-cliff optimization prevents runway degradation.`,
    assumptions: [
      'Calculates linear credit burn based on current monthly AWS consumption.',
      'Identifies whether credits expire due to calendar time limit or balance exhaustion.',
      'Models 20%–35% baseline reduction from pre-cliff rightsizing and 1-year no-upfront Savings Plans.'
    ],
    workedExample: `A Series Seed startup has $42,000 in remaining credits expiring in 8 months, with gross AWS spend accelerating at $7,000/month.
- Credit Runway: $42,000 ÷ $7,000 = 6.0 months (credits will exhaust 2 months before the calendar expiration).
- Day of Exhaustion: Month 7.
- Cash Shock: Bank account will experience an immediate unexpected -$7,000/month cash burn starting in Month 7.
- Proactive Optimization: Implementing quick wins (gp3, endpoints, scheduling) and a 1-year no-upfront Compute SP in Month 5 lowers run-rate to $4,900/month, saving $25,200 in year one cash.`,
    faqs: [
      {
        question: 'Can I purchase Savings Plans with AWS Activate credits?',
        answer: 'Yes! Compute Savings Plans recurring monthly charges can be covered by promotional credits in most AWS Activate tiers. Purchasing a 1-year No-Upfront plan while still in credit status locks in lower rates.'
      },
      {
        question: 'What charges are NOT covered by AWS credits?',
        answer: 'AWS Marketplace software, Route 53 domain registrations, and AWS Support plan fees typically cannot be paid using promotional credits and appear as cash charges on your card.'
      }
    ],
    relatedTips: ['STU-04', 'STU-05', 'ORG-19', 'COM-12'],
    relatedPlaybook: 'startup-30-day-plan',
    lastVerified: '2026-10-31'
  }
];
