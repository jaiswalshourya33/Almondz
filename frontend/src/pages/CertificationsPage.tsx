import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CERTIFICATIONS, EMPANELMENTS, Certification } from '../data/certifications';
import { Award, ShieldCheck, Eye, X, Building2, ArrowRight } from 'lucide-react';

export const CertificationsPage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero Header */}
      <section className="bg-[#0D1B2A] text-white py-16 sm:py-20 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="about-dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">QUALITY ASSURANCE & ACCREDITATIONS</span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Certifications & Institutional Empanelments</h1>
            <p className="text-white/80 text-base leading-relaxed">
              Rigorous quality management systems, international ISO accreditations, and premier institutional empanelments backing every infrastructure consultancy deliverable.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className="about-dropdown-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#A49150]/20">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">ISO & COMPLIANCE</span>
              <h2 className="text-3xl font-serif font-bold text-[#0D1B2A] mt-1">Accredited Quality Standards</h2>
            </div>
            <p className="text-xs text-[#1c1c15]/70 max-w-md mt-2 md:mt-0">
              Click any certification card to view verified compliance credentials, audit scopes, and official accreditation certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#A49150]/30 p-6 shadow-sm flex flex-col justify-between hover:border-[#F2834C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-full aspect-[4/3] bg-[#fdf9ed] border border-[#A49150]/20 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#0D1B2A] group-hover:text-[#F2834C] transition-colors leading-snug">{cert.title}</h3>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full bg-[#0D1B2A] hover:bg-[#1a2f45] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#F2834C]" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL EMPANELMENTS SECTION */}
      <section className="py-20 bg-[#0D1B2A]/5 border-t border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">GOVERNMENT & MULTILATERAL RECOGNITION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-2">Institutional Empanelments</h2>
            <p className="text-xs sm:text-sm text-[#1c1c15]/70 mt-3 leading-relaxed">
              Almondz Global Infra-Consultant Limited is officially empanelled as an independent engineer, technical advisor, and design consultant with premier national and international authorities — spanning central government bodies, state governments and development authorities, and national scheduled banks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EMPANELMENTS.map((emp, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#A49150]/30 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 rounded-md flex flex-col justify-between group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F2834C]/10 text-[#F2834C] flex items-center justify-center rounded-md font-mono font-bold text-xs shrink-0 group-hover:bg-[#F2834C] group-hover:text-white transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-serif font-bold text-[#0D1B2A]">{emp.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-[#F2834C]" />
                    </div>
                    <p className="text-xs text-[#1c1c15]/70 mt-2 leading-relaxed">{emp.desc}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-mono text-[#A49150]">
                  <span>STATUS: ACTIVE & VERIFIED</span>
                  <span className="text-[#0D1B2A] font-bold">EMPANELLED PARTNER</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/about/clients"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#1a2f45] text-white px-6 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md"
            >
              View All Empanelments & Clients
              <ArrowRight className="w-3.5 h-3.5 text-[#F2834C]" />
            </Link>
          </div>
        </div>
      </section>

      {/* CERTIFICATE VIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#A49150] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative rounded-md flex flex-col gap-6">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#0D1B2A] bg-gray-100 hover:bg-gray-200 transition-colors rounded-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#A49150]/20 pb-4">
              <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#F2834C] tracking-widest uppercase">OFFICIAL ACCREDITATION CERTIFICATE</span>
                <h3 className="text-xl font-serif font-bold text-[#0D1B2A]">{selectedCert.title}</h3>
              </div>
            </div>

            {/* Original Certificate Image — a fixed-height preview box (not tied to
                the image's own resolution) so every certificate previews at the
                same, standard size. object-contain scales the image down (or up)
                to fit fully within the box with no cropping; shrink-0 stops the
                flex-column modal from squeezing this box smaller than h-[65vh]. */}
            <div className="bg-[#fdf9ed] border border-[#A49150]/30 rounded-md overflow-hidden flex items-center justify-center shrink-0 h-[65vh]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0D1B2A] text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
