import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Calculator, LayoutDashboard, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { TIPS } from '../data/tips';
import { CALCULATORS_LIST } from '../data/calculators-info';
import { DASHBOARDS } from '../data/dashboards';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open in parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTips = TIPS.filter(
    (t) =>
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.services.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      t.domain.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCalcs = CALCULATORS_LIST.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredDashboards = DASHBOARDS.filter(
    (d) =>
      d.id.toLowerCase().includes(query.toLowerCase()) ||
      d.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
      <div
        className="w-full max-w-xl bg-[#0a0a0a] border border-[#333333] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1f1f1f]">
          <Search className="w-4 h-4 text-[#a1a1a1] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search tips, calculators, playbooks, dashboards..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#ededed] placeholder-[#707070] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#707070] hover:text-[#ededed] hover:bg-[#1a1a1a]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Nav / Results */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Playbooks Section */}
          {query.length === 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#707070]">
                Playbooks
              </div>
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => handleSelect('/playbooks/startup-30-day-plan')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#ff6b00]" />
                    <span>Startup 30-Day Plan</span>
                    <span className="text-[10px] text-[#707070] font-mono">&lt;$50k/mo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707070] group-hover:text-white" />
                </button>
                <button
                  onClick={() => handleSelect('/playbooks/scale-up-90-day-program')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#ff6b00]" />
                    <span>Scale-Up 90-Day Program</span>
                    <span className="text-[10px] text-[#707070] font-mono">$50k–$1M/mo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707070] group-hover:text-white" />
                </button>
                <button
                  onClick={() => handleSelect('/playbooks/enterprise-12-month-program')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#ff6b00]" />
                    <span>Enterprise 12-Month Program</span>
                    <span className="text-[10px] text-[#707070] font-mono">&gt;$1M/mo</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#707070] group-hover:text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Calculators */}
          {filteredCalcs.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#707070]">
                Calculators
              </div>
              <div className="mt-1 space-y-0.5">
                {filteredCalcs.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/calculators/${c.slug}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Calculator className="w-3.5 h-3.5 text-[#ff6b00] shrink-0" />
                      <span className="truncate">{c.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#707070] group-hover:text-white shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {filteredTips.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#707070]">
                Tips Library
              </div>
              <div className="mt-1 space-y-0.5">
                {filteredTips.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(`/tips/${t.id.toLowerCase()}-${t.slug}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Lightbulb className="w-3.5 h-3.5 text-[#a1a1a1] shrink-0" />
                      <span className="font-mono text-[#ff6b00] text-[11px] shrink-0">{t.id}</span>
                      <span className="truncate">{t.title}</span>
                    </div>
                    <span className="text-[10px] text-[#707070] font-mono uppercase shrink-0 ml-2">{t.domain}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dashboards */}
          {filteredDashboards.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#707070]">
                FinOps Dashboards
              </div>
              <div className="mt-1 space-y-0.5">
                {filteredDashboards.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/dashboards/${d.id.toLowerCase()}-${d.slug}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left hover:bg-[#141414] text-[#ededed] group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#a1a1a1] shrink-0" />
                      <span className="font-mono text-white text-[11px] shrink-0">{d.id}</span>
                      <span className="truncate">{d.title}</span>
                    </div>
                    <span className="text-[10px] text-[#707070] shrink-0 ml-2">{d.cadence}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ask AI prompt */}
          <div className="p-2 border-t border-[#1f1f1f]">
            <button
              onClick={() => handleSelect('/ask')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs rounded-lg bg-[#111111] border border-[#1f1f1f] text-white hover:border-[#ff6b00]/50 group"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-3.5 h-3.5 text-[#ff6b00]" />
                <span className="font-medium">Ask awsmaxxing AI Assistant</span>
              </div>
              <span className="text-[11px] text-[#707070] font-mono">Custom Recommendations</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#1f1f1f] bg-[#050505] flex items-center justify-between text-[11px] text-[#707070] font-mono">
          <span>Navigate with arrows</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
