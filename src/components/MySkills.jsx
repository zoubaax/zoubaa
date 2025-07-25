import React, { useState } from 'react';
import TargetCursor from '../hooks/TargetCursor';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const MySkills = ({ drakeMode }) => {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = {
    languages: {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'JavaScript', level: 95, color: '#F7DF1E', prompt: '$' },
        { name: 'Python', level: 88, color: '#3776AB', prompt: '>>>' },
        { name: 'TypeScript', level: 90, color: '#3178C6', prompt: '>' },
        { name: 'Java', level: 75, color: '#ED8B00', prompt: '>' },
        { name: 'C++', level: 70, color: '#00599C', prompt: '>' },
        { name: 'SQL', level: 85, color: '#336791', prompt: '>' }
      ],
      terminalStyle: true
    },
    frameworks: {
      title: 'Frameworks & Libraries',
      icon: '⚛️',
      skills: [
        { name: 'React', level: 95, color: '#61DAFB' },
        { name: 'Node.js', level: 90, color: '#339933' },
        { name: 'Next.js', level: 88, color: '#000000' },
        { name: 'Express.js', level: 85, color: '#000000' },
        { name: 'Three.js', level: 80, color: '#000000' },
        { name: 'FastAPI', level: 82, color: '#009688' }
      ]
    },
    tools: {
      title: 'Development Tools',
      icon: '🛠️',
      skills: [
        { name: 'Docker', level: 88, color: '#2496ED' },
        { name: 'Git', level: 92, color: '#F05032' },
        { name: 'VS Code', level: 95, color: '#007ACC' },
        { name: 'Webpack', level: 75, color: '#8DD6F9' },
        { name: 'Jest', level: 80, color: '#C21325' },
        { name: 'Postman', level: 85, color: '#FF6C37' }
      ]
    },
    design: {
      title: 'Design & UI/UX',
      icon: '🎨',
      skills: [
        { name: 'Figma', level: 92, color: '#F24E1E' },
        { name: 'Adobe XD', level: 85, color: '#FF61F6' },
        { name: 'Illustrator', level: 78, color: '#FF9A00' },
        { name: 'Photoshop', level: 75, color: '#31A8FF' },
        { name: 'Tailwind CSS', level: 93, color: '#06B6D4' },
        { name: 'Sass/SCSS', level: 88, color: '#CC6699' }
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 font-sans antialiased ${drakeMode ? 'bg-[#1A1A1A]' : 'bg-[#EBE6E0]'}`}>
      <TargetCursor 
        targetSelector=".cursor-target" 
        spinDuration={2} 
        hideDefaultCursor={true}
      />
      <div className="max-w-6xl w-full py-12">
        {/* Header */}
        <div className="cursor-target group text-center mb-16">
          <div className="inline-block mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium tracking-wide backdrop-blur-sm ${drakeMode ? 'bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700]' : 'bg-[#4C7766]/10 border border-[#4C7766]/20 text-[#4C7766]'}`}>
              Technical Expertise
            </span>
          </div>
          <h1 className={`text-5xl font-normal tracking-tight leading-tight mb-6 ${drakeMode ? 'text-[#FFD700]' : 'text-[#818181]'}`}>
            My <span className={`${drakeMode ? 'text-[#FFD700]' : 'text-[#4C7766]'} font-light`}>Skills</span>
          </h1>
          <div className={`relative w-24 h-px mx-auto mb-8 overflow-hidden ${drakeMode ? 'bg-[#FFD700]/30' : 'bg-[#818181]/30'}`}>
            <div className={`absolute inset-y-0 left-0 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 origin-left ${drakeMode ? 'bg-[#FFD700]' : 'bg-[#818181]'}`}></div>
          </div>
          <p className={`max-w-2xl mx-auto text-xl italic transform hover:scale-[1.01] transition-transform ${drakeMode ? 'text-[#FFD700]/80' : 'text-[#818181]/80'}`}>
            A comprehensive toolkit spanning modern web technologies, cloud platforms, 
            and design systems to build exceptional digital experiences.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`cursor-target group relative px-6 py-3 rounded-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#4C7766] text-white'
                  : 'border border-[#4C7766] text-[#818181] hover:bg-[#818181]/5'
              }`}
            >
              <span className="flex items-center gap-2 relative z-10">
                <span className="text-lg">{skillCategories[category].icon}</span>
                <span className="hidden sm:inline">{skillCategories[category].title}</span>
                <span className="sm:hidden">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </span>
              {activeCategory === category && (
                <span className="absolute inset-0 bg-[#4C7766] opacity-20"></span>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`cursor-target group relative rounded-sm p-6 transition-all duration-300 ${
                activeCategory === 'languages' 
                  ? 'bg-[#0D0D0D] border border-[#4C7766]/30 hover:border-[#4C7766]/60 terminal-font'
                  : 'bg-[#1a1a1a] border border-[#333] hover:border-[#4C7766]'
              }`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {activeCategory === 'languages' ? (
                <>
                  {/* Terminal-style header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <h3 className="text-sm font-mono text-[#818181]">
                      {skill.name.toLowerCase()}.sh
                    </h3>
                  </div>

                  {/* Terminal-style content */}
                  <div className="font-mono text-sm mb-4">
                    <p className="text-[#4C7766]">{skill.prompt} <span className="text-[#818181]">./skill --level</span></p>
                    <div className="flex items-center mt-2">
                      <span className="text-[#4C7766] mr-2">{skill.prompt}</span>
                      <div className="w-full bg-[#1a1a1a] rounded-sm h-4 overflow-hidden border border-[#333]">
                        <div
                          className="h-full bg-[#4C7766] transition-all duration-1000 ease-out"
                          style={{
                            width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                            transitionDelay: hoveredSkill === skill.name ? '200ms' : '0ms'
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-[#4C7766] mt-2">{skill.prompt} <span className="text-[#818181]"># {skill.level}% proficiency</span></p>
                  </div>

                  {/* Terminal-style status */}
                  <div className="font-mono text-xs text-[#818181] mt-4 pt-2 border-t border-[#333]">
                    <p>[{new Date().toLocaleTimeString()}] STATUS: { 
                      skill.level >= 90 ? 'EXPERT' : 
                      skill.level >= 80 ? 'ADVANCED' : 
                      skill.level >= 70 ? 'INTERMEDIATE' : 'LEARNING'
                    }</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Original non-terminal style */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium text-[#818181] group-hover:text-[#4C7766] transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    ></div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#818181]">Proficiency</span>
                      <span className="text-sm font-medium text-[#4C7766]">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-[#4C7766] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                          transitionDelay: hoveredSkill === skill.name ? '200ms' : '0ms'
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            star <= Math.ceil(skill.level / 20)
                              ? 'bg-[#4C7766]'
                              : 'bg-[#404040]'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-[#818181] ml-2">
                      {skill.level >= 90 ? 'Expert' : 
                       skill.level >= 80 ? 'Advanced' : 
                       skill.level >= 70 ? 'Intermediate' : 'Learning'}
                    </span>
                  </div>
                </>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#4C7766]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '6+', label: 'Programming Languages' },
            { value: '15+', label: 'Frameworks & Libraries' },
            { value: '20+', label: 'Development Tools' },
            { value: '3+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div key={index} className="cursor-target text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-[#4C7766] mb-2">{stat.value}</div>
              <div className="text-[#818181]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-5 pt-16">
          <a href="#" className="cursor-target text-[#818181]/60 hover:text-[#4C7766] transition-colors flex items-center gap-2">
            <FaGithub className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </a>
          <a href="#" className="cursor-target text-[#818181]/60 hover:text-[#4C7766] transition-colors flex items-center gap-2">
            <FaLinkedin className="w-5 h-5" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Add this style tag for the terminal font */}
      <style jsx global>{`
        .terminal-font {
          font-family: 'SF Mono', 'Roboto Mono', 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};

export default MySkills;