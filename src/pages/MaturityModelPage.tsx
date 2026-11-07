import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'How do you monitor and report AWS spending across accounts?',
    options: [
      { label: 'Basic AWS Cost Explorer and email budget alerts', score: 1 },
      { label: 'Athena queries on CUR 2.0 / FOCUS exports and native dashboards', score: 2 },
      { label: 'Cloud Intelligence Dashboards (CID) with real-time unit economics', score: 3 }
    ]
  },
  {
    id: 'q2',
    question: 'How are AWS costs allocated back to teams or business units?',
    options: [
      { label: 'One account per environment, but no granular resource tagging', score: 1 },
      { label: 'Strict Tag Policies, Cost Categories, and 85%+ tag coverage', score: 2 },
      { label: '95%+ allocation including Kubernetes pod labels and shared costs', score: 3 }
    ]
  },
  {
    id: 'q3',
    question: 'How do you approach EC2 and compute rightsizing?',
    options: [
      { label: 'Manual spot checks or deleting unattached EBS volumes', score: 1 },
      { label: 'Compute Optimizer with CloudWatch Agent memory metrics enabled', score: 2 },
      { label: 'Automated remediation (Compute Optimizer Automation, Karpenter, Graviton)', score: 3 }
    ]
  },
  {
    id: 'q4',
    question: 'How are commitments (Savings Plans and RIs) managed?',
    options: [
      { label: 'Ad-hoc 1-year or 3-year commitments without target coverage planning', score: 1 },
      { label: 'Staggered tranches targeting 75%–85% coverage on a lean baseline', score: 2 },
      { label: 'Prioritized sharing preferences across multi-orgs with strict ESR tracking', score: 3 }
    ]
  },
  {
    id: 'q5',
    question: 'How does your engineering culture handle cost governance?',
    options: [
      { label: 'End-of-month invoice review with surprise bill escalations', score: 1 },
      { label: 'Cost Anomaly Detection to Slack and monthly engineering reviews', score: 2 },
      { label: 'Shift-left cost checks in CI/CD pull requests and squad efficiency OKRs', score: 3 }
    ]
  }
];

export const MaturityModelPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qId: string, score: number) => {
    setAnswers({ ...answers, [qId]: score });
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === QUESTIONS.length;

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  let stage: 'Crawl' | 'Walk' | 'Run' = 'Crawl';
  if (totalScore >= 12) stage = 'Run';
  else if (totalScore >= 8) stage = 'Walk';

  const maturityMatrix = [
    {
      stage: 'Crawl',
      visibility: 'Cost Explorer, basic email Budgets',
      allocation: 'Single account or account per env',
      optimization: 'Delete idle EBS, gp3 migration, basic SP',
      governance: 'Budget alert emails, manual bill review'
    },
    {
      stage: 'Walk',
      visibility: 'CUR 2.0 / FOCUS in Athena, native dashboards',
      allocation: 'Tag policy, cost categories, 80%+ tag coverage',
      optimization: 'EC2 memory metrics, Graviton, off-hours scheduling, layered SPs',
      governance: 'Anomaly detection to Slack, SCP guardrails, monthly reviews'
    },
    {
      stage: 'Run',
      visibility: 'Cloud Intelligence Dashboards, unit economics',
      allocation: '95%+ allocated incl. shared networking and EKS pods',
      optimization: 'Automated remediation, Karpenter consolidation, AI prompt caching',
      governance: 'PR cost checks (Infracost), squad efficiency targets, chargeback'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/maturity-model" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">FinOps Foundation Alignment</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          FinOps Maturity Model & Self-Assessment
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-3xl leading-relaxed">
          Evaluate where your organization sits on the Crawl → Walk → Run continuum across Visibility, Allocation, Optimization, and Governance. Take the 2-minute assessment for tailored recommendations.
        </p>
      </div>

      {/* Matrix Table */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-white mb-4">The Crawl / Walk / Run Matrix</h2>
        <div className="overflow-x-auto border border-[#1f1f1f] rounded-lg bg-[#0a0a0a]">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#111111] text-[#707070] font-mono uppercase text-[10px] border-b border-[#1f1f1f]">
              <tr>
                <th className="p-3.5">Stage</th>
                <th className="p-3.5">Visibility</th>
                <th className="p-3.5">Allocation</th>
                <th className="p-3.5">Optimization</th>
                <th className="p-3.5">Governance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f] text-[#ededed]">
              {maturityMatrix.map((row) => (
                <tr key={row.stage} className="hover:bg-[#121212] transition-colors">
                  <td className="p-3.5 font-mono font-bold text-white text-sm">
                    {row.stage}
                  </td>
                  <td className="p-3.5 text-[#a1a1a1]">{row.visibility}</td>
                  <td className="p-3.5 text-[#a1a1a1]">{row.allocation}</td>
                  <td className="p-3.5 text-[#a1a1a1]">{row.optimization}</td>
                  <td className="p-3.5 text-[#a1a1a1]">{row.governance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Self-Assessment Quiz */}
      <section className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f]">
        <div className="border-b border-[#1f1f1f] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase text-[#ff6b00] block">Interactive Assessment</span>
            <h2 className="text-lg font-bold text-white mt-0.5">Determine Your FinOps Maturity Stage</h2>
          </div>
          <span className="text-xs font-mono text-[#707070]">
            {answeredCount} of {QUESTIONS.length} Answered
          </span>
        </div>

        <div className="space-y-6">
          {QUESTIONS.map((q, qIdx) => (
            <div key={q.id} className="space-y-2">
              <div className="text-xs font-semibold text-white">
                <span className="font-mono text-[#ff6b00] mr-1.5">0{qIdx + 1}.</span>
                {q.question}
              </div>
              <div className="space-y-1.5">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, opt.score)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'bg-[#180e05] border-[#ff6b00] text-white shadow-sm'
                          : 'bg-[#111111] border-[#1f1f1f] text-[#a1a1a1] hover:border-[#383838]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#ff6b00] bg-[#ff6b00]' : 'border-[#555555]'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="mt-8 p-6 rounded-lg bg-[#180e05] border border-[#ff6b00]/40 text-xs">
            <div className="flex items-center gap-2 text-[#ff6b00] font-mono text-sm font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Assessment Outcome: {stage} Stage</span>
            </div>
            <p className="text-sm text-white leading-relaxed mb-4">
              {stage === 'Crawl' && 'Your organization has basic cost awareness but operates reactively. You are well-positioned to unlock 20%+ savings with low-risk hygiene and guardrails.'}
              {stage === 'Walk' && 'You have solid visibility and account boundaries. Your next leverage point is container bin-packing (Karpenter), Graviton migration, and proactive CI/CD shift-left costing.'}
              {stage === 'Run' && 'Advanced institutional FinOps. Focus on AI unit cost metrics (cost per outcome), private pricing agreement renewal leverage, and autonomous anomaly investigation.'}
            </p>

            <div className="pt-4 border-t border-[#1a1a1a] flex flex-wrap gap-3">
              <Link
                to={
                  stage === 'Crawl'
                    ? '/playbooks/startup-30-day-plan'
                    : stage === 'Walk'
                    ? '/playbooks/scale-up-90-day-program'
                    : '/playbooks/enterprise-12-month-program'
                }
                className="px-4 py-2 rounded-md bg-white text-black font-semibold hover:bg-[#ededed] transition-colors"
              >
                Go to Recommended Playbook →
              </Link>
              <Link
                to="/tips"
                className="px-4 py-2 rounded-md bg-[#111111] border border-[#1f1f1f] text-white hover:border-[#ff6b00] transition-colors font-mono"
              >
                Explore Curated Tips
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
