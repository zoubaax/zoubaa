import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, Award, Code } from 'lucide-react';
import LogoLoop from '../hooks/LogoLoop';
import TargetCursor from '../hooks/TargetCursor';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFigma, SiGithub } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

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
import angularjs from '../assets/img/angularjs.png';
import springboot from '../assets/img/spring-boot.png';
import SeleniumLogo from '../assets/img/Selenium_Logo.png';
import MachineLearning from '../assets/img/brain.png';
import dotNet from '../assets/img/NET.png';
import Python from '../assets/img/Python.png';
import PostgresSQL from '../assets/img/PostgresSQL.png';
import supabase from '../assets/img/supabase.png';

// Import company logos - you'll need to add these images to your assets
import LOGOFMPDF from '../assets/img/LOGO-FMPDF.png';
import NewDev from '../assets/img/NewDev.jpeg';
import fiverr from '../assets/img/fiverr.webp';

const WorkHistory = ({ drakeMode }) => {
  const { t } = useTranslation();
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
      'GitHub': gitIcon,
      'Java': javaIcon,
      'angularjs': angularjs,
      'Spring Boot': springboot,
      'Selenium': SeleniumLogo,
      'Machine Learning': MachineLearning,
      '.NET': dotNet,
      'Python': Python,
      'PostgreSQL': PostgresSQL,
      'Supabase': supabase,
    };
    return techIcons[tech];
  };

  const getCompanyLogo = (company) => {
    const companyLogos = {
      'The Center for E-Learning, Simulation and Telemedicine': LOGOFMPDF,
      'NewDev Maroc': NewDev,
      'Fiverr - Freelance': fiverr,

    };
    return companyLogos[company] || defaultCompanyLogo;
  };

  const experiences = [
    {
      role: "Full-Stack Developer",
      company: "Fiverr - Freelance",
      duration: "Jan 2024 — Present",
      location: "Remote",
      description: "Providing full-stack development services to international clients through Fiverr platform. Specializing in building e-learning platforms, web applications, and custom software solutions using modern technologies.",
      technologies: ["React", "Node.js", "Supabase", "JavaScript", "Python", "PostgreSQL", "Tailwind CSS", "Figma", "GitHub"],
      type: "Freelance",
      achievements: [
        "Delivered  successful projects",
        "Built custom e-learning platforms with interactive features",
        "Developed medical management systems for healthcare clients",
      ]
    },
   
    {
      role: "Full-Stack Developer",
      company: "NewDev Maroc",
      duration: "Feb 2025 – April 2025",
      location: "Remote",
      description: "Creation of a medical management system with React.js, Tailwind CSS, Express.js and PostgreSQL; integration of features (online appointment scheduling, office administration, patient tracking) and DevOps practices for deployment.",
      technologies: ["React", "JavaScript", "Node.js", "PostgreSQL", "Tailwind CSS", "GitHub", "Figma"],
      type: "Full-time",
      achievements: [
        "Enabled online appointments",
        "Streamlined clinic administration",
        "Automated DevOps deployment"
      ]
    },
     {
      role: "Full-Stack Developer",
      company: "The Center for E-Learning, Simulation and Telemedicine",
      duration: "Jan 2023 — Present",
      location: "Remote",
      description: "Development of a Python e-learning platform with React.js, Tailwind CSS, Express.js and PostgreSQL; integration of interactive features (quiz, exercises, animations) and collaborative management via GitHub.",
      technologies: ["PostgreSQL", "JavaScript", "Tailwind CSS", "Figma", "React", "Node.js"],
      type: "Freelance",
      achievements: [
        "Built Python e-learning platform",
        "Added interactive quizzes & exercises",
        "Managed collaboration via GitHub"
      ]
    },
  ];

  const education = [
    {
      degree: "Software Engineering",
      institution: "The Private University of Fez (UPF)",
      duration: "2025 — Present",
      location: "Morocco",
      description: "Advanced studies in software engineering with focus on modern web technologies, system architecture, and software development methodologies.",
      status: "In Progress",
      technologies: ["angularjs", "Spring Boot", "Selenium", "Machine Learning", ".NET"],
      courses: ["Full Stack", "Cloud Computing", "Database Design", " DevOps", "Testing & QA", "Machine Learning", "Deep Learning"]
    },
    {
      degree: "Specialized Technician in Digital Development",
      institution: "OFPPT",
      duration: "2023 — 2025",
      location: "Morocco",
      description: "Comprehensive training in web development, mobile applications, digital design principles, and project management.",
      status: "Completed",
      technologies: ["React", "Node.js", "JavaScript", "Python", "PostgreSQL", "Figma"],
      courses: ["Frontend Development", "UI/UX", "Project Management"]
    }
  ];

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 2);
  const displayedEducation = showAll ? education : education;

  const Card = ({ children, className = "" }) => (
    <div className={`cursor-target rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-xl ${className}`}>
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
            className={`cursor-target flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${drakeMode
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
    <div className={`min-h-screen py-20 px-4 sm:px-6 relative ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
      {/* Target Cursor */}
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="cursor-target inline-flex items-center gap-4 mb-6">
            <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'}`}></div>
            <span className={`text-sm font-semibold tracking-widest uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
              {t('about.my_journey')}
            </span>
            <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'}`}></div>
          </div>

          <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
            {t('about.title')}
          </h2>

          <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('about.subtitle')}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`cursor-target flex rounded-2xl p-2 backdrop-blur-sm border ${drakeMode ? 'bg-[#0A1A3A]/80 border-blue-500/30' : 'bg-white/80 border-gray-200'}`}>
            {[
              { id: 'work', labelKey: 'about.work_experience', icon: Briefcase },
              { id: 'education', labelKey: 'about.education', icon: GraduationCap }
            ].map(({ id, labelKey, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`cursor-target flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeSection === id ? (drakeMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25') : (drakeMode ? 'text-gray-300 hover:text-white hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10' : 'text-gray-600 hover:text-gray-900 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/5')}`}
              >
                <Icon className="w-5 h-5" />
                {t(labelKey)}
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
                className={`${drakeMode
                    ? 'bg-[#0A1A3A] border-blue-500/30 text-white'
                    : 'bg-white border-blue-200 text-gray-900'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Header */}
                <div className={`p-6 border-b ${drakeMode ? 'border-blue-500/20' : 'border-blue-200'
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
                    <span className={`cursor-target px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${edu.status === 'In Progress'
                        ? drakeMode
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                        : drakeMode
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-green-100 text-green-700 border border-green-200'
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
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${drakeMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                      <Award className="w-4 h-4" />
                      Key Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className={`cursor-target px-3 py-1 text-sm rounded-full border transition-all duration-300 hover:scale-105 ${drakeMode
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-400'
                              : 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400'
                            }`}
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${drakeMode ? 'text-blue-400' : 'text-blue-600'
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
            {displayedExperiences.map((exp, index) => {
              const companyLogo = getCompanyLogo(exp.company);
              return (
                <Card
                  key={index}
                  className={`${drakeMode
                      ? 'bg-[#0A1A3A] border-blue-500/30 text-white'
                      : 'bg-white border-blue-200 text-gray-900'
                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Header with Company Logo */}
                  <div className={`p-6 border-b ${drakeMode ? 'border-blue-500/20' : 'border-blue-200'
                    }`}>
                    <div className="flex items-start gap-4 mb-3">
                      {/* Company Logo */}
                      <div className="flex-shrink-0">
                        <img
                          src={companyLogo}
                          alt={`${exp.company} logo`}
                          className="w-12 h-12"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-1 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
                          {exp.role}
                        </h3>
                        <p className={`text-lg font-semibold mb-2 ${drakeMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {exp.company}
                        </p>
                      </div>

                      <span className={`cursor-target px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${drakeMode
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
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
                      <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${drakeMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                        <Award className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3 cursor-target group">
                            <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 group-hover:scale-150 ${drakeMode ? 'bg-blue-400' : 'bg-blue-500'
                              }`}></div>
                            <p className={`flex-1 text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-600'} group-hover:translate-x-1 transition-transform duration-300`}>
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider mb-3 ${drakeMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                        <Code className="w-4 h-4" />
                        Tech Stack
                      </h4>
                      <TechStack technologies={exp.technologies} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Show More Button for Work */}
        {activeSection === 'work' && experiences.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`cursor-target px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${drakeMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25'}`}
            >
              {showAll ? t('about.show_less') : t('about.view_all_experiences')}
            </button>
          </div>
        )}

        {/* Logo Loop Section */}
        <div className="mt-20">
          <div className={`text-center mb-8 ${drakeMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
            <h3 className="text-xl font-semibold mb-2 cursor-target">Technologies I Work With</h3>
            <p className="text-sm cursor-target">Trusted by developers and companies worldwide</p>
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
    </div>
  );
};

export default WorkHistory;