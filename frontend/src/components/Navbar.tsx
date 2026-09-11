import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { SECTORS } from '../data/sectors';
import { SERVICES } from '../data/services';
import { CORPORATE_GOVERNANCE } from '../data/corporateGovernance';
import { Menu, X, ChevronDown, ArrowRight, Phone } from 'lucide-react';
import { getSectorIcon } from './SectorSvgIcons';
import { getServiceIcon } from './ServiceSvgIcons';

const ABOUT_ITEMS = [
  { name: 'Overview', path: '/about' },
  { name: 'Mission & Vision', path: '/about/mission-vision' },
  { name: 'Leadership & Directors', path: '/about/leadership' },
  { name: 'Management Team Members', path: '/about/management-team' },
  { name: 'Certifications & Empanelments', path: '/about/certifications' },
  { name: 'Careers', path: '/about/careers' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

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

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
  }, [location.pathname]);

  // Close mobile menu when clicking outside, pressing Escape, or resizing to desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 140);
  };

  const closeDropdowns = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(null);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2B4A6D] shadow-xl py-3 border-b border-white/10'
          : 'bg-gradient-to-b from-[#2B4A6D]/95 via-[#2B4A6D]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeDropdowns} className="group lg:-ml-4 transition-transform duration-200 hover:scale-[1.01]">
          <Logo light={true} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* HOME */}
          <Link 
            to="/" 
            className={`text-sm font-medium tracking-wide transition-colors py-1 relative group ${
              location.pathname === '/' ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
            }`}
          >
            HOME
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D96B33] transition-all duration-300 ${
              location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>

          {/* ABOUT Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 group cursor-pointer ${
                location.pathname.startsWith('/about') ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
              }`}
            >
              ABOUT
              <motion.div
                animate={{ rotate: activeDropdown === 'about' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center justify-center"
              >
                <ChevronDown className={`w-4 h-4 transition-colors ${
                  activeDropdown === 'about' ? 'text-[#D96B33]' : location.pathname.startsWith('/about') ? 'text-[#D96B33]' : ''
                }`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 6, scale: 0.97, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 w-72 bg-[#1E3654]/98 backdrop-blur-xl border border-[#A49050]/30 rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] py-2.5 px-1.5 z-50 overflow-hidden"
                >
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: { transition: { staggerChildren: 0.025, delayChildren: 0.02 } },
                    }}
                  >
                    {ABOUT_ITEMS.map((item, idx) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={idx}
                          variants={{
                            show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
                            hidden: { opacity: 0, y: 6 },
                          }}
                        >
                          <Link
                            to={item.path}
                            onClick={closeDropdowns}
                            className={`block px-3.5 py-2 text-sm transition-colors rounded-lg ${
                              isActive
                                ? 'text-[#D96B33] bg-white/10 font-medium'
                                : 'text-white/80 hover:text-[#D96B33] hover:bg-white/5'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SECTORS Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('sectors')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'sectors' ? null : 'sectors')}
              className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                location.pathname.startsWith('/sectors') ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
              }`}
            >
              SECTORS
              <motion.div
                animate={{ rotate: activeDropdown === 'sectors' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center justify-center"
              >
                <ChevronDown className={`w-4 h-4 transition-colors ${
                  activeDropdown === 'sectors' ? 'text-[#D96B33]' : location.pathname.startsWith('/sectors') ? 'text-[#D96B33]' : ''
                }`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'sectors' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 6, scale: 0.97, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[min(860px,90vw)] bg-[#1E3654]/98 backdrop-blur-xl border border-[#A49050]/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] p-6 z-50 grid grid-cols-2 gap-3.5 overflow-hidden"
                >
                  <div className="col-span-2 pb-2 border-b border-white/10 flex justify-between items-center">
                    <span className="text-xs font-mono tracking-widest text-[#D96B33]">
                      SPECIALIZED INFRASTRUCTURE DOMAINS ({String(SECTORS.length).padStart(2, '0')})
                    </span>
                    <Link 
                       to="/sectors" 
                      onClick={closeDropdowns} 
                      className="text-xs font-mono text-white/70 hover:text-[#D96B33] flex items-center gap-1 transition-colors"
                    >
                      View All Sectors <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  {SECTORS.map((sector) => {
                    const isActive = location.pathname === `/sectors/${sector.slug}`;
                    return (
                      <Link
                        key={sector.id}
                        to={`/sectors/${sector.slug}`}
                        onClick={closeDropdowns}
                        className={`p-2 rounded-xl transition-colors group flex items-center gap-3.5 ${
                          isActive
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg ring-1 ring-inset transition-colors ${
                          isActive
                            ? 'bg-[#D96B33]/15 ring-[#D96B33]/60'
                            : 'bg-white/[0.07] ring-white/15 group-hover:bg-[#D96B33]/10 group-hover:ring-[#D96B33]/50'
                        }`}>
                          {getSectorIcon(sector.slug, "w-[22px] h-[22px]")}
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-[14px] font-sans font-medium leading-[20px] transition-colors ${
                            isActive ? 'text-[#D96B33]' : 'text-white group-hover:text-[#D96B33]'
                          }`}>
                            {sector.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SERVICES Mega Menu */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
              className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 cursor-pointer ${
                location.pathname.startsWith('/services') ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
              }`}
            >
              SERVICES
              <motion.div
                animate={{ rotate: activeDropdown === 'services' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center justify-center"
              >
                <ChevronDown className={`w-4 h-4 transition-colors ${
                  activeDropdown === 'services' ? 'text-[#D96B33]' : location.pathname.startsWith('/services') ? 'text-[#D96B33]' : ''
                }`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 6, scale: 0.97, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[min(860px,90vw)] bg-[#1E3654]/98 backdrop-blur-xl border border-[#A49050]/30 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] p-6 z-50 grid grid-cols-2 gap-3 overflow-hidden"
                >
                  <div className="col-span-2 pb-2 border-b border-white/10 flex justify-between items-center">
                    <span className="text-xs font-mono tracking-widest text-[#D96B33]">END-TO-END CONSULTANCY SERVICES</span>
                    <Link to="/services" onClick={closeDropdowns} className="text-xs font-mono text-white/70 hover:text-[#D96B33] flex items-center gap-1 transition-colors">
                      View All Services <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  {SERVICES.map((srv) => {
                    const isActive = location.pathname.startsWith('/services') && location.search.includes(srv.slug);
                    return (
                      <Link
                        key={srv.id}
                        to={`/services?service=${srv.slug}`}
                        onClick={closeDropdowns}
                        className={`p-2 rounded-xl transition-colors group flex items-center gap-3.5 ${
                          isActive
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-lg ring-1 ring-inset transition-colors ${
                          isActive
                            ? 'bg-[#D96B33]/15 ring-[#D96B33]/60'
                            : 'bg-white/[0.07] ring-white/15 group-hover:bg-[#D96B33]/10 group-hover:ring-[#D96B33]/50'
                        }`}>
                          {getServiceIcon(srv.slug, "w-[22px] h-[22px]")}
                        </div>
                        <div className="min-w-0">
                          <h4 className={`text-[13.5px] font-sans font-medium leading-[18px] transition-colors ${
                            isActive ? 'text-[#D96B33]' : 'text-white group-hover:text-[#D96B33]'
                          }`}>
                            {srv.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/projects"
            onClick={closeDropdowns}
            className={`text-sm font-medium tracking-wide transition-colors py-1 relative group ${
              location.pathname.startsWith('/projects') ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
            }`}
          >
            PROJECTS
            <span className={`absolute bottom-0 left-0 h-0.5 bg-[#D96B33] transition-all duration-300 ${
              location.pathname.startsWith('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </Link>

          {/* CORPORATE GOVERNANCE Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('governance')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setActiveDropdown(activeDropdown === 'governance' ? null : 'governance')}
              className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors py-1 group cursor-pointer ${
                location.pathname.startsWith('/corporate-governance') ? 'text-[#D96B33]' : 'text-white/90 hover:text-[#D96B33]'
              }`}
            >
              CORPORATE GOVERNANCE
              <motion.div
                animate={{ rotate: activeDropdown === 'governance' ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex items-center justify-center"
              >
                <ChevronDown className={`w-4 h-4 transition-colors ${
                  activeDropdown === 'governance' ? 'rotate-180 text-[#D96B33]' : location.pathname.startsWith('/corporate-governance') ? 'text-[#D96B33]' : ''
                }`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === 'governance' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 6, scale: 0.97, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 w-72 bg-[#1E3654]/98 backdrop-blur-xl border border-[#A49050]/30 rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] py-2.5 px-1.5 z-50 overflow-hidden"
                >
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: { transition: { staggerChildren: 0.025, delayChildren: 0.02 } },
                    }}
                  >
                    {CORPORATE_GOVERNANCE.map((item) => {
                      const itemPath = `/corporate-governance/${item.slug}`;
                      const isActive = location.pathname === itemPath;
                      return (
                        <motion.div
                          key={item.slug}
                          variants={{
                            show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
                            hidden: { opacity: 0, y: 6 },
                          }}
                        >
                          <Link
                            to={itemPath}
                            onClick={closeDropdowns}
                            className={`block px-3.5 py-2 text-sm transition-colors rounded-lg ${
                              isActive
                                ? 'text-[#D96B33] bg-white/10 font-medium'
                                : 'text-white/80 hover:text-[#D96B33] hover:bg-white/5'
                            }`}
                          >
                            {item.navLabel}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4 lg:-mr-4">
          <Link
            to="/contact"
            className="bg-[#D96B33] hover:bg-[#C25A28] text-white px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center gap-2 rounded-md active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            CONTACT US
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="fixed inset-0 top-0 left-0 w-screen h-screen bg-[#070D18]/75 backdrop-blur-xs z-[-1] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu backdrop"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#1D3552]/98 backdrop-blur-2xl border-b border-[#A49050]/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] px-5 sm:px-6 py-6 max-h-[85vh] overflow-y-auto no-scrollbar scrollbar-none z-50"
            >
              <div className="flex flex-col gap-2.5">
                {/* HOME */}
                <Link 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2.5 px-1 border-b border-white/10 transition-colors ${
                    location.pathname === '/' ? 'text-[#D96B33] font-semibold' : 'text-white hover:text-[#D96B33]'
                  }`}
                >
                  Home
                </Link>

                {/* About Mobile Accordion */}
                <div>
                  <button 
                    type="button"
                    onClick={() => toggleMobileSubmenu('about')}
                    className={`flex items-center justify-between w-full text-base font-medium py-2.5 px-1 border-b transition-colors cursor-pointer ${
                      location.pathname.startsWith('/about') || mobileSubmenu === 'about'
                        ? 'text-[#D96B33] font-semibold border-white/20'
                        : 'text-white hover:text-[#D96B33] border-white/10'
                    }`}
                  >
                    <span>About</span>
                    <motion.div
                      animate={{ rotate: mobileSubmenu === 'about' ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="flex items-center justify-center p-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors ${
                        mobileSubmenu === 'about' ? 'text-[#D96B33]' : 'text-white/70'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSubmenu === 'about' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, ease: 'easeOut' }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.16, ease: 'easeIn' }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          variants={{
                            show: {
                              transition: { staggerChildren: 0.03, delayChildren: 0.04 }
                            },
                            hidden: {
                              transition: { staggerChildren: 0.015, staggerDirection: -1 }
                            }
                          }}
                          className="mt-1.5 mb-2 py-2 px-2 flex flex-col gap-1 bg-[#101F31]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-inner"
                        >
                          {ABOUT_ITEMS.map((item, idx) => {
                            const isActive = location.pathname === item.path;
                            return (
                              <motion.div
                                key={idx}
                                variants={{
                                  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                                  hidden: { opacity: 0, x: -8, transition: { duration: 0.15 } }
                                }}
                              >
                                <Link
                                  to={item.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block text-[13.5px] py-2 px-3 rounded-lg transition-colors ${
                                    isActive
                                      ? 'text-[#D96B33] font-semibold bg-white/10'
                                      : 'text-white/85 hover:text-[#D96B33] hover:bg-white/5'
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sectors Mobile Accordion */}
                <div>
                  <button 
                    type="button"
                    onClick={() => toggleMobileSubmenu('sectors')}
                    className={`flex items-center justify-between w-full text-base font-medium py-2.5 px-1 border-b transition-colors cursor-pointer ${
                      location.pathname.startsWith('/sectors') || mobileSubmenu === 'sectors'
                        ? 'text-[#D96B33] font-semibold border-white/20'
                        : 'text-white hover:text-[#D96B33] border-white/10'
                    }`}
                  >
                    <span>Sectors</span>
                    <motion.div
                      animate={{ rotate: mobileSubmenu === 'sectors' ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="flex items-center justify-center p-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors ${
                        mobileSubmenu === 'sectors' ? 'text-[#D96B33]' : 'text-white/70'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSubmenu === 'sectors' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, ease: 'easeOut' }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.16, ease: 'easeIn' }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          variants={{
                            show: {
                              transition: { staggerChildren: 0.025, delayChildren: 0.04 }
                            },
                            hidden: {
                              transition: { staggerChildren: 0.015, staggerDirection: -1 }
                            }
                          }}
                          className="mt-1.5 mb-2 py-2 px-2 flex flex-col gap-1 bg-[#101F31]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-inner max-h-64 overflow-y-auto no-scrollbar scrollbar-none"
                        >
                          <motion.div
                            variants={{
                              show: { opacity: 1, x: 0 },
                              hidden: { opacity: 0, x: -8 }
                            }}
                          >
                            <Link
                              to="/sectors"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between text-xs font-mono font-bold text-[#D96B33] uppercase tracking-wider py-1.5 px-3 border-b border-white/10 mb-1 rounded hover:bg-white/5"
                            >
                              <span>View All Sectors</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </motion.div>

                          {SECTORS.map((sec) => {
                            const isActive = location.pathname === `/sectors/${sec.slug}`;
                            return (
                              <motion.div
                                key={sec.id}
                                variants={{
                                  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                                  hidden: { opacity: 0, x: -8, transition: { duration: 0.15 } }
                                }}
                              >
                                <Link 
                                  to={`/sectors/${sec.slug}`} 
                                  onClick={() => setMobileMenuOpen(false)} 
                                  className={`group flex items-center gap-3 text-[13.5px] font-sans font-medium py-1.5 px-2 rounded-lg transition-colors ${
                                    isActive
                                      ? 'text-[#D96B33] font-semibold bg-white/10'
                                      : 'text-white/85 hover:text-[#D96B33] hover:bg-white/5'
                                  }`}
                                >
                                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-lg ring-1 ring-inset transition-colors ${
                                    isActive
                                      ? 'bg-[#D96B33]/15 ring-[#D96B33]/60'
                                      : 'bg-white/[0.07] ring-white/15 group-hover:ring-[#D96B33]/50'
                                  }`}>
                                    {getSectorIcon(sec.slug, "w-5 h-5")}
                                  </div>
                                  <span className="truncate">{sec.title}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Services Mobile Accordion */}
                <div>
                  <button 
                    type="button"
                    onClick={() => toggleMobileSubmenu('services')}
                    className={`flex items-center justify-between w-full text-base font-medium py-2.5 px-1 border-b transition-colors cursor-pointer ${
                      location.pathname.startsWith('/services') || mobileSubmenu === 'services'
                        ? 'text-[#D96B33] font-semibold border-white/20'
                        : 'text-white hover:text-[#D96B33] border-white/10'
                    }`}
                  >
                    <span>Services</span>
                    <motion.div
                      animate={{ rotate: mobileSubmenu === 'services' ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="flex items-center justify-center p-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors ${
                        mobileSubmenu === 'services' ? 'text-[#D96B33]' : 'text-white/70'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSubmenu === 'services' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, ease: 'easeOut' }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.16, ease: 'easeIn' }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          variants={{
                            show: {
                              transition: { staggerChildren: 0.025, delayChildren: 0.04 }
                            },
                            hidden: {
                              transition: { staggerChildren: 0.015, staggerDirection: -1 }
                            }
                          }}
                          className="mt-1.5 mb-2 py-2 px-2 flex flex-col gap-1 bg-[#101F31]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-inner max-h-64 overflow-y-auto no-scrollbar scrollbar-none"
                        >
                          <motion.div
                            variants={{
                              show: { opacity: 1, x: 0 },
                              hidden: { opacity: 0, x: -8 }
                            }}
                          >
                            <Link
                              to="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between text-xs font-mono font-bold text-[#D96B33] uppercase tracking-wider py-1.5 px-3 border-b border-white/10 mb-1 rounded hover:bg-white/5"
                            >
                              <span>View All Services</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </motion.div>

                          {SERVICES.map((srv) => {
                            const isActive = location.pathname.startsWith('/services') && location.search.includes(srv.slug);
                            return (
                              <motion.div
                                key={srv.id}
                                variants={{
                                  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                                  hidden: { opacity: 0, x: -8, transition: { duration: 0.15 } }
                                }}
                              >
                                <Link 
                                  to={`/services?service=${srv.slug}`} 
                                  onClick={() => setMobileMenuOpen(false)} 
                                  className={`group flex items-center gap-3 text-[13.5px] font-sans font-medium py-1.5 px-2 rounded-lg transition-colors ${
                                    isActive
                                      ? 'text-[#D96B33] font-semibold bg-white/10'
                                      : 'text-white/85 hover:text-[#D96B33] hover:bg-white/5'
                                  }`}
                                >
                                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 rounded-lg ring-1 ring-inset transition-colors ${
                                    isActive
                                      ? 'bg-[#D96B33]/15 ring-[#D96B33]/60'
                                      : 'bg-white/[0.07] ring-white/15 group-hover:ring-[#D96B33]/50'
                                  }`}>
                                    {getServiceIcon(srv.slug, "w-5 h-5")}
                                  </div>
                                  <span className="truncate">{srv.title}</span>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PROJECTS */}
                <Link
                  to="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2.5 px-1 border-b border-white/10 transition-colors ${
                    location.pathname.startsWith('/projects') ? 'text-[#D96B33] font-semibold' : 'text-white hover:text-[#D96B33]'
                  }`}
                >
                  Projects
                </Link>

                {/* Corporate Governance Mobile Accordion */}
                <div>
                  <button 
                    type="button"
                    onClick={() => toggleMobileSubmenu('governance')}
                    className={`flex items-center justify-between w-full text-base font-medium py-2.5 px-1 border-b transition-colors cursor-pointer ${
                      location.pathname.startsWith('/corporate-governance') || mobileSubmenu === 'governance'
                        ? 'text-[#D96B33] font-semibold border-white/20'
                        : 'text-white hover:text-[#D96B33] border-white/10'
                    }`}
                  >
                    <span>Corporate Governance</span>
                    <motion.div
                      animate={{ rotate: mobileSubmenu === 'governance' ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="flex items-center justify-center p-1"
                    >
                      <ChevronDown className={`w-4 h-4 transition-colors ${
                        mobileSubmenu === 'governance' ? 'text-[#D96B33]' : 'text-white/70'
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSubmenu === 'governance' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: 'auto', 
                          opacity: 1,
                          transition: {
                            height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.22, ease: 'easeOut' }
                          }
                        }}
                        exit={{ 
                          height: 0, 
                          opacity: 0,
                          transition: {
                            height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.16, ease: 'easeIn' }
                          }
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          variants={{
                            show: {
                              transition: { staggerChildren: 0.03, delayChildren: 0.04 }
                            },
                            hidden: {
                              transition: { staggerChildren: 0.015, staggerDirection: -1 }
                            }
                          }}
                          className="mt-1.5 mb-2 py-2 px-2 flex flex-col gap-1 bg-[#101F31]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-inner"
                        >
                          {CORPORATE_GOVERNANCE.map((item) => {
                            const itemPath = `/corporate-governance/${item.slug}`;
                            const isActive = location.pathname === itemPath;
                            return (
                              <motion.div
                                key={item.slug}
                                variants={{
                                  show: { opacity: 1, x: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
                                  hidden: { opacity: 0, x: -8, transition: { duration: 0.15 } }
                                }}
                              >
                                <Link
                                  to={itemPath}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block text-[13.5px] py-2 px-3 rounded-lg transition-colors ${
                                    isActive
                                      ? 'text-[#D96B33] font-semibold bg-white/10'
                                      : 'text-white/85 hover:text-[#D96B33] hover:bg-white/5'
                                  }`}
                                >
                                  {item.navLabel}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CONTACT US BUTTON */}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 bg-[#D96B33] hover:bg-[#C25A28] text-white py-3.5 text-center text-xs font-mono font-bold tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
