import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Sparkles, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/about" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Philosophy & Mission</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          About awsmaxxing
        </h1>
        <p className="text-base text-[#a1a1a1] leading-relaxed max-w-2xl">
          The Field Guide to Getting Maximum Value from Every AWS Dollar.
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-sm text-[#ededed] space-y-6 leading-relaxed mb-10">
        <h2 className="text-xl font-bold text-white">What “Maxxing” Means</h2>
        <p>
          "Maxxing" does NOT mean "spend less." It means maximizing the business leverage returned from every dollar on your AWS invoice.
        </p>
        <p>
          Sometimes that means cutting pure waste like unattached EBS volumes or idle public IPv4 addresses. Sometimes it means committing harder to 1-year Savings Plans. And sometimes it means spending MORE on something—such as enabling EC2 memory metrics, adding a VPC endpoint, or upgrading to a newer instance generation—to save far more elsewhere.
        </p>
        <p>
          Our tone is confident, practical, slightly irreverent, and never fear-mongering. We do not believe in arbitrary cost-slashing that throttles product shipping velocity or degrades customer reliability.
        </p>

        <h2 className="text-xl font-bold text-white pt-4">Who Owns What</h2>
        <p>
          In high-performing engineering organizations, FinOps is not a police force. Responsibilities divide cleanly across the two fundamental levers:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-[#a1a1a1]">
          <li><strong>Engineering</strong> owns Usage: rightsizing, off-hours scheduling, architecture-level design, and tagging at creation.</li>
          <li><strong>FinOps / Cloud Platform</strong> owns Rates, data exports (CUR/FOCUS), dashboard tooling, policy-as-code, and the optimization backlog.</li>
          <li><strong>Finance</strong> owns budgets, variance forecasts, chargeback reconciliation, and accruals.</li>
          <li><strong>Leadership</strong> sets strategic targets: unit cost trajectories, gross margins, and the explicit trade-off between engineering speed and infrastructure spend.</li>
          <li><strong>Procurement</strong> owns private pricing agreements (PPA/EDP), Marketplace commitments, and software licensing.</li>
        </ul>
        <p>
          For startups, one founder or senior engineer usually wears all five hats; our Startup 30-Day Plan is specifically sized for that reality.
        </p>
      </div>

      <div className="p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Explore the Playbooks</h3>
          <p className="text-xs text-[#a1a1a1] mt-0.5">Start with the checklist designed for your current monthly spend tier.</p>
        </div>
        <Link
          to="/"
          className="px-4 py-2 rounded-md bg-white text-black font-semibold text-xs hover:bg-[#ededed] transition-colors shrink-0"
        >
          View Bill Selector →
        </Link>
      </div>
    </div>
  );
};
