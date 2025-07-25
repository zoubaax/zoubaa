import React, { useState, useEffect } from 'react';
import { Code, Palette, Layers, Zap, Database, Globe, Figma, Monitor, Cpu, Sparkles } from 'lucide-react';

const WorkHistory = () => {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const getTechIcon = (tech) => {
    const techIcons = {
      'JavaScript': { icon: Code, color: '#F7DF1E' },
      'React': { icon: Layers, color: '#61DAFB' },
      'Node.js': { icon: Database, color: '#339933' },
      'MongoDB': { icon: Database, color: '#47A248' },
      'Next.js': { icon: Globe, color: '#000000' },
      'Tailwind CSS': { icon: Palette, color: '#06B6D4' },
      'Figma': { icon: Figma, color: '#F24E1E' },
      'Vercel': { icon: Zap, color: '#000000' },
      'TypeScript': { icon: Code, color: '#3178C6' },
      'Three.js': { icon: Cpu, color: '#049EF4' },
      'GSAP': { icon: Sparkles, color: '#88CE02' },
      'Framer Motion': { icon: Sparkles, color: '#FF0055' },
      'Adobe XD': { icon: Monitor, color: '#FF61F6' },
      'Illustrator': { icon: Palette, color: '#FF9A00' },
      'Protopie': { icon: Layers, color: '#7C4DFF' }
    };
    return techIcons[tech] || { icon: Code, color: '#4C7766' };
  };

  const experiences = [
    {
      role: "Software Engineer",
      company: "OneShield Software",
      duration: "Aug 2023 — Present",
      description: "Developed enterprise-level software solutions for insurance platforms, focusing on scalable architecture and performance optimization.",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB"]
    },
    {
      role: "Founder",
      company: "Design and Code",
      duration: "Jan 2023 — Present",
      description: "Built custom web applications and digital experiences for clients worldwide, managing full-stack development and client relationships.",
      technologies: ["Next.js", "Tailwind CSS", "Figma", "Vercel"]
    },
    {
      role: "Design Engineer",
      company: "Residuous",
      duration: "Feb 2025 — Mar 2026",
      description: "Bridged design and development to create pixel-perfect implementations with advanced animations and interactive experiences.",
      technologies: ["TypeScript", "Three.js", "GSAP", "Framer Motion"]
    },
    {
      role: "UI/UX Designer",
      company: "Societol",
      duration: "Aug 2022 — Sep 2023",
      description: "Designed and prototyped user interfaces for social media applications, conducting user research and usability testing.",
      technologies: ["Figma", "Adobe XD", "Illustrator", "Protopie"]
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#EBE6E0] text-[#1A1A1A] py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block">
            <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-[-0.02em] text-[#2C2C2C]">
              Work History
            </h2>
            <div className="w-0 h-[1px] bg-[#4C7766] mx-auto mb-8 animate-[expandWidth_1.5s_ease-out_0.5s_forwards]"></div>
          </div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[#5A5A5A] font-light">
            Crafting digital experiences with innovative industry leaders and building 
            exceptional products that make a difference.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#4C7766] via-[#4C7766]/50 to-transparent"></div>
          
          <div className="space-y-16">
            {displayedExperiences.map((exp, index) => {
              const IconComponent = index === 0 ? Code : index === 1 ? Palette : index === 2 ? Layers : Monitor;
              return (
                <div 
                  key={index} 
                  className={`group relative pl-16 md:pl-20 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] md:left-[26px] top-2 w-3 h-3 rounded-full bg-[#4C7766] border-4 border-[#EBE6E0] shadow-lg group-hover:scale-125 transition-transform duration-300 ease-out animate-pulse"></div>
                  
                  {/* Role Icon */}
                  <div className="absolute left-[8px] md:left-[16px] top-16 w-8 h-8 rounded-full bg-[#4C7766]/10 flex items-center justify-center group-hover:bg-[#4C7766]/20 transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-[#4C7766] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-sm border border-white/20 group-hover:shadow-md group-hover:bg-white/80 group-hover:scale-[1.02] transition-all duration-500 ease-out">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-medium text-[#4C7766] mb-2 tracking-[-0.01em] group-hover:text-[#3d5f52] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-xl md:text-2xl text-[#2C2C2C] font-light">
                          {exp.company}
                        </p>
                      </div>
                      <div className="lg:text-right">
                        <div className="inline-flex items-center px-4 py-2 bg-[#4C7766]/10 rounded-full text-[#4C7766] font-medium text-sm border border-[#4C7766]/20 group-hover:bg-[#4C7766]/20 transition-all duration-300">
                          {exp.duration}
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-[#5A5A5A] text-lg leading-relaxed mb-8 font-light">
                      {exp.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, i) => {
                        const { icon: TechIcon, color } = getTechIcon(tech);
                        return (
                          <span 
                            key={i} 
                            className="group/tech px-4 py-2 text-sm bg-[#4C7766]/5 text-[#4C7766] rounded-lg border border-[#4C7766]/10 font-medium hover:bg-[#4C7766]/10 hover:scale-105 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex items-center gap-2"
                            style={{ 
                              '--tech-color': color,
                              animationDelay: `${i * 100}ms`
                            }}
                          >
                            <TechIcon 
                              className="w-4 h-4 group-hover/tech:scale-110 transition-transform duration-200" 
                              style={{ color: color }}
                            />
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Show More/Less Button */}
        {experiences.length > 2 && (
          <div className={`text-center mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="group px-8 py-4 bg-[#4C7766] text-white rounded-full font-medium text-lg hover:bg-[#3d5f52] hover:scale-105 active:scale-95 transition-all duration-200 ease-out shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4C7766] to-[#3d5f52] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="flex items-center gap-2 relative z-10">
                {showAll ? (
                  <>
                    Show Less
                    <svg className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                ) : (
                  <>
                    View Full History
                    <svg className="w-5 h-5 group-hover:translate-y-0.5 group-hover:rotate-180 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </span>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-200"></div>
            </button>
          </div>
        )}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default WorkHistory;