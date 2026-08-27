import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { Wrench, CheckCircle2, Eye, X, Download, ShieldCheck, Layers, FileText, Award, Clock } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDownloadBrochure = (title: string) => {
    setDownloadNotice(title);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  // Navbar dropdown / homepage cards link here with ?service=<slug> instead of
  // a separate per-service page — scroll to that card and open its dialog.
  useEffect(() => {
    const slug = searchParams.get('service');
    if (!slug) return;
    const target = SERVICES.find((srv) => srv.slug === slug);
    if (!target) return;
    const cardEl = document.getElementById(`service-card-${slug}`);
    cardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setSelectedService(target);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('service');
      return next;
    }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!selectedService) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedService]);

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Hero Header */}
      <section className="bg-[#16283D] text-white py-20 relative overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18f02f8?auto=format&fit=crop&w=2000&q=85" 
            alt="Engineering background"
            className="w-full h-full object-cover transform scale-105 animate-pulse duration-10000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#16283D] via-[#16283D]/90 to-[#071A2D]/80 z-10"></div>

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
        <div className="fixed bottom-8 right-8 z-50 bg-[#16283D] text-white px-6 py-4 border border-[#F2834C] shadow-2xl flex items-center gap-3 animate-fade-in rounded-md">
          <CheckCircle2 className="w-5 h-5 text-[#F2834C]" />
          <div>
            <p className="text-xs font-mono font-bold">SERVICE BROCHURE DOWNLOADED</p>
            <p className="text-xs text-white/80">{downloadNotice} documentation PDF saved.</p>
          </div>
        </div>
      )}

      {/* Scrolling Ticker / Highlights */}
      <div className="bg-[#16283D] text-white/90 border-b border-[#A49150]/20 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 animate-marquee text-xs font-mono tracking-wider">
          <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#F2834C]" /> Specialised Infrastructure Consultancy Services</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#F2834C]" /> ISO 9001:2015 Certified Quality Management</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-[#F2834C]" /> Technical, financial and transaction advisory expertise</span>
          <span className="text-[#F2834C]">•</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#F2834C]" /> Multidisciplinary Expert Panels</span>
        </div>
      </div>

      {/* SERVICES SHOWCASE SECTION */}
      <section className="dropdown-scroll-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 pb-6 border-b border-[#A49150]/20">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">CORE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#16283D] mt-1">Our Professional Divisions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                id={`service-card-${service.slug}`}
                className="bg-white border border-[#A49150]/30 rounded-md overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#F2834C] transition-all duration-500 flex flex-col justify-between group hover:-translate-y-1.5 scroll-mt-28"
              >
                {/* Image & Overlay Banner */}
                <div className="relative h-56 overflow-hidden bg-[#16283D]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16283D] via-[#16283D]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono bg-[#16283D]/80 backdrop-blur-md text-[#F2834C] border border-[#A49150]/40 px-3 py-1 rounded font-bold uppercase tracking-widest">
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

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex-1 bg-[#16283D] hover:bg-[#1a2f45] text-white py-2.5 px-4 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md shadow hover:shadow-md group-hover:bg-[#F2834C]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#F2834C] group-hover:text-white transition-colors" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleDownloadBrochure(service.title)}
                      className="p-2.5 bg-[#fdf9ed] hover:bg-[#A49150]/20 text-[#16283D] border border-[#A49150]/30 transition-all duration-300 rounded-md hover:border-[#16283D]"
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
        <div key={selectedService.id} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#16283D]/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-6xl md:h-[85vh] max-h-[92vh] rounded-3xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 z-20 p-2.5 bg-white/95 hover:bg-white text-[#16283D] rounded-full shadow-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: thumbnail image, slides in from the left on open */}
            <div className="service-modal-image-panel relative w-full h-56 md:h-full md:w-[42%] shrink-0 overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16283D]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#16283D]/15"></div>
            </div>

            {/* Right: content, slides in from the right on open */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="service-modal-content-panel flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col gap-7">
                <div>
                  <span className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#F2834C] bg-[#F2834C]/10 border border-[#F2834C]/20 px-3 py-1.5 rounded-full mb-3">
                    <Wrench className="w-3.5 h-3.5" />
                    Service
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-[#1c1c15]/70 text-sm sm:text-base mt-2 leading-relaxed">
                    {selectedService.shortDesc}
                  </p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-[#fdf9ed] rounded-2xl p-4 border border-[#A49150]/15">
                    <div className="w-10 h-10 rounded-xl bg-[#F2834C]/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-[#F2834C]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#1c1c15]/50">Standard</p>
                      <p className="text-sm font-semibold text-[#16283D]">ISO Certified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#fdf9ed] rounded-2xl p-4 border border-[#A49150]/15">
                    <div className="w-10 h-10 rounded-xl bg-[#16283D]/8 flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5 text-[#16283D]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#1c1c15]/50">Expertise</p>
                      <p className="text-sm font-semibold text-[#16283D]">Tier-1 Engineers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-[#fdf9ed] rounded-2xl p-4 border border-[#A49150]/15">
                    <div className="w-10 h-10 rounded-xl bg-[#A49150]/15 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#A49150]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#1c1c15]/50">Turnaround</p>
                      <p className="text-sm font-semibold text-[#16283D]">Milestone Driven</p>
                    </div>
                  </div>
                </div>

                {/* Scope of Work */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2834C]/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#F2834C]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#16283D]">Scope of Work</h4>
                  </div>
                  <p className="text-sm text-[#1c1c15]/70 leading-relaxed">{selectedService.description}</p>
                </div>

                {/* Methodology */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#16283D]/8 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[#16283D]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#16283D]">How We Deliver It</h4>
                  </div>
                  <p className="text-sm text-[#1c1c15]/70 leading-relaxed">{selectedService.methodology}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#A49150]/15 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[#A49150]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#16283D]">What You Get</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-3 bg-[#fdf9ed] rounded-xl p-3.5 border border-[#A49150]/15 hover:border-[#F2834C]/40 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#F2834C] shrink-0" />
                        <span className="text-sm text-[#16283D]">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 px-6 sm:px-10 py-5 border-t border-gray-100 bg-[#fdf9ed]/50 shrink-0">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-sm font-medium text-[#16283D] hover:bg-gray-100 rounded-full transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownloadBrochure(selectedService.title);
                    setSelectedService(null);
                  }}
                  className="px-6 py-2.5 bg-[#F2834C] hover:bg-[#d9723f] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg flex items-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Service Brief</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
