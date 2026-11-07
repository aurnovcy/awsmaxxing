import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

// Pages
import { HomePage } from './pages/HomePage';
import { PlaybookPage } from './pages/PlaybookPage';
import { TipsPage } from './pages/TipsPage';
import { TipDetailPage } from './pages/TipDetailPage';
import { CalculatorsIndexPage } from './pages/CalculatorsIndexPage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { DashboardDetailPage } from './pages/DashboardDetailPage';
import { KpisPage } from './pages/KpisPage';
import { WhatsNewPage } from './pages/WhatsNewPage';
import { MaturityModelPage } from './pages/MaturityModelPage';
import { AskAssistantPage } from './pages/AskAssistantPage';
import { AudiencePage } from './pages/AudiencePage';
import { SourcesPage } from './pages/SourcesPage';
import { AboutPage } from './pages/AboutPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-[#ededed] flex flex-col font-sans selection:bg-[#ff6b00]/25 selection:text-[#ff6b00]">
        <Navbar onOpenSearch={() => setSearchOpen(true)} />
        
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Playbooks */}
            <Route path="/playbooks/:slug" element={<PlaybookPage />} />
            
            {/* Tips Library */}
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/tips/:idSlug" element={<TipDetailPage />} />
            
            {/* Calculators */}
            <Route path="/calculators" element={<CalculatorsIndexPage />} />
            <Route path="/calculators/:slug" element={<CalculatorDetailPage />} />
            
            {/* Dashboards */}
            <Route path="/dashboards" element={<DashboardsPage />} />
            <Route path="/dashboards/:idSlug" element={<DashboardDetailPage />} />
            
            {/* KPIs Glossary */}
            <Route path="/kpis" element={<KpisPage />} />
            
            {/* What's New & Changelog */}
            <Route path="/whats-new" element={<WhatsNewPage />} />
            
            {/* Maturity Model & Quiz */}
            <Route path="/maturity-model" element={<MaturityModelPage />} />
            
            {/* Gemini-Powered Assistant */}
            <Route path="/ask" element={<AskAssistantPage />} />
            
            {/* Programmatic Audience Landing Pages */}
            <Route path="/for/startups" element={<AudiencePage audienceOverride="startup" />} />
            <Route path="/for/scale-ups" element={<AudiencePage audienceOverride="scaleup" />} />
            <Route path="/for/enterprises" element={<AudiencePage audienceOverride="enterprise" />} />
            <Route path="/for/:audienceKey" element={<AudiencePage />} />
            
            {/* Editorial & Verification */}
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
