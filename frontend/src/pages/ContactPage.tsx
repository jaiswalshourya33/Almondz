import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building2, ArrowRight, X } from 'lucide-react';
import { PageHeroBanner } from '../components/PageHeroBanner';
import { TeamGallerySlideshow } from '../components/TeamGallerySlideshow';
import { SECTORS } from '../data/sectors';
import { submitContactForm, fileToBase64, type ContactFormType } from '../lib/submitContactForm';

interface ContactNavState {
  formType?: 'inquiry' | 'vendor' | 'career';
  position?: string;
}

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const navState = (location.state ?? {}) as ContactNavState;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState(''); // bot trap — real users never fill this
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
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const [heroLineWidth, setHeroLineWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const heading = heroHeadingRef.current;
      if (!heading) return;
      const rects = heading.getClientRects();
      const lastRect = rects[rects.length - 1];
      if (lastRect) setHeroLineWidth(lastRect.width);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const sendForm = async (type: ContactFormType, payload: Record<string, unknown>) => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitContactForm(type, { ...payload, company_website: honeypot });
      setSubmitted(true);
    } catch {
      setSubmitError('Could not submit right now. Please try again, or email info@almondz.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendForm('inquiry', { ...formData });
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendForm('vendor', { ...vendorFormData });
  };

  const handleCareerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    let resume: Record<string, unknown> = {};
    if (resumeFile) {
      try {
        resume = await fileToBase64(resumeFile);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Could not read the resume file.');
        return;
      }
    }
    sendForm('career', { ...careerFormData, ...resume });
  };

  const selectFormType = (type: 'inquiry' | 'vendor' | 'career') => {
    setActiveFormType(type);
    setSubmitted(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setSubmitting(false);
    setResumeFile(null);
    setHoneypot('');
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

  const submissionLabel =
    activeFormType === 'inquiry' ? 'inquiry' : activeFormType === 'vendor' ? 'vendor registration' : 'career application';

  return (
    <div className="flex flex-col min-h-screen bg-[#F1F3F5] pt-24">
      {/* Full-screen Submission Success Popup */}
      {submitted && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={handleReset}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border-t-4 border-[#A49050] p-8 sm:p-10 text-center flex flex-col items-center gap-5"
          >
            <button
              onClick={handleReset}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-[#A49050] hover:bg-[#A49050]/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center ring-4 ring-emerald-200">
              <CheckCircle2 className="w-11 h-11" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#A49050]">Submission Successful</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">Thank You!</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your {submissionLabel} form has been submitted successfully. Our team will get back to you shortly.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-2 w-full bg-[#A49050] hover:bg-[#8A7942] text-white py-3.5 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-colors rounded-md shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {copiedField && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#2B4A6D] text-white px-6 py-4 border border-[#A49050] shadow-2xl flex items-center gap-3 animate-fade-in rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-[#A49050]" />
          <div>
            <p className="text-xs font-mono font-bold">COPIED TO CLIPBOARD</p>
            <p className="text-xs text-white/80">{copiedField} copied successfully.</p>
          </div>
        </div>
      )}

      {/* Header Banner with Clean Energy Infrastructure Background */}
      <PageHeroBanner
        line1="STRATEGIC LIAISON."
        line2="CONNECT WITH OUR EXPERTS."
        description="Engage our principal engineering divisions, corporate headquarters, or regional technical directorates for institutional mandates and independent engineering assignments."
      />

      {/* Main Content */}
      <section className="pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Cards & Regional Offices */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Tabs for Office Types */}
              <div className="flex bg-[#2B4A6D] p-1.5 rounded-lg border border-[#A49050]/30 shadow-md">
                <button
                  onClick={() => setActiveTab('headquarters')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'headquarters' ? 'bg-[#A49050] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Headquarters
                </button>
                <button
                  onClick={() => setActiveTab('regional')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'regional' ? 'bg-[#A49050] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Project Offices
                </button>
                <button
                  onClick={() => setActiveTab('leadership')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeTab === 'leadership' ? 'bg-[#A49050] text-white shadow' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Corporate Offices
                </button>
              </div>

              {/* Headquarters Tab Content */}
              {activeTab === 'headquarters' && (
                <div className="bg-[#2B4A6D] text-white p-8 rounded-lg border border-[#A49050]/40 shadow-xl flex flex-col gap-6 animate-fade-in group hover:border-[#A49050] transition-all duration-500">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#A49050]/20 text-[#A49050] flex items-center justify-center rounded-md border border-[#A49050]/30">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#A49050] uppercase tracking-widest font-bold">CORPORATE HQ</span>
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
                      <MapPin className="w-5 h-5 text-[#A49050] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Registered Address</span>
                        <span className="text-white">F-33/3 Okhla Industrial Area, Phase-II, New Delhi-110020, INDIA</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCopy("+91-11-43500700, +91-11-43500734", "Phone Number")}
                      className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <Phone className="w-5 h-5 text-[#A49050] shrink-0 group-hover/item:scale-110 transition-transform" />
                      <div className="flex-1 text-xs font-mono">
                        <span className="text-white/60 block text-[10px] uppercase">Corporate Exchange</span>
                        <span className="text-white">+91-11-43500700, +91-11-43500734</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleCopy("contact@almondzglobalinfra.com", "Email Address")}
                      className="flex items-center gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                    >
                      <Mail className="w-5 h-5 text-[#A49050] shrink-0 group-hover/item:scale-110 transition-transform" />
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
                      className="bg-white p-5 rounded-lg border border-[#A49050]/30 shadow-sm hover:border-[#A49050] hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono font-bold text-[#2B4A6D] uppercase flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#A49050] group-hover:scale-110 transition-transform" />
                          {office.city}
                        </h4>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Active Cell</span>
                      </div>
                      <p className="text-xs text-[#2B4A6D]/80 font-light mb-2">{office.address}</p>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#A49050] pt-2 border-t border-gray-100">
                        <span>{office.phone}</span>
                        <span className="group-hover:text-[#A49050] transition-colors">Click to copy →</span>
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
                      className="bg-[#2B4A6D] text-white p-8 rounded-lg border border-[#A49050]/40 shadow-xl flex flex-col gap-6 group hover:border-[#A49050] transition-all duration-500"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#A49050]/20 text-[#A49050] flex items-center justify-center rounded-md border border-[#A49050]/30">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-[#A49050] uppercase tracking-widest font-bold">CORPORATE OFFICE</span>
                            <h3 className="text-xl font-serif font-bold text-white">{office.city}, India</h3>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div
                          onClick={() => handleCopy(office.address, `${office.city} Corporate Office Address`)}
                          className="flex items-start gap-3.5 p-3.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 cursor-pointer transition-colors group/item"
                        >
                          <MapPin className="w-5 h-5 text-[#A49050] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
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
                            <Phone className="w-5 h-5 text-[#A49050] shrink-0 group-hover/item:scale-110 transition-transform" />
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
            <div className="lg:col-span-7 bg-white border border-[#A49050]/30 p-8 sm:p-12 shadow-xl rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A49050]/5 rounded-bl-full pointer-events-none"></div>

              {/* Form Type Selector Pills */}
              <div className="flex bg-transparent p-1.5 rounded-lg border border-[#A49050]/30 shadow-sm mb-8 relative">
                <button
                  type="button"
                  onClick={() => selectFormType('inquiry')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'inquiry' ? 'bg-[#A49050] text-white shadow' : 'text-[#2B4A6D]/70 hover:bg-[#A49050]/10 hover:text-[#A49050]'
                  }`}
                >
                  Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => selectFormType('vendor')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'vendor' ? 'bg-[#A49050] text-white shadow' : 'text-[#2B4A6D]/70 hover:bg-[#A49050]/10 hover:text-[#A49050]'
                  }`}
                >
                  Vendor
                </button>
                <button
                  type="button"
                  onClick={() => selectFormType('career')}
                  className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold uppercase transition-all rounded-md ${
                    activeFormType === 'career' ? 'bg-[#A49050] text-white shadow' : 'text-[#2B4A6D]/70 hover:bg-[#A49050]/10 hover:text-[#A49050]'
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
                    <span className="text-xs font-mono text-[#A49050] uppercase tracking-widest font-bold">TRANSMISSION SUCCESSFUL</span>
                    {activeFormType === 'inquiry' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#2B4A6D]">Consultancy Dossier Dispatched</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#2B4A6D]">{formData.name}</strong>. Our principal infrastructure practice director for <strong className="text-[#2B4A6D]">{formData.sector}</strong> has been assigned to your mandate. Expect a secure briefing within 24 hours.
                        </p>
                      </>
                    )}
                    {activeFormType === 'vendor' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#2B4A6D]">Vendor Registration Received</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#2B4A6D]">{vendorFormData.contactPerson || vendorFormData.companyName}</strong>. Our procurement team will review your submission and reach out if there is an empanelment fit.
                        </p>
                      </>
                    )}
                    {activeFormType === 'career' && (
                      <>
                        <h3 className="text-3xl font-serif font-bold text-[#2B4A6D]">Application Received</h3>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed font-light">
                          Thank you, <strong className="text-[#2B4A6D]">{careerFormData.name}</strong>. Our HR team will review your application for <strong className="text-[#2B4A6D]">{careerFormData.position || 'the role'}</strong> and contact you if shortlisted.
                        </p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 bg-[#2B4A6D] hover:bg-[#A49050] text-white px-8 py-3.5 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-md"
                  >
                    {activeFormType === 'inquiry' && 'Submit Another Inquiry'}
                    {activeFormType === 'vendor' && 'Submit Another Registration'}
                    {activeFormType === 'career' && 'Submit Another Application'}
                  </button>
                </div>
              ) : activeFormType === 'inquiry' ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A49050] uppercase font-bold">SECURE SUBMISSION</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B4A6D] mt-1">Initiate Consultancy Inquiry</h3>
                    <p className="text-xs text-[#2B4A6D]/70 mt-1">Complete the briefing details below for direct routing to our practice leads.</p>
                  </div>

                  {/* Inquiry Type Selector Pills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Inquiry Category *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Independent Engineering', 'Lender\'s Engineer', 'TEV & Advisory', 'Project Supervision'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`py-2 px-3 text-[11px] font-mono font-bold uppercase transition-all rounded-md border ${
                            formData.inquiryType === type 
                              ? 'bg-[#2B4A6D] text-white border-[#2B4A6D] shadow' 
                              : 'bg-[#F1F3F5] text-[#2B4A6D] border-[#A49050]/30 hover:border-[#A49050]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Shri / Mr. / Dr. ..."
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@organization.com"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Organization / Authority</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="NHAI / Bank / Private Concessionaire"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Sector of Infrastructure *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors cursor-pointer"
                    >
                      {SECTORS.map((sector) => (
                        <option key={sector.id}>{sector.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Mandate Description / Scope *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe project capacity, estimated outlay, technical audit requirements, or financial appraisal scope..."
                      className="bg-[#F1F3F5] border border-[#A49050]/30 p-4 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] top-0 w-px h-px opacity-0" />

                  {submitError && (
                    <p className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group bg-[#A49050] hover:bg-[#8A7942] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{submitting ? 'TRANSMITTING…' : 'TRANSMIT CONSULTANCY BRIEFING'}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </button>

                </form>
              ) : activeFormType === 'vendor' ? (
                <form onSubmit={handleVendorSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A49050] uppercase font-bold">VENDOR ONBOARDING</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B4A6D] mt-1">Register as a Vendor</h3>
                    <p className="text-xs text-[#2B4A6D]/70 mt-1">Share your company details for empanelment consideration in our supplier and contractor network.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Company Name *</label>
                      <input
                        type="text"
                        required
                        value={vendorFormData.companyName}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, companyName: e.target.value })}
                        placeholder="Registered business name"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Contact Person *</label>
                      <input
                        type="text"
                        required
                        value={vendorFormData.contactPerson}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, contactPerson: e.target.value })}
                        placeholder="Authorized representative"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={vendorFormData.email}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={vendorFormData.phone}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Vendor Category *</label>
                      <select
                        value={vendorFormData.vendorCategory}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, vendorCategory: e.target.value })}
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors cursor-pointer"
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
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">GST / Registration Number</label>
                      <input
                        type="text"
                        value={vendorFormData.gstNumber}
                        onChange={(e) => setVendorFormData({ ...vendorFormData, gstNumber: e.target.value })}
                        placeholder="22AAAAA0000A1Z5"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Years in Operation</label>
                    <input
                      type="text"
                      value={vendorFormData.yearsInOperation}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, yearsInOperation: e.target.value })}
                      placeholder="e.g. 8 years"
                      className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Proposal / Capability Summary *</label>
                    <textarea
                      required
                      rows={5}
                      value={vendorFormData.message}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, message: e.target.value })}
                      placeholder="Describe your products, services, capacity, and past projects..."
                      className="bg-[#F1F3F5] border border-[#A49050]/30 p-4 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] top-0 w-px h-px opacity-0" />

                  {submitError && (
                    <p className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group bg-[#A49050] hover:bg-[#8A7942] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{submitting ? 'SUBMITTING…' : 'SUBMIT VENDOR REGISTRATION'}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </button>

                </form>
              ) : (
                <form onSubmit={handleCareerSubmit} className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#A49050] uppercase font-bold">JOIN OUR TEAM</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2B4A6D] mt-1">Submit Your Application</h3>
                    <p className="text-xs text-[#2B4A6D]/70 mt-1">Share your details and resume for consideration against current and upcoming openings.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={careerFormData.name}
                        onChange={(e) => setCareerFormData({ ...careerFormData, name: e.target.value })}
                        placeholder="Your full name"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={careerFormData.email}
                        onChange={(e) => setCareerFormData({ ...careerFormData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={careerFormData.phone}
                        onChange={(e) => setCareerFormData({ ...careerFormData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Position Applied For *</label>
                      <input
                        type="text"
                        required
                        value={careerFormData.position}
                        onChange={(e) => setCareerFormData({ ...careerFormData, position: e.target.value })}
                        placeholder="e.g. Structural Engineer"
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Years of Experience</label>
                      <select
                        value={careerFormData.experience}
                        onChange={(e) => setCareerFormData({ ...careerFormData, experience: e.target.value })}
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors cursor-pointer"
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
                      <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">LinkedIn / Portfolio URL</label>
                      <input
                        type="url"
                        value={careerFormData.portfolio}
                        onChange={(e) => setCareerFormData({ ...careerFormData, portfolio: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Resume / CV *</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setResumeFile(file);
                        setCareerFormData({ ...careerFormData, resumeFileName: file?.name || '' });
                      }}
                      className="bg-[#F1F3F5] border border-[#A49050]/30 px-4 py-3 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-mono file:font-bold file:uppercase file:bg-[#2B4A6D] file:text-white hover:file:bg-[#A49050] file:cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#2B4A6D] uppercase">Cover Letter / Message</label>
                    <textarea
                      rows={5}
                      value={careerFormData.message}
                      onChange={(e) => setCareerFormData({ ...careerFormData, message: e.target.value })}
                      placeholder="Tell us why you'd be a good fit for this role..."
                      className="bg-[#F1F3F5] border border-[#A49050]/30 p-4 text-xs text-[#2B4A6D] focus:outline-none focus:border-[#A49050] rounded-md transition-colors"
                    ></textarea>
                  </div>

                  <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] top-0 w-px h-px opacity-0" />

                  {submitError && (
                    <p className="text-xs font-mono text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group bg-[#A49050] hover:bg-[#8A7942] text-white py-4 px-6 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 rounded-md disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>{submitting ? 'SUBMITTING…' : 'SUBMIT APPLICATION'}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                  </button>

                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Full-bleed team gallery slideshow with clean separation from footer */}
      <div className="pb-6 sm:pb-8 bg-[#F1F3F5]">
        <TeamGallerySlideshow />
      </div>
    </div>
  );
};
