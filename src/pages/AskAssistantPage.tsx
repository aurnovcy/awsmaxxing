import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle2, ShieldCheck, Zap, RefreshCw, FileText } from 'lucide-react';

interface QuickWin {
  tipId: string;
  title: string;
  effort: string;
  impact: string;
  estimatedMonthlySavings?: string;
  action: string;
}

interface StrategicAction {
  tipId: string;
  title: string;
  effort: string;
  impact: string;
  action: string;
}

interface AskResponse {
  summary: string;
  primaryLever: string;
  recommendedOrderStep: string;
  quickWins: QuickWin[];
  strategicActions: StrategicAction[];
  trapsToAvoid: string[];
  verificationReminder: string;
}

export const AskAssistantPage: React.FC = () => {
  const [spendTier, setSpendTier] = useState('$10k–$50k/mo');
  const [topServices, setTopServices] = useState('EC2, RDS, NAT Gateway, S3');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AskResponse | null>(null);

  const samplePrompts = [
    {
      label: 'Early-stage SaaS with high NAT Gateway and gp2 spend',
      text: 'We are spending ~$18k/month on AWS. Our top lines are EC2-Other (NAT Gateway data transfer to S3 is $4k/mo), EBS gp2 volumes, and non-prod dev environments running 24/7. How should we prioritize?'
    },
    {
      label: 'Generative AI startup running Bedrock & Claude',
      text: 'Our Bedrock token spend jumped from $2k to $14k/month after launching our AI document agent. We use Claude 3.5 Sonnet for customer queries with large repeated system prompts. How do we reduce token costs?'
    },
    {
      label: 'Scale-up planning to purchase 3-year Savings Plans',
      text: 'Finance wants us to buy 3-year Compute Savings Plans right now to show immediate discounts. We haven\'t right-sized our EC2 instances or deployed memory metrics yet. What order of operations should we enforce?'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spendTier,
          topServices,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate recommendations');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to the assistant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* noindex robots meta for /ask */}
      <meta name="robots" content="noindex, follow" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#ff6b00] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini-Powered CFM Advisory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Ask awsmaxxing Assistant
        </h1>
        <p className="text-sm text-[#a1a1a1] leading-relaxed max-w-2xl">
          Describe your AWS bill, top services, team constraints, or paste Cost Explorer excerpts. The assistant strictly enforces the 8-step Order of Operations and maps recommendations directly to the awsmaxxing tip library.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1f1f1f] space-y-5 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#a1a1a1] uppercase tracking-wider mb-1.5">
              Monthly AWS Spend Tier
            </label>
            <select
              value={spendTier}
              onChange={(e) => setSpendTier(e.target.value)}
              className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
            >
              <option value="Under $10k/mo">Under $10k / month</option>
              <option value="$10k–$50k/mo">$10k – $50k / month (Startup)</option>
              <option value="$50k–$250k/mo">$50k – $250k / month (Scale-Up)</option>
              <option value="$250k–$1M/mo">$250k – $1M / month (Late Scale-Up)</option>
              <option value="Over $1M/mo">Over $1M / month (Enterprise)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#a1a1a1] uppercase tracking-wider mb-1.5">
              Top Services Driving Cost
            </label>
            <input
              type="text"
              value={topServices}
              onChange={(e) => setTopServices(e.target.value)}
              placeholder="e.g. EC2, RDS, EKS, NAT Gateway, Bedrock, S3"
              className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#ff6b00]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-mono text-[#a1a1a1] uppercase tracking-wider">
              Describe Your Situation or Paste Cost Explorer Data
            </label>
            <span className="text-[11px] text-[#707070] font-mono">No keys or secrets required</span>
          </div>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your team size, current commitments, or paste top lines from your invoice..."
            className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg p-3 text-xs text-white placeholder-[#707070] focus:outline-none focus:border-[#ff6b00] leading-relaxed"
          />
        </div>

        {/* Sample Prompts */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-[#707070] uppercase block">Or try a sample scenario:</span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(p.text)}
                className="text-[11px] text-[#a1a1a1] hover:text-white bg-[#141414] hover:bg-[#1a1a1a] px-2.5 py-1 rounded border border-[#1f1f1f] transition-colors text-left"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full py-2.5 px-4 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#ededed] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing against awsmaxxing knowledgebase...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Generate Prioritized Action Plan</span>
            </>
          )}
        </button>
      </form>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-lg bg-[#1a0a0a] border border-[#ef4444]/40 text-xs text-[#ef4444] mb-8 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Advisory Note</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generated Response Cards */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Executive Summary */}
          <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#ff6b00]/30">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-[#ff6b00] font-semibold uppercase tracking-wider">Executive Analysis</span>
              <span className="px-2 py-0.5 rounded bg-[#111111] text-white border border-[#1f1f1f]">
                Recommended Sequence: {result.recommendedOrderStep}
              </span>
            </div>
            <p className="text-sm text-white leading-relaxed mb-3">
              {result.summary}
            </p>
            <div className="text-xs text-[#a1a1a1] font-mono">
              Primary FinOps Lever to apply: <strong className="text-white">{result.primaryLever}</strong>
            </div>
          </div>

          {/* Quick Wins */}
          {result.quickWins && result.quickWins.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                <span>Phase 1: Zero-Risk Quick Wins (Delete & Shrink)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.quickWins.map((win, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <Link
                        to="/tips"
                        className="font-mono text-[11px] font-bold text-[#ff6b00] hover:underline"
                      >
                        {win.tipId}
                      </Link>
                      <div className="flex gap-1 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-[#111111] text-[#a1a1a1] border border-[#1f1f1f]">
                          {win.effort}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#111111] text-[#ff6b00] border border-[#1f1f1f]">
                          {win.impact}
                        </span>
                      </div>
                    </div>
                    <div className="font-semibold text-white mb-1">{win.title}</div>
                    <p className="text-[#a1a1a1] leading-relaxed mb-2">{win.action}</p>
                    {win.estimatedMonthlySavings && (
                      <div className="text-[11px] font-mono text-[#ff6b00]">
                        Savings: {win.estimatedMonthlySavings}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Actions */}
          {result.strategicActions && result.strategicActions.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#3b82f6]" />
                <span>Phase 2: Strategic Rate & Architecture Actions</span>
              </h2>
              <div className="space-y-2.5">
                {result.strategicActions.map((strat, i) => (
                  <div key={i} className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{strat.title}</span>
                      <span className="font-mono text-[11px] text-[#ff6b00]">{strat.tipId}</span>
                    </div>
                    <p className="text-[#a1a1a1] leading-relaxed">{strat.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traps to Avoid */}
          {result.trapsToAvoid && result.trapsToAvoid.length > 0 && (
            <div className="p-4 rounded-lg bg-[#140f09] border border-[#f59e0b]/30 text-xs">
              <div className="flex items-center gap-1.5 text-[#f59e0b] font-mono font-bold uppercase mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Traps to Avoid</span>
              </div>
              <ul className="space-y-1 text-[#ededed]">
                {result.trapsToAvoid.map((trap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-mono">✕</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Reminder */}
          <div className="p-3 bg-[#0a0a0a] border border-[#1f1f1f] rounded text-[11px] text-[#707070] font-mono flex items-center justify-between">
            <span>{result.verificationReminder}</span>
            <Link to="/disclaimer" className="text-[#a1a1a1] hover:text-white underline ml-2">
              Pricing Disclaimer
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
