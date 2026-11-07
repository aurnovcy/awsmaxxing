import React from 'react';
import { Link } from 'react-router-dom';
import { KPIS } from '../data/kpis';
import { Target, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const KpisPage: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/kpis" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">FinOps Measurement</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          AWS FinOps KPI Catalog
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-3xl leading-relaxed">
          Standardized formulas, healthy benchmark bands, and operational rationale for key cloud financial management metrics. Use these anchors to establish engineering targets.
        </p>
      </div>

      {/* KPI Index Anchors */}
      <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] mb-10">
        <div className="text-xs font-mono uppercase tracking-wider text-[#707070] mb-3">
          Quick Jump by KPI Anchor
        </div>
        <div className="flex flex-wrap gap-2">
          {KPIS.map((kpi) => (
            <a
              key={kpi.id}
              href={`#${kpi.id}`}
              className="px-2.5 py-1 rounded bg-[#111111] border border-[#1f1f1f] text-xs font-mono text-[#ededed] hover:border-[#ff6b00] transition-colors"
            >
              {kpi.name}
            </a>
          ))}
        </div>
      </div>

      {/* Full Catalog */}
      <div className="space-y-6">
        {KPIS.map((kpi) => (
          <article
            key={kpi.id}
            id={kpi.id}
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white tracking-tight">{kpi.name}</h2>
                <span className="text-[11px] font-mono text-[#ff6b00] bg-[#ff6b00]/10 px-2 py-0.5 rounded border border-[#ff6b00]/20">
                  {kpi.domain}
                </span>
              </div>
              <span className="text-xs font-mono text-[#707070]">#{kpi.id}</span>
            </div>

            {/* Formula Block */}
            <div className="p-3 bg-[#111111] rounded border border-[#1f1f1f] mb-4 font-mono text-xs text-[#ededed]">
              <span className="text-[#707070] block text-[10px] uppercase mb-1">Formula</span>
              <code>{kpi.formula}</code>
            </div>

            {/* Healthy Band & Rationale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded bg-[#080808] border border-[#1a1a1a]">
                <span className="text-[10px] font-mono uppercase text-[#ff6b00] block mb-1">Healthy Band</span>
                <span className="text-white font-medium">{kpi.healthyBand}</span>
              </div>
              <div className="p-3 rounded bg-[#080808] border border-[#1a1a1a]">
                <span className="text-[10px] font-mono uppercase text-[#707070] block mb-1">Why It Matters</span>
                <span className="text-[#a1a1a1] leading-relaxed">{kpi.whyItMatters}</span>
              </div>
            </div>

            {/* Associated Tips */}
            <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-xs font-mono text-[#707070]">
              <div className="flex items-center gap-2">
                <span>Associated Tips:</span>
                {kpi.tips.map((t) => (
                  <Link
                    key={t}
                    to="/tips"
                    className="text-[#ff6b00] hover:underline"
                  >
                    Tip {t}
                  </Link>
                ))}
              </div>
              <a href={`#${kpi.id}`} className="hover:text-white">
                Link Anchor ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
