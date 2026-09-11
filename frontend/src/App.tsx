/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutOverview } from './pages/AboutOverview';
import { MissionVision } from './pages/MissionVision';
import { LeadershipPage } from './pages/LeadershipPage';
import { ManagementTeamPage } from './pages/ManagementTeamPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { CareersPage } from './pages/CareersPage';
import { SectorsPage } from './pages/SectorsPage';
import { SectorDetail } from './pages/SectorDetail';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { CorporateGovernancePage } from './pages/CorporateGovernancePage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Keyed by pathname so every navigation fully remounts the page component (its
 * whole subtree included). That re-runs every mount effect, so all
 * scroll-triggered / entrance animations replay on each visit — even between
 * two URLs that render the same component (e.g. /sectors/roads → /sectors/water).
 * Query-string-only changes keep the same key, so filter/search UIs aren't reset.
 */
function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <React.Fragment key={pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutOverview />} />
        <Route path="/about/mission-vision" element={<MissionVision />} />
        <Route path="/about/leadership" element={<LeadershipPage />} />
        <Route path="/about/management-team" element={<ManagementTeamPage />} />
        <Route path="/about/certifications" element={<CertificationsPage />} />
        <Route path="/about/careers" element={<CareersPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/sectors/:slug" element={<SectorDetail />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:filter" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/corporate-governance/:slug" element={<CorporateGovernancePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F1F3F5] text-[#2B4A6D] font-sans">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

