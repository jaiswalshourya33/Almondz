import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { SECTORS } from '../data/sectors';
import { SERVICES } from '../data/services';
import { Menu, X, ChevronDown, ArrowRight, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const closeDropdowns = () => setActiveDropdown(null);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#16283D] shadow-lg py-3.5 border-b border-white/10'
          : 'bg-gradient-to-b from-[#16283D]/90 via-[#16283D]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeDropdowns} className="group">
          <Logo light={true} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-sm font-medium tracking-wide text-white/90 hover:text-[#F2834C] transition-colors py-1 relative group"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2834C] transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* ABOUT Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown('about')}
              className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/90 hover:text-[#F2834C] transition-colors py-1 group"
            >
              ABOUT
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-[#F2834C]' : ''}`} />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-72 bg-[#16283D] border border-[#A49150]/30 shadow-2xl py-3 px-1 z-50 animate-fade-in">
                {[
                  { name: "Overview", path: "/about" },
                  { name: "Mission & Vision", path: "/about/mission-vision" },
                  { name: "Leadership & Directors", path: "/about/leadership" },
                  { name: "Management Team Members", path: "/about/management-team" },
                  { name: "Certifications & Empanelments", path: "/about/certifications" },
                  { name: "Careers", path: "/about/careers" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={closeDropdowns}
                    className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-[#F2834C]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SECTORS Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('sectors')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown('sectors')}
              className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/90 hover:text-[#F2834C] transition-colors py-1"
            >
              SECTORS
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'sectors' ? 'rotate-180 text-[#F2834C]' : ''}`} />
            </button>

            {activeDropdown === 'sectors' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(850px,90vw)] bg-[#16283D] border border-[#A49150]/30 shadow-2xl p-6 z-50 grid grid-cols-2 gap-4 animate-fade-in">
                <div className="col-span-2 pb-2 border-b border-white/10 flex justify-between items-center">
                  <span className="text-xs font-mono tracking-widest text-[#F2834C]">SPECIALIZED INFRASTRUCTURE DOMAINS (011)</span>
                  <Link to="/sectors" onClick={closeDropdowns} className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1">
                    View All Sectors <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {SECTORS.map((sector) => (
                  <Link
                    key={sector.id}
                    to={`/sectors/${sector.slug}`}
                    onClick={closeDropdowns}
                    className="p-2.5 rounded hover:bg-white/5 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A49150] mt-2 group-hover:bg-[#F2834C] transition-colors"></div>
                    <div>
                      <h4 className="text-sm font-serif font-medium text-white group-hover:text-[#F2834C] transition-colors">
                        {sector.title}
                      </h4>
                      <p className="text-xs text-white/60 line-clamp-1 mt-0.5">{sector.shortDesc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* SERVICES Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={closeDropdowns}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown('services')}
              className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-white/90 hover:text-[#F2834C] transition-colors py-1"
            >
              SERVICES
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-[#F2834C]' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[min(850px,90vw)] bg-[#16283D] border border-[#A49150]/30 shadow-2xl p-6 z-50 grid grid-cols-2 gap-3 animate-fade-in">
                <div className="col-span-2 pb-2 border-b border-white/10 flex justify-between items-center">
                  <span className="text-xs font-mono tracking-widest text-[#F2834C]">END-TO-END CONSULTANCY SERVICES</span>
                  <Link to="/services" onClick={closeDropdowns} className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1">
                    View All Services <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                {SERVICES.map((srv) => (
                  <Link
                    key={srv.id}
                    to={`/services?service=${srv.slug}`}
                    onClick={closeDropdowns}
                    className="p-2 rounded hover:bg-white/5 transition-colors group flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#A49150] mt-2 group-hover:bg-[#F2834C] transition-colors"></div>
                    <div>
                      <h4 className="text-xs font-medium text-white group-hover:text-[#F2834C] transition-colors">
                        {srv.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/projects"
            onClick={closeDropdowns}
            className="text-sm font-medium tracking-wide text-white/90 hover:text-[#F2834C] transition-colors py-1 relative group"
          >
            PROJECTS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2834C] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-[#F2834C] hover:bg-[#d9723f] text-white px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2 rounded-md"
          >
            <Phone className="w-3.5 h-3.5" />
            CONTACT US
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#16283D] border-b border-[#A49150]/30 shadow-2xl px-6 py-6 max-h-[85vh] overflow-y-auto animate-fade-in z-50">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white hover:text-[#F2834C] py-2 border-b border-white/10"
            >
              Home
            </Link>

            {/* About Mobile */}
            <div>
              <button 
                onClick={() => setMobileSubmenu(mobileSubmenu === 'about' ? null : 'about')}
                className="flex items-center justify-between w-full text-base font-medium text-white hover:text-[#F2834C] py-2 border-b border-white/10"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === 'about' && (
                <div className="pl-4 py-2 flex flex-col gap-2 bg-[#071A2D] mt-1">
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Overview</Link>
                  <Link to="/about/mission-vision" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Mission & Vision</Link>
                  <Link to="/about/leadership" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Leadership & Directors</Link>
                  <Link to="/about/management-team" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Management Team Members</Link>
                  <Link to="/about/certifications" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Certifications & Empanelments</Link>
                  <Link to="/about/careers" onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/80 py-1.5">Careers</Link>
                </div>
              )}
            </div>

            {/* Sectors Mobile */}
            <div>
              <button 
                onClick={() => setMobileSubmenu(mobileSubmenu === 'sectors' ? null : 'sectors')}
                className="flex items-center justify-between w-full text-base font-medium text-white hover:text-[#F2834C] py-2 border-b border-white/10"
              >
                <span>Sectors</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'sectors' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === 'sectors' && (
                <div className="pl-4 py-2 flex flex-col gap-2 bg-[#071A2D] mt-1 max-h-60 overflow-y-auto">
                  <Link to="/sectors" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-[#F2834C] py-1">View All Sectors</Link>
                  {SECTORS.map((sec) => (
                    <Link key={sec.id} to={`/sectors/${sec.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-xs text-white/80 py-1">
                      {sec.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services Mobile */}
            <div>
              <button 
                onClick={() => setMobileSubmenu(mobileSubmenu === 'services' ? null : 'services')}
                className="flex items-center justify-between w-full text-base font-medium text-white hover:text-[#F2834C] py-2 border-b border-white/10"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubmenu === 'services' && (
                <div className="pl-4 py-2 flex flex-col gap-2 bg-[#071A2D] mt-1 max-h-60 overflow-y-auto">
                  <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-[#F2834C] py-1">View All Services</Link>
                  {SERVICES.map((srv) => (
                    <Link key={srv.id} to={`/services?service=${srv.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-xs text-white/80 py-1">
                      {srv.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white hover:text-[#F2834C] py-2 border-b border-white/10"
            >
              Projects
            </Link>

            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-[#F2834C] text-white py-3 text-center text-xs font-mono font-bold tracking-widest uppercase rounded-md shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
