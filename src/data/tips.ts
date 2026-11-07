export interface TipHowTo {
  console: string;
  terraform: string;
  cli: string;
}

export interface Tip {
  id: string;
  slug: string;
  title: string;
  domain: string;
  audience: ('startup' | 'scaleup' | 'enterprise')[];
  effort: 'low' | 'med' | 'high';
  impact: 1 | 2 | 3;
  lever: 'usage' | 'rate' | 'both';
  services: string[];
  summary: string;
  seo_title: string;
  meta_description: string;
  how_to: TipHowTo;
  verify: string;
  related: string[];
  dashboard: string[];
  kpi: string[];
  sources: string[];
  last_verified: string;
  is_preview?: boolean;
}

export const TIPS: Tip[] = [
  {
    id: "NET-02",
    slug: "s3-dynamodb-gateway-endpoints",
    title: "Add S3 and DynamoDB gateway endpoints everywhere",
    domain: "networking",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon VPC", "Amazon S3", "Amazon DynamoDB"],
    summary: "Free VPC endpoints that remove NAT Gateway processing charges ($0.045/GB) for S3 and DynamoDB traffic.",
    seo_title: "Cut NAT Gateway Costs with S3 and DynamoDB Gateway Endpoints",
    meta_description: "Gateway endpoints are free and remove NAT processing charges for S3 and DynamoDB traffic. Setup steps, Terraform, and how to verify the savings.",
    how_to: {
      console: "Navigate to VPC Console > Endpoints > Create Endpoint. Select 'AWS services', choose 'com.amazonaws.[region].s3' (Type: Gateway). Associate your VPC route tables and set Policy to Full Access. Repeat for DynamoDB.",
      terraform: `resource "aws_vpc_endpoint" "s3" {
  vpc_id          = aws_vpc.main.id
  service_name    = "com.amazonaws.\${data.aws_region.current.name}.s3"
  route_table_ids = aws_route_table.private[*].id
  tags = {
    Name = "s3-gateway-endpoint"
  }
}

resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id          = aws_vpc.main.id
  service_name    = "com.amazonaws.\${data.aws_region.current.name}.dynamodb"
  route_table_ids = aws_route_table.private[*].id
}`,
      cli: "aws ec2 create-vpc-endpoint --vpc-id vpc-xxxxxx --service-name com.amazonaws.us-east-1.s3 --route-table-ids rtb-xxxxxx"
    },
    verify: "CUR usage type NatGateway-Bytes drops the following day; check VPC Route Tables for the pl-xxxx prefix list routing directly to vpce-xxxx.",
    related: ["NET-03", "NET-07", "CON-13", "S3-13"],
    dashboard: ["D08"],
    kpi: ["data_transfer_pct"],
    sources: ["https://aws.amazon.com/vpc/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "STO-01",
    slug: "migrate-gp2-to-gp3",
    title: "Migrate all EBS gp2 volumes to gp3",
    domain: "storage",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon EC2", "Amazon EBS"],
    summary: "gp3 is 20% cheaper per GB than gp2 ($0.08 vs $0.10/GB-mo) and includes 3,000 baseline IOPS and 125 MB/s throughput with zero downtime.",
    seo_title: "Save 20% by Migrating EBS gp2 to gp3 Instantly",
    meta_description: "EBS gp3 is 20% cheaper than gp2 with independent IOPS and throughput. Step-by-step console, Terraform, and zero-downtime migration.",
    how_to: {
      console: "In EC2 Console > Volumes, select gp2 volume > Actions > Modify Volume. Change Volume Type to 'General Purpose SSD (gp3)'. Keep default 3000 IOPS and 125 MB/s. Click Modify.",
      terraform: `resource "aws_ebs_volume" "example" {
  availability_zone = "us-east-1a"
  size              = 100
  type              = "gp3"
  iops              = 3000
  throughput        = 125
  tags = {
    Environment = "production"
  }
}`,
      cli: "aws ec2 modify-volume --volume-id vol-xxxxxx --volume-type gp3"
    },
    verify: "In Cost Explorer, filter by Usage Type 'VolumeUsage:gp2' dropping to 0 and replaced by 'VolumeUsage:gp3' with a 20% lower baseline spend.",
    related: ["STO-02", "STO-04", "AUT-04"],
    dashboard: ["D05", "D09"],
    kpi: ["gp2_share", "cost_efficiency_score"],
    sources: ["https://aws.amazon.com/ebs/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "COM-02",
    slug: "shrink-first-then-commit",
    title: "Shrink first, then commit to Savings Plans",
    domain: "commitments",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "both",
    services: ["AWS Cost Management", "Compute Savings Plans", "Amazon EC2"],
    summary: "Rightsize and remove waste before purchasing commitments. If you commit first, rightsizing later frees commitment instead of lowering the bill.",
    seo_title: "The Golden FinOps Rule: Shrink Before Buying Savings Plans",
    meta_description: "Why committing before rightsizing locks in wasteful spend. How to size your lean compute baseline and stagger commitment purchases.",
    how_to: {
      console: "1. Open Cost Optimization Hub and review idle/rightsizing recommendations. 2. Execute rightsizing and verify for 2-3 weeks. 3. Open Savings Plans > Purchase Analyzer and configure Target Coverage on the lean baseline.",
      terraform: "# Commitments are purchased centrally in payer or dedicated FinOps account via AWS Console or Purchase APIs.",
      cli: "aws savingsplans describe-savings-plans-offerings --offering-type 'Compute'"
    },
    verify: "Savings Plans utilization stays >= 98% after rightsizing without unapplied commitment hours.",
    related: ["COM-03", "COM-04", "EC2-02", "EC2-06"],
    dashboard: ["D03", "D05"],
    kpi: ["commitment_coverage", "commitment_utilization", "effective_savings_rate"],
    sources: ["https://aws.amazon.com/savingsplans/faqs"],
    last_verified: "2026-10-31"
  },
  {
    id: "EC2-02",
    slug: "enable-memory-metrics",
    title: "Enable EC2 memory metrics for Compute Optimizer",
    domain: "compute",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "usage",
    services: ["Amazon EC2", "AWS Compute Optimizer", "Amazon CloudWatch"],
    summary: "Only 17.7% of customers enable memory metrics, yet doing so unlocks 8–30 percentage points higher savings per rightsizing recommendation.",
    seo_title: "Unlock 8-30% More EC2 Savings with Memory Metrics",
    meta_description: "How to enable CloudWatch agent memory metrics so Compute Optimizer can safely rightsize memory-bound instances.",
    how_to: {
      console: "Deploy Amazon CloudWatch Agent via AWS Systems Manager Run Command (AmazonCloudWatch-ManageAgent) with mem_used_percent configured.",
      terraform: `resource "aws_ssm_parameter" "cw_agent" {
  name  = "AmazonCloudWatch-Config"
  type  = "String"
  value = jsonencode({
    metrics = {
      metrics_collected = {
        mem = {
          measurement = ["mem_used_percent"]
          metrics_collection_interval = 60
        }
      }
    }
  })
}`,
      cli: "aws ssm send-command --document-name 'AmazonCloudWatch-ManageAgent' --targets 'Key=tag:Environment,Values=production' --parameters 'action=configure,mode=ec2,optionalConfigurationSource=ssm,optionalConfigurationLocation=AmazonCloudWatch-Config'"
    },
    verify: "In Compute Optimizer console, check instance status changes from 'Memory metric missing' to 'Optimized' or 'Over-provisioned' with explicit RAM headroom.",
    related: ["EC2-01", "EC2-03", "EC2-06"],
    dashboard: ["D05"],
    kpi: ["memory_metrics_coverage", "cost_efficiency_score"],
    sources: ["https://aws.amazon.com/blogs/aws-cloud-financial-management/the-aws-state-of-cost-efficiency-report/"],
    last_verified: "2026-10-31"
  },
  {
    id: "NET-09",
    slug: "release-idle-public-ipv4",
    title: "Release idle public IPv4 addresses and private-subnet instances",
    domain: "networking",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["Amazon VPC", "Amazon EC2"],
    summary: "AWS charges $0.005/hour ($3.65/mo) per public IPv4 address. Moving instances to private subnets behind ALBs eliminates unnecessary charges.",
    seo_title: "Eliminate AWS Public IPv4 Charges ($0.005/hour)",
    meta_description: "Identify and release unattached Elastic IPs and eliminate public IPv4 assignments using Public IP Insights in Amazon VPC IPAM.",
    how_to: {
      console: "Open VPC Console > Virtual private cloud > IP Address Manager > Public IP Insights. Filter for unattached Elastic IPs and disassociate/release them. Update EC2 subnets to Auto-assign public IP = No.",
      terraform: `# Ensure private subnets have map_public_ip_on_launch = false
resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = false
}`,
      cli: "aws ec2 release-address --allocation-id eipalloc-xxxxxx"
    },
    verify: "Check CUR line item 'PublicIPv4:InUseAddress' and 'PublicIPv4:IdleAddress' trending to zero.",
    related: ["NET-10", "NET-01"],
    dashboard: ["D04", "D08"],
    kpi: ["idle_spend_pct"],
    sources: ["https://aws.amazon.com/vpc/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "CON-08",
    slug: "stay-off-eks-extended-support",
    title: "Stay off EKS extended support ($0.60/hr vs $0.10/hr)",
    domain: "containers",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "usage",
    services: ["Amazon EKS"],
    summary: "EKS standard support control plane is $0.10/hr ($73/mo). Extended support jumps 6x to $0.60/hr ($438/mo per cluster). Upgrading before month 14 avoids the surcharge.",
    seo_title: "Avoid the EKS Extended Support 6x Price Hike",
    meta_description: "EKS Extended Support charges $438/month per cluster compared to $73/month. Upgrade calendar and automation to avoid the tax.",
    how_to: {
      console: "In EKS console, review Cluster details > Kubernetes version. If nearing 14 months from release, test workloads on a staging cluster and perform in-place cluster update.",
      terraform: `resource "aws_eks_cluster" "main" {
  name     = "prod-cluster"
  version  = "1.31" # Upgrade before standard support window closes
  role_arn = aws_iam_role.eks.arn
  # ...
}`,
      cli: "aws eks update-cluster-version --name prod-cluster --kubernetes-version 1.31"
    },
    verify: "Query CUR for usage types containing 'ExtendedSupport' under AmazonEKS and ensure zero billable hours.",
    related: ["CON-09", "EOS-01", "EOS-02"],
    dashboard: ["D10", "D14"],
    kpi: ["extended_support_spend"],
    sources: ["https://aws.amazon.com/eks/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "AI-03",
    slug: "use-prompt-caching",
    title: "Enable prompt caching in Amazon Bedrock",
    domain: "ai",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon Bedrock"],
    summary: "Cache repeated prefixes (system prompts, tool definitions, documents) to reduce input token costs by up to 90% on supported models while speeding latency.",
    seo_title: "Cut Amazon Bedrock Costs by up to 90% with Prompt Caching",
    meta_description: "How to use Amazon Bedrock prompt caching for long system prompts and RAG contexts to slash input token bills.",
    how_to: {
      console: "Structure API payloads with consistent, deterministic prefix text (system instructions, documents, tool definitions) placed at the very beginning of the prompt.",
      terraform: "# Managed via application inference profiles and Bedrock Converse API request headers.",
      cli: "# Use Bedrock Converse API with prompt caching headers enabled on supported foundation models."
    },
    verify: "Review CloudWatch metrics for Bedrock: CachedInputTokenCount vs TotalInputTokenCount; watch input token bill shrink.",
    related: ["AI-02", "AI-04", "AI-07"],
    dashboard: ["D11"],
    kpi: ["cache_hit_rate_ai", "ai_cost_per_outcome"],
    sources: ["https://aws.amazon.com/bedrock/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "AI-04",
    slug: "bedrock-batch-inference",
    title: "Use Bedrock batch inference for asynchronous processing",
    domain: "ai",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon Bedrock"],
    summary: "Bedrock batch inference is priced at 50% of standard on-demand token prices. Route all non-real-time evaluations, summaries, and enrichments here.",
    seo_title: "Slash Bedrock Costs 50% with Batch Inference",
    meta_description: "Save 50% on Amazon Bedrock input and output tokens by submitting asynchronous batch jobs using S3 manifests.",
    how_to: {
      console: "Bedrock Console > Batch inference > Create Batch job. Specify input S3 URI with JSONL prompt records and output S3 bucket destination.",
      terraform: "# Submit via AWS SDK or EventBridge triggered batch job dispatcher Lambda.",
      cli: "aws bedrock create-model-invocation-job --job-name 'nightly-evals' --model-id 'anthropic.claude-3-5-sonnet-20241022-v2:0' --input-data-config 's3InputDataConfig={s3Uri=s3://my-bucket/inputs.jsonl}' --output-data-config 's3OutputDataConfig={s3Uri=s3://my-bucket/outputs/}' --role-arn arn:aws:iam::123456789012:role/BedrockBatchRole"
    },
    verify: "CUR usage type line items contain 'BatchInference' with unit prices exactly 50% of the corresponding on-demand rate.",
    related: ["AI-02", "AI-03", "AI-05"],
    dashboard: ["D11"],
    kpi: ["ai_cost_per_outcome"],
    sources: ["https://aws.amazon.com/bedrock/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "OBS-01",
    slug: "set-retention-on-cloudwatch-log-groups",
    title: "Set retention on every CloudWatch log group (kill 'Never Expire')",
    domain: "observability",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon CloudWatch"],
    summary: "CloudWatch log groups default to 'Never Expire'. Setting a 30-day or 90-day retention halts unbounded storage accumulation immediately.",
    seo_title: "Stop Paying Forever for CloudWatch Logs: Fix Never Expire",
    meta_description: "CloudWatch log groups never expire by default. Automated CLI script and Terraform to set default 30-90 day retention across all accounts.",
    how_to: {
      console: "CloudWatch Console > Log groups > Select log group > Actions > Edit retention setting > Choose 30 days or 90 days.",
      terraform: `resource "aws_cloudwatch_log_group" "app" {
  name              = "/aws/lambda/my-function"
  retention_in_days = 30
}`,
      cli: "aws logs put-retention-policy --log-group-name /aws/lambda/my-function --retention-in-days 30"
    },
    verify: "Check CloudWatch Logs storage in CUR (line item 'TimedStorage-ByteHrs') plateauing instead of continually growing.",
    related: ["OBS-02", "OBS-04", "AUT-06"],
    dashboard: ["D13"],
    kpi: ["observability_pct"],
    sources: ["https://aws.amazon.com/cloudwatch/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "DB-03",
    slug: "move-to-graviton-database-instances",
    title: "Move RDS and Aurora to Graviton (r7g/m7g/c7g)",
    domain: "databases",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "both",
    services: ["Amazon RDS", "Amazon Aurora"],
    summary: "Graviton database instances cost ~10-20% less with up to 35% better throughput, and Gen 7+ unlocks the new Database Savings Plans.",
    seo_title: "Migrate RDS & Aurora to Graviton: Lower Cost, Higher IOPS",
    meta_description: "Moving RDS instances to Graviton delivers immediate hourly savings, better performance, and eligibility for Database Savings Plans.",
    how_to: {
      console: "RDS Console > Databases > Select DB instance > Modify. Under DB instance class, select db.r7g.xlarge (or db.m7g). Schedule during maintenance window or click Apply Immediately.",
      terraform: `resource "aws_db_instance" "default" {
  instance_class = "db.r7g.xlarge" # Graviton 3rd gen
  engine         = "postgres"
  # ...
}`,
      cli: "aws rds modify-db-instance --db-instance-identifier mydb --db-instance-class db.r7g.xlarge --apply-immediately"
    },
    verify: "Observe lower CPU utilization on Graviton; check Cost Explorer for DB instance hourly costs reduction.",
    related: ["DB-01", "DB-08", "COM-08", "COM-10"],
    dashboard: ["D05", "D12"],
    kpi: ["graviton_share", "cost_efficiency_score"],
    sources: ["https://aws.amazon.com/rds/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "COM-08",
    slug: "database-savings-plans",
    title: "Evaluate Database Savings Plans for Gen 7+ and serverless",
    domain: "commitments",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "rate",
    services: ["AWS Cost Management", "Amazon RDS", "Amazon Aurora", "Amazon DynamoDB"],
    summary: "Database Savings Plans offer up to 35% off with a 1-year no-upfront commitment, floating across Gen 7+ RDS, Aurora, ElastiCache Valkey, DocumentDB, and DynamoDB.",
    seo_title: "Database Savings Plans: Up to 35% Off Databases and Serverless",
    meta_description: "Everything you need to know about Database Savings Plans launched at re:Invent 2025: eligibility, coverage, and comparisons to RIs.",
    how_to: {
      console: "Billing and Cost Management > Savings Plans > Purchase Savings Plans. Select 'Database Savings Plans', 1-year term, No Upfront, and enter calculated commitment $/hour.",
      terraform: "# Purchase through AWS Console or Cost Management Purchase API.",
      cli: "aws savingsplans describe-savings-plans-offerings --plan-type 'Database'"
    },
    verify: "In Cost Explorer, view amortized database costs drop by up to 35% with utilization tracked under Savings Plans utilization reports.",
    related: ["COM-01", "COM-09", "COM-10", "DB-03"],
    dashboard: ["D03", "D12"],
    kpi: ["commitment_coverage", "effective_savings_rate"],
    sources: ["https://aws.amazon.com/savingsplans/database-pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "EC2-16",
    slug: "schedule-non-production",
    title: "Schedule non-production to shut down off-hours (~65% compute savings)",
    domain: "compute",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon EC2", "Amazon RDS", "Amazon Auto Scaling"],
    summary: "Running dev/test environments 12 hours on weekdays instead of 24/7 cuts compute and database costs by approximately 65%.",
    seo_title: "Save 65% on Dev Environments by Scheduling Off-Hours",
    meta_description: "Automate night and weekend shutdowns for staging and dev EC2 and RDS instances using AWS Instance Scheduler or EventBridge.",
    how_to: {
      console: "Tag dev instances with Schedule=business-hours. Deploy AWS Instance Scheduler or EventBridge cron rule + Systems Manager automation to stop at 7 PM and start at 7 AM.",
      terraform: `resource "aws_autoscaling_schedule" "scale_down" {
  scheduled_action_name  = "scale-down-nightly"
  min_size               = 0
  max_size               = 0
  desired_capacity       = 0
  recurrence             = "0 19 * * MON-FRI"
  autoscaling_group_name = aws_autoscaling_group.dev.name
}`,
      cli: "aws ec2 stop-instances --instance-ids i-xxxxxx"
    },
    verify: "Check CloudWatch instance run hours; dev account monthly compute line item drops by ~65%.",
    related: ["EC2-05", "DB-02", "AUT-05"],
    dashboard: ["D04", "D05"],
    kpi: ["non_prod_off_hours_ratio", "idle_spend_pct"],
    sources: ["https://aws.amazon.com/solutions/implementations/instance-scheduler-on-aws/"],
    last_verified: "2026-10-31"
  },
  {
    id: "S3-02",
    slug: "default-to-s3-intelligent-tiering",
    title: "Default to S3 Intelligent-Tiering for unknown access patterns",
    domain: "s3",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon S3"],
    summary: "Automatically moves objects to Infrequent Access (40% cheaper) after 30 days and Archive Instant Access (68% cheaper) after 90 days with zero retrieval fees.",
    seo_title: "S3 Intelligent-Tiering: Automatic S3 Savings with No Retrieval Fees",
    meta_description: "How S3 Intelligent-Tiering automatically cuts object storage bills with zero operational overhead and no retrieval penalty.",
    how_to: {
      console: "S3 Console > Buckets > Select Bucket > Management > Create lifecycle rule. Rule action: 'Move current versions between storage classes'. Set transition to Intelligent-Tiering after 0 days.",
      terraform: `resource "aws_s3_bucket_lifecycle_configuration" "bucket_config" {
  bucket = aws_s3_bucket.data.id

  rule {
    id     = "auto-intelligent-tiering"
    status = "Enabled"

    transition {
      days          = 0
      storage_class = "INTELLIGENT_TIERING"
    }
  }
}`,
      cli: "aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration file://lifecycle.json"
    },
    verify: "Check S3 Storage Lens dashboard; object bytes shifting into Frequent, Infrequent, and Archive Instant Access tiers automatically.",
    related: ["S3-01", "S3-03", "S3-04", "S3-09"],
    dashboard: ["D09"],
    kpi: ["storage_tier_mix"],
    sources: ["https://aws.amazon.com/s3/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "S3-09",
    slug: "abort-incomplete-multipart-uploads",
    title: "Abort incomplete multipart uploads after 7 days",
    domain: "s3",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["Amazon S3"],
    summary: "Failed or interrupted multipart uploads leave abandoned chunks that remain invisible in the console but are billed at full S3 Standard rates.",
    seo_title: "Abort Incomplete Multipart Uploads to Stop Ghost S3 Charges",
    meta_description: "Incomplete multipart uploads silently accrue monthly storage fees. How to configure a 7-day abort rule on every bucket.",
    how_to: {
      console: "S3 Console > Bucket > Management > Lifecycle rules > Create rule. Check 'Delete expired object delete markers or incomplete multipart uploads'. Set 'Clean up incomplete multipart uploads' to 7 days.",
      terraform: `resource "aws_s3_bucket_lifecycle_configuration" "abort_multipart" {
  bucket = aws_s3_bucket.main.id

  rule {
    id     = "abort-incomplete-multipart"
    status = "Enabled"

    abort_incomplete_multipart_upload {
      days_after_initiation = 7
    }
  }
}`,
      cli: "aws s3api put-bucket-lifecycle-configuration --bucket my-bucket --lifecycle-configuration '{\"Rules\":[{\"ID\":\"abort\",\"Status\":\"Enabled\",\"Filter\":{},\"AbortIncompleteMultipartUpload\":{\"DaysAfterInitiation\":7}}]}'"
    },
    verify: "In S3 Storage Lens, incomplete multipart upload bytes fall to 0 across the entire organization.",
    related: ["S3-01", "S3-10", "STO-04"],
    dashboard: ["D04", "D09"],
    kpi: ["idle_spend_pct"],
    sources: ["https://aws.amazon.com/s3/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "GOV-05",
    slug: "cost-anomaly-detection-dimensional-monitors",
    title: "Turn on Cost Anomaly Detection with dimensional monitors to Slack",
    domain: "governance",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["AWS Cost Anomaly Detection", "Amazon SNS"],
    summary: "Dimensional monitors automatically evaluate every linked account, cost category, or tag key without manual updates and send AI-assisted alerts directly to Slack.",
    seo_title: "Set Up Cost Anomaly Detection Dimensional Monitors to Slack",
    meta_description: "Catch surprise AWS bill spikes before month-end using Cost Anomaly Detection dimensional monitors integrated with SNS and Slack.",
    how_to: {
      console: "Billing and Cost Management > Cost Anomaly Detection > Create monitor. Select 'Dimensional monitor', choose dimension 'Linked account' (or Cost category). Add alert subscription via SNS to your Slack channel.",
      terraform: `resource "aws_ce_anomaly_monitor" "dimensional" {
  name              = "AllAccountsDimensionalMonitor"
  monitor_type      = "DIMENSIONAL"
  monitor_dimension = "LINKED_ACCOUNT"
}

resource "aws_ce_anomaly_subscription" "slack" {
  name      = "DailySlackAnomalyAlert"
  frequency = "DAILY"
  monitor_arn_list = [
    aws_ce_anomaly_monitor.dimensional.arn
  ]
  subscriber {
    type    = "SNS"
    address = aws_sns_topic.cost_alerts.arn
  }
  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_PERCENTAGE"
      values        = ["20"]
      match_options = ["GREATER_THAN_OR_EQUAL"]
    }
  }
}`,
      cli: "aws ce create-anomaly-monitor --anomaly-monitor '{\"MonitorName\":\"AccountsMonitor\",\"MonitorType\":\"DIMENSIONAL\",\"MonitorDimension\":\"LINKED_ACCOUNT\"}'"
    },
    verify: "Trigger a test anomaly notification or check subscriber confirmation status in AWS SNS console.",
    related: ["GOV-01", "GOV-06", "GOV-08", "VIS-15"],
    dashboard: ["D07"],
    kpi: ["anomaly_mttr"],
    sources: ["https://aws.amazon.com/aws-cost-management/aws-cost-anomaly-detection/"],
    last_verified: "2026-10-31"
  },
  {
    id: "GOV-01",
    slug: "total-account-budget-on-day-one",
    title: "Create a total-account budget with forecasted alerts on day one",
    domain: "governance",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["AWS Budgets"],
    summary: "The cheapest insurance in AWS: configure monthly budget alerts at 50%, 80%, 100% actual spend AND 100% forecasted spend.",
    seo_title: "How to Configure AWS Budgets with Forecasted Alerts",
    meta_description: "Avoid surprise invoices by configuring 50/80/100% actual and forecasted budget alerts in AWS Budgets.",
    how_to: {
      console: "Billing and Cost Management > Budgets > Create budget > Cost budget. Enter monthly amount, add alerts: 50% actual, 80% actual, 100% actual, and 100% FORECASTED.",
      terraform: `resource "aws_budgets_budget" "total_monthly" {
  name              = "monthly-total-budget"
  budget_type       = "COST"
  limit_amount      = "5000"
  limit_unit        = "USD"
  time_unit         = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["finops@company.com"]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = ["finops@company.com"]
  }
}`,
      cli: "aws budgets create-budget --account-id 123456789012 --budget file://budget.json --notifications-with-subscribers file://notifications.json"
    },
    verify: "Check Budgets console showing active status with current month-to-date and forecasted spend progress bars.",
    related: ["GOV-02", "GOV-05", "STU-04"],
    dashboard: ["D01", "D15"],
    kpi: ["forecast_accuracy"],
    sources: ["https://aws.amazon.com/aws-cost-management/aws-budgets/"],
    last_verified: "2026-10-31"
  },
  {
    id: "NET-05",
    slug: "remove-unused-nat-gateways",
    title: "Detect and remove unused or redundant NAT Gateways",
    domain: "networking",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["Amazon VPC", "AWS Compute Optimizer"],
    summary: "Each NAT Gateway costs ~$33/month idle before processing bytes. Compute Optimizer now flags unused NAT Gateways while distinguishing DR/backup ones.",
    seo_title: "Find and Delete Unused NAT Gateways in Compute Optimizer",
    meta_description: "Identify idle NAT Gateways costing $33/month each and eliminate redundant gateways in dev/staging environments.",
    how_to: {
      console: "Open Compute Optimizer > NAT Gateways findings. Review gateways flagged as 'Idle' (BytesInFromSource < 10MB/day). Update route tables to remove reference, then delete NAT Gateway.",
      terraform: "# Review unused NAT Gateway resources and remove from VPC module.",
      cli: "aws ec2 delete-nat-gateway --nat-gateway-id nat-xxxxxx"
    },
    verify: "Check CloudWatch metric BytesInFromSource and BytesInFromDestination are zero; verify route tables before deletion.",
    related: ["NET-02", "NET-06", "NET-07"],
    dashboard: ["D04", "D08"],
    kpi: ["idle_spend_pct"],
    sources: ["https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-six-new-idle-resource-recommendations-in-aws-compute-optimizer/"],
    last_verified: "2026-10-31"
  },
  {
    id: "STO-04",
    slug: "delete-unattached-ebs-volumes",
    title: "Delete unattached EBS volumes and automate with Compute Optimizer",
    domain: "storage",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["Amazon EBS", "AWS Compute Optimizer"],
    summary: "Unattached EBS volumes accrue full monthly storage costs. Compute Optimizer Automation can snapshot and delete them on a schedule with rollback.",
    seo_title: "Automate Deletion of Unattached EBS Volumes",
    meta_description: "Stop paying for orphaned EBS volumes left behind by terminated EC2 instances. Snapshot, tag, and purge automatically.",
    how_to: {
      console: "EC2 Console > Volumes > Filter: State = Available. Snapshot any volume with persistent data, tag with DeletionDate, and delete orphaned disks.",
      terraform: "# Enforce delete_on_termination = true on all root and data EBS block device mappings.",
      cli: "aws ec2 describe-volumes --filters Name=status,Values=available --query 'Volumes[*].VolumeId' --output text"
    },
    verify: "Run CLI query above; count of volumes with status=available should be 0.",
    related: ["STO-01", "STO-06", "AUT-04"],
    dashboard: ["D04", "D09"],
    kpi: ["idle_spend_pct"],
    sources: ["https://aws.amazon.com/ebs/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "VIS-01",
    slug: "enable-cur-2-via-data-exports",
    title: "Enable CUR 2.0 via Data Exports on day one",
    domain: "visibility",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Billing and Cost Management", "Amazon S3", "Amazon Athena"],
    summary: "CUR 2.0 provides hourly, resource-level billing records in Parquet format. Turn it on early because AWS cannot backfill history indefinitely.",
    seo_title: "Enable CUR 2.0 via Data Exports: The Source of Truth",
    meta_description: "How to set up CUR 2.0 Data Exports in Parquet format to feed Athena, QuickSight, and Cloud Intelligence Dashboards.",
    how_to: {
      console: "Billing and Cost Management > Data Exports > Create export. Name: cur2-export. Select 'Cost and Usage Report 2.0', Format: Parquet, Partitioning: by billing period, S3 bucket path.",
      terraform: `resource "aws_bcmdataexports_export" "cur2" {
  export {
    name = "cur2-parquet-export"
    data_query {
      query_statement = "SELECT identity_line_item_id, identity_time_interval, line_item_unblended_cost, line_item_usage_type, line_item_resource_id, line_item_product_code FROM COST_AND_USAGE_REPORT"
    }
    destination_configurations {
      s3_destination {
        s3_bucket = aws_s3_bucket.billing_data.bucket
        s3_prefix = "cur2"
        s3_region = "us-east-1"
        s3_output_configurations {
          compression = "PARQUET"
          format      = "PARQUET"
          output_type = "CUSTOM"
        }
      }
    }
    refresh_cadence {
      frequency = "SYNCHRONOUS"
    }
  }
}`,
      cli: "aws bcm-data-exports create-export --export file://export-config.json"
    },
    verify: "Inspect destination S3 bucket; Parquet files partitioned by month arrive every 12-24 hours.",
    related: ["VIS-02", "VIS-03", "VIS-06"],
    dashboard: ["D01", "D06"],
    kpi: ["allocation_coverage"],
    sources: ["https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html"],
    last_verified: "2026-10-31"
  },
  {
    id: "VIS-02",
    slug: "export-focus-1-2-specification",
    title: "Export FOCUS 1.2 for normalized multi-cloud cost data",
    domain: "visibility",
    audience: ["scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Billing and Cost Management"],
    summary: "FOCUS provides normalized columns like BilledCost and EffectiveCost, making amortized reporting direct and merging multi-cloud and SaaS spend effortless.",
    seo_title: "Standardize Cost Data with FOCUS 1.2 Data Exports",
    meta_description: "Enable the FinOps Open Cost & Usage Specification (FOCUS 1.2) data export in AWS to simplify amortized reporting and invoice reconciliation.",
    how_to: {
      console: "Billing and Cost Management > Data Exports > Create export. Choose template: 'FinOps Open Cost and Usage Specification (FOCUS) v1.2'. Choose Parquet format and target S3 bucket.",
      terraform: "# Configure aws_bcmdataexports_export with FOCUS table query definition.",
      cli: "aws bcm-data-exports create-export --export '{\"Name\":\"focus-export\",\"DataQuery\":{\"QueryStatement\":\"SELECT * FROM FOCUS_1_2\"}}'"
    },
    verify: "Run an Athena test query checking columns EffectiveCost, BilledCost, ListCost, and InvoiceId.",
    related: ["VIS-01", "VIS-18", "ORG-08"],
    dashboard: ["D01", "D02"],
    kpi: ["effective_savings_rate", "cost_efficiency_score"],
    sources: ["https://www.finops.org/insights/2026-finops-framework/"],
    last_verified: "2026-10-31"
  },
  {
    id: "DB-10",
    slug: "avoid-rds-extended-support-charges",
    title: "Avoid RDS Extended Support charges ($0.10-$0.20/vCPU-hour)",
    domain: "databases",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "usage",
    services: ["Amazon RDS", "Amazon Aurora"],
    summary: "When MySQL or PostgreSQL major versions pass standard support, AWS auto-enrolls instances in Extended Support, adding a hefty per-vCPU-hour charge that doubles in Year 3.",
    seo_title: "How to Avoid the Costly RDS Extended Support Tax",
    meta_description: "RDS Extended Support adds $73 to $146 per vCPU per month. Blue/green upgrade strategies to stay on standard support versions.",
    how_to: {
      console: "Use Amazon RDS Blue/Green Deployments to stage major version engine upgrades with near-zero downtime. Switchover takes under 1 minute without data loss.",
      terraform: `resource "aws_rds_cluster" "aurora" {
  engine_version = "16.4" # Stay on current standard-supported major version
  # ...
}`,
      cli: "aws rds create-blue-green-deployment --blue-green-deployment-name pg16-upgrade --source arn:aws:rds:us-east-1:123456789012:db:mydb --target-engine-version 16.4"
    },
    verify: "Check CUR for line_item_usage_type LIKE '%ExtendedSupport%'; ensure zero charges.",
    related: ["DB-01", "DB-03", "EOS-01", "EOS-03"],
    dashboard: ["D12", "D14"],
    kpi: ["extended_support_spend"],
    sources: ["https://aws.amazon.com/rds/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "CON-03",
    slug: "karpenter-consolidation-and-spot",
    title: "Use Karpenter for aggressive node consolidation and Spot",
    domain: "containers",
    audience: ["scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "usage",
    services: ["Amazon EKS", "Amazon EC2"],
    summary: "Karpenter replaces cluster autoscaler by packing pods tightly, picking right-sized Graviton & Spot instances, and terminating underutilized nodes automatically.",
    seo_title: "Cut EKS Compute Waste with Karpenter Consolidation",
    meta_description: "How Karpenter node consolidation, Spot diversification, and automatic bin-packing shrink Kubernetes cluster waste by 30-50%.",
    how_to: {
      console: "Install Karpenter via Helm chart. Define EC2NodeClass and NodePool with consolidationPolicy: WhenEmptyOrUnderutilized.",
      terraform: `resource "helm_release" "karpenter" {
  name       = "karpenter"
  repository = "oci://public.ecr.aws/karpenter"
  chart      = "karpenter"
  version    = "1.0.0"
  namespace  = "kube-system"
}`,
      cli: "kubectl apply -f nodepool-consolidation.yaml"
    },
    verify: "Review average node CPU/RAM allocation climbing from ~35% to >75%; node count contracts dynamically during quiet hours.",
    related: ["CON-02", "CON-04", "CON-05", "EC2-11"],
    dashboard: ["D10"],
    kpi: ["idle_spend_pct", "graviton_share"],
    sources: ["https://karpenter.sh/"],
    last_verified: "2026-10-31"
  },
  {
    id: "SLS-01",
    slug: "run-lambda-on-arm64",
    title: "Switch AWS Lambda functions to arm64 architecture",
    domain: "serverless",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Lambda"],
    summary: "Arm64 Lambda functions run on AWS Graviton2 processors, delivering 20% lower per-millisecond billing and often executing faster.",
    seo_title: "Save 20% on AWS Lambda by Switching to arm64 Graviton",
    meta_description: "One-click 20% cost reduction for Python, Node.js, Go, and Java Lambda functions by switching architecture to arm64.",
    how_to: {
      console: "Lambda Console > Select function > Runtime settings > Edit > Architecture > Select 'arm64'. Save.",
      terraform: `resource "aws_lambda_function" "api" {
  function_name = "payment-processor"
  architectures = ["arm64"]
  runtime       = "nodejs20.x"
  # ...
}`,
      cli: "aws lambda update-function-configuration --function-name payment-processor --architectures arm64"
    },
    verify: "Verify function execution duration in CloudWatch; observe ~20% lower GB-second unit charges in billing.",
    related: ["SLS-02", "SLS-03", "EC2-08"],
    dashboard: ["D05"],
    kpi: ["graviton_share"],
    sources: ["https://aws.amazon.com/lambda/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "TAG-03",
    slug: "enforce-tag-policies-in-organizations",
    title: "Enforce required tags with AWS Organizations Tag Policies",
    domain: "tagging",
    audience: ["scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Organizations", "AWS Cost Management"],
    summary: "Tag Policies prevent capitalization typos (e.g. 'Environment' vs 'environment') and enforce compliant tag values across all member accounts.",
    seo_title: "Standardize Cost Allocation with Organizations Tag Policies",
    meta_description: "Prevent untagged or misspelled resources across your AWS Organization using centralized Tag Policies.",
    how_to: {
      console: "Organizations Console > Tag policies > Create policy. Define key 'Environment' with allowed values 'production', 'staging', 'development'. Attach to root or OUs.",
      terraform: `resource "aws_organizations_policy" "tag_policy" {
  name = "enforce-environment-tag"
  content = jsonencode({
    tags = {
      Environment = {
        tag_key   = { "@@assign" = "Environment" }
        tag_value = { "@@assign" = ["production", "staging", "development"] }
      }
    }
  })
}`,
      cli: "aws organizations create-policy --name TagPolicy --type TAG_POLICY --content file://policy.json"
    },
    verify: "Open Tag Editor in member accounts; view compliance report showing 100% compliant resource tags.",
    related: ["TAG-01", "TAG-04", "TAG-11", "ORG-10"],
    dashboard: ["D06"],
    kpi: ["allocation_coverage"],
    sources: ["https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html"],
    last_verified: "2026-10-31"
  },
  {
    id: "AUT-01",
    slug: "estimate-cost-in-pull-requests",
    title: "Estimate cloud cost deltas in pull requests (Infracost / Shift-Left)",
    domain: "automation",
    audience: ["scaleup", "enterprise"],
    effort: "med",
    impact: 2,
    lever: "usage",
    services: ["CI/CD Pipelines", "Terraform", "OpenTofu"],
    summary: "The 2026 State of FinOps names pre-deployment architecture costing as the most-wanted capability. Post cost deltas on every PR before code merges.",
    seo_title: "Shift-Left FinOps: Add Infracost Cost Estimates to GitHub PRs",
    meta_description: "Embed automated Terraform cost estimates into CI/CD pull request reviews so engineers see the bill impact before deploying.",
    how_to: {
      console: "Add an Infracost step to your GitHub Actions or GitLab CI workflow that compares terraform plan against base branch and comments the monthly delta.",
      terraform: "# Configured in CI pipeline YAML definitions.",
      cli: "infracost breakdown --path ."
    },
    verify: "Every opened pull request that modifies infrastructure receives an automated markdown breakdown comment with the exact dollar impact.",
    related: ["AUT-03", "CUL-01", "CUL-02"],
    dashboard: ["D16", "D22"],
    kpi: ["cost_efficiency_score"],
    sources: ["https://finout.io/blog/state-of-finops-2026-report-key-trends-insights-and-what-comes-next"],
    last_verified: "2026-10-31"
  },
  {
    id: "STU-05",
    slug: "model-the-post-credit-cliff",
    title: "Model the post-credit cliff before credits expire",
    domain: "startup",
    audience: ["startup"],
    effort: "low",
    impact: 3,
    lever: "both",
    services: ["AWS Activate", "AWS Cost Management"],
    summary: "Credits mask real cash burn. Forecast the exact calendar month credits deplete and layer no-upfront Savings Plans and idle cleanup 60 days before the cliff.",
    seo_title: "How Startups Avoid the Post-Credit AWS Bill Shock",
    meta_description: "Calculate your post-credit runway cliff and prepare rightsizing and no-upfront Savings Plans before your credits run out.",
    how_to: {
      console: "1. Open Billing Console > Credits to verify remaining balance and expiration date. 2. Filter Cost Explorer by 'Unblended Cost' (not Net) to see true cash run-rate. 3. Use the awsmaxxing post-credit calculator to model cashflow.",
      terraform: "# Track credit expiry in company financial run-rate models.",
      cli: "aws ce get-cost-and-usage --time-period Start=2026-09-01,End=2026-10-01 --granularity MONTHLY --metrics UnblendedCost"
    },
    verify: "Monthly financial model includes explicit cash cloud burn line item starting the month after credit exhaustion.",
    related: ["STU-04", "ORG-19", "COM-12"],
    dashboard: ["D17", "D18"],
    kpi: ["cloud_cost_pct_revenue"],
    sources: ["https://aws.amazon.com/activate/"],
    last_verified: "2026-10-31"
  },
  {
    id: "NET-14",
    slug: "cloudfront-in-front-of-public-content",
    title: "Put CloudFront in front of public endpoints and S3 buckets",
    domain: "networking",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon CloudFront", "Amazon S3", "Elastic Load Balancing"],
    summary: "Data transfer from AWS origins (EC2, S3, ALB) to CloudFront is 100% free. CloudFront internet egress is cheaper than direct egress, and edge caching eliminates origin compute.",
    seo_title: "Save on Egress and Origin Compute with CloudFront CDN",
    meta_description: "Origin-to-CloudFront egress is free. How placing CloudFront in front of S3 and ALBs slashes internet data transfer costs.",
    how_to: {
      console: "CloudFront Console > Create Distribution. Select origin domain (ALB or S3). Configure Cache Policy: CachingOptimized. Use Origin Access Control (OAC) for private S3 buckets.",
      terraform: `resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.assets.bucket_regional_domain_name
    origin_id   = "s3-assets"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }
  enabled             = true
  default_root_object = "index.html"
  default_cache_behavior {
    target_origin_id       = "s3-assets"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
  }
  # ...
}`,
      cli: "aws cloudfront create-distribution --distribution-config file://dist-config.json"
    },
    verify: "Check CloudWatch metric BytesDownloaded and OriginLatency; verify zero DataTransfer-Out fees on origin S3/ALB.",
    related: ["NET-01", "NET-17", "S3-17"],
    dashboard: ["D08"],
    kpi: ["data_transfer_pct"],
    sources: ["https://aws.amazon.com/cloudfront/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "ORG-17",
    slug: "deny-unused-regions-with-scp",
    title: "Deny unused Regions with an AWS Organizations SCP",
    domain: "organization",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Organizations", "AWS IAM"],
    summary: "Prevent accidental resources, shadow IT, or compromised credentials spinning up expensive crypto miners in unmonitored geographic regions.",
    seo_title: "Block Unused AWS Regions with Service Control Policies",
    meta_description: "An essential guardrail: how to write and attach a Region restriction SCP to lock down AWS accounts to approved regions only.",
    how_to: {
      console: "Organizations Console > Service control policies > Create policy. Add Deny action on all services except IAM, CloudFront, Route53, and STS if aws:RequestedRegion is not in your allowed list.",
      terraform: `resource "aws_organizations_policy" "region_restriction" {
  name = "deny-unapproved-regions"
  content = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "DenyUnapprovedRegions"
        Effect    = "Deny"
        NotAction = [
          "cloudfront:*",
          "iam:*",
          "route53:*",
          "support:*",
          "wafv2:*"
        ]
        Resource = "*"
        Condition = {
          StringNotEquals = {
            "aws:RequestedRegion" = ["us-east-1", "us-west-2"]
          }
        }
      }
    ]
  })
}`,
      cli: "aws organizations attach-policy --policy-id p-xxxxxx --target-id ou-xxxxxx"
    },
    verify: "Attempt an ec2 describe-instances command in ap-southeast-1 from a member account; verify AccessDenied response.",
    related: ["ORG-01", "ORG-18", "GOV-01"],
    dashboard: ["D21"],
    kpi: ["cost_efficiency_score"],
    sources: ["https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples_general.html#example-scp-deny-region"],
    last_verified: "2026-10-31"
  },
  {
    id: "VIS-15",
    slug: "pilot-aws-finops-agent",
    title: "Pilot the AWS FinOps Agent for autonomous anomaly root-cause analysis",
    domain: "visibility",
    audience: ["scaleup", "enterprise"],
    effort: "low",
    impact: 2,
    lever: "usage",
    services: ["AWS Cost Anomaly Detection", "AWS FinOps Agent"],
    summary: "Previewed at FinOps X 2026, the AWS FinOps Agent investigates anomalies down to specific commits, resources, and IAM roles without human query overhead.",
    seo_title: "AWS FinOps Agent: AI-Powered Anomaly Investigation",
    meta_description: "Automate cost spike triage using the AWS FinOps Agent preview to diagnose root causes across infrastructure and application deployments.",
    how_to: {
      console: "In Cost Anomaly Detection console, opt in to the AI-Powered Cost Investigation preview. Configure anomaly notifications to include automated plain-language root-cause reports.",
      terraform: "# Monitored via native CFM notifications and MCP server integration.",
      cli: "aws ce get-anomalies --monitor-arn arn:aws:ce::123456789012:anomalymonitor/xxxx"
    },
    verify: "Review anomaly alerts in Slack containing exact root cause summaries, affected resource ARNs, and suggested remediation runbooks.",
    related: ["GOV-05", "VIS-13", "VIS-14"],
    dashboard: ["D07"],
    kpi: ["anomaly_mttr"],
    sources: ["https://aws.amazon.com/blogs/aws-cloud-financial-management/the-aws-state-of-cost-efficiency-report/"],
    last_verified: "2026-10-31",
    is_preview: true
  },
  {
    id: "DB-04",
    slug: "aurora-io-optimized",
    title: "Switch to Aurora I/O-Optimized when I/O exceeds 25% of cluster cost",
    domain: "databases",
    audience: ["scaleup", "enterprise"],
    effort: "low",
    impact: 3,
    lever: "usage",
    services: ["Amazon Aurora"],
    summary: "Aurora Standard charges $0.20 per million requests. Aurora I/O-Optimized eliminates all I/O charges for a predictable ~30% higher instance price. When I/O is heavy, it saves up to 40% overall.",
    seo_title: "When to Switch to Aurora I/O-Optimized to Cut Database Bills",
    meta_description: "Break-even math for Aurora I/O-Optimized vs Aurora Standard. Eliminate request charges for write-heavy and read-intensive databases.",
    how_to: {
      console: "RDS Console > Clusters > Select Aurora cluster > Modify > Cluster storage configuration > Select 'Amazon Aurora I/O-Optimized'. Click Continue and apply.",
      terraform: `resource "aws_rds_cluster" "aurora_io_opt" {
  cluster_identifier        = "high-throughput-db"
  storage_type              = "aurora-iopt1" # I/O Optimized
  # ...
}`,
      cli: "aws rds modify-db-cluster --db-cluster-identifier high-throughput-db --storage-type aurora-iopt1 --apply-immediately"
    },
    verify: "Check CloudWatch metric VolumeReadIOPs and VolumeWriteIOPs; observe Aurora billing lines with zero I/O request fees.",
    related: ["DB-01", "DB-03", "DB-05"],
    dashboard: ["D12"],
    kpi: ["cost_efficiency_score"],
    sources: ["https://aws.amazon.com/rds/aurora/pricing/"],
    last_verified: "2026-10-31"
  },
  {
    id: "EC2-08",
    slug: "migrate-to-graviton-ec2",
    title: "Migrate stateless and containerized EC2 instances to Graviton",
    domain: "compute",
    audience: ["startup", "scaleup", "enterprise"],
    effort: "med",
    impact: 3,
    lever: "both",
    services: ["Amazon EC2"],
    summary: "Graviton3 (c7g/m7g/r7g) and Graviton4 (c8g/r8g) instances provide up to 20% lower hourly cost and up to 40% better price-performance for Node, Python, Java, Go, and containers.",
    seo_title: "Migrate EC2 Fleets to Graviton for 20-40% Price-Performance Gains",
    meta_description: "Complete guide to porting x86 EC2 workloads to AWS Graviton processors with benchmarks, AMI selection, and multi-arch Docker builds.",
    how_to: {
      console: "Update Launch Templates to select arm64 AL2023 or Ubuntu AMIs and c7g/m7g instance types. Run canary testing in staging before updating Auto Scaling Groups.",
      terraform: `resource "aws_launch_template" "graviton" {
  name_prefix   = "app-graviton-"
  image_id      = data.aws_ami.al2023_arm64.id
  instance_type = "c7g.xlarge"
  # ...
}`,
      cli: "aws ec2 modify-launch-template --launch-template-name app-template --default-version 2"
    },
    verify: "Confirm instances report architecture 'arm64'; monitor p99 latency decrease alongside hourly cost reduction.",
    related: ["EC2-02", "EC2-07", "CON-06", "SLS-01"],
    dashboard: ["D05"],
    kpi: ["graviton_share", "cost_efficiency_score"],
    sources: ["https://aws.amazon.com/ec2/graviton/"],
    last_verified: "2026-10-31"
  },
  {
    id: "EOS-07",
    slug: "sql-server-2016-extended-support-exit",
    title: "Plan exit from SQL Server 2016 (End of Extended Support reached)",
    domain: "lifecycle",
    audience: ["enterprise"],
    effort: "high",
    impact: 3,
    lever: "usage",
    services: ["Amazon RDS", "Amazon EC2", "AWS Database Migration Service"],
    summary: "SQL Server 2016 reached Microsoft End of Extended Support on July 14, 2026. Running it means paying escalating ESU fees or migrating to Aurora PostgreSQL or newer SQL Server.",
    seo_title: "SQL Server 2016 End of Life: Upgrade and Modernization Options",
    meta_description: "Navigate SQL Server 2016 end-of-support without paying exorbitant Extended Security Update fees by modernizing to RDS or Aurora PostgreSQL.",
    how_to: {
      console: "Evaluate database workloads with AWS Schema Conversion Tool (SCT) to determine migration viability to Aurora PostgreSQL or upgrade RDS SQL Server to 2022 edition.",
      terraform: "# Upgrade db_instance engine_version to supported 2022 standard/enterprise or Aurora PostgreSQL.",
      cli: "aws rds modify-db-instance --db-instance-identifier legacy-db --engine-version 16.00.4125.3.v1"
    },
    verify: "Check AWS License Manager and CUR to ensure zero legacy license penalties or unpatched compliance exposure.",
    related: ["EOS-01", "EOS-06", "EOS-08", "LIC-03"],
    dashboard: ["D14"],
    kpi: ["extended_support_spend"],
    sources: ["https://aws.amazon.com/blogs/aws-cloud-financial-management/reinvent-2025-hidden-cfm-announcements-guide/"],
    last_verified: "2026-10-31"
  }
];

export const TIP_DOMAINS = [
  { id: "all", name: "All Domains" },
  { id: "networking", name: "Networking & Data Transfer" },
  { id: "storage", name: "Block & File Storage" },
  { id: "s3", name: "Amazon S3 Storage" },
  { id: "compute", name: "Compute (EC2)" },
  { id: "containers", name: "Containers (ECS/EKS)" },
  { id: "databases", name: "Databases & Caching" },
  { id: "serverless", name: "Serverless & Integration" },
  { id: "commitments", name: "Commitments & Savings Plans" },
  { id: "ai", name: "AI, GenAI & GPU" },
  { id: "observability", name: "Observability & Telemetry" },
  { id: "governance", name: "Governance & Budgets" },
  { id: "visibility", name: "Visibility & Reporting" },
  { id: "tagging", name: "Tagging & Allocation" },
  { id: "organization", name: "Account & Organization" },
  { id: "lifecycle", name: "Lifecycle & Extended Support" },
  { id: "automation", name: "Automation & Shift-Left" },
  { id: "startup", name: "Startup Quick Wins" }
];
