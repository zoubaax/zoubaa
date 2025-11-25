import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, ChevronDown, ChevronUp, ExternalLink, Calendar, MapPin } from 'lucide-react';

// Import your language icons - update paths as needed
import reactIcon from '../assets/img/physics.png';
import javascriptIcon from '../assets/img/js.png';
import typescriptIcon from '../assets/img/typescript.png';

const WorkHistory = ({ drakeMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getTechIcon = (tech) => {
    const techIcons = {
      'JavaScript': javascriptIcon,
      'React': reactIcon,
      'TypeScript': typescriptIcon,
    };
    return techIcons[tech];
  };

  const experiences = [
    {
      role: "Software Engineer",
      company: "OneShield Software",
      duration: "Aug 2023 — Present",
      location: "Remote",
      description: "Developed enterprise-level software solutions for insurance platforms, focusing on scalable architecture and performance optimization. Worked with modern tech stacks to deliver robust applications.",
      technologies: ["React", "JavaScript", "Node.js", "MongoDB", "SQL", "Git", "VS Code"],
      type: "Full-time",
      highlights: ["Enterprise Software", "Performance Optimization", "Scalable Architecture"],
      achievements: [
        "Reduced application load time by 40% through code optimization",
        "Implemented microservices architecture serving 10k+ users",
        "Led migration from legacy systems to modern React stack"
      ]
    },
    {
      role: "Founder & Full-Stack Developer",
      company: "Design and Code",
      duration: "Jan 2023 — Present",
      location: "Remote",
      description: "Built custom web applications and digital experiences for clients worldwide, managing full-stack development and client relationships. Delivered end-to-end solutions from concept to deployment.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "Vercel", "Python", "Docker"],
      type: "Freelance",
      highlights: ["Full-Stack Development", "Client Management", "End-to-End Solutions"],
      achievements: [
        "Delivered 15+ projects for international clients",
        "Achieved 95% client satisfaction rate",
        "Built scalable solutions handling 50k+ monthly users"
      ]
    },
    {
      role: "Design Engineer",
      company: "Residuous",
      duration: "Feb 2025 — Mar 2026",
      location: "San Francisco, CA",
      description: "Bridged design and development to create pixel-perfect implementations with advanced animations and interactive experiences. Focused on creating engaging user interfaces.",
      technologies: ["TypeScript", "Three.js", "GSAP", "Framer Motion", "React", "Figma"],
      type: "Contract",
      highlights: ["Interactive Design", "Animation Development", "UI/UX Implementation"],
      achievements: [
        "Created award-winning interactive data visualizations",
        "Improved user engagement by 60% through animated interfaces",
        "Reduced development time by 30% with reusable component library"
      ]
    },
    {
      role: "UI/UX Designer",
      company: "Societol",
      duration: "Aug 2022 — Sep 2023",
      location: "New York, NY",
      description: "Designed and prototyped user interfaces for social media applications, conducting user research and usability testing to create intuitive user experiences.",
      technologies: ["Figma", "Adobe XD", "Illustrator", "Protopie", "HTML", "CSS"],
      type: "Full-time",
      highlights: ["User Research", "Prototyping", "Usability Testing"],
      achievements: [
        "Increased user retention by 35% through improved UX flows",
        "Conducted 50+ user testing sessions",
        "Designed mobile app with 4.8-star average rating"
      ]
    }
  ];

  const education = [
    {
      degree: "Software Engineering",
      institution: "OFPPT",
      duration: "2023 — 2025",
      location: "Morocco",
      description: "Advanced studies in software engineering with focus on modern web technologies, system architecture, and software development methodologies. Gaining expertise in full-stack development.",
      status: "In Progress",
      achievements: ["Advanced Web Technologies", "System Architecture", "Software Methodology", "Full-Stack Development"],
      technologies: ["React", "Node.js", "SQL", "JavaScript", "TypeScript", "Git", "VS Code"],
      gpa: "3.8/4.0",
      courses: ["Advanced Algorithms", "Cloud Computing", "Database Design", "Web Security"]
    },
    {
      degree: "Specialized Technician in Digital Development",
      institution: "OFPPT",
      duration: "2021 — 2023",
      location: "Morocco",
      description: "Comprehensive training in web development, mobile applications, digital design principles, and project management. Built strong foundation in modern development practices.",
      status: "Completed",
      achievements: ["Web Development", "Mobile Applications", "Digital Design", "Project Management"],
      technologies: ["HTML", "CSS", "JavaScript", "Python", "Java", "Figma"],
      gpa: "3.9/4.0",
      courses: ["Frontend Development", "Mobile App Design", "Project Management", "Digital Design Principles"]
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);

  const SectionHeader = ({ title, description }) => (
    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="inline-block relative mb-8">
        <div className={`absolute -inset-4 rounded-2xl blur-lg opacity-30 ${
          drakeMode ? 'bg-blue-500' : 'bg-cyan-400'
        }`}></div>
        <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight relative z-10 ${
          drakeMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      </div>
      <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light px-4 ${
        drakeMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );

  const TimelineDot = ({ isActive }) => (
    <div className="relative flex items-center justify-center">
      <div className={`absolute w-6 h-6 rounded-full transition-all duration-300 ${
        isActive 
          ? drakeMode ? 'bg-blue-400' : 'bg-blue-500'
          : drakeMode ? 'bg-gray-600' : 'bg-gray-400'
      }`}></div>
      <div className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
        isActive 
          ? 'bg-white animate-pulse' 
          : drakeMode ? 'bg-gray-800' : 'bg-white'
      }`}></div>
    </div>
  );

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 overflow-hidden ${
      drakeMode ? 'bg-gradient-to-br from-[#050A30] to-[#0A1A3A]' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Header */}
        <SectionHeader 
          title="My Journey" 
          description="From academic foundations to professional milestones, each step has shaped my expertise in creating exceptional digital experiences."
        />

        {/* Navigation Tabs */}
        <div className={`flex justify-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`flex rounded-2xl p-2 backdrop-blur-sm border ${
            drakeMode 
              ? 'bg-[#0A1A3A]/80 border-blue-500/30 shadow-2xl shadow-blue-500/10' 
              : 'bg-white/80 border-gray-200 shadow-xl'
          }`}>
            {[
              { id: 'work', label: 'Work Experience', icon: Briefcase, count: experiences.length },
              { id: 'education', label: 'Education', icon: GraduationCap, count: education.length }
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-all duration-300 relative ${
                  activeSection === id
                    ? drakeMode
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : drakeMode
                    ? 'text-gray-300 hover:text-white hover:bg-blue-500/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-500/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
                <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center ${
                  activeSection === id
                    ? 'bg-white text-blue-600'
                    : drakeMode
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02] ${
                    drakeMode 
                      ? 'bg-gradient-to-br from-[#0A1A3A] to-[#0f2a5a] border-blue-500/30 text-white hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20' 
                      : 'bg-white border-blue-200 text-gray-900 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Header with Gradient */}
                  <div className={`p-8 pb-6 relative overflow-hidden ${
                    drakeMode 
                      ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' 
                      : 'bg-gradient-to-r from-blue-50 to-cyan-50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className={`text-2xl font-bold mb-2 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                          {edu.degree}
                        </h4>
                        <p className={`text-xl font-semibold mb-2 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className={drakeMode ? 'text-gray-300' : 'text-gray-600'}>{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className={drakeMode ? 'text-gray-300' : 'text-gray-600'}>{edu.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold border ${
                        edu.status === 'In Progress' 
                          ? drakeMode 
                            ? 'bg-blue-500/30 text-blue-300 border-blue-500/50' 
                            : 'bg-blue-100 text-blue-700 border-blue-300'
                          : drakeMode 
                            ? 'bg-green-500/30 text-green-300 border-green-500/50' 
                            : 'bg-green-100 text-green-700 border-green-300'
                      }`}>
                        {edu.status}
                      </div>
                    </div>
                    
                    {/* GPA Badge */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      drakeMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      GPA: {edu.gpa}
                    </div>
                  </div>

                  <div className="p-8 pt-6">
                    {/* Description */}
                    <p className={`leading-relaxed mb-6 font-light ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {edu.description}
                    </p>

                    {/* Courses */}
                    <div className="mb-6">
                      <h5 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Key Courses
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course, i) => (
                          <span 
                            key={i}
                            className={`px-3 py-1 text-sm rounded-full border font-medium transition-all duration-200 ${
                              drakeMode
                                ? 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20'
                                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                            }`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h5 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        Technologies Mastered
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        {edu.technologies.map((tech, i) => {
                          const techIcon = getTechIcon(tech);
                          return (
                            <div 
                              key={i}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                                drakeMode 
                                  ? 'border-gray-600 bg-gray-800 hover:border-blue-400/50' 
                                  : 'border-gray-300 bg-white hover:border-blue-300'
                              }`}
                            >
                              {techIcon && (
                                <img 
                                  src={techIcon} 
                                  alt={tech}
                                  className="w-4 h-4"
                                />
                              )}
                              <span className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {tech}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {activeSection === 'work' && (
          <div className="transition-all duration-500">
            <div className="relative max-w-6xl mx-auto">
              {/* Vertical Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-1 ${
                drakeMode 
                  ? 'bg-gradient-to-b from-blue-500 via-cyan-500 to-transparent' 
                  : 'bg-gradient-to-b from-blue-400 via-cyan-400 to-transparent'
              }`}></div>
              
              <div className="space-y-8">
                {displayedExperiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className={`group relative pl-20 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 400}ms` }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 top-8 -translate-x-1/2 z-10">
                      <TimelineDot isActive={true} />
                    </div>

                    {/* Content Card */}
                    <div className={`rounded-3xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ease-out group-hover:scale-[1.01] ${
                      drakeMode
                        ? 'bg-gradient-to-br from-[#0A1A3A] to-[#0f2a5a] border-blue-500/30 text-white group-hover:border-blue-400/50 group-hover:shadow-2xl group-hover:shadow-blue-500/20'
                        : 'bg-white border-blue-200 text-gray-900 group-hover:border-blue-300 group-hover:shadow-2xl group-hover:shadow-blue-500/10'
                    }`}>
                      {/* Header with Gradient */}
                      <div className={`p-8 pb-6 relative overflow-hidden ${
                        drakeMode 
                          ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10' 
                          : 'bg-gradient-to-r from-blue-50 to-cyan-50'
                      }`}>
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className={`text-2xl md:text-3xl font-bold tracking-tight ${
                                drakeMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {exp.role}
                              </h3>
                              <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                                drakeMode
                                  ? 'bg-blue-500/30 text-blue-300 border-blue-500/50'
                                  : 'bg-blue-100 text-blue-700 border-blue-300'
                              }`}>
                                {exp.type}
                              </span>
                            </div>
                            <p className={`text-xl font-semibold mb-2 ${
                              drakeMode ? 'text-blue-400' : 'text-blue-600'
                            }`}>
                              {exp.company}
                            </p>
                            <div className="flex items-center gap-4 text-sm flex-wrap">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span className={drakeMode ? 'text-gray-300' : 'text-gray-600'}>{exp.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span className={drakeMode ? 'text-gray-300' : 'text-gray-600'}>{exp.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 pt-6">
                        {/* Description */}
                        <p className={`text-lg leading-relaxed mb-6 font-light ${
                          drakeMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {exp.description}
                        </p>

                        {/* Expandable Achievements */}
                        <div className="mb-6">
                          <button
                            onClick={() => toggleExpand(index)}
                            className={`flex items-center gap-2 mb-3 font-semibold transition-all duration-300 ${
                              drakeMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            Key Achievements
                            {expandedItems[index] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                          {expandedItems[index] && (
                            <div className="space-y-2 ml-6">
                              {exp.achievements.map((achievement, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 ${
                                    drakeMode ? 'bg-blue-400' : 'bg-blue-500'
                                  }`}></div>
                                  <p className={`flex-1 ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {achievement}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Technologies */}
                        <div>
                          <h5 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                            Tech Stack
                          </h5>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {exp.technologies.map((tech, i) => {
                              const techIcon = getTechIcon(tech);
                              return (
                                <div 
                                  key={i}
                                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 hover:scale-105 group ${
                                    drakeMode 
                                      ? 'border-gray-600 bg-gray-800 hover:border-blue-400/50 hover:bg-gray-700' 
                                      : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                                  }`}
                                >
                                  {techIcon && (
                                    <img 
                                      src={techIcon} 
                                      alt={tech}
                                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                                    />
                                  )}
                                  <span className={`text-sm font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {tech}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Show More/Less Button */}
            {experiences.length > 2 && (
              <div className={`text-center mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1200ms' }}>
                <button
                  onClick={() => setShowAll(!showAll)}
                  className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ease-out shadow-lg hover:shadow-xl relative overflow-hidden ${
                    drakeMode
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-105'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-105'
                  }`}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    {showAll ? (
                      <>
                        Show Less
                        <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </>
                    ) : (
                      <>
                        View All Experiences
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkHistory;