import React, { useState } from 'react';
import { Eye, Shield, Trash2, Minimize2, Calendar, Lock, Cpu, Sliders } from 'lucide-react';

interface Step {
  num: number;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  action: string;
  keyRule?: string;
}

const STEPS: Step[] = [
  {
    num: 1,
    label: 'See it',
    sublabel: 'Visibility & Telemetry',
    icon: Eye,
    description: 'Enable CUR 2.0 / FOCUS 1.2 in Parquet, opt in to Cost Optimization Hub and Compute Optimizer, and push EC2 memory metrics.',
    action: 'You cannot optimize what you cannot measure and attribute.'
  },
  {
    num: 2,
    label: 'Own it',
    sublabel: 'Account & Tag Allocation',
    icon: Shield,
    description: 'Establish account-per-environment boundaries, tag policies with mandatory keys, and map business units into Cost Categories.',
    action: 'Unallocated spend creates zero engineering accountability.'
  },
  {
    num: 3,
    label: 'Delete it',
    sublabel: 'Idle Waste Eradication',
    icon: Trash2,
    description: 'Purge unattached EBS volumes, aged snapshots, idle NAT Gateways, unattached public IPv4 addresses, and inactive dev instances.',
    action: 'Lowest risk, fastest payback. Pure waste removed with zero disruption.'
  },
  {
    num: 4,
    label: 'Shrink it',
    sublabel: 'Rightsizing & Modernization',
    icon: Minimize2,
    description: 'Migrate gp2 to gp3 (20% savings + decoupled IOPS), port workloads to Graviton3/4, modernize instance generations, rightsize memory/CPU.',
    action: 'Cut the physical capacity requirement down to its true baseline.'
  },
  {
    num: 5,
    label: 'Schedule it',
    sublabel: 'Off-Hours Shutdown',
    icon: Calendar,
    description: 'Turn non-production dev/test environments off when engineers are asleep. 12-hour weekday schedules save ~65% compute and DB costs.',
    action: 'Stop paying 24/7 for clusters only used 50 hours a week.'
  },
  {
    num: 6,
    label: 'Commit to it',
    sublabel: 'Layered Savings Plans',
    icon: Lock,
    description: 'Purchase Compute & Database Savings Plans in monthly or quarterly tranches against the newly lean, shrunken baseline (target 70%–85% coverage).',
    action: 'Commit AFTER you shrink. Never commit to bloated, idle capacity.',
    keyRule: "Commit AFTER you shrink. If you commit first, rightsizing later frees commitment instead of lowering the bill, and you've locked a discount onto oversized capacity."
  },
  {
    num: 7,
    label: 'Re-architect it',
    sublabel: 'Architectural Levers',
    icon: Cpu,
    description: 'Add free S3/DynamoDB gateway endpoints, adopt S3 Intelligent-Tiering, consolidate microservice ALBs, and enforce zone-local traffic routing.',
    action: 'Eliminate structural architectural taxes (NAT, cross-AZ, tiered storage).'
  },
  {
    num: 8,
    label: 'Govern it',
    sublabel: 'Shift-Left & Anomaly Loops',
    icon: Sliders,
    description: 'Deploy Cost Anomaly Detection to Slack, embed PR cost checks with Infracost, automate snapshot lifecycles, and review monthly squad metrics.',
    action: 'Ensure efficiency gains stick and prevent waste drift permanently.'
  }
];

export const OrderOfOperations: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(6); // Default highlight step 6 (Commit to it)

  return (
    <section className="py-12 border-y border-[#1f1f1f] bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ff6b00] font-mono">The Operating Model</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              The 8-Step Order of Operations
            </h2>
            <p className="text-sm text-[#a1a1a1] mt-1.5 max-w-2xl">
              Most AWS optimization efforts fail by doing the right things in the wrong sequence. Follow this strict sequence to avoid locking discounts onto oversized waste.
            </p>
          </div>
          <div className="text-xs font-mono text-[#a1a1a1] bg-[#111111] px-3 py-1.5 rounded border border-[#1f1f1f] self-start sm:self-auto">
            Interactive · Click any step
          </div>
        </div>

        {/* Stepper Grid / Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 relative">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.num;
            const isStep6 = step.num === 6;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(step.num)}
                className={`flex flex-col text-left p-3 rounded-lg border transition-all text-xs relative ${
                  isActive
                    ? 'bg-[#121212] border-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.2)] ring-1 ring-[#ff6b00]'
                    : isStep6
                    ? 'bg-[#0a0a0a] border-[#333333] hover:border-[#555555]'
                    : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#ff6b00]' : 'text-[#707070]'}`}>
                    0{step.num}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#ff6b00]' : 'text-[#a1a1a1]'}`} />
                </div>
                <div className="font-semibold text-white truncate">{step.label}</div>
                <div className="text-[10px] text-[#707070] truncate mt-0.5">{step.sublabel}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Details Panel */}
        {(() => {
          const step = STEPS.find((s) => s.num === activeStep) || STEPS[5];
          const Icon = step.icon;

          return (
            <div className="mt-6 p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] transition-all">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-2 py-0.5 rounded">
                      Step 0{step.num} of 08
                    </span>
                    <span className="text-xs text-[#707070] font-mono">{step.sublabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.label}</h3>
                  <p className="text-sm text-[#ededed] leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-xs text-[#a1a1a1] italic">
                    Why: {step.action}
                  </p>
                </div>

                {/* Signature Callout for Step 6 */}
                {step.num === 6 ? (
                  <div className="md:w-80 p-4 rounded-lg bg-[#141414] border border-[#ff6b00]/40 text-xs text-[#ededed] shadow-lg">
                    <div className="text-[#ff6b00] font-mono font-bold uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] inline-block" />
                      The Cardinal FinOps Rule
                    </div>
                    <p className="leading-normal font-medium text-white">
                      "Commit AFTER you shrink. If you commit first, rightsizing later frees commitment instead of lowering the bill, and you've locked a discount onto oversized capacity."
                    </p>
                  </div>
                ) : (
                  <div className="md:w-80 p-4 rounded-lg bg-[#111111] border border-[#1f1f1f] text-xs text-[#a1a1a1]">
                    <div className="font-mono text-[11px] text-[#ededed] font-medium mb-1">
                      Execution Tip
                    </div>
                    <p>
                      Execute this step before advancing to Step {Math.min(8, step.num + 1)}. Each phase builds mathematical confidence for the next.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
