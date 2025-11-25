import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, Code } from 'lucide-react';
import LogoLoop from '../hooks/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFigma, SiGithub } from 'react-icons/si';

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

// Import your language icons
import reactIcon from '../assets/img/physics.png';
import javascriptIcon from '../assets/img/js.png';
import typescriptIcon from '../assets/img/typescript.png';
import nodejsIcon from '../assets/img/node-js.png';
import mongodbIcon from '../assets/img/database.png';
import tailwindIcon from '../assets/img/Tailwind-CSS.png';
import figmaIcon from '../assets/img/figma.png';
import gitIcon from '../assets/img/github-sign.png';
import javaIcon from '../assets/img/java.png';

const WorkHistory = ({ drakeMode }) => {
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTechIcon = (tech) => {
    const techIcons = {
      'JavaScript': javascriptIcon,
      'React': reactIcon,
      'TypeScript': typescriptIcon,
      'Node.js': nodejsIcon,
      'MongoDB': mongodbIcon,
      'Tailwind CSS': tailwindIcon,
      'Figma': figmaIcon,
      'Git': gitIcon,
      'Java': javaIcon,
    };
    return techIcons[tech];
  };

  const experiences = [
    {
      role: "Software Engineer",
      company: "OneShield Software",
      duration: "Aug 2023 — Present",
      location: "Remote",
      description: "Developed enterprise-level software solutions for insurance platforms, focusing on scalable architecture and performance optimization.",
      technologies: ["React", "JavaScript", "Node.js", "MongoDB"],
      type: "Full-time",
      achievements: [
        "Reduced application load time by 40%",
        "Implemented microservices architecture",
        "Led migration to modern React stack"
      ]
    },
    {
      role: "Founder & Full-Stack Developer",
      company: "Design and Code",
      duration: "Jan 2023 — Present",
      location: "Remote",
      description: "Built custom web applications and digital experiences for clients worldwide, managing full-stack development and client relationships.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
      type: "Freelance",
      achievements: [
        "Delivered 15+ projects for international clients",
        "Achieved 95% client satisfaction rate",
        "Built scalable solutions for 50k+ users"
      ]
    },
    {
      role: "Design Engineer",
      company: "Residuous",
      duration: "Feb 2025 — Mar 2026",
      location: "San Francisco, CA",
      description: "Bridged design and development to create pixel-perfect implementations with advanced animations and interactive experiences.",
      technologies: ["TypeScript", "React", "Framer Motion", "Figma"],
      type: "Contract",
      achievements: [
        "Created award-winning interactive visualizations",
        "Improved user engagement by 60%",
        "Built reusable component library"
      ]
    },
    {
      role: "UI/UX Designer",
      company: "Societol",
      duration: "Aug 2022 — Sep 2023",
      location: "New York, NY",
      description: "Designed and prototyped user interfaces for social media applications, conducting user research and usability testing.",
      technologies: ["Figma", "Adobe XD", "HTML", "CSS"],
      type: "Full-time",
      achievements: [
        "Increased user retention by 35%",
        "Conducted 50+ user testing sessions",
        "Designed 4.8-star rated mobile app"
      ]
    }
  ];

  const education = [
    {
      degree: "Software Engineering",
      institution: "OFPPT",
      duration: "2023 — 2025",
      location: "Morocco",
      description: "Advanced studies in software engineering with focus on modern web technologies, system architecture, and software development methodologies.",
      status: "In Progress",
      technologies: ["React", "Node.js", "JavaScript", "TypeScript"],
      courses: ["Advanced Algorithms", "Cloud Computing", "Database Design"]
    },
    {
      degree: "Specialized Technician in Digital Development",
      institution: "OFPPT",
      duration: "2021 — 2023",
      location: "Morocco",
      description: "Comprehensive training in web development, mobile applications, digital design principles, and project management.",
      status: "Completed",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      courses: ["Frontend Development", "Mobile App Design", "Project Management"]
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);
  const displayedEducation = showAll ? education : education;

  const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${className}`}>
      {children}
    </div>
  );

  const TechStack = ({ technologies }) => (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, i) => {
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
  );

  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 ${
      drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
            drakeMode ? 'text-white' : 'text-gray-900'
          }`}>
            My Journey
          </h2>
          <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed ${
            drakeMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            From academic foundations to professional milestones, each step has shaped my expertise.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`flex rounded-2xl p-2 backdrop-blur-sm border ${
            drakeMode 
              ? 'bg-[#0A1A3A]/80 border-blue-500/30' 
              : 'bg-white/80 border-gray-200'
          }`}>
            {[
              { id: 'work', label: 'Work Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === id
                    ? drakeMode
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : drakeMode
                    ? 'text-gray-300 hover:text-white hover:bg-blue-500/20'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-blue-500/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="grid md:grid-cols-2 gap-8">
            {displayedEducation.map((edu, index) => (
              <Card
                key={index}
                className={`${
                  drakeMode 
                    ? 'bg-[#0A1A3A] border-blue-500/30 text-white' 
                    : 'bg-white border-blue-200 text-gray-900'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className={`p-6 border-b ${
                  drakeMode ? 'border-blue-500/20' : 'border-blue-200'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                        {edu.degree}
                      </h3>
                      <p className={`text-lg font-semibold mb-2 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {edu.institution}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      edu.status === 'In Progress' 
                        ? drakeMode 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-blue-100 text-blue-700'
                        : drakeMode 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-green-100 text-green-700'
                    }`}>
                      {edu.status}
                    </span>
                  </div>
                  
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

                {/* Content */}
                <div className="p-6">
                  <p className={`mb-6 leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {edu.description}
                  </p>

                  {/* Courses */}
                  <div className="mb-6">
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                      drakeMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Award className="w-4 h-4" />
                      Key Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span 
                          key={i}
                          className={`px-3 py-1 text-sm rounded-full border ${
                            drakeMode
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                      drakeMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Code className="w-4 h-4" />
                      Technologies
                    </h4>
                    <TechStack technologies={edu.technologies} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Work Experience Section */}
        {activeSection === 'work' && (
          <div className="grid md:grid-cols-2 gap-8">
            {displayedExperiences.map((exp, index) => (
              <Card
                key={index}
                className={`${
                  drakeMode 
                    ? 'bg-[#0A1A3A] border-blue-500/30 text-white' 
                    : 'bg-white border-blue-200 text-gray-900'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className={`p-6 border-b ${
                  drakeMode ? 'border-blue-500/20' : 'border-blue-200'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                        {exp.role}
                      </h3>
                      <p className={`text-lg font-semibold mb-2 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {exp.company}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      drakeMode
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
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

                {/* Content */}
                <div className="p-6">
                  <p className={`mb-6 leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                      drakeMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Award className="w-4 h-4" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            drakeMode ? 'bg-blue-400' : 'bg-blue-500'
                          }`}></div>
                          <p className={`flex-1 text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${
                      drakeMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Code className="w-4 h-4" />
                      Tech Stack
                    </h4>
                    <TechStack technologies={exp.technologies} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Show More Button for Work */}
        {activeSection === 'work' && experiences.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                drakeMode
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {showAll ? 'Show Less' : 'View All Experiences'}
            </button>
          </div>
        )}

        {/* Logo Loop Section */}
        <div className="mt-20">
          <div className={`text-center mb-8 ${
            drakeMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Technologies I Work With</h3>
            <p className="text-sm">Trusted by developers and companies worldwide</p>
          </div>
          
          <div >
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
    </div>
  );
};

export default WorkHistory;