import React from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARDS } from '../data/dashboards';
import { LayoutDashboard, ArrowRight, Database } from 'lucide-react';

export const DashboardsPage: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/dashboards" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Analytics & BI Specifications</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          FinOps Dashboard Catalog (D01–D22)
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-3xl leading-relaxed">
          Production blueprints for QuickSight, Cloud Intelligence Dashboards (CID), Athena, and Grafana. Each dashboard defines targeted executive questions, widget inventory, data sources, and sample SQL queries.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DASHBOARDS.map((dash) => (
          <Link
            key={dash.id}
            to={`/dashboards/${dash.id.toLowerCase()}-${dash.slug}`}
            className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-xs font-bold text-white bg-[#141414] px-2 py-0.5 rounded border border-[#1f1f1f]">
                  {dash.id}
                </span>
                <span className="text-[11px] font-mono text-[#707070]">
                  {dash.cadence}
                </span>
              </div>

              <h2 className="text-sm font-semibold text-white group-hover:text-[#ff6b00] transition-colors mb-2">
                {dash.title}
              </h2>

              <p className="text-xs text-[#a1a1a1] line-clamp-2 mb-3">
                {dash.answers}
              </p>

              <div className="text-[11px] text-[#707070] font-mono truncate">
                Audience: {dash.audience}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-xs font-mono text-[#707070]">
              <span>{dash.widgets.length} widgets</span>
              <span className="text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                <span>Inspect</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
