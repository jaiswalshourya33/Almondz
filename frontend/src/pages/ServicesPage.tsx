import React, { useState } from 'react';
import { SERVICES, Service } from '../data/services';
import { Wrench, CheckCircle2, ArrowRight, Eye, X, Download, ShieldCheck, Layers, FileText, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownloadBrochure = (title: string) => {
    setDownloadNotice(title);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero Header */}
      <section className="bg-[#0D1B2A] text-white py-20 relative overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18f02f8?auto=format&fit=crop&w=2000&q=85" 
            alt="Engineering background"
            className="w-full h-full object-cover transform scale-105 animate-pulse duration-10000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-[#071A2D]/80 z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2834C]"></span>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">PROFESSIONAL MASTERY & CONSULTANCY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
              End-to-End <span className="text-[#F2834C] italic font-medium">Infrastructure</span> Solutions
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              From techno-economic feasibility and independent lender engineering to detailed design and real-time execution oversight, we deliver elite consultancy across national infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0D1B2A] text-white px-6 py-4 border border-[#F2834C] shadow-2xl flex items-center gap-3 animate-fade-in rounded-md">
          <CheckCircle2 className="w-5 h-5 text-[#F2834C]" />
          <div>
            <p className="text-xs font-mono font-bold">SERVICE BROCHURE DOWNLOADED</p>
            <p className="text-xs text-white/80">{downloadNotice} documentation PDF saved.</p>
          </div>
        </div>
      )}

      {/* Scrolling Ticker / Highlights */}
      <div className="bg-[#0D1B2A] text-white/90 border-b border-[#A49150]/20 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 animate-marquee text-xs font-mono tracking-wider">
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F2834C]" /> Specialised Infrastructure Consultancy Services</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F2834C]" /> ISO 9001:2015 Certified Quality Management</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#F2834C]" /> Technical, financial and transaction advisory expertise</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#F2834C]" /> Multidisciplinary Expert Panels</span>
        </div>
      </div>

      {/* SERVICES SHOWCASE SECTION */}
      <section className="dropdown-scroll-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#A49150]/20 gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">CORE CAPABILITIES</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0D1B2A] mt-1">Our Professional Divisions</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#1c1c15]/70 max-w-md">
              Hover over cards to preview core deliverables. Click any service to inspect comprehensive methodologies and download official service briefs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div 
                key={service.id}
                className="bg-white border border-[#A49150]/30 rounded-md overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#F2834C] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                {/* Image & Overlay Banner */}
                <div className="relative h-56 overflow-hidden bg-[#0D1B2A]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono bg-[#0D1B2A]/80 backdrop-blur-md text-[#F2834C] border border-[#A49150]/40 px-3 py-1 rounded font-bold uppercase tracking-widest">
                      Division #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#F2834C] transition-colors leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <p className="text-xs sm:text-sm text-[#1c1c15]/75 leading-relaxed font-light">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <span className="text-[10px] font-mono tracking-wider text-[#A49150] uppercase block font-bold">Key Deliverables Preview:</span>
                    <ul className="space-y-1.5">
                      {service.deliverables.slice(0, 2).map((del, dIdx) => (
                        <li key={dIdx} className="text-xs text-[#1c1c15]/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C] shrink-0" />
                          <span className="truncate">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex-1 bg-[#0D1B2A] hover:bg-[#1a2f45] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md group-hover:bg-[#F2834C]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#F2834C] group-hover:text-white transition-colors" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleDownloadBrochure(service.title)}
                      className="p-2.5 bg-[#fdf9ed] hover:bg-[#A49150]/20 text-[#0D1B2A] border border-[#A49150]/30 transition-all duration-300 rounded-md hover:border-[#0D1B2A]"
                      title="Download PDF Brief"
                      aria-label="Download PDF Brief"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* DETAILED SERVICE MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-[#A49150] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative rounded-md flex flex-col gap-6">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#0D1B2A] bg-gray-100 hover:bg-gray-200 transition-colors rounded-md z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Image */}
            <div className="relative h-72 rounded-lg overflow-hidden bg-[#0D1B2A] border border-[#A49150]/30 shadow-md">
              <img 
                src={selectedService.image} 
                alt={selectedService.title}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/30 to-transparent"></div>
              <div className="absolute top-4 right-4 z-10 bg-[#0D1B2A]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#A49150]/40 text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">
                ISO 9001:2015 Verified
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-mono text-[#F2834C] tracking-widest uppercase bg-black/60 px-3 py-1 rounded border border-[#A49150]/30 font-bold inline-block mb-2">
                  TECHNICAL SERVICE DOSSIER
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight drop-shadow-md">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Content & Rich Details */}
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-[#fdf9ed] p-5 border border-[#A49150]/30 rounded-lg">
                <h4 className="text-xs font-mono tracking-wider text-[#F2834C] uppercase font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F2834C]" />
                  Executive Summary & Scope
                </h4>
                <p className="text-sm text-[#1c1c15]/90 leading-relaxed font-light">
                  {selectedService.description}
                </p>
              </div>

              {/* Methodology & Execution Framework */}
              <div>
                <h4 className="text-xs font-mono tracking-wider text-[#0D1B2A] uppercase font-bold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#A49150]" />
                  Methodology & Execution Framework
                </h4>
                <p className="text-xs sm:text-sm text-[#1c1c15]/80 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {selectedService.methodology}
                </p>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono tracking-wider text-[#A49150] uppercase font-bold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#F2834C]" />
                  Complete Deliverables & Reports
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 bg-white p-3.5 rounded-lg border border-[#A49150]/20 shadow-sm hover:border-[#F2834C] transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-[#0D1B2A]">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Assurance Meta */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-center">
                <div className="bg-[#0D1B2A]/5 p-3 rounded-lg border border-[#A49150]/20">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Standard</span>
                  <span className="text-xs font-bold text-[#0D1B2A] font-mono">ISO Certified</span>
                </div>
                <div className="bg-[#0D1B2A]/5 p-3 rounded-lg border border-[#A49150]/20">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Expertise</span>
                  <span className="text-xs font-bold text-[#0D1B2A] font-mono">Tier-1 Engineers</span>
                </div>
                <div className="bg-[#0D1B2A]/5 p-3 rounded-lg border border-[#A49150]/20">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block">Turnaround</span>
                  <span className="text-xs font-bold text-[#0D1B2A] font-mono">Milestone Driven</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#0D1B2A] text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-md"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  handleDownloadBrochure(selectedService.title);
                  setSelectedService(null);
                }}
                className="px-6 py-2.5 bg-[#F2834C] hover:bg-[#d9723f] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 rounded-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Service Brief PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
