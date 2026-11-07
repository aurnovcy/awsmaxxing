import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/disclaimer" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Legal & Pricing Notice</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          Pricing Disclaimer & Editorial Notice
        </h1>
        <p className="text-sm text-[#a1a1a1] leading-relaxed max-w-2xl">
          Understanding our data sources, pricing assumptions, and non-affiliation status.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-[#ededed] leading-relaxed">
        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h2 className="text-base font-bold text-white mb-2">1. Regional Pricing Baseline</h2>
          <p className="text-[#a1a1a1]">
            Unless explicitly stated otherwise, all prices and hourly rates cited on awsmaxxing are based on US East (N. Virginia, us-east-1) on-demand list prices observed during 2025–2026. AWS rates vary across geographical regions (e.g. Europe, Asia Pacific, South America) and vary under Private Pricing Agreements (PPA/EDP). Always verify exact figures on official AWS pricing pages for your specific deployment regions.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h2 className="text-base font-bold text-white mb-2">2. Research Currentness</h2>
          <p className="text-[#a1a1a1]">
            All research, feature descriptions, and benchmark figures are current to October 31, 2026. The guide is reviewed quarterly and after every major AWS re:Invent and FinOps Foundation event.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h2 className="text-base font-bold text-white mb-2">3. Non-Affiliation Statement</h2>
          <p className="text-[#a1a1a1]">
            awsmaxxing is an independent open-source publication and educational resource. It is not affiliated with, sponsored by, authorized by, or endorsed by Amazon Web Services, Inc. (AWS) or Amazon.com, Inc. Amazon Web Services, AWS, and related marks are trademarks of Amazon.com, Inc. or its affiliates.
          </p>
        </div>

        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h2 className="text-base font-bold text-white mb-2">4. Estimates and Financial Planning</h2>
          <p className="text-[#a1a1a1]">
            All calculators and projections are mathematical models intended for architectural guidance and comparative estimation. Actual AWS billing may differ due to taxes, data transfer patterns, burst credits, partial hour rounding, and currency fluctuations.
          </p>
        </div>
      </div>
    </div>
  );
};
