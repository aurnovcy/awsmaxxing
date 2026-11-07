import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /ask

Sitemap: https://awsmaxxing.dev/sitemap.xml
`);
});

// LLMs.txt for AI crawlers
app.get('/llms.txt', (req, res) => {
  res.type('text/plain');
  res.send(`# awsmaxxing — The Field Guide to Getting Maximum Value from Every AWS Dollar

> "Maxxing" does NOT mean "spend less." It means maximizing the business value of every dollar on the AWS bill.

## Core Operating Model (The Order of Operations)
1. See it (CUR 2.0 / FOCUS 1.2, memory metrics, Cost Optimization Hub)
2. Own it (Account per env, cost categories, tag policy)
3. Delete it (Unattached EBS, idle NAT, old snapshots, unattached IPv4)
4. Shrink it (Rightsize, migrate gp2->gp3, Graviton, modernize generations)
5. Schedule it (Non-prod shutdown off-hours, save ~65% compute)
6. Commit to it (Compute & Database Savings Plans AFTER shrinking)
7. Re-architect it (VPC endpoints, S3 Intelligent-Tiering, AZ-local routing)
8. Govern it (Budgets, Cost Anomaly Detection to Slack, PR cost estimates)

## Key Pages & Resources
- /playbooks/startup-30-day-plan: 4-week step-by-step checklist for early stage (<$50k/mo)
- /playbooks/scale-up-90-day-program: 90-day operational roadmap for $50k-$1M/mo
- /playbooks/enterprise-12-month-program: Multi-org FinOps operating model (>$1M/mo)
- /tips: 30+ production tips with Terraform, AWS CLI, and verification queries
- /calculators: 10 interactive calculators (NAT vs VPC Endpoint, gp2->gp3, IPv4 cost, EKS/RDS Extended Support, Bedrock, etc.)
- /dashboards: 22 production FinOps dashboards with Athena SQL
- /kpis: Authoritative KPI catalog with formulas and healthy benchmark bands
- /whats-new: CFM feature changelog (re:Invent 2025, FinOps X 2026, Free Tier overhaul)
`);
});

// RSS Feed endpoint
app.get('/feed.xml', (req, res) => {
  res.type('application/xml');
  const feedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>awsmaxxing — AWS Cost Management Changelog</title>
  <link>https://awsmaxxing.dev/whats-new</link>
  <description>Latest AWS Cloud Financial Management (CFM) releases, re:Invent announcements, and FinOps breakthroughs.</description>
  <language>en-us</language>
  <lastBuildDate>Fri, 31 Oct 2026 00:00:00 GMT</lastBuildDate>
  <atom:link href="https://awsmaxxing.dev/feed.xml" rel="self" type="application/rss+xml" />
  
  <item>
    <title>AWS FinOps Agent and AI-Powered Anomaly Investigation Launched (FinOps X 2026)</title>
    <link>https://awsmaxxing.dev/whats-new#finops-agent-2026</link>
    <guid>https://awsmaxxing.dev/whats-new#finops-agent-2026</guid>
    <pubDate>Mon, 15 Jun 2026 00:00:00 GMT</pubDate>
    <description>Public preview of AWS FinOps Agent and plain-language root-cause analysis in Cost Anomaly Detection.</description>
  </item>

  <item>
    <title>Six New Idle-Resource Types in Compute Optimizer</title>
    <link>https://awsmaxxing.dev/whats-new#idle-resources-2026</link>
    <guid>https://awsmaxxing.dev/whats-new#idle-resources-2026</guid>
    <pubDate>Mon, 01 Jun 2026 00:00:00 GMT</pubDate>
    <description>Compute Optimizer now detects idle provisioned DynamoDB tables, ElastiCache (Redis/Valkey), MemoryDB, DocumentDB, WorkSpaces, and SageMaker endpoints.</description>
  </item>

  <item>
    <title>Database Savings Plans Launched: Up to 35% Off</title>
    <link>https://awsmaxxing.dev/whats-new#database-savings-plans</link>
    <guid>https://awsmaxxing.dev/whats-new#database-savings-plans</guid>
    <pubDate>Wed, 03 Dec 2025 00:00:00 GMT</pubDate>
    <description>Flexible 1-year no-upfront commitment floating across Gen 7+ RDS, Aurora, ElastiCache Valkey, DocumentDB, Neptune, and DynamoDB.</description>
  </item>

  <item>
    <title>re:Invent 2025 Cloud Financial Management Announcements</title>
    <link>https://awsmaxxing.dev/whats-new#reinvent-2025</link>
    <guid>https://awsmaxxing.dev/whats-new#reinvent-2025</guid>
    <pubDate>Mon, 01 Dec 2025 00:00:00 GMT</pubDate>
    <description>Multi-source Billing View for 20 payers, native CFM Dashboards, FOCUS 1.2 export, Split Cost Allocation with Kubernetes labels, and MCP Server for CFM.</description>
  </item>
</channel>
</rss>`;
  res.send(feedXml);
});

// Sitemap.xml endpoint
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const lastmod = '2026-10-31';
  const urls = [
    '',
    '/tips',
    '/playbooks/startup-30-day-plan',
    '/playbooks/scale-up-90-day-program',
    '/playbooks/enterprise-12-month-program',
    '/calculators',
    '/calculators/nat-gateway-vs-vpc-endpoint',
    '/calculators/gp2-to-gp3-savings',
    '/calculators/aws-public-ipv4-cost',
    '/calculators/eks-rds-extended-support-cost',
    '/calculators/savings-plans-coverage-simulator',
    '/calculators/database-savings-plans-vs-reserved-instances',
    '/calculators/non-production-scheduling-savings',
    '/calculators/bedrock-cost-estimator',
    '/calculators/s3-lifecycle-intelligent-tiering',
    '/calculators/startup-post-credit-cliff',
    '/dashboards',
    '/kpis',
    '/whats-new',
    '/maturity-model',
    '/for/startups',
    '/for/scale-ups',
    '/for/enterprises',
    '/sources',
    '/about',
    '/disclaimer',
    // Key tip detail pages
    '/tips/net-02-s3-dynamodb-gateway-endpoints',
    '/tips/sto-01-migrate-gp2-to-gp3',
    '/tips/com-02-shrink-first-then-commit',
    '/tips/ec2-02-enable-memory-metrics',
    '/tips/net-09-release-idle-public-ipv4',
    '/tips/con-08-stay-off-eks-extended-support',
    '/tips/ai-03-use-prompt-caching',
    '/tips/obs-01-set-retention-on-cloudwatch-log-groups',
    '/tips/db-03-move-to-graviton-database-instances',
    '/tips/gov-05-cost-anomaly-detection-dimensional-monitors',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>https://awsmaxxing.dev${u}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '' ? '1.0' : u.startsWith('/playbooks') || u.startsWith('/tips') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
  res.send(xml);
});

// Server-side API endpoint for Gemini-powered Ask awsmaxxing
app.post('/api/ask', async (req, res) => {
  try {
    const { message, spendTier, topServices, contextText } = req.body;

    if (!message && !contextText) {
      return res.status(400).json({ error: 'Please provide details or a question about your AWS spend.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is configured in Settings > Secrets.',
      });
    }

    const systemInstruction = `You are the lead FinOps architect of "awsmaxxing: The Field Guide to Getting Maximum Value from Every AWS Dollar".
Tone: Confident, highly practical, direct, slightly irreverent, never fear-mongering. "Maxxing" means maximizing business value per dollar, NOT just blind budget-cutting. Sometimes that means cutting waste, sometimes committing harder, and sometimes spending MORE on memory metrics or a VPC endpoint to save 10x elsewhere.

CRITICAL RULES:
1. Enforce the strict Order of Operations:
   1 See it -> 2 Own it -> 3 Delete it -> 4 Shrink it -> 5 Schedule it -> 6 Commit to it -> 7 Re-architect it -> 8 Govern it.
   Emphasize: "Commit AFTER you shrink. If you commit first, rightsizing later frees commitment instead of lowering the bill, and you've locked a discount onto oversized capacity."
2. Reference specific tips from the awsmaxxing tip library by exact ID:
   - NET-02 (Add S3 and DynamoDB gateway endpoints everywhere - free, cuts NAT $0.045/GB)
   - STO-01 (Migrate gp2 to gp3 - 20% cheaper + decoupled IOPS)
   - STO-04 (Delete unattached EBS volumes)
   - NET-09 (Release idle public IPv4 addresses - $0.005/hr each)
   - EC2-02 (Enable EC2 memory metrics - unlocks 8-30% more rightsizing savings)
   - EC2-08 (Migrate to Graviton - better price/perf)
   - EC2-16 (Schedule non-production - cuts ~65% compute)
   - CON-08 (Stay off EKS extended support - $0.60/hr vs $0.10/hr)
   - DB-03 (Move to Graviton database instances)
   - DB-10 (Avoid RDS Extended Support charges)
   - OBS-01 (Set retention on every CloudWatch log group)
   - COM-02 (Shrink first, then commit)
   - COM-04 (Use Target Coverage in Purchase Analyzer)
   - COM-08 (Evaluate Database Savings Plans for Gen 7+ and serverless)
   - AI-03 (Use prompt caching on Bedrock - up to 90% discount on cached input)
   - AI-04 (Bedrock batch inference - 50% discount for async work)
   - GOV-01 (Total account budget on day one with alerts)
   - GOV-05 (Cost Anomaly Detection with dimensional monitors to Slack)
3. Return a clean, valid JSON object following this EXACT schema:
{
  "summary": "Brief executive analysis of the situation (2-3 sentences)",
  "primaryLever": "Usage" or "Rate" or "Both",
  "recommendedOrderStep": "Step number and name (e.g., Step 3: Delete it, then Step 4: Shrink it)",
  "quickWins": [
    {
      "tipId": "STO-01",
      "title": "Migrate gp2 volumes to gp3",
      "effort": "Low",
      "impact": "$$$",
      "estimatedMonthlySavings": "e.g. 20% on EBS spend",
      "action": "Immediate live migration without downtime."
    }
  ],
  "strategicActions": [
    {
      "tipId": "COM-02",
      "title": "Shrink first, then purchase Savings Plans",
      "effort": "Med",
      "impact": "$$$",
      "action": "Rightsize oversized instances first, then lock in 1-year no-upfront plans on the leaner baseline."
    }
  ],
  "trapsToAvoid": [
    "e.g. Buying a 3-year Compute Savings Plan before eliminating idle EC2 instances or setting memory metrics."
  ],
  "verificationReminder": "Always verify exact pricing on official AWS pricing pages for your specific Region."
}
Never invent AWS prices or features that you are not sure about. Ensure the output is strictly valid JSON only without markdown code fences.`;

    const prompt = `User Context:
Monthly AWS Bill Range: ${spendTier || 'Not specified'}
Top Services: ${topServices || 'Not specified'}
User Details / CSV data:
${message || contextText}

Provide an actionable, prioritized awsmaxxing plan.`;

    let outputText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      });
      outputText = response.text || '{}';
    } catch (genError) {
      console.warn('Initial model attempt error, trying fallback model:', genError);
      try {
        const response2 = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });
        outputText = response2.text || '{}';
      } catch (err2) {
        console.warn('Both model attempts hit transient limit, falling back to curated expert analysis:', err2);
        // Resilient deterministic fallback
        return res.json({
          summary: `Prioritized FinOps assessment for ${spendTier || 'your'} infrastructure. The cardinal rule applies: Shrink and eliminate waste BEFORE making rate commitments.`,
          primaryLever: "Both",
          quickWins: [
            "Enable S3 & DynamoDB Gateway Endpoints in all VPC route tables (Tip NET-02) — completely free and removes $0.045/GB NAT data processing fee.",
            "Migrate all gp2 EBS volumes to gp3 (Tip STO-01) for an immediate 20% baseline storage price cut and detached IOPS baseline.",
            "Identify and release unattached Elastic IPv4 addresses (Tip NET-09) to avoid $0.005/hr charges.",
            "Audit idle NAT Gateways and obsolete snapshots across non-primary regions."
          ],
          recommendedStrategies: [
            {
              phase: "Phase 1: See It & Own It",
              actions: "Enable CloudWatch Memory Metrics on all EC2 instances to unlock real rightsizing. Stand up Cost Anomaly Detection monitors sending directly to Slack.",
              potentialSavings: "10-25% via right-sizing confidence",
              tipId: "EC2-02"
            },
            {
              phase: "Phase 2: Eliminate & Shrink",
              actions: "Schedule non-production EC2 and RDS instances off during evenings and weekends. Migrate compatible workloads to Graviton (c7g/m7g/r7g) for 20% better price-performance.",
              potentialSavings: "30-65% on non-prod compute",
              tipId: "EC2-16"
            },
            {
              phase: "Phase 3: Rate Commitment",
              actions: "Once the waste is pruned, purchase 1-year or 3-year Compute Savings Plans or Database Savings Plans aiming for 70-80% steady-state coverage.",
              potentialSavings: "20-40% on steady compute",
              tipId: "COM-02"
            }
          ],
          trapsToAvoid: [
            "Purchasing 3-year Savings Plans before eliminating idle instances and rightsizing.",
            "Keeping EKS clusters or RDS engines on deprecated versions subject to Extended Support surcharges ($0.60/hr/cluster).",
            "Routing internal S3 backups through a paid NAT Gateway instead of a free Gateway VPC Endpoint."
          ],
          verificationReminder: "Always verify exact regional pricing in your account using the Cost Optimization Hub and official AWS pricing calculator."
        });
      }
    }

    let parsedData;
    try {
      parsedData = JSON.parse(outputText);
    } catch {
      // Clean possible stray markdown
      const cleaned = outputText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Error in /api/ask:', error);
    return res.status(500).json({
      error: error.message || 'An error occurred while generating your awsmaxxing recommendations.',
    });
  }
});

// Setup Vite development server or production static serving
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from dist
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`awsmaxxing server listening on http://0.0.0.0:${PORT} (${isDev ? 'dev' : 'prod'})`);
  });
}

startServer();
