import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TIPS } from '../data/tips';
import { ArrowLeft, Copy, Check, ExternalLink, ShieldCheck, Terminal, Layers, ArrowRight } from 'lucide-react';

export const TipDetailPage: React.FC = () => {
  const { idSlug } = useParams<{ idSlug: string }>();
  const [activeTab, setActiveTab] = useState<'console' | 'terraform' | 'cli'>('console');
  const [copied, setCopied] = useState(false);

  // Match tip by ID prefix in slug (e.g. net-02-s3-dynamodb... or NET-02)
  const tip = TIPS.find((t) => {
    if (!idSlug) return false;
    const lowerSlug = idSlug.toLowerCase();
    const targetPrefix = t.id.toLowerCase();
    return lowerSlug.startsWith(targetPrefix) || lowerSlug.includes(t.slug);
  }) || TIPS[0];

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": tip.seo_title,
    "description": tip.meta_description,
    "dateModified": tip.last_verified,
    "author": {
      "@type": "Organization",
      "name": "awsmaxxing"
    },
    "publisher": {
      "@type": "Organization",
      "name": "awsmaxxing",
      "url": "https://awsmaxxing.dev"
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Dynamic Canonical */}
      <link rel="canonical" href={`https://awsmaxxing.dev/tips/${tip.id.toLowerCase()}-${tip.slug}`} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#707070]">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/tips" className="hover:text-white transition-colors">Tips</Link>
        <span>/</span>
        <span className="text-white">{tip.id}</span>
      </nav>

      {/* Back button */}
      <Link
        to="/tips"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1a1] hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Tips Library</span>
      </Link>

      {/* Header */}
      <header className="border-b border-[#1f1f1f] pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-2 py-0.5 rounded border border-[#ff6b00]/20">
            {tip.id}
          </span>
          <span className="text-xs font-mono text-[#707070] uppercase px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f]">
            {tip.domain}
          </span>
          <span className="text-xs font-mono text-[#a1a1a1] px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f]">
            Effort: {tip.effort}
          </span>
          <span className="text-xs font-mono text-[#ff6b00] px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f]">
            Impact: {tip.impact === 3 ? '$$$ (Major)' : tip.impact === 2 ? '$$ (Moderate)' : '$ (Hygiene)'}
          </span>
          <span className="text-xs font-mono text-[#a1a1a1] px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f] capitalize">
            Lever: {tip.lever}
          </span>
          {tip.is_preview && (
            <span className="text-xs font-mono text-[#f59e0b] px-2 py-0.5 bg-[#f59e0b]/10 rounded border border-[#f59e0b]/30">
              Preview Feature
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {tip.title}
        </h1>

        <p className="text-base text-[#ededed] leading-relaxed mb-4">
          {tip.summary}
        </p>

        {/* Services & Last Verified row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1a1a1a] text-xs font-mono text-[#707070]">
          <div className="flex items-center gap-2">
            <span>Services:</span>
            {tip.services.map((svc, i) => (
              <span key={i} className="text-[#a1a1a1] bg-[#111111] px-2 py-0.5 rounded">
                {svc}
              </span>
            ))}
          </div>
          <div className="text-[#a1a1a1]">
            Last verified: <span className="text-white">{tip.last_verified}</span>
          </div>
        </div>
      </header>

      {/* How-To Implementation Tabs */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#ff6b00]" />
          <span>Implementation How-To</span>
        </h2>

        {/* Tab switcher */}
        <div className="flex gap-2 p-1 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg mb-4 text-xs font-mono">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex-1 py-1.5 px-3 rounded text-center transition-colors ${
              activeTab === 'console'
                ? 'bg-white text-black font-semibold'
                : 'text-[#a1a1a1] hover:text-white'
            }`}
          >
            AWS Console Steps
          </button>
          <button
            onClick={() => setActiveTab('terraform')}
            className={`flex-1 py-1.5 px-3 rounded text-center transition-colors ${
              activeTab === 'terraform'
                ? 'bg-white text-black font-semibold'
                : 'text-[#a1a1a1] hover:text-white'
            }`}
          >
            Terraform Snippet
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex-1 py-1.5 px-3 rounded text-center transition-colors ${
              activeTab === 'cli'
                ? 'bg-white text-black font-semibold'
                : 'text-[#a1a1a1] hover:text-white'
            }`}
          >
            AWS CLI Command
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-5">
          {activeTab === 'console' && (
            <div className="text-sm text-[#ededed] leading-relaxed whitespace-pre-wrap font-sans">
              {tip.how_to.console}
            </div>
          )}

          {activeTab === 'terraform' && (
            <div className="relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f1f1f] text-xs font-mono text-[#707070]">
                <span>main.tf</span>
                <button
                  onClick={() => copyCode(tip.how_to.terraform)}
                  className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#ff6b00]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-[#ededed] overflow-x-auto p-2 leading-relaxed">
                <code>{tip.how_to.terraform}</code>
              </pre>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f1f1f] text-xs font-mono text-[#707070]">
                <span>bash</span>
                <button
                  onClick={() => copyCode(tip.how_to.cli)}
                  className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#ff6b00]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-[#ededed] overflow-x-auto p-2 leading-relaxed">
                <code>{tip.how_to.cli}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* How to Verify Savings */}
      <section className="mb-10 p-5 rounded-lg bg-[#180e05] border border-[#ff6b00]/30 text-xs">
        <div className="flex items-center gap-2 text-[#ff6b00] font-mono font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>How to Verify the Savings</span>
        </div>
        <p className="text-sm text-white leading-relaxed">
          {tip.verify}
        </p>
      </section>

      {/* Linked Dashboards & KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h3 className="text-xs font-mono uppercase text-[#707070] mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Associated Dashboards</span>
          </h3>
          <div className="space-y-1">
            {tip.dashboard.map((dashId) => (
              <Link
                key={dashId}
                to={`/dashboards`}
                className="text-xs font-mono text-[#ff6b00] hover:underline flex items-center justify-between"
              >
                <span>Dashboard {dashId}</span>
                <ArrowRight className="w-3 h-3 text-[#707070]" />
              </Link>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
          <h3 className="text-xs font-mono uppercase text-[#707070] mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Target KPIs</span>
          </h3>
          <div className="space-y-1">
            {tip.kpi.map((kpiKey) => (
              <Link
                key={kpiKey}
                to={`/kpis#${kpiKey}`}
                className="text-xs font-mono text-[#ff6b00] hover:underline flex items-center justify-between"
              >
                <span>KPI: {kpiKey}</span>
                <ArrowRight className="w-3 h-3 text-[#707070]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      {tip.sources && tip.sources.length > 0 && (
        <section className="border-t border-[#1f1f1f] pt-6 mb-8 text-xs font-mono text-[#707070]">
          <span className="block text-white font-semibold mb-2">Primary Verification Sources:</span>
          <ul className="space-y-1">
            {tip.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a1a1a1] hover:text-[#ff6b00] inline-flex items-center gap-1 transition-colors break-all"
                  title="Verify on AWS Pricing page"
                >
                  <span>{src}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* JSON-LD Article Schema */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </div>
  );
};
