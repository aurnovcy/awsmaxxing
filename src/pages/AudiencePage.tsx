import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TIPS } from '../data/tips';
import { ArrowRight, CheckCircle2, Shield, Target } from 'lucide-react';

interface Props {
  audienceOverride?: 'startup' | 'scaleup' | 'enterprise';
}

export const AudiencePage: React.FC<Props> = ({ audienceOverride }) => {
  const { audienceKey } = useParams<{ audienceKey: string }>();

  let audience: 'startup' | 'scaleup' | 'enterprise' = 'startup';
  if (audienceOverride) {
    audience = audienceOverride;
  } else if (audienceKey) {
    if (audienceKey.includes('startup')) audience = 'startup';
    else if (audienceKey.includes('scale')) audience = 'scaleup';
    else if (audienceKey.includes('enterprise')) audience = 'enterprise';
  }

  const contentMap = {
    startup: {
      title: 'AWS FinOps for Startups (<$50k/month)',
      tagline: 'Extend Runway Without Sacrificing Engineering Velocity',
      intro: 'When building from seed stage to Series A, your scarcest resource is engineering attention. Premature micro-optimizations waste critical shipping cycles. However, ignoring AWS cost hygiene leaves you vulnerable to the post-credit runway cliff, rogue GPU instances from leaked keys, and silent storage sprawl.',
      priorities: [
        'Enforce credential guardrails and regional restrictions on day one.',
        'Migrate storage to gp3 and add free S3/DynamoDB gateway endpoints.',
        'Turn non-production staging/dev environments off at night and on weekends.',
        'Track credit burn velocity and model post-credit cash requirements 60 days before expiration.'
      ],
      playbookLink: '/playbooks/startup-30-day-plan',
      playbookTitle: 'Startup 30-Day Checklist'
    },
    scaleup: {
      title: 'AWS FinOps for Scale-Ups ($50k–$1M/month)',
      tagline: 'Transition from Firefighting to Institutional Unit Economics',
      intro: 'Between 20 and 150 engineers, infrastructure complexity compounds. Unallocated shared clusters, forgotten read replicas, NAT Gateway traffic storms, and unmonitored Kubernetes request slack silently erode gross margins. This playbook establishes rigorous account boundaries, memory-backed rightsizing, and continuous commitment governance.',
      priorities: [
        'Isolate environments into dedicated accounts per product and tier.',
        'Deploy EC2 memory metrics to unlock 8–30% higher rightsizing savings.',
        'Adopt Karpenter node consolidation and Graviton processor migration.',
        'Shift left with Infracost cost estimates directly in CI/CD pull requests.'
      ],
      playbookLink: '/playbooks/scale-up-90-day-program',
      playbookTitle: 'Scale-Up 90-Day Program'
    },
    enterprise: {
      title: 'AWS FinOps for Enterprises (>$1M/month)',
      tagline: 'Autonomous Multi-Organization Governance & Commercial Leverage',
      intro: 'At enterprise scale spanning dozens of payer accounts and global business units, cost management requires a formal operating charter. Success means eliminating avoidable lifecycle penalties (extended support taxes), orchestrating multi-year Private Pricing Agreements (PPA/EDP), standardizing on FOCUS 1.2, and governing generative AI tokens.',
      priorities: [
        'Consolidate multi-org visibility via Multi-Source Billing Views and FOCUS 1.2.',
        'Eliminate legacy extended support taxes for EKS, RDS, and Windows Server 2016.',
        'Structure layered Savings Plans portfolios with prioritized sharing preferences.',
        'Enforce policy-as-code guardrails and AI inference profile attribution.'
      ],
      playbookLink: '/playbooks/enterprise-12-month-program',
      playbookTitle: 'Enterprise 12-Month Operating Program'
    }
  };

  const current = contentMap[audience];
  const matchedTips = TIPS.filter((t) => t.audience.includes(audience));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href={`https://awsmaxxing.dev/for/${audience === 'startup' ? 'startups' : audience === 'scaleup' ? 'scale-ups' : 'enterprises'}`} />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Audience Roadmap</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-2">
          {current.title}
        </h1>
        <p className="text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
          {current.tagline}
        </p>
      </div>

      {/* Intro Narrative */}
      <div className="prose prose-invert max-w-none text-sm text-[#ededed] leading-relaxed mb-8">
        <p>{current.intro}</p>
      </div>

      {/* Core Priorities Box */}
      <div className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] mb-10">
        <div className="flex items-center justify-between pb-3 border-b border-[#1f1f1f] mb-4">
          <span className="text-xs font-mono uppercase text-[#ff6b00] font-semibold">Core Focus Areas</span>
          <Link
            to={current.playbookLink}
            className="text-xs font-mono text-white hover:text-[#ff6b00] flex items-center gap-1"
          >
            <span>{current.playbookTitle}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#ededed]">
          {current.priorities.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#ff6b00] font-mono shrink-0">0{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Matched Tips for this audience */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recommended Tips for Your Scale</h2>
          <span className="text-xs font-mono text-[#707070]">Showing {matchedTips.length} tips</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matchedTips.map((tip) => (
            <Link
              key={tip.id}
              to={`/tips/${tip.id.toLowerCase()}-${tip.slug}`}
              className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-colors flex flex-col justify-between group text-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[#ff6b00] font-bold">{tip.id}</span>
                  <div className="flex gap-1 text-[10px] font-mono text-[#707070]">
                    <span>{tip.effort}</span>
                    <span>·</span>
                    <span className="text-[#ff6b00]">{tip.impact === 3 ? '$$$' : tip.impact === 2 ? '$$' : '$'}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#ff6b00] transition-colors mb-1.5">
                  {tip.title}
                </h3>
                <p className="text-[#a1a1a1] line-clamp-2">{tip.summary}</p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#141414] text-[11px] font-mono text-[#707070] flex items-center justify-between">
                <span>{tip.domain}</span>
                <span className="text-white group-hover:translate-x-0.5 transition-transform">Inspect →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
