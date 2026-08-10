import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building2, Sparkles, ShieldCheck, Clock, ArrowRight, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'headquarters' | 'regional' | 'leadership'>('headquarters');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Independent Engineering',
    sector: 'Highways & Tunnels',
    message: ''
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const regionalOffices = [
    { city: "Mumbai (Western Region)", address: "Maker Chambers III, Nariman Point, Mumbai - 400021", phone: "+91 (22) 2282-1200", email: "mumbai@almondzglobalinfra.com" },
    { city: "Bengaluru (Southern Region)", address: "Prestige Meridian, MG Road, Bengaluru - 560001", phone: "+91 (80) 4123-5600", email: "bengaluru@almondzglobalinfra.com" },
    { city: "Hyderabad (Telangana Cell)", address: "Cyber Towers, HITECH City, Hyderabad - 500081", phone: "+91 (40) 2311-8900", email: "hyderabad@almondzglobalinfra.com" },
    { city: "Kolkata (Eastern Region)", address: "Camac Square, Park Street, Kolkata - 700016", phone: "+91 (33) 2287-4500", email: "kolkata@almondzglobalinfra.com" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Toast Notification */}
      {copiedField && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#0D1B2A] text-white px-6 py-4 border border-[#F2834C] shadow-2xl flex items-center gap-3 animate-fade-in rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-[#F2834C]" />
          <div>
            <p className="text-xs font-mono font-bold">COPIED TO CLIPBOARD</p>
            <p className="text-xs text-white/80">{copiedField} copied successfully.</p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-[#0D1B2A] text-white py-20 relative overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85" 
            alt="Corporate architecture"
            className="w-full h-full object-cover transform scale-105 animate-pulse duration-10000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/90 to-[#071A2D]/80 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#A49150_1px,transparent_1px)] [background-size:28px_28px] opacity-10 z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2834C]"></span>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">STRATEGIC LIAISON & ADVISORY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
              Connect With Our <span className="text-[#F2834C] italic font-medium">Experts</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed font-light">
              Engage our principal engineering divisions, corporate headquarters, or regional technical directorates for institutional mandates and independent engineering assignments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Cards & Regional Offices */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Tabs for Office Types */}
              <div className="flex bg-[#0D1B2A] p-1.5 rounded-lg border border-[#A49150]/30 shadow-md">
                <button
                  onClick={() => setActiveTab('headquarters')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'headquarters' ? 'bg-[#F2834C] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Headquarters
                </button>
                <button
                  onClick={() => setActiveTab('regional')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'regional' ? 'bg-[#F2834C] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Regional Hubs
                </button>
                <button
                  onClick={() => setActiveTab('leadership')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'leadership' ? 'bg-[#F2834C] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Governance
                </button>
              </div>

              {/* Headquarters Tab Content */}
              {activeTab === 'headquarters' && (
                <div className="bg-[#0D1B2A] text-white p-8 rounded-lg border border-[#A49150]/40 shadow-xl flex flex-col gap-6 animate-fade-in group hover:border-[#F2834C] transition-all duration-500">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F2834C]/20 text-[#F2834C] flex items-center justify-center rounded-md border border-[#F2834C]/30">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">CORPORATE HQ</span>
                        <h3 className="text-xl font-serif font-bold text-white">New Delhi, India</h3>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-white/10 text-white/80 px-2.5 py-1 rounded">ISO 9001:2015</span>
                  </div>

                  <div className="space-y-4">
                    <div 
                      onClick={() => handleCopy("Plot No. 16, F Block, NH-8, Aerocity, New Delhi - 110037, India", "HQ Address")}
                      className="flex items-start gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <MapPin className="w-5 h-5 text-[#F2834C] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Registered Address</span>
                        <span className="text-white">Plot No. 16, F Block, NH-8, Aerocity, New Delhi - 110037, India</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleCopy("+91 (11) 4350-0700", "Phone Number")}
                      className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <Phone className="w-5 h-5 text-[#F2834C] shrink-0 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Corporate Exchange</span>
                        <span className="text-white">+91 (11) 4350-0700 / 0800</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => handleCopy("contact@almondzglobalinfra.com", "Email Address")}
                      className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <Mail className="w-5 h-5 text-[#F2834C] shrink-0 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Official Email</span>
                        <span className="text-white">contact@almondzglobalinfra.com</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3.5 bg-white/5 rounded-md border border-white/10">
                      <Clock className="w-5 h-5 text-[#F2834C] shrink-0" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Business Hours</span>
                        <span className="text-white">Monday – Friday: 09:30 AM – 06:30 PM IST</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-[#F2834C] flex items-center justify-between">
                    <span>Click any field to copy</span>
                    <Globe className="w-4 h-4 animate-spin duration-3000" />
                  </div>
                </div>
              )}

              {/* Regional Hubs Tab Content */}
              {activeTab === 'regional' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  {regionalOffices.map((office, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleCopy(`${office.city} - ${office.address}, Phone: ${office.phone}`, office.city)}
                      className="bg-white p-5 rounded-lg border border-[#A49150]/30 shadow-sm hover:border-[#F2834C] hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#F2834C] group-hover:scale-110 transition-transform" />
                          {office.city}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Active Cell</span>
                      </div>
                      <p className="text-xs text-[#1c1c15]/80 font-light mb-2">{office.address}</p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#A49150] pt-2 border-t border-gray-100">
                        <span>{office.phone}</span>
                        <span className="group-hover:text-[#F2834C] transition-colors">Click to copy →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Governance & Investor Relations Tab Content */}
              {activeTab === 'leadership' && (
                <div className="bg-white p-8 rounded-lg border border-[#A49150]/30 shadow-sm animate-fade-in space-y-6">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-md">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">COMPLIANCE & IR</span>
                      <h3 className="text-lg font-serif font-bold text-[#0D1B2A]">Secretarial Directorate</h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#1c1c15]/80 leading-relaxed font-light">
                    For institutional investor queries, regulatory filings, BSE/NSE disclosures, and board secretariat correspondence:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-[#fdf9ed] rounded-md border border-[#A49150]/30">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Compliance Officer</span>
                      <span className="text-xs font-bold text-[#0D1B2A]">cs@almondzglobalinfra.com</span>
                    </div>
                    <div className="p-3.5 bg-[#fdf9ed] rounded-md border border-[#A49150]/30">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block">Investor Relations Desk</span>
                      <span className="text-xs font-bold text-[#0D1B2A]">investors@almondzglobalinfra.com</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security & Quality Badge Card */}
              <div className="bg-[#fdf9ed] p-6 rounded-lg border border-[#A49150]/40 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#0D1B2A] text-[#F2834C] flex items-center justify-center rounded-full shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">100% Confidential Mandates</h4>
                  <p className="text-xs text-[#1c1c15]/75 mt-0.5">All technical audits, TEV studies, and DPR submissions are governed by strict NDAs.</p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-white border border-[#A49150]/30 p-8 sm:p-12 shadow-xl rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2834C]/5 rounded-bl-full pointer-events-none"></div>

              {submitted ? (
                <div className="py-20 text-center flex flex-col items-center gap-6 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#F2834C] uppercase tracking-widest font-bold">TRANSMISSION SUCCESSFUL</span>
                    <h3 className="text-3xl font-serif font-bold text-[#0D1B2A]">Consultancy Dossier Dispatched</h3>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                      Thank you, <strong className="text-[#0D1B2A]">{formData.name}</strong>. Our principal infrastructure practice director for <strong className="text-[#0D1B2A]">{formData.sector}</strong> has been assigned to your mandate. Expect a secure briefing within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { 
                      setSubmitted(false); 
                      setFormData({ name: '', email: '', phone: '', organization: '', inquiryType: 'Independent Engineering', sector: 'Highways & Tunnels', message: '' }); 
                    }}
                    className="mt-4 bg-[#0D1B2A] hover:bg-[#F2834C] text-white px-8 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-md"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#F2834C] uppercase font-bold">SECURE SUBMISSION</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D1B2A] mt-1">Initiate Consultancy Inquiry</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-1">Complete the briefing details below for direct routing to our practice leads.</p>
                  </div>

                  {/* Inquiry Type Selector Pills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Inquiry Category *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Independent Engineering', 'Lender\'s Engineer', 'TEV & Advisory', 'Project Supervision'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`py-2 px-3 text-[11px] font-mono font-bold uppercase transition-all rounded-md border ${
                            formData.inquiryType === type 
                              ? 'bg-[#0D1B2A] text-white border-[#0D1B2A] shadow' 
                              : 'bg-[#fdf9ed] text-[#0D1B2A] border-[#A49150]/30 hover:border-[#F2834C]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Shri / Mr. / Dr. ..."
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Organization / Authority</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="NHAI / Bank / Private Concessionaire"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Sector of Infrastructure *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors cursor-pointer"
                    >
                      <option>Smart Cities & Urban Infrastructure</option>
                      <option>Roads, Bridges, Highways & Tunnels</option>
                      <option>Water & Waste Water</option>
                      <option>Railways & Metro Rail</option>
                      <option>Energy & Power</option>
                      <option>Ports & Logistics</option>
                      <option>Airport & Aviation</option>
                      <option>Financial & Transaction Advisory</option>
                      <option>SIT (Ropeways & Tourism)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#0D1B2A] uppercase">Mandate Description / Scope *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe project capacity, estimated outlay, technical audit requirements, or financial appraisal scope..."
                      className="bg-[#fdf9ed] border border-[#A49150]/30 p-4 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group bg-[#F2834C] hover:bg-[#d9723f] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>TRANSMIT CONSULTANCY BRIEFING</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </button>

                  <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> 256-bit Encrypted</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> ISO 9001 Audited</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> 24hr SLA</span>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
