import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DASHBOARDS } from '../data/dashboards';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowLeft, Copy, Check, Database, Terminal, ShieldAlert, Layers } from 'lucide-react';

const mockChartData = [
  { month: 'Jan', effectiveCost: 18200, listCost: 24500, savings: 6300 },
  { month: 'Feb', effectiveCost: 17900, listCost: 24800, savings: 6900 },
  { month: 'Mar', effectiveCost: 19100, listCost: 26200, savings: 7100 },
  { month: 'Apr', effectiveCost: 18400, listCost: 26800, savings: 8400 },
  { month: 'May', effectiveCost: 17200, listCost: 25900, savings: 8700 },
  { month: 'Jun', effectiveCost: 16800, listCost: 26100, savings: 9300 },
  { month: 'Jul', effectiveCost: 16400, listCost: 26500, savings: 10100 },
];

export const DashboardDetailPage: React.FC = () => {
  const { idSlug } = useParams<{ idSlug: string }>();
  const [copied, setCopied] = useState(false);

  const dash = DASHBOARDS.find((d) => {
    if (!idSlug) return false;
    const lower = idSlug.toLowerCase();
    return lower.startsWith(d.id.toLowerCase()) || lower.includes(d.slug);
  }) || DASHBOARDS[0];

  const copySql = () => {
    navigator.clipboard.writeText(dash.sampleSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href={`https://awsmaxxing.dev/dashboards/${dash.id.toLowerCase()}-${dash.slug}`} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#707070]">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/dashboards" className="hover:text-white transition-colors">Dashboards</Link>
        <span>/</span>
        <span className="text-white">{dash.id}</span>
      </nav>

      {/* Back button */}
      <Link
        to="/dashboards"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1a1] hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Dashboards Catalog</span>
      </Link>

      {/* Header */}
      <header className="border-b border-[#1f1f1f] pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold text-white bg-[#141414] px-2 py-0.5 rounded border border-[#1f1f1f]">
            {dash.id}
          </span>
          <span className="text-xs font-mono text-[#ff6b00] px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f]">
            Cadence: {dash.cadence}
          </span>
          <span className="text-xs font-mono text-[#a1a1a1] px-2 py-0.5 bg-[#111111] rounded border border-[#1f1f1f]">
            Audience: {dash.audience}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {dash.title}
        </h1>

        <p className="text-base text-[#ededed] leading-relaxed">
          Questions Answered: <span className="text-white font-medium">{dash.answers}</span>
        </p>
      </header>

      {/* Mock Recharts Dark-Mode Visualization */}
      <section className="mb-10 p-6 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
        <div className="flex items-center justify-between pb-4 border-b border-[#1f1f1f] mb-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#707070] font-mono">Simulated Viewport</span>
            <h3 className="text-sm font-semibold text-white mt-0.5">{dash.title} · Metric Run-Rate</h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-[#ff6b00]">
              <span className="w-2 h-2 rounded-full bg-[#ff6b00] inline-block" />
              Effective Cost
            </span>
            <span className="flex items-center gap-1 text-[#707070]">
              <span className="w-2 h-2 rounded-full bg-[#707070] inline-block" />
              On-Demand List
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="effectiveGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ff6b00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1f1f1f" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#707070" tick={{ fill: '#707070', fontSize: 11 }} />
              <YAxis stroke="#707070" tick={{ fill: '#707070', fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111111', borderColor: '#333333', borderRadius: '6px', fontSize: '12px' }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="listCost" stroke="#383838" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="effectiveCost" stroke="#ff6b00" strokeWidth={2} fillOpacity={1} fill="url(#effectiveGlow)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Widget List */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#ff6b00]" />
          <span>Dashboard Widget Specifications ({dash.widgets.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {dash.widgets.map((widget, i) => (
            <div
              key={i}
              className="p-3.5 rounded bg-[#0a0a0a] border border-[#1f1f1f] text-xs text-[#ededed] flex items-center gap-2.5"
            >
              <span className="font-mono text-[#ff6b00] text-[11px] shrink-0">W0{i + 1}</span>
              <span>{widget}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Data Source & Alerts Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs">
          <h3 className="text-xs font-mono uppercase text-[#707070] mb-2 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#ff6b00]" />
            <span>Data Sources</span>
          </h3>
          <p className="text-[#a1a1a1] leading-relaxed">
            {dash.dataSource}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs">
          <h3 className="text-xs font-mono uppercase text-[#707070] mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Operational Alert Triggers</span>
          </h3>
          <p className="text-[#a1a1a1] leading-relaxed">
            {dash.alerts}
          </p>
        </div>
      </section>

      {/* Sample Athena SQL Query */}
      <section className="mb-10">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1f1f1f] text-xs font-mono">
          <span className="text-white font-semibold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#ff6b00]" />
            <span>Example Athena SQL (FOCUS / CUR 2.0)</span>
          </span>
          <button
            onClick={copySql}
            className="flex items-center gap-1 text-xs text-[#a1a1a1] hover:text-white"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#ff6b00]" /> : <Copy className="w-3.5 h-3.5 text-[#a1a1a1]" />}
            <span>{copied ? 'Copied' : 'Copy SQL'}</span>
          </button>
        </div>
        <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 overflow-x-auto">
          <pre className="font-mono text-xs text-[#ededed] leading-relaxed">
            <code>{dash.sampleSql}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};
