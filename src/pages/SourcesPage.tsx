import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  const awsSources = [
    {
      title: 'The AWS State of Cost Efficiency Report (May 2026)',
      url: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/the-aws-state-of-cost-efficiency-report/',
      description: 'First public benchmark built on the Cost Efficiency metric across 71,000+ opted-in AWS customer accounts. Confirms the median score of 83 and the 8–30% boost from EC2 memory metrics.'
    },
    {
      title: 'AWS Cloud Financial Management: Key 2025 re:Invent Launches',
      url: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/aws-cloud-financial-management-key-reinvent-2025-launches-to-transform-your-finops-practice/',
      description: 'Official overview of Multi-source Billing Views, native CFM dashboards, FOCUS 1.2 exports, and Database Savings Plans.'
    },
    {
      title: 'Six New Idle-Resource Recommendations in AWS Compute Optimizer',
      url: 'https://aws.amazon.com/blogs/aws-cloud-financial-management/announcing-six-new-idle-resource-recommendations-in-aws-compute-optimizer/',
      description: 'Launch details for automated idle detection across DynamoDB, ElastiCache, MemoryDB, DocumentDB, WorkSpaces, and SageMaker endpoints.'
    },
    {
      title: 'AWS Savings Plans FAQs & Database Savings Plans Pricing',
      url: 'https://aws.amazon.com/savingsplans/faqs/',
      description: 'Official documentation covering commitment terms, Gen 7+ instance requirements, and serverless database discount eligibility.'
    },
    {
      title: 'Amazon EKS Pricing & Extended Support Windows',
      url: 'https://aws.amazon.com/eks/pricing/',
      description: 'Official pricing schedule documenting standard support ($0.10/cluster-hour) and extended support ($0.60/cluster-hour).'
    },
    {
      title: 'Amazon Bedrock Pricing & Service Tiers',
      url: 'https://aws.amazon.com/bedrock/pricing/',
      description: 'Token pricing, prompt caching discount terms (up to 90%), and batch inference rates (50% off on-demand).'
    },
    {
      title: 'AWS Free Tier Structural Overhaul Announcement (July 2025)',
      url: 'https://aws.amazon.com/about-aws/whats-new/2025/07/aws-free-tier-credits-month-free-plan/',
      description: 'Policy documentation regarding Free vs Paid plans, $100 onboarding credits, and 6-month expiration rules.'
    }
  ];

  const communitySources = [
    {
      title: 'FinOps Foundation: FinOps Framework 2026',
      url: 'https://www.finops.org/insights/2026-finops-framework/',
      description: 'The updated 2026 FinOps specification adding Executive Strategy Alignment, FinOps Scopes, and Usage Optimization capability definitions.'
    },
    {
      title: 'FinOps Foundation: State of FinOps 2026 Research Report',
      url: 'https://finout.io/blog/state-of-finops-2026-report-key-trends-insights-and-what-comes-next',
      description: 'Industry survey identifying pre-deployment PR costing (Infracost) and generative AI unit economics as top practitioner priorities.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/sources" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Verification & Citations</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          Research Sources & Primary Citations
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-2xl leading-relaxed">
          Every price, benchmark metric, and launch capability cited on awsmaxxing is directly verified against official AWS documentation and FinOps Foundation publications.
        </p>
      </div>

      {/* AWS Primary Sources */}
      <section className="space-y-4 mb-12">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#ff6b00]" />
          <span>AWS Official Documentation & Engineering Publications</span>
        </h2>
        <div className="space-y-3">
          {awsSources.map((src, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs hover:border-[#383838] transition-colors"
            >
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-[#ff6b00] inline-flex items-center gap-1.5 transition-colors mb-1.5"
                title={src.title}
              >
                <span>{src.title}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[#a1a1a1] leading-relaxed mb-2">{src.description}</p>
              <span className="text-[11px] font-mono text-[#707070] break-all">{src.url}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FinOps Foundation Sources */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#3b82f6]" />
          <span>FinOps Foundation Community Frameworks</span>
        </h2>
        <div className="space-y-3">
          {communitySources.map((src, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs hover:border-[#383838] transition-colors"
            >
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-[#3b82f6] inline-flex items-center gap-1.5 transition-colors mb-1.5"
                title={src.title}
              >
                <span>{src.title}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[#a1a1a1] leading-relaxed mb-2">{src.description}</p>
              <span className="text-[11px] font-mono text-[#707070] break-all">{src.url}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
