import React, { useState, useMemo } from 'react';
import { MANAGEMENT_TEAM, ManagementMember } from '../data/management';
import { 
  Users, 
  Award, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  Search, 
  Filter, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  Compass, 
  TrendingUp 
} from 'lucide-react';

export const ManagementTeamPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMember, setActiveModalMember] = useState<ManagementMember | null>(null);

  const departments = ['All', 'Executive Leadership', 'Engineering & Technical', 'Financial Advisory', 'Project Management', 'Environmental & ESG'];

  const filteredMembers = useMemo(() => {
    return MANAGEMENT_TEAM.filter(member => {
      const matchesDept = selectedDepartment === 'All' || member.department === selectedDepartment;
      const matchesSearch = searchQuery.trim() === '' || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.competencies ?? []).some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        member.qualification.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesDept && matchesSearch;
    });
  }, [selectedDepartment, searchQuery]);

  return (
    <div className="about-dropdown-page flex flex-col min-h-screen bg-[#fdf9ed] pt-24">
      {/* Header Banner */}
      <section className="bg-[#0D1B2A] text-white py-16 border-b border-[#A49150]/30 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F2834C]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="about-dropdown-banner-copy flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F2834C]"></span>
              <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">EXECUTIVE LEADERSHIP & GOVERNANCE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight">Management Team Members</h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Decades of multidisciplinary engineering wisdom, financial acumen, and public sector stewardship driving Almondz Global Infra-Consultant Limited toward nation-building excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-[#071A2D] text-white py-8 border-b border-[#A49150]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F2834C]">200+</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Cumulative Experience (Years)</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white">5</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Core Specialist Divisions</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#A49150]">100+</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">Active Infrastructure Projects</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#F2834C]">100%</div>
              <div className="text-xs font-mono text-white/70 mt-1 uppercase tracking-wider">ISO Quality Governance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Roster Section */}
      <section className="about-dropdown-content py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Search & Department Tabs */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center mb-12">
            {/* Department Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 text-xs font-mono transition-all duration-200 border ${
                    selectedDepartment === dept
                      ? 'bg-[#0D1B2A] text-white border-[#0D1B2A] shadow-md'
                      : 'bg-white text-[#0D1B2A] border-[#A49150]/30 hover:border-[#F2834C] hover:bg-[#F2834C]/5'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#A49150]/30 text-xs text-[#0D1B2A] focus:outline-none focus:border-[#F2834C] transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Members Grid */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white border border-[#A49150]/30 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#F2834C] transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image & Department Badge */}
                  <div>
                    <div className="relative h-64 overflow-hidden bg-slate-900">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent opacity-80"></div>
                      
                      <div className="absolute top-4 left-4 bg-[#0D1B2A]/90 backdrop-blur-sm border border-[#A49150]/30 text-[#F2834C] text-[10px] font-mono px-3 py-1 uppercase tracking-wider">
                        {member.department ?? 'Management'}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[11px] font-mono text-[#A49150] block mb-0.5">{member.experienceYears}+ Years Industry Leadership</span>
                        <h3 className="text-xl font-serif font-bold leading-snug text-white group-hover:text-[#F2834C] transition-colors">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#F2834C] mb-1">{member.title}</div>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500">
                          <GraduationCap className="w-3.5 h-3.5 text-[#A49150]" />
                          <span>{member.qualification}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#1c1c15]/75 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Competencies Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                        {(member.competencies ?? []).slice(0, 3).map((comp, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-[#fdf9ed] border border-[#A49150]/20 text-[#0D1B2A] px-2 py-0.5">
                            {comp}
                          </span>
                        ))}
                        {(member.competencies?.length ?? 0) > 3 && (
                          <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5">
                            +{(member.competencies?.length ?? 0) - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 py-4 bg-[#fdf9ed]/60 border-t border-[#A49150]/20 flex items-center justify-between">
                    <button
                      onClick={() => setActiveModalMember(member)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#0D1B2A] hover:text-[#F2834C] transition-colors"
                    >
                      <span>View Detailed Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 rounded-none bg-[#0D1B2A] text-white flex items-center justify-center hover:bg-[#F2834C] transition-colors"
                      title={`Email ${member.name}`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-[#A49150]/30 p-8">
              <Users className="w-12 h-12 text-[#A49150] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-serif font-bold text-[#0D1B2A]">No management team members found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                No team members match your current filter or search criteria. Try clearing search filters.
              </p>
              <button
                onClick={() => { setSelectedDepartment('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-[#0D1B2A] text-white text-xs font-mono hover:bg-[#F2834C] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Governance Philosophy Section */}
      <section className="py-20 bg-[#0D1B2A] text-white border-t border-[#A49150]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-[#F2834C] uppercase">EXECUTIVE GOVERNANCE</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2">Pillars of Management Leadership</h2>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Our executive leadership adheres to rigorous institutional protocols, ensuring total accountability, transparent governance, and technical excellence across all client mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 hover:border-[#F2834C] transition-colors">
              <ShieldCheck className="w-8 h-8 text-[#F2834C]" />
              <h3 className="text-lg font-serif font-bold text-white">Technical Rigor</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Zero compromise on engineering safety, structural load validations, and international ISO quality standards.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 hover:border-[#A49150] transition-colors">
              <TrendingUp className="w-8 h-8 text-[#A49150]" />
              <h3 className="text-lg font-serif font-bold text-white">Fiscal Integrity</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Transparent transaction advisory, risk-mitigated PPP models, and prudent financial capital allocation.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 hover:border-[#F2834C] transition-colors">
              <Compass className="w-8 h-8 text-[#F2834C]" />
              <h3 className="text-lg font-serif font-bold text-white">BIM & GIS Innovation</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Pioneering 3D digital twin modeling, automated pavement audits, and drone-based spatial mapping.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 flex flex-col gap-4 hover:border-[#A49150] transition-colors">
              <Building2 className="w-8 h-8 text-[#A49150]" />
              <h3 className="text-lg font-serif font-bold text-white">ESG & Stewardship</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Embedding environmental protection, carbon footprint auditing, and social safeguards into every master plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Detail Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#A49150]/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Modal Header */}
            <div className="bg-[#0D1B2A] text-white p-6 relative">
              <button 
                onClick={() => setActiveModalMember(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-1.5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <img 
                  src={activeModalMember.image} 
                  alt={activeModalMember.name}
                  className="w-20 h-20 object-cover border-2 border-[#F2834C]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-[10px] font-mono text-[#F2834C] uppercase tracking-wider bg-[#F2834C]/10 px-2 py-0.5 border border-[#F2834C]/30">
                    {activeModalMember.department ?? 'Management'}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">{activeModalMember.name}</h3>
                  <p className="text-xs font-mono text-[#A49150]">{activeModalMember.title}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#F2834C]" />
                  Educational Credentials & Experience
                </h4>
                <p className="text-xs text-gray-700 font-mono bg-[#fdf9ed] p-3 border border-[#A49150]/20">
                  {activeModalMember.qualification} — <span className="text-[#F2834C] font-bold">{activeModalMember.experienceYears}+ Years Experience</span>
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#F2834C]" />
                  Professional Background
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {activeModalMember.bio}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F2834C]" />
                  Key Projects Supervised
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(activeModalMember.keyProjects ?? []).map((proj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 border border-gray-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F2834C] shrink-0 mt-0.5" />
                      <span>{proj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#0D1B2A] uppercase tracking-wider mb-2">
                  Core Technical Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(activeModalMember.competencies ?? []).map((comp, idx) => (
                    <span key={idx} className="text-xs font-mono bg-[#0D1B2A] text-white px-2.5 py-1">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <a
                href={`mailto:${activeModalMember.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D1B2A] text-white text-xs font-mono hover:bg-[#F2834C] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact {activeModalMember.name.split(' ')[0]}</span>
              </a>

              <button
                onClick={() => setActiveModalMember(null)}
                className="px-4 py-2 border border-gray-300 text-xs font-mono text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
