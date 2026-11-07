import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, TrendingDown, ShieldCheck, Database, Server, Cpu, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { OrderOfOperations } from '../components/OrderOfOperations';
import { BENCHMARK_STATS, CHANGELOG } from '../data/changelog';
import { CALCULATORS_LIST } from '../data/calculators-info';
import { TIPS } from '../data/tips';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBillTier, setSelectedBillTier] = useState<string>('startup');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleRoutePlaybook = (tier: string) => {
    if (tier === 'startup') navigate('/playbooks/startup-30-day-plan');
    if (tier === 'scaleup') navigate('/playbooks/scale-up-90-day-program');
    if (tier === 'enterprise') navigate('/playbooks/enterprise-12-month-program');
  };

  const faqs = [
    {
      q: 'What does "awsmaxxing" mean if it does not mean spending less?',
      a: 'Maxxing means maximizing the business value returned for every single dollar on your AWS invoice. Sometimes that means cutting pure waste like unattached EBS volumes or idle public IPv4. Other times it means committing harder to 1-year Savings Plans, or spending MORE on something (like deploying memory metrics or adding a VPC endpoint) to unlock 10x savings elsewhere.'
    },
    {
      q: 'Why should I commit to Savings Plans AFTER shrinking capacity?',
      a: 'AWS\'s May 2026 benchmark reveals that high Savings Plans coverage (95%–100%) masks 65%–80% of visible rightsizing and Graviton opportunity until renewal. If you commit first, rightsizing later only frees up unused commitment rather than reducing your invoice. You lock a discount onto bloated capacity.'
    },
    {
      q: 'What are the two core FinOps levers?',
      a: 'Every line item on AWS is Price × Quantity. Rate Optimization lowers the unit price (Savings Plans, Reserved Instances, Spot, private pricing, credits). Usage Optimization lowers the physical quantity of resources (idle cleanup, rightsizing, off-hours scheduling, architectural endpoints). High-performing teams run both in parallel.'
    },
    {
      q: 'How frequently is this research and pricing updated?',
      a: 'All content is reviewed quarterly and immediately following major AWS conferences (AWS re:Invent in December and FinOps X in June). Every tip and calculator features a visible "Last verified" date stamp and links directly to official AWS pricing documentation.'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 border-b border-[#1f1f1f] overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 text-balance max-w-4xl mx-auto">
            The Field Guide to Getting Maximum Value from Every AWS Dollar.
          </h1>

          <p className="text-base sm:text-lg text-[#a1a1a1] max-w-2xl mx-auto leading-relaxed mb-10 text-balance">
            Maxxing does not mean blind cutting. It means maximizing the business leverage of your cloud budget with ruthless operational discipline.
          </p>

          {/* Interactive "What is your monthly AWS bill?" Selector */}
          <div className="max-w-xl mx-auto bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-4 sm:p-5 shadow-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#a1a1a1] mb-3 text-center sm:text-left">
              What is your monthly AWS bill?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              <button
                onClick={() => setSelectedBillTier('startup')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-mono text-center transition-all ${
                  selectedBillTier === 'startup'
                    ? 'bg-[#121212] border-[#ff6b00] text-white shadow-sm'
                    : 'bg-[#0f0f0f] border-[#1f1f1f] text-[#a1a1a1] hover:border-[#383838]'
                }`}
              >
                <div className="font-bold text-white text-sm">Under $50k</div>
                <div className="text-[11px] text-[#707070]">Startup (ST)</div>
              </button>
              <button
                onClick={() => setSelectedBillTier('scaleup')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-mono text-center transition-all ${
                  selectedBillTier === 'scaleup'
                    ? 'bg-[#121212] border-[#ff6b00] text-white shadow-sm'
                    : 'bg-[#0f0f0f] border-[#1f1f1f] text-[#a1a1a1] hover:border-[#383838]'
                }`}
              >
                <div className="font-bold text-white text-sm">$50k – $1M</div>
                <div className="text-[11px] text-[#707070]">Scale-Up (SU)</div>
              </button>
              <button
                onClick={() => setSelectedBillTier('enterprise')}
                className={`py-2.5 px-3 rounded-lg border text-xs font-mono text-center transition-all ${
                  selectedBillTier === 'enterprise'
                    ? 'bg-[#121212] border-[#ff6b00] text-white shadow-sm'
                    : 'bg-[#0f0f0f] border-[#1f1f1f] text-[#a1a1a1] hover:border-[#383838]'
                }`}
              >
                <div className="font-bold text-white text-sm">Over $1M</div>
                <div className="text-[11px] text-[#707070]">Enterprise (EN)</div>
              </button>
            </div>

            <button
              onClick={() => handleRoutePlaybook(selectedBillTier)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-black hover:bg-[#ededed] font-medium text-xs transition-colors"
            >
              <span>
                {selectedBillTier === 'startup' && 'View 30-Day Startup Checklist (15–30% run-rate cut)'}
                {selectedBillTier === 'scaleup' && 'View 90-Day Scale-Up Roadmap (Karpenter, Graviton, SPs)'}
                {selectedBillTier === 'enterprise' && 'View 12-Month Enterprise Program (Multi-org, FOCUS, PPA)'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Signature Order of Operations Visual */}
      <OrderOfOperations />

      {/* Benchmark Stat Cards (May 2026 State of Cost Efficiency Report) */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Real-World Grounding</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              AWS State of Cost Efficiency Benchmarks
            </h2>
            <p className="text-xs text-[#a1a1a1] mt-1">
              Data from 71,000+ opted-in AWS accounts in the May 2026 report. Turn vague advice into concrete targets.
            </p>
          </div>
          <Link
            to="/sources"
            className="text-xs font-mono text-[#a1a1a1] hover:text-white flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read Report Summary</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENCHMARK_STATS.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-colors"
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-mono font-extrabold text-white">{stat.metric}</span>
                <span className="text-xs font-mono text-[#ff6b00]">{stat.unit}</span>
              </div>
              <div className="text-xs font-semibold text-white mb-1.5">{stat.label}</div>
              <p className="text-[11px] text-[#a1a1a1] leading-relaxed mb-3">
                {stat.subtext}
              </p>
              <div className="text-[11px] text-[#707070] italic border-t border-[#1a1a1a] pt-2">
                {stat.insight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Lever Explainer: Rate vs Usage */}
      <section className="py-12 border-y border-[#1f1f1f] bg-[#080808]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#ff6b00] mb-1">
                Foundational Mental Model
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Every Line Item is Price × Quantity
              </h2>
              <p className="text-sm text-[#a1a1a1] leading-relaxed mb-4">
                Cloud financial management reduces to two independent levers. Rate optimization lowers the unit price; usage optimization lowers the raw quantity consumed.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded bg-[#0f0f0f] border border-[#1f1f1f]">
                  <span className="font-semibold text-white block mb-0.5">Rate Optimization (Lower Price)</span>
                  <span className="text-[#a1a1a1]">
                    Compute Savings Plans, Database Savings Plans, Spot instances, private pricing agreements (PPA), and credits. Typically owned centrally by FinOps.
                  </span>
                </div>
                <div className="p-3.5 rounded bg-[#0f0f0f] border border-[#1f1f1f]">
                  <span className="font-semibold text-white block mb-0.5">Usage Optimization (Lower Quantity)</span>
                  <span className="text-[#a1a1a1]">
                    Idle cleanup, rightsizing, off-hours scheduling, gp3 migration, memory metrics, and architecture endpoints. Owned by product and platform engineering.
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Formula Card */}
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl p-6 text-center">
              <div className="text-xs font-mono text-[#707070] uppercase tracking-wider mb-2">The FinOps Formula</div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white my-4 flex items-center justify-center gap-3">
                <span className="text-[#ededed]">Total Cost</span>
                <span className="text-[#707070]">=</span>
                <span className="text-[#ff6b00]">Rate</span>
                <span className="text-[#707070]">×</span>
                <span className="text-[#3b82f6]">Usage</span>
              </div>
              <p className="text-xs text-[#a1a1a1] leading-relaxed max-w-md mx-auto">
                If you only optimize Rate, oversized resources stay bloated. If you only optimize Usage, you overpay for necessary baseline compute. A healthy program runs both continuously.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  to="/tips?lever=rate"
                  className="px-3 py-1.5 rounded text-xs font-mono bg-[#141414] border border-[#1f1f1f] text-white hover:border-[#ff6b00]"
                >
                  Rate Tips (Savings Plans)
                </Link>
                <Link
                  to="/tips?lever=usage"
                  className="px-3 py-1.5 rounded text-xs font-mono bg-[#141414] border border-[#1f1f1f] text-white hover:border-[#3b82f6]"
                >
                  Usage Tips (Cleanup & Shrink)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Interactive Calculators */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Interactive Tools</span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Featured Cost Calculators
            </h2>
            <p className="text-xs text-[#a1a1a1] mt-1">
              Real calculations with adjustable parameters, worked examples, and verified AWS pricing constants.
            </p>
          </div>
          <Link
            to="/calculators"
            className="text-xs font-mono text-[#a1a1a1] hover:text-white flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 10 Calculators</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CALCULATORS_LIST.slice(0, 3).map((calc) => (
            <Link
              key={calc.id}
              to={`/calculators/${calc.slug}`}
              className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff6b00] block mb-1">
                  Interactive Tool
                </span>
                <h3 className="text-base font-semibold text-white group-hover:text-[#ff6b00] transition-colors mb-2">
                  {calc.title}
                </h3>
                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-3">
                  {calc.subtitle}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#707070]">
                <span>Verified: {calc.lastVerified}</span>
                <span className="text-white group-hover:translate-x-0.5 transition-transform">Simulate →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest What's New Releases */}
      <section className="py-12 border-t border-[#1f1f1f] bg-[#070707]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Changelog</span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                What's New in AWS Cost Management
              </h2>
              <p className="text-xs text-[#a1a1a1] mt-1">
                Recent re:Invent launches, FinOps X announcements, and structural policy changes.
              </p>
            </div>
            <Link
              to="/whats-new"
              className="text-xs font-mono text-[#a1a1a1] hover:text-white flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Full Changelog & RSS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHANGELOG.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[#ff6b00] text-[11px] font-medium">{item.event}</span>
                  <div className="flex items-center gap-2">
                    {item.isPreview && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20">
                        Preview
                      </span>
                    )}
                    <span className="text-[11px] text-[#707070] font-mono">{item.date}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#a1a1a1] leading-relaxed mb-3">{item.summary}</p>
                <ul className="space-y-1 text-[#707070] text-[11px]">
                  {item.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#ff6b00] shrink-0">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with FAQPage Schema */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Answers</span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#a1a1a1] mt-1">
            Core principles behind the awsmaxxing methodology.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:text-[#ff6b00] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#707070]" /> : <ChevronDown className="w-4 h-4 text-[#707070]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#a1a1a1] leading-relaxed border-t border-[#1a1a1a]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        })}
      </script>
    </div>
  );
};
