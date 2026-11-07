import React from 'react';
import { CHANGELOG } from '../data/changelog';
import { Rss, ExternalLink, Sparkles, Calendar, Layers } from 'lucide-react';

export const WhatsNewPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href="https://awsmaxxing.dev/whats-new" />

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">CFM Timeline</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-2">
            What's New in AWS Cost Management
          </h1>
          <p className="text-sm text-[#a1a1a1] max-w-2xl leading-relaxed">
            The native AWS Cloud Financial Management tooling changed more between late 2025 and late 2026 than in the preceding three years combined.
          </p>
        </div>

        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111111] border border-[#1f1f1f] hover:border-[#f59e0b] text-xs font-mono text-[#ededed] shrink-0 transition-colors"
          title="Subscribe via RSS"
        >
          <Rss className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>Subscribe via RSS</span>
        </a>
      </div>

      {/* Timeline items */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-[#1f1f1f]">
        {CHANGELOG.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="relative pl-8 space-y-3"
          >
            {/* Timeline node */}
            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-[#ff6b00]" />

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#ff6b00] font-semibold">{item.event}</span>
              <span className="text-[#707070]">·</span>
              <span className="text-[#a1a1a1]">{item.date}</span>
              <span className="text-[#707070]">·</span>
              <span className="px-2 py-0.5 rounded bg-[#111111] text-[#a1a1a1] border border-[#1f1f1f]">
                {item.pillar}
              </span>
              {item.isPreview && (
                <span className="px-2 py-0.5 rounded bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30">
                  Preview
                </span>
              )}
            </div>

            <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#383838] transition-colors">
              <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed mb-4">
                {item.summary}
              </p>

              <div className="space-y-1.5 text-xs text-[#a1a1a1] mb-4">
                {item.details.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2">
                    <span className="text-[#ff6b00] font-mono shrink-0">→</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#141414] flex items-center justify-between text-xs font-mono">
                <a
                  href={item.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a1a1a1] hover:text-[#ff6b00] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Official AWS Announcement</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
