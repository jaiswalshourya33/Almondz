import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building2, ArrowRight } from 'lucide-react';
import { SECTORS } from '../data/sectors';

interface ContactNavState {
  formType?: 'inquiry' | 'vendor' | 'career';
  position?: string;
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state ?? {}) as ContactNavState;

  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'headquarters' | 'regional' | 'leadership'>('headquarters');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeFormType, setActiveFormType] = useState<'inquiry' | 'vendor' | 'career'>(navState.formType ?? 'inquiry');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Independent Engineering',
    sector: SECTORS[0].title,
    message: ''
  });
  const [vendorFormData, setVendorFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    vendorCategory: 'Materials Supplier',
    gstNumber: '',
    yearsInOperation: '',
    message: ''
  });
  const [careerFormData, setCareerFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: navState.position ?? '',
    experience: '',
    portfolio: '',
    resumeFileName: '',
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

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const selectFormType = (type: 'inquiry' | 'vendor' | 'career') => {
    setActiveFormType(type);
    setSubmitted(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    if (activeFormType === 'inquiry') {
      setFormData({ name: '', email: '', phone: '', organization: '', inquiryType: 'Independent Engineering', sector: SECTORS[0].title, message: '' });
    } else if (activeFormType === 'vendor') {
      setVendorFormData({ companyName: '', contactPerson: '', email: '', phone: '', vendorCategory: 'Materials Supplier', gstNumber: '', yearsInOperation: '', message: '' });
    } else {
      setCareerFormData({ name: '', email: '', phone: '', position: '', experience: '', portfolio: '', resumeFileName: '', message: '' });
    }
  };

  const regionalOffices = [
    { city: "Chennai", address: "51, Second Floor, CC Dhoni Arcade, No 5, Malaganthapuram 3rd Street, Jameen Pallavam, Chennai 43", phone: "+91-9443349796" },
    { city: "Jharkhand", address: "Plot no-25, Lohanchal Colony Biada, Bokaro steel city, Jharkhand -827012", phone: "+91-654-2255190" },
    { city: "Kerala", address: "Thiruvathira, KRA 47 TC 17/1676 (1), Kattu Road, Poojapura Thiruvanthapuram -695012", phone: "+91-471-2355630" },
    { city: "Mumbai", address: "Plot no - A-6, Sector-6 Near St. Joseph School, New Panvel East-410206", phone: "+91-22-2745320" },
    { city: "Rohtak", address: "R/O 134/29, Near Sagar Villa, Northern Bypass, Rohtak (Haryana) - 124001", phone: "+91-12-6227972" },
    { city: "Varanasi", address: "House no -195 Sanjay Nagar Paharia, Near Happy Model School Varanasi -221007", phone: "" },
  ];

  const corporateOffices = [
    { city: "Mumbai", address: "Level 5, Grande Palladium, 175, CST Road, Off BKC, Kalina, Santacruz (East), Mumbai - 400 098, Maharashtra, INDIA", phone: "+91-22-66437600, +91-22-67526699" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Toast Notification */}
      {copiedField && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#16283D] text-white px-6 py-4 border border-[#F2834C] shadow-2xl flex items-center gap-3 animate-fade-in rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-[#F2834C]" />
          <div>
            <p className="text-xs font-mono font-bold">COPIED TO CLIPBOARD</p>
            <p className="text-xs text-white/80">{copiedField} copied successfully.</p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-[#16283D] text-white py-20 relative overflow-hidden border-b border-[#A49150]/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85" 
            alt="Corporate architecture"
            className="w-full h-full object-cover transform scale-105 animate-pulse duration-10000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#16283D] via-[#16283D]/90 to-[#071A2D]/80 z-10"></div>

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
              <div className="flex bg-[#16283D] p-1.5 rounded-lg border border-[#A49150]/30 shadow-md">
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
                  Project Offices
                </button>
                <button
                  onClick={() => setActiveTab('leadership')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'leadership' ? 'bg-[#F2834C] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Corporate Offices
                </button>
              </div>

              {/* Headquarters Tab Content */}
              {activeTab === 'headquarters' && (
                <div className="bg-[#16283D] text-white p-8 rounded-lg border border-[#A49150]/40 shadow-xl flex flex-col gap-6 animate-fade-in group hover:border-[#F2834C] transition-all duration-500">
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
                      onClick={() => handleCopy("F-33/3 Okhla Industrial Area, Phase-II, New Delhi-110020, INDIA", "HQ Address")}
                      className="flex items-start gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <MapPin className="w-5 h-5 text-[#F2834C] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Registered Address</span>
                        <span className="text-white">F-33/3 Okhla Industrial Area, Phase-II, New Delhi-110020, INDIA</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCopy("+91-11-43500700, +91-11-43500734", "Phone Number")}
                      className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <Phone className="w-5 h-5 text-[#F2834C] shrink-0 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Corporate Exchange</span>
                        <span className="text-white">+91-11-43500700, +91-11-43500734</span>
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
                  </div>
                </div>
              )}

              {/* Project Offices Tab Content */}
              {activeTab === 'regional' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  {regionalOffices.map((office, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopy(office.phone ? `${office.city} - ${office.address}, Phone: ${office.phone}` : `${office.city} - ${office.address}`, office.city)}
                      className="bg-white p-5 rounded-lg border border-[#A49150]/30 shadow-sm hover:border-[#F2834C] hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono font-bold text-[#16283D] uppercase flex items-center gap-2">
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

              {/* Corporate Offices Tab Content */}
              {activeTab === 'leadership' && (
                <div className="flex flex-col gap-4 animate-fade-in">
                  {corporateOffices.map((office, idx) => (
                    <div
                      key={idx}
                      className="bg-[#16283D] text-white p-8 rounded-lg border border-[#A49150]/40 shadow-xl flex flex-col gap-6 group hover:border-[#F2834C] transition-all duration-500"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F2834C]/20 text-[#F2834C] flex items-center justify-center rounded-md border border-[#F2834C]/30">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-widest font-bold">CORPORATE OFFICE</span>
                            <h3 className="text-xl font-serif font-bold text-white">{office.city}, India</h3>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div
                          onClick={() => handleCopy(office.address, `${office.city} Corporate Office Address`)}
                          className="flex items-start gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                        >
                          <MapPin className="w-5 h-5 text-[#F2834C] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <div className="flex-1 text-xs font-mono">
                            <span className="text-white/60 block text-[10px] uppercase">Registered Address</span>
                            <span className="text-white">{office.address}</span>
                          </div>
                        </div>

                        {office.phone && (
                          <div
                            onClick={() => handleCopy(office.phone, "Phone Number")}
                            className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                          >
                            <Phone className="w-5 h-5 text-[#F2834C] shrink-0 group-hover/item:scale-110 transition-transform" />
                            <div className="flex-1 text-xs font-mono">
                              <span className="text-white/60 block text-[10px] uppercase">Corporate Exchange</span>
                              <span className="text-white">{office.phone}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-white border border-[#A49150]/30 p-8 sm:p-12 shadow-xl rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F2834C]/5 rounded-bl-full pointer-events-none"></div>

              {/* Form Type Selector Pills */}
              <div className="flex bg-transparent p-1.5 rounded-lg border border-[#A49150]/30 shadow-sm mb-8 relative">
                <button
                  type="button"
                  onClick={() => selectFormType('inquiry')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'inquiry' ? 'bg-[#F2834C] text-white shadow' : 'text-[#16283D]/70 hover:bg-[#F2834C]/10 hover:text-[#F2834C]'
                  }`}
                >
                  Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => selectFormType('vendor')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'vendor' ? 'bg-[#F2834C] text-white shadow' : 'text-[#16283D]/70 hover:bg-[#F2834C]/10 hover:text-[#F2834C]'
                  }`}
                >
                  Vendor
                </button>
                <button
                  type="button"
                  onClick={() => selectFormType('career')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'career' ? 'bg-[#F2834C] text-white shadow' : 'text-[#16283D]/70 hover:bg-[#F2834C]/10 hover:text-[#F2834C]'
                  }`}
                >
                  Career
                </button>
              </div>

              {submitted ? (
                <div className="py-20 text-center flex flex-col items-center gap-6 animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#F2834C] uppercase tracking-widest font-bold">TRANSMISSION SUCCESSFUL</span>
                    {activeFormType === 'inquiry' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#16283D]">Consultancy Dossier Dispatched</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#16283D]">{formData.name}</strong>. Our principal infrastructure practice director for <strong className="text-[#16283D]">{formData.sector}</strong> has been assigned to your mandate. Expect a secure briefing within 24 hours.
                        </p>
                      </>
                    )}
                    {activeFormType === 'vendor' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#16283D]">Vendor Registration Received</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#16283D]">{vendorFormData.contactPerson || vendorFormData.companyName}</strong>. Our procurement team will review your submission and reach out if there is an empanelment fit.
                        </p>
                      </>
                    )}
                    {activeFormType === 'career' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#16283D]">Application Received</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#16283D]">{careerFormData.name}</strong>. Our HR team will review your application for <strong className="text-[#16283D]">{careerFormData.position || 'the role'}</strong> and contact you if shortlisted.
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 bg-[#16283D] hover:bg-[#F2834C] text-white px-8 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-md"
                  >
                    {activeFormType === 'inquiry' && 'Submit Another Inquiry'}
                    {activeFormType === 'vendor' && 'Submit Another Registration'}
                    {activeFormType === 'career' && 'Submit Another Application'}
                  </button>
                </div>
              ) : activeFormType === 'inquiry' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#F2834C] uppercase font-bold">SECURE SUBMISSION</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] mt-1">Initiate Consultancy Inquiry</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-1">Complete the briefing details below for direct routing to our practice leads.</p>
                  </div>

                  {/* Inquiry Type Selector Pills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Inquiry Category *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Independent Engineering', 'Lender\'s Engineer', 'TEV & Advisory', 'Project Supervision'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`py-2 px-3 text-[11px] font-mono font-bold uppercase transition-all rounded-md border ${
                            formData.inquiryType === type 
                              ? 'bg-[#16283D] text-white border-[#16283D] shadow' 
                              : 'bg-[#fdf9ed] text-[#16283D] border-[#A49150]/30 hover:border-[#F2834C]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Shri / Mr. / Dr. ..."
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Organization / Authority</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="NHAI / Bank / Private Concessionaire"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Sector of Infrastructure *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors cursor-pointer"
                    >
                      {SECTORS.map((sector) => (
                        <option key={sector.id}>{sector.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Mandate Description / Scope *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe project capacity, estimated outlay, technical audit requirements, or financial appraisal scope..."
                      className="bg-[#fdf9ed] border border-[#A49150]/30 p-4 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
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
              ) : activeFormType === 'vendor' ? (
                <form onSubmit={handleVendorSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#F2834C] uppercase font-bold">VENDOR ONBOARDING</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] mt-1">Register as a Vendor</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-1">Share your company details for empanelment consideration in our supplier and contractor network.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={vendorFormData.companyName}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, companyName: e.target.value })}
                        placeholder="Registered business name"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={vendorFormData.contactPerson}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, contactPerson: e.target.value })}
                        placeholder="Authorized representative"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={vendorFormData.email}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={vendorFormData.phone}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Vendor Category *</label>
                      <select
                        value={vendorFormData.vendorCategory}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, vendorCategory: e.target.value })}
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors cursor-pointer"
                      >
                        <option>Materials Supplier</option>
                        <option>Equipment & Machinery</option>
                        <option>Subcontractor</option>
                        <option>Professional Services</option>
                        <option>Logistics & Transport</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">GST / Registration Number</label>
                      <input
                        type="text"
                        value={vendorFormData.gstNumber}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, gstNumber: e.target.value })}
                        placeholder="22AAAAA0000A1Z5"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Years in Operation</label>
                    <input
                      type="text"
                      value={vendorFormData.yearsInOperation}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, yearsInOperation: e.target.value })}
                      placeholder="e.g. 8 years"
                      className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Proposal / Capability Summary *</label>
                    <textarea
                      required
                      rows={5}
                      value={vendorFormData.message}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, message: e.target.value })}
                      placeholder="Describe your products, services, capacity, and past projects..."
                      className="bg-[#fdf9ed] border border-[#A49150]/30 p-4 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group bg-[#F2834C] hover:bg-[#d9723f] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>SUBMIT VENDOR REGISTRATION</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </button>

                  <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-gray-500 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> 256-bit Encrypted</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> ISO 9001 Audited</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C]" /> 24hr SLA</span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleCareerSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#F2834C] uppercase font-bold">JOIN OUR TEAM</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#16283D] mt-1">Submit Your Application</h3>
                    <p className="text-xs text-[#1c1c15]/70 mt-1">Share your details and resume for consideration against current and upcoming openings.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={careerFormData.name}
                        onChange={(e) => setCareerFormData({ ...careerFormData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={careerFormData.email}
                        onChange={(e) => setCareerFormData({ ...careerFormData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={careerFormData.phone}
                        onChange={(e) => setCareerFormData({ ...careerFormData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Position Applied For *</label>
                      <input
                        type="text"
                        required
                        value={careerFormData.position}
                        onChange={(e) => setCareerFormData({ ...careerFormData, position: e.target.value })}
                        placeholder="e.g. Structural Engineer"
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Years of Experience</label>
                      <select
                        value={careerFormData.experience}
                        onChange={(e) => setCareerFormData({ ...careerFormData, experience: e.target.value })}
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors cursor-pointer"
                      >
                        <option value="">Select range</option>
                        <option>Fresher (0-1 years)</option>
                        <option>1-3 years</option>
                        <option>3-5 years</option>
                        <option>5-10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#16283D] uppercase">LinkedIn / Portfolio URL</label>
                      <input
                        type="url"
                        value={careerFormData.portfolio}
                        onChange={(e) => setCareerFormData({ ...careerFormData, portfolio: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Resume / CV *</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCareerFormData({ ...careerFormData, resumeFileName: e.target.files?.[0]?.name || '' })}
                      className="bg-[#fdf9ed] border border-[#A49150]/30 px-4 py-3 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-mono file:font-bold file:uppercase file:bg-[#16283D] file:text-white hover:file:bg-[#F2834C] file:cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#16283D] uppercase">Cover Letter / Message</label>
                    <textarea
                      rows={5}
                      value={careerFormData.message}
                      onChange={(e) => setCareerFormData({ ...careerFormData, message: e.target.value })}
                      placeholder="Tell us why you'd be a good fit for this role..."
                      className="bg-[#fdf9ed] border border-[#A49150]/30 p-4 text-xs text-[#16283D] focus:outline-none focus:border-[#F2834C] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group bg-[#F2834C] hover:bg-[#d9723f] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>SUBMIT APPLICATION</span>
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
