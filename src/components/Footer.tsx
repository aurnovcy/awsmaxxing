import React from 'react';
import { Link } from 'react-router-dom';
import { Rss, FileText, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-[#1f1f1f] text-xs text-[#a1a1a1] pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="col-span-2">
            <Link to="/" className="text-sm font-bold text-white flex items-center gap-1.5 mb-2">
              <span className="font-mono text-[#ff6b00]">&gt;</span>
              <span>awsmaxxing</span>
            </Link>
            <p className="text-xs text-[#707070] leading-relaxed max-w-sm">
              The Field Guide to Getting Maximum Value from Every AWS Dollar. High-impact optimization playbooks, production tips, interactive cost calculators, and FinOps benchmarks.
            </p>
            <div className="flex items-center gap-4 mt-4 font-mono text-[11px]">
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#a1a1a1] hover:text-[#ff6b00] transition-colors"
                title="RSS Feed"
              >
                <Rss className="w-3 h-3 text-[#f59e0b]" />
                <span>RSS Feed</span>
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#a1a1a1] hover:text-white transition-colors"
                title="XML Sitemap"
              >
                <FileText className="w-3 h-3" />
                <span>Sitemap</span>
              </a>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#a1a1a1] hover:text-white transition-colors"
                title="LLM crawler summary"
              >
                <span>llms.txt</span>
              </a>
            </div>
          </div>

          {/* Col 2: Playbooks & Audience */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-white mb-3 font-semibold">
              Playbooks
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/playbooks/startup-30-day-plan" className="hover:text-white transition-colors">
                  Startup 30-Day Plan
                </Link>
              </li>
              <li>
                <Link to="/playbooks/scale-up-90-day-program" className="hover:text-white transition-colors">
                  Scale-Up 90-Day Program
                </Link>
              </li>
              <li>
                <Link to="/playbooks/enterprise-12-month-program" className="hover:text-white transition-colors">
                  Enterprise 12-Month
                </Link>
              </li>
              <li>
                <Link to="/for/startups" className="hover:text-white transition-colors">
                  For Startups (&lt;$50k)
                </Link>
              </li>
              <li>
                <Link to="/for/scale-ups" className="hover:text-white transition-colors">
                  For Scale-Ups
                </Link>
              </li>
              <li>
                <Link to="/for/enterprises" className="hover:text-white transition-colors">
                  For Enterprises
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-white mb-3 font-semibold">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/tips" className="hover:text-white transition-colors">
                  Tips Library (30+)
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition-colors">
                  Cost Calculators (10)
                </Link>
              </li>
              <li>
                <Link to="/dashboards" className="hover:text-white transition-colors">
                  FinOps Dashboards (22)
                </Link>
              </li>
              <li>
                <Link to="/kpis" className="hover:text-white transition-colors">
                  KPI Catalog
                </Link>
              </li>
              <li>
                <Link to="/maturity-model" className="hover:text-white transition-colors">
                  Maturity Self-Assessment
                </Link>
              </li>
              <li>
                <Link to="/whats-new" className="hover:text-white transition-colors">
                  What's New in AWS CFM
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guide & Legal */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-white mb-3 font-semibold">
              About & Data
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/ask" className="hover:text-white transition-colors flex items-center gap-1 text-[#ff6b00]">
                  <span>Ask AI Assistant</span>
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-white transition-colors">
                  Sources & Research
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About the Project
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Pricing Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Disclaimer & Pricing Note */}
        <div className="pt-8 border-t border-[#1f1f1f] text-[11px] text-[#707070] space-y-2">
          <p>
            Unless stated otherwise, prices are US East (N. Virginia) on-demand list prices observed in 2025–2026. AWS changes prices and launches features continuously; all figures should be verified on official AWS pricing pages. Content reviewed quarterly and after every re:Invent.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <p>
              © 2026 awsmaxxing. Independent open-source research. Not affiliated with, sponsored by, or endorsed by Amazon Web Services, Inc. (AWS).
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="text-[#a1a1a1]">Built with Vercel aesthetic discipline</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
