import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Calendar, ChevronDown, ChevronUp, Star, Users, Zap, TrendingUp, Filter } from 'lucide-react';
import TargetCursor from '../hooks/TargetCursor';
import LogoLoop from '../hooks/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFigma, SiGithub } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

// Import your local images
import healthcareImage from '../assets/img/Healthcare.jpg';
const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://mongodb.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
];

const ProjectsSection = ({ drakeMode }) => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const projects = [
    {
      id: 1,
      titleKey: "projects.1.title",
      descriptionKey: "projects.1.description",
      longDescription: "HIPAA-compliant healthcare platform serving 100+ medical practices with video consultations.",
      image: healthcareImage,
      technologies: ["React Native", "TypeScript", "Node.js", "MySQL", "WebRTC"],
      category: "mobile",
      status: "completed",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      metrics: {
        practices: "150+",
        patients: "500K+",
        uptime: "99.9%"
      },
      year: "2023",
      highlightsKey: "projects.1.highlights"
    },
    {
      id: 2,
      titleKey: "projects.2.title",
      descriptionKey: "projects.2.description",
      longDescription: "Built with modern microservices architecture, this platform handles 10,000+ daily transactions with seamless user experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      status: "completed",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      metrics: {
        users: "50K+",
        performance: "98%",
        revenue: "$2M+"
      },
      year: "2024",
      highlightsKey: "projects.2.highlights"
    },
    {
      id: 3,
      titleKey: "projects.3.title",
      descriptionKey: "projects.3.description",
      longDescription: "Leveraging GPT-4 and custom ML models to generate high-quality content with team collaboration.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
      category: "ai",
      status: "completed",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      metrics: {
        users: "25K+",
        performance: "95%",
        content: "1M+"
      },
      year: "2024",
      highlightsKey: "projects.3.highlights"
    }
  ];

  const categories = [
    { id: 'all', label: t('portfolio.all_projects'), count: projects.length, icon: <Zap className="w-4 h-4" /> },
    { id: 'fullstack', label: t('portfolio.fullstack'), count: projects.filter(p => p.category === 'fullstack').length, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'ai', label: t('portfolio.ai'), count: projects.filter(p => p.category === 'ai').length, icon: <Star className="w-4 h-4" /> },
    { id: 'mobile', label: t('portfolio.mobile'), count: projects.filter(p => p.category === 'mobile').length, icon: <Users className="w-4 h-4" /> },
    { id: 'data', label: t('portfolio.data'), count: projects.filter(p => p.category === 'data').length, icon: <Filter className="w-4 h-4" /> },
    { id: 'web3', label: t('portfolio.web3'), count: projects.filter(p => p.category === 'web3').length, icon: <Zap className="w-4 h-4" /> },
    { id: 'social', label: t('portfolio.social'), count: projects.filter(p => p.category === 'social').length, icon: <Users className="w-4 h-4" /> },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  const getActiveCategory = () => categories.find(cat => cat.id === activeFilter);

  const ProjectCard = ({ project }) => {
    // use translations for title/description and safely obtain highlights array
    const title = project.titleKey ? t(project.titleKey) : project.title || '';
    const description = project.descriptionKey ? t(project.descriptionKey) : project.description || '';
    const highlights = project.highlightsKey
      ? t(project.highlightsKey, { returnObjects: true }) || []
      : project.highlights || [];

    return (
      <div 
        className={`cursor-target group relative rounded-3xl border overflow-hidden transition-all duration-700 transform hover:-translate-y-2 h-full flex flex-col ${
          drakeMode 
            ? 'bg-[#050A30] border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20' 
            : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10'
        }`}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          drakeMode 
            ? 'bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5' 
            : 'bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-purple-500/5'
        }`}></div>

        {/* Status & Featured Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 transform group-hover:scale-105 ${
            project.status === 'completed' 
              ? drakeMode ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200'
              : drakeMode ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
          }`}>
            {project.status === 'completed' ? '🚀 Live' : '🛠️ In Progress'}
          </div>

          {project.featured && (
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border transition-all duration-300 transform group-hover:scale-105 ${
              drakeMode ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200'
            }`}>
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Image with Overlay */}
        <div className="relative h-44 overflow-hidden">
          <img 
            src={project.image} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            drakeMode ? 'from-[#050A30] via-[#050A30]/80 to-transparent' : 'from-white via-white/80 to-transparent'
          } transition-all duration-500`}></div>
          
          {/* Highlights */}
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
            {highlights.map((highlight, index) => (
              <span 
                key={index}
                className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm border transition-all duration-300 transform group-hover:scale-105 ${
                  drakeMode
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col relative z-10">
          {/* Year */}
          <div className="flex items-center gap-2 mb-3">
            <Calendar className={`w-4 h-4 ${drakeMode ? 'text-cyan-400' : 'text-blue-500'}`} />
            <span className={`text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
              {project.year}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className={`text-xl font-bold mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
            drakeMode ? 'text-white group-hover:from-cyan-400 group-hover:to-blue-500' : 'text-gray-900 group-hover:from-blue-500 group-hover:to-cyan-500'
          } transition-all duration-500`}>
            {title}
          </h3>
          
          <p className={`text-sm mb-4 leading-relaxed flex-1 ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className={`cursor-target px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 hover:scale-110 ${
                  drakeMode
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-cyan-400 hover:bg-cyan-500/20'
                    : 'bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-100'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className={`px-3 py-1.5 text-xs rounded-full border ${drakeMode ? 'bg-gray-700 text-gray-400 border-gray-600' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <a 
              href={project.liveUrl}
              className={`cursor-target flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                drakeMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              {t('portfolio.live_demo')}
            </a>
            
            <a 
              href={project.githubUrl}
              className={`cursor-target flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                drakeMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white border border-gray-600 hover:border-gray-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:border-gray-400'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          drakeMode 
            ? 'shadow-2xl shadow-cyan-500/10' 
            : 'shadow-2xl shadow-blue-500/5'
        }`}></div>
      </div>
    );
  };

  return (
    <div id="projects" className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased ${ drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]' }`}>
      {/* Target Cursor */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="cursor-target inline-flex items-center gap-4 mb-6">
            <div className={`w-20 h-0.5 bg-gradient-to-r ${ drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500' }`}></div>
            <span className={`text-sm font-semibold tracking-widest uppercase ${ drakeMode ? 'text-cyan-400' : 'text-blue-600' }`}>
              {t('portfolio.showcase')}
            </span>
            <div className={`w-20 h-0.5 bg-gradient-to-r ${ drakeMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500' }`}></div>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${ drakeMode ? 'text-white' : 'text-gray-900' }`}>
            {t('portfolio.title')}
          </h2>
          
          <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${ drakeMode ? 'text-gray-300' : 'text-gray-700' }`}>
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* All-in-One Filter Button */}
        <div className="flex justify-center mb-12 relative">
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`cursor-target flex items-center gap-4 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 border-2 backdrop-blur-sm ${
                drakeMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-2xl shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-2xl shadow-blue-500/25'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span className="flex items-center gap-3">
                {getActiveCategory().icon}
                {getActiveCategory().label}
                <span className="px-2 py-1 text-sm rounded-full bg-white/20">
                  {getActiveCategory().count}
                </span>
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showFilterDropdown && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl border-2 backdrop-blur-sm overflow-hidden z-50 ${ drakeMode ? 'bg-[#050A30] border-cyan-400/30 shadow-2xl shadow-cyan-500/20' : 'bg-white border-blue-200 shadow-2xl shadow-blue-500/10' }`}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveFilter(category.id);
                      setShowFilterDropdown(false);
                    }}
                    className={`cursor-target w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-300 hover:scale-[1.02] ${ activeFilter === category.id ? (drakeMode ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-500/10 text-blue-600') : (drakeMode ? 'text-gray-300 hover:bg-gray-700/50 hover:text-cyan-400' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600') }`}
                  >
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <span className="font-semibold">{category.label}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${ activeFilter === category.id ? (drakeMode ? 'bg-cyan-500/30 text-cyan-300' : 'bg-blue-500/20 text-blue-600') : (drakeMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500') }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 3 && (
          <div className="text-center mb-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`cursor-target px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 flex items-center gap-3 mx-auto ${ drakeMode ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/25' }`}
            >
              {showAll ? (
                <>
                  {t('portfolio.show_less')}
                  <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  {t('portfolio.view_more')}
                  <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
            <p className={`text-sm mt-3 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {showAll ? t('portfolio.displaying_all', { count: filteredProjects.length }) : t('portfolio.showing_of', { count: filteredProjects.length })}
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className={`cursor-target inline-flex flex-col items-center p-8 rounded-3xl border-2 backdrop-blur-sm max-w-2xl mx-auto ${ drakeMode ? 'bg-[#050A30] border-cyan-400/30' : 'bg-white border-blue-200' }`}>
            <h3 className={`text-3xl font-bold mb-4 ${ drakeMode ? 'text-white' : 'text-gray-900' }`}>
              {t('portfolio.powered')}
            </h3>
            <p className={`text-lg mb-6 ${ drakeMode ? 'text-gray-300' : 'text-gray-700' }`}>
              {t('portfolio.technologies')}
            </p>
            <a 
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`cursor-target px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 flex items-center gap-3 ${ drakeMode ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/25' }`}
            >
              {t('portfolio.cta_start')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Logo Loop Section */}
        <div className="mt-20">
          <div className={`text-center mb-8 ${ drakeMode ? 'text-gray-300' : 'text-gray-600' }`}>
            <h3 className="text-xl font-semibold mb-2 cursor-target">{t('portfolio.powered')}</h3>
            <p className="text-sm cursor-target">{t('portfolio.technologies')}</p>
          </div>
          
          <div className="cursor-target">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor={drakeMode ? "#050A30" : "#eff9ff"}
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showFilterDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowFilterDropdown(false)}
        />
      )}

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectsSection;