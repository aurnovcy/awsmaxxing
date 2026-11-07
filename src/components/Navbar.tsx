import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sparkles, Menu, X } from 'lucide-react';

interface Props {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Playbooks', href: '/playbooks/startup-30-day-plan' },
    { label: 'Tips Library', href: '/tips' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Dashboards', href: '/dashboards' },
    { label: 'KPIs', href: '/kpis' },
  ];

  const isActive = (href: string) => {
    if (href === '/playbooks/startup-30-day-plan') {
      return location.pathname.startsWith('/playbooks');
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-md border-b border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no clutter) */}
        <Link
          to="/"
          className="text-base font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="font-mono text-[#ff6b00]">&gt;</span>
          <span>awsmaxxing</span>
        </Link>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#a1a1a1]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                isActive(link.href) ? 'text-white font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/whats-new"
            className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              location.pathname === '/whats-new' ? 'text-white font-semibold' : ''
            }`}
          >
            <span>What's New</span>
          </Link>
        </nav>

        {/* Zone 3: Search ⌘K & Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#111111] border border-[#1f1f1f] text-xs text-[#a1a1a1] hover:text-white hover:border-[#383838] transition-all whitespace-nowrap"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline font-mono text-[10px] bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#707070] border border-[#262626]">
              ⌘K
            </kbd>
          </button>

          <Link
            to="/ask"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white text-black hover:bg-[#ededed] transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Ask AI</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-[#a1a1a1] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1f1f1f] bg-[#0a0a0a] px-4 py-3 space-y-2 text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#ededed] hover:text-[#ff6b00]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/whats-new"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#ededed] hover:text-[#ff6b00]"
          >
            What's New (Changelog)
          </Link>
          <Link
            to="/maturity-model"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#ededed] hover:text-[#ff6b00]"
          >
            Maturity Model Self-Assessment
          </Link>
          <Link
            to="/sources"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#ededed] hover:text-[#ff6b00]"
          >
            Sources & Research
          </Link>
        </div>
      )}
    </header>
  );
};
