import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CALCULATORS_LIST } from '../data/calculators-info';
import { InteractiveCalculator } from '../components/calculators/InteractiveCalculator';
import { ArrowLeft, ExternalLink, HelpCircle, ChevronDown, ChevronUp, BookOpen, Layers } from 'lucide-react';

export const CalculatorDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calc = CALCULATORS_LIST.find((c) => c.slug === slug) || CALCULATORS_LIST[0];

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calc.title,
    "description": calc.metaDescription,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": calc.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Canonical */}
      <link rel="canonical" href={`https://awsmaxxing.dev/calculators/${calc.slug}`} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#707070]">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link>
        <span>/</span>
        <span className="text-white">{calc.title}</span>
      </nav>

      {/* Back button */}
      <Link
        to="/calculators"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a1a1a1] hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Calculators</span>
      </Link>

      {/* Header */}
      <header className="border-b border-[#1f1f1f] pb-8 mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff6b00]">
            Interactive Cost Model
          </span>
          <span className="text-xs font-mono text-[#707070]">
            Last verified: {calc.lastVerified}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {calc.title}
        </h1>
        <p className="text-base text-[#a1a1a1] leading-relaxed">
          {calc.subtitle}
        </p>
      </header>

      {/* Interactive Tool Simulator Widget */}
      <InteractiveCalculator calculatorId={calc.id} />

      {/* 300+ Words of Explanatory Copy: How It Works */}
      <article className="prose prose-invert max-w-none text-sm text-[#ededed] leading-relaxed mb-10 space-y-4">
        <h2 className="text-xl font-bold text-white mb-3">How the Calculation Works</h2>
        <div className="text-sm text-[#ededed] whitespace-pre-wrap leading-relaxed">
          {calc.howItWorks}
        </div>
      </article>

      {/* Assumptions Box */}
      <section className="mb-10 p-5 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f]">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#707070] mb-3">
          Pricing & Modeling Assumptions
        </h3>
        <ul className="space-y-1.5 text-xs text-[#a1a1a1]">
          {calc.assumptions.map((asm, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#ff6b00] shrink-0 font-mono">✓</span>
              <span>{asm}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Worked Example */}
      <section className="mb-10 p-5 rounded-lg bg-[#180e05] border border-[#ff6b00]/20">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#ff6b00] mb-2 font-bold">
          Detailed Worked Example
        </h3>
        <div className="text-xs sm:text-sm text-[#ededed] whitespace-pre-wrap leading-relaxed font-sans">
          {calc.workedExample}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="mb-10">
        <h3 className="text-lg font-bold text-white mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {calc.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:text-[#ff6b00] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#707070]" /> : <ChevronDown className="w-4 h-4 text-[#707070]" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#a1a1a1] leading-relaxed border-t border-[#1a1a1a]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tips & Playbooks Links */}
      <section className="pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#707070]">Related Implementation Tips:</span>
          {calc.relatedTips.map((tipId) => (
            <Link
              key={tipId}
              to="/tips"
              className="px-2 py-0.5 rounded bg-[#111111] border border-[#1f1f1f] text-[#ff6b00] hover:underline"
            >
              Tip {tipId}
            </Link>
          ))}
        </div>

        <Link
          to={`/playbooks/${calc.relatedPlaybook}`}
          className="text-[#a1a1a1] hover:text-white transition-colors"
        >
          View matching playbook →
        </Link>
      </section>

      {/* Structured Data: WebApplication and FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify(webAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </div>
  );
};
