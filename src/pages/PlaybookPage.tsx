import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PLAYBOOKS } from '../data/playbooks';
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, BookOpen, Clock, Target, Check, RotateCcw } from 'lucide-react';

export const PlaybookPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const playbook = PLAYBOOKS[slug || 'startup-30-day-plan'] || PLAYBOOKS['startup-30-day-plan'];

  // LocalStorage progress state
  const storageKey = `awsmaxxing_progress_${playbook.id}`;
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      } else {
        setCompletedSteps({});
      }
    } catch (e) {
      console.warn('LocalStorage access unavailable:', e);
    }
  }, [storageKey]);

  const toggleStep = (stepId: string) => {
    const next = { ...completedSteps, [stepId]: !completedSteps[stepId] };
    setCompletedSteps(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) {
      console.warn('Failed saving to localStorage:', e);
    }
  };

  const resetProgress = () => {
    setCompletedSteps({});
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn(e);
    }
  };

  const allSteps = playbook.phases.flatMap((p) => p.steps);
  const totalCount = allSteps.length;
  const completedCount = allSteps.filter((s) => completedSteps[s.id]).length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // JSON-LD HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": playbook.title,
    "description": playbook.metaDescription,
    "totalTime": playbook.duration,
    "step": allSteps.map((s, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": s.title,
      "text": s.description
    }))
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#707070]">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#a1a1a1]">Playbooks</span>
        <span>/</span>
        <span className="text-white">{playbook.title}</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#1f1f1f] pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[#111111] text-[#ff6b00] border border-[#1f1f1f]">
            {playbook.audience}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[#111111] text-[#a1a1a1] border border-[#1f1f1f]">
            {playbook.spendRange}
          </span>
          <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-[#111111] text-[#707070] border border-[#1f1f1f] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{playbook.duration}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {playbook.title}
        </h1>
        <p className="text-base text-[#a1a1a1] leading-relaxed mb-6">
          {playbook.subtitle}
        </p>

        {/* Expected Outcome Callout */}
        <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] text-xs">
          <div className="flex items-center gap-1.5 text-white font-semibold mb-1">
            <Target className="w-4 h-4 text-[#ff6b00]" />
            <span>Expected Financial & Operational Outcome</span>
          </div>
          <p className="text-[#a1a1a1] leading-relaxed">
            {playbook.expectedOutcome}
          </p>
        </div>
      </div>

      {/* Interactive Progress Bar */}
      <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-4 mb-10 sticky top-16 z-20 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-white font-medium">Playbook Progress</span>
          <div className="flex items-center gap-4">
            <span className="text-[#ff6b00] font-bold">{completedCount} of {totalCount} completed ({progressPct}%)</span>
            {completedCount > 0 && (
              <button
                onClick={resetProgress}
                className="text-[#707070] hover:text-[#ededed] flex items-center gap-1 text-[11px]"
                title="Reset checklist progress"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-[#1a1a1a] overflow-hidden">
          <div
            className="h-full bg-[#ff6b00] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Overview prose */}
      <div className="prose prose-invert max-w-none text-sm text-[#ededed] leading-relaxed mb-10 border-b border-[#1f1f1f] pb-8">
        <h2 className="text-xl font-bold text-white mb-3">Operational Framework</h2>
        <p>{playbook.overview}</p>
      </div>

      {/* Checklist Phases */}
      <div className="space-y-12">
        {playbook.phases.map((phase, pIdx) => (
          <section key={pIdx} className="space-y-4">
            <div className="border-b border-[#1f1f1f] pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-xs font-mono text-[#ff6b00] uppercase tracking-wider block">{phase.timeframe}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{phase.phaseName}</h3>
              </div>
              <span className="text-xs text-[#a1a1a1] italic">{phase.goal}</span>
            </div>

            <div className="space-y-3">
              {phase.steps.map((step) => {
                const isDone = !!completedSteps[step.id];

                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer select-none text-xs ${
                      isDone
                        ? 'bg-[#180e05] border-[#ff6b00]/30 text-[#a1a1a1]'
                        : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#383838] text-[#ededed]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#707070]" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                          <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-[#707070]' : 'text-white'}`}>
                            {step.title}
                          </h4>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111111] text-[#a1a1a1] border border-[#1f1f1f]">
                              {step.effort}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111111] text-[#ff6b00] border border-[#1f1f1f]">
                              Impact: {step.impact}
                            </span>
                          </div>
                        </div>

                        <p className={`text-xs leading-relaxed ${isDone ? 'text-[#707070]' : 'text-[#a1a1a1]'}`}>
                          {step.description}
                        </p>

                        {step.tipId && (
                          <div className="mt-2.5 pt-2 border-t border-[#1a1a1a] flex items-center justify-between">
                            <span className="text-[11px] font-mono text-[#707070]">Referenced implementation tip:</span>
                            <Link
                              to={`/tips`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] font-mono text-[#ff6b00] hover:underline flex items-center gap-1"
                            >
                              <span>Tip {step.tipId}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Switch between playbooks */}
      <div className="mt-14 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <Link
          to="/playbooks/startup-30-day-plan"
          className="text-[#a1a1a1] hover:text-white transition-colors"
        >
          ← Startup 30-Day Plan
        </Link>
        <Link
          to="/playbooks/scale-up-90-day-program"
          className="text-[#a1a1a1] hover:text-white transition-colors"
        >
          Scale-Up 90-Day Program
        </Link>
        <Link
          to="/playbooks/enterprise-12-month-program"
          className="text-[#a1a1a1] hover:text-white transition-colors"
        >
          Enterprise 12-Month Program →
        </Link>
      </div>

      {/* JSON-LD HowTo Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </div>
  );
};
