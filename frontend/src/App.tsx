/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutOverview } from './pages/AboutOverview';
import { MissionVision } from './pages/MissionVision';
import { LeadershipPage } from './pages/LeadershipPage';
import { ClientsPartnersPage } from './pages/ClientsPartnersPage';
import { ManagementTeamPage } from './pages/ManagementTeamPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { CareersPage } from './pages/CareersPage';
import { SectorsPage } from './pages/SectorsPage';
import { SectorDetail } from './pages/SectorDetail';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetail } from './pages/ServiceDetail';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fdf9ed] text-[#1c1c15] font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutOverview />} />
            <Route path="/about/mission-vision" element={<MissionVision />} />
            <Route path="/about/leadership" element={<LeadershipPage />} />
            <Route path="/about/management-team" element={<ManagementTeamPage />} />
            <Route path="/about/clients" element={<ManagementTeamPage />} />
            <Route path="/about/certifications" element={<CertificationsPage />} />
            <Route path="/about/careers" element={<CareersPage />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/sectors/:slug" element={<SectorDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:filter" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

