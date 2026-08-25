import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { ArrowLeft, CheckCircle2, Download, ShieldCheck, Award, FileText, Sparkles, Building2, ChevronRight, Check } from 'lucide-react';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'methodology' | 'compliance'>('overview');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (serviceTitle: string) => {
    setDownloadSuccess(serviceTitle);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-[#fdf9ed] pt-32 pb-20 text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 border border-[#A49150]/30 shadow-xl rounded-md">
          <div className="w-16 h-16 bg-[#0D1B2A] text-[#F2834C] mx-auto flex items-center justify-center rounded-full mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#0D1B2A]">Service Dossier Not Found</h2>
          <p className="text-xs text-[#1c1c15]/70 mt-2 mb-6">The requested engineering consultancy division could not be located or may have been updated.</p>
          <Link to="/services" className="inline-block bg-[#0D1B2A] hover:bg-[#F2834C] text-white px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 rounded-md">
            Return to All Services
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = SERVICES.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <div className="dropdown-content-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0D1B2A] text-white px-6 py-4 border border-[#F2834C] shadow-2xl flex items-center gap-3 animate-fade-in rounded-md">
          <CheckCircle2 className="w-5 h-5 text-[#F2834C]" />
          <div>
            <p className="text-xs font-mono font-bold">OFFICIAL DOSSIER DOWNLOAD</p>
            <p className="text-xs text-white/80">{downloadSuccess} PDF brief downloaded successfully.</p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-[#0D1B2A] text-white overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover opacity-30 transform scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-[#071A2D]/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-mono text-[#F2834C] hover:text-white transition-colors mb-6 bg-black/40 px-3 py-1.5 rounded border border-[#A49150]/30 w-fit">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ALL SERVICES</span>
          </Link>

          <div className="dropdown-banner-copy max-w-4xl flex flex-col gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono tracking-widest text-[#F2834C] uppercase bg-[#F2834C]/10 px-3 py-1 rounded border border-[#F2834C]/30 font-bold">
                ISO 9001:2015 CERTIFIED PRACTICE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase bg-white/10 px-3 py-1 rounded border border-white/20">
                EXPERT TECHNICAL ADVISORY
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {service.title}
            </h1>
            
            <p className="text-white/85 text-base sm:text-lg leading-relaxed font-light max-w-3xl">
              {service.description}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => handleDownload(service.title)}
                className="bg-[#F2834C] hover:bg-[#d9723f] text-white px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 rounded-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Service Brief PDF</span>
              </button>
              <Link
                to="/contact"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-sm rounded-md"
              >
                Request Specialist Proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="dropdown-scroll-content py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#A49150]/20 mb-12 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'overview', label: 'Executive Overview', icon: Sparkles },
              { id: 'deliverables', label: 'Key Deliverables', icon: FileText },
              { id: 'methodology', label: 'Execution Methodology', icon: ShieldCheck },
              { id: 'compliance', label: 'Compliance & Quality', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 text-xs font-mono font-bold uppercase transition-all whitespace-nowrap rounded-md ${
                    isActive 
                      ? 'bg-[#0D1B2A] text-white shadow-md border border-[#A49150]/40' 
                      : 'bg-white text-[#0D1B2A] hover:bg-[#A49150]/10 border border-[#A49150]/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2834C]' : 'text-[#A49150]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {activeTab === 'overview' && (
                <div className="bg-white border border-[#A49150]/30 p-8 sm:p-10 shadow-sm rounded-lg animate-fade-in space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md font-bold font-mono">
                      01
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">PRACTICE OVERVIEW</span>
                      <h3 className="text-2xl font-serif font-bold text-[#0D1B2A]">Comprehensive Scope & Objectives</h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#1c1c15]/85 leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="bg-[#fdf9ed] p-6 border border-[#A49150]/30 rounded-md space-y-4">
                    <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#F2834C]" />
                      Core Value Proposition for Asset Owners & Lenders
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1c1c15]/80 leading-relaxed">
                      Our interventions provide deep clarity on financial exposure, engineering integrity, and risk mitigation. We combine empirical testing with seasoned professional judgment to deliver actionable recommendations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                      <span className="text-xs font-mono text-gray-500 block uppercase">Audit Rigor</span>
                      <span className="text-sm font-bold text-[#0D1B2A] font-serif">100% Independent & Objective</span>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                      <span className="text-xs font-mono text-gray-500 block uppercase">Industry Benchmark</span>
                      <span className="text-sm font-bold text-[#0D1B2A] font-serif">Aligned with IRC & IS Codes</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'deliverables' && (
                <div className="bg-white border border-[#A49150]/30 p-8 sm:p-10 shadow-sm rounded-lg animate-fade-in space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md font-bold font-mono">
                      02
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">TANGIBLE OUTPUTS</span>
                      <h3 className="text-2xl font-serif font-bold text-[#0D1B2A]">Key Deliverables & Reports</h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1c1c15]/80 leading-relaxed">
                    Every project engagement concludes with verified, audited documentation designed for regulatory submission, lender review, or board approval.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 p-5 bg-[#fdf9ed] border border-[#A49150]/30 rounded-md hover:border-[#F2834C] transition-colors shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-bold text-[#0D1B2A] mb-1">Deliverable #{idx + 1}</h4>
                          <span className="text-xs font-medium text-[#1c1c15]/85">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'methodology' && (
                <div className="bg-white border border-[#A49150]/30 p-8 sm:p-10 shadow-sm rounded-lg animate-fade-in space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md font-bold font-mono">
                      03
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">ENGINEERING PROCESS</span>
                      <h3 className="text-2xl font-serif font-bold text-[#0D1B2A]">Execution Methodology</h3>
                    </div>
                  </div>

                  <div className="bg-[#0D1B2A] text-white p-6 sm:p-8 rounded-lg border border-[#A49150]/40 shadow-md space-y-4">
                    <h4 className="text-xs font-mono text-[#F2834C] uppercase tracking-widest font-bold">Core Approach</h4>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
                      {service.methodology}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider">Step-by-Step Engagement Protocol</h4>
                    <div className="space-y-3">
                      {[
                        "Phase 1: Initial scoping, data room access, and stakeholder alignment.",
                        "Phase 2: Field inspection, physical sampling, and non-destructive testing.",
                        "Phase 3: Data triangulation, variance analysis, and risk modeling.",
                        "Phase 4: Draft report issuance, client review workshop, and final certification."
                      ].map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                          <Check className="w-4 h-4 text-[#F2834C] shrink-0" />
                          <span className="text-xs font-medium text-[#0D1B2A]">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="bg-white border border-[#A49150]/30 p-8 sm:p-10 shadow-sm rounded-lg animate-fade-in space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md font-bold font-mono">
                      04
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">QUALITY ASSURANCE</span>
                      <h3 className="text-2xl font-serif font-bold text-[#0D1B2A]">Compliance & Accreditations</h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1c1c15]/80 leading-relaxed">
                    All services are performed under strict ISO 9001:2015 quality management protocols with independent peer reviews and compliance audit trails.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="bg-[#fdf9ed] p-5 border border-[#A49150]/30 rounded-md text-center">
                      <ShieldCheck className="w-8 h-8 text-[#F2834C] mx-auto mb-2" />
                      <h4 className="text-xs font-mono font-bold text-[#0D1B2A]">ISO 9001:2015</h4>
                      <p className="text-[11px] text-gray-600 mt-1">Certified Quality Systems</p>
                    </div>
                    <div className="bg-[#fdf9ed] p-5 border border-[#A49150]/30 rounded-md text-center">
                      <Award className="w-8 h-8 text-[#F2834C] mx-auto mb-2" />
                      <h4 className="text-xs font-mono font-bold text-[#0D1B2A]">Statutory Audit</h4>
                      <p className="text-[11px] text-gray-600 mt-1">Full Regulatory Compliance</p>
                    </div>
                    <div className="bg-[#fdf9ed] p-5 border border-[#A49150]/30 rounded-md text-center">
                      <Building2 className="w-8 h-8 text-[#F2834C] mx-auto mb-2" />
                      <h4 className="text-xs font-mono font-bold text-[#0D1B2A]">Panel Recognition</h4>
                      <p className="text-[11px] text-gray-600 mt-1">Empanelled with Top Banks</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
              
              {/* Proposal Box */}
              <div className="bg-white border border-[#A49150]/30 p-6 sm:p-8 shadow-sm rounded-lg flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F2834C]/10 text-[#F2834C] flex items-center justify-center rounded-md">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-[#0D1B2A]">Engage Our Specialists</h4>
                    <span className="text-[10px] font-mono text-[#A49150]">Direct Practice Inquiry</span>
                  </div>
                </div>

                <p className="text-xs text-[#1c1c15]/75 leading-relaxed">
                  Connect with our lead infrastructure consultants to discuss your project requirements or arrange an executive briefing.
                </p>

                <div className="space-y-3 pt-2">
                  <Link 
                    to="/contact" 
                    className="w-full bg-[#0D1B2A] hover:bg-[#F2834C] text-white py-3.5 px-4 text-center text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-md"
                  >
                    <span>Request Proposal</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDownload(service.title)}
                    className="w-full bg-[#fdf9ed] hover:bg-[#A49150]/20 text-[#0D1B2A] border border-[#A49150]/30 py-3.5 px-4 text-center text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Brief</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-4 text-[11px] font-mono text-gray-500 space-y-1">
                  <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#F2834C]" /> Confidentiality Guaranteed</p>
                  <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#F2834C]" /> Response within 24 Hours</p>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-[#0D1B2A] text-white p-6 sm:p-8 rounded-lg border border-[#A49150]/30 shadow-md">
                <h4 className="text-xs font-mono tracking-widest text-[#F2834C] uppercase mb-4 font-bold">Related Practices</h4>
                <div className="space-y-4">
                  {relatedServices.map((rel) => (
                    <Link 
                      key={rel.id} 
                      to={`/services/${rel.slug}`}
                      className="group block p-3 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors"
                    >
                      <h5 className="text-xs font-serif font-bold text-white group-hover:text-[#F2834C] transition-colors">{rel.title}</h5>
                      <p className="text-[11px] text-white/70 line-clamp-1 mt-1 font-light">{rel.shortDesc}</p>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
