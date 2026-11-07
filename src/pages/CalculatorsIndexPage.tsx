import React from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS_LIST } from '../data/calculators-info';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CalculatorsIndexPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/calculators" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Interactive Modeling</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          AWS Cost Optimization Calculators
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-3xl leading-relaxed">
          Interactive modeling tools for AWS pricing changes, commitment scenarios, architectural break-evens, and storage tiering. All calculations use verified 2025–2026 pricing constants.
        </p>
      </div>

      {/* Grid of all 10 Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CALCULATORS_LIST.map((calc, i) => (
          <Link
            key={calc.id}
            to={`/calculators/${calc.slug}`}
            className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-2 py-0.5 rounded border border-[#ff6b00]/20">
                  Calc 0{i + 1}
                </span>
                <span className="text-[11px] font-mono text-[#707070]">
                  Verified {calc.lastVerified}
                </span>
              </div>

              <h2 className="text-base font-semibold text-white group-hover:text-[#ff6b00] transition-colors mb-2">
                {calc.title}
              </h2>

              <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-3 mb-4">
                {calc.subtitle}
              </p>
            </div>

            <div className="pt-3 border-t border-[#141414] flex items-center justify-between text-xs font-mono text-[#707070]">
              <span>300+ words of copy & FAQs</span>
              <span className="text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                <span>Simulate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
