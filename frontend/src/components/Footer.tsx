import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowRight, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#16283D] text-white pt-12 pb-8 border-t border-[#A49150]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-white/10">

          {/* Col 1: Brand & Address */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Logo light={true} />
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Almondz Global Infra Consultant Limited is an ISO 9001:2015, ISO/IEC 27001:2022, ISO 45001:2018, ISO 14001:2015 and CMMI Level 3 certified public limited company providing integrated infrastructure consultancy, engineering and advisory solutions from concept to commissioning.
            </p>
            <div className="flex flex-col gap-2 text-xs font-mono text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2834C] shrink-0 mt-0.5" />
                <span>Registered & Corporate Office: F-33/3, Okhla Industrial Area, Phase-II, New Delhi-110020, INDIA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F2834C] shrink-0" />
                <span>contact@almondzglobalinfra.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#F2834C] flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#F2834C] flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">COMPANY</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Overview</Link></li>
              <li><Link to="/about/mission-vision" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Mission & Vision</Link></li>
              <li><Link to="/about/leadership" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Leadership & Board</Link></li>
              <li><Link to="/about/management-team" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Management Team Members</Link></li>
              <li><Link to="/about/certifications" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Certifications</Link></li>
              <li><Link to="/about/careers" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Careers</Link></li>
            </ul>
          </div>

          {/* Col 3: Expertise */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">EXPERTISE</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/sectors" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Sectors Overview</Link></li>
              <li><Link to="/services" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Services Directory</Link></li>
              <li><Link to="/projects" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Project Portfolio</Link></li>
              <li><Link to="/projects/recently-awarded" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Recently Awarded</Link></li>
              <li><Link to="/projects/ongoing" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Ongoing Projects</Link></li>
              <li><Link to="/projects/completed" className="text-white/80 hover:text-white hover:translate-x-0.5 transition-all inline-block">Completed Projects</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">STAY INFORMED</h4>
            <p className="text-xs text-white/70 leading-relaxed">Subscribe for the latest infrastructure insights and project milestones.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Almondz Infrastructure Insights."); }}>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white/5 border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F2834C] focus:bg-white/10 rounded-full pr-11 transition-colors"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 w-8 rounded-full bg-[#F2834C] hover:bg-[#d9723f] text-white flex items-center justify-center transition-colors" aria-label="Subscribe">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="text-[11px] font-mono text-white/50 pt-1">
              ISO 9001:2015 · ISO 27001 · ISO 45001 · ISO 14001 · CMMI LEVEL 3
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Almondz Global Infra-Consultant Limited. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
