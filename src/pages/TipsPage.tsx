import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TIPS, TIP_DOMAINS, Tip } from '../data/tips';
import { Search, Filter, ArrowRight, Lightbulb, Check, Sparkles, X } from 'lucide-react';

export const TipsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const domainFilter = searchParams.get('domain') || 'all';
  const audienceFilter = searchParams.get('audience') || 'all';
  const effortFilter = searchParams.get('effort') || 'all';
  const impactFilter = searchParams.get('impact') || 'all';
  const leverFilter = searchParams.get('lever') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredTips = useMemo(() => {
    return TIPS.filter((t) => {
      if (domainFilter !== 'all' && t.domain !== domainFilter) return false;
      if (audienceFilter !== 'all' && !t.audience.includes(audienceFilter as any)) return false;
      if (effortFilter !== 'all' && t.effort !== effortFilter) return false;
      if (impactFilter !== 'all' && t.impact.toString() !== impactFilter) return false;
      if (leverFilter !== 'all' && t.lever !== leverFilter && t.lever !== 'both') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.id.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.services.some((s) => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [domainFilter, audienceFilter, effortFilter, impactFilter, leverFilter, searchQuery]);

  const hasActiveFilters =
    domainFilter !== 'all' ||
    audienceFilter !== 'all' ||
    effortFilter !== 'all' ||
    impactFilter !== 'all' ||
    leverFilter !== 'all' ||
    searchQuery !== '';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical link for SEO */}
      <link rel="canonical" href="https://awsmaxxing.dev/tips" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">Production Knowledgebase</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-3">
          AWS Maxxing Tips Library
        </h1>
        <p className="text-sm text-[#a1a1a1] max-w-3xl leading-relaxed">
          Surgically actionable cloud financial management tips. Every entry includes verified console steps, Terraform IaC, AWS CLI snippets, and CUR query verification rules.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 mb-8">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#707070] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keyword, service (e.g. S3, NAT, EKS, Bedrock), or tip ID..."
            value={searchQuery}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#707070] focus:border-[#ff6b00] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#707070] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Domain Dropdown */}
          <select
            value={domainFilter}
            onChange={(e) => updateFilter('domain', e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] rounded px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
          >
            {TIP_DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Audience Filter */}
          <select
            value={audienceFilter}
            onChange={(e) => updateFilter('audience', e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] rounded px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
          >
            <option value="all">All Audiences</option>
            <option value="startup">Startup (&lt;$50k)</option>
            <option value="scaleup">Scale-Up ($50k–$1M)</option>
            <option value="enterprise">Enterprise (&gt;$1M)</option>
          </select>

          {/* Lever Filter */}
          <select
            value={leverFilter}
            onChange={(e) => updateFilter('lever', e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] rounded px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
          >
            <option value="all">All Levers (Rate & Usage)</option>
            <option value="usage">Usage Optimization (Quantity)</option>
            <option value="rate">Rate Optimization (Price)</option>
          </select>

          {/* Effort Filter */}
          <select
            value={effortFilter}
            onChange={(e) => updateFilter('effort', e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] rounded px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
          >
            <option value="all">All Effort Levels</option>
            <option value="low">Low Effort (Minutes to hours)</option>
            <option value="med">Medium Effort (Days to weeks)</option>
            <option value="high">High Effort (Quarterly project)</option>
          </select>

          {/* Impact Filter */}
          <select
            value={impactFilter}
            onChange={(e) => updateFilter('impact', e.target.value)}
            className="bg-[#0a0a0a] border border-[#1f1f1f] rounded px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
          >
            <option value="all">All Impacts</option>
            <option value="3">High ($$$ move total bill)</option>
            <option value="2">Medium ($$ noticeable line reduction)</option>
            <option value="1">Low ($ nice to have hygiene)</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-[#f59e0b] hover:underline font-mono text-[11px] ml-auto py-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs font-mono text-[#707070] mb-4">
        <span>Showing {filteredTips.length} tips</span>
        <span>Click any tip to inspect Terraform & CLI</span>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map((tip) => {
          const detailUrl = `/tips/${tip.id.toLowerCase()}-${tip.slug}`;

          return (
            <Link
              key={tip.id}
              to={detailUrl}
              className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#ff6b00] bg-[#ff6b00]/10 px-2 py-0.5 rounded border border-[#ff6b00]/20">
                      {tip.id}
                    </span>
                    <span className="text-[11px] font-mono text-[#707070] uppercase">
                      {tip.domain}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#a1a1a1]">
                    <span className="px-1.5 py-0.5 rounded bg-[#111111] border border-[#1f1f1f]">
                      {tip.effort}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#111111] border border-[#1f1f1f] text-[#ff6b00]">
                      {tip.impact === 3 ? '$$$' : tip.impact === 2 ? '$$' : '$'}
                    </span>
                    {tip.is_preview && (
                      <span className="px-1.5 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30">
                        Preview
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-sm font-semibold text-white group-hover:text-[#ff6b00] transition-colors mb-2">
                  {tip.title}
                </h2>

                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-2 mb-3">
                  {tip.summary}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tip.services.map((svc, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-[#707070] bg-[#111111] px-1.5 py-0.5 rounded"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#141414] flex items-center justify-between text-[11px] font-mono text-[#707070]">
                <span>Verified: {tip.last_verified}</span>
                <span className="text-white group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>How-To</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[#1f1f1f] rounded-lg">
          <p className="text-sm text-[#a1a1a1] mb-2">No tips matched your current filter criteria.</p>
          <button
            onClick={clearAllFilters}
            className="text-xs font-mono text-[#ff6b00] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
