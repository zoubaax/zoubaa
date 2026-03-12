import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { getCVUrl } from '../services/cvService';
import zoubaaImage from '../assets/img/zoubaa2.jpg';
import handIcon from '../assets/img/hand-icon.png';
import resumePDF from '../assets/img/ZOUBAA-Mohammed.pdf';

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

export default function Home() {
  const { isDarkMode: drakeMode } = useTheme();
  const { t } = useTranslation();
  const [dynamicCvUrl, setDynamicCvUrl] = useState(resumePDF);

  useEffect(() => {
    async function fetchCv() {
      const { url } = await getCVUrl();
      if (url) {
        setDynamicCvUrl(url);
      }
    }
    fetchCv();
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-10 font-sans antialiased relative overflow-hidden ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>

      <div className="max-w-6xl w-full flex flex-col pt-20 pb-10 md:py-12 md:flex-row items-center gap-6 md:gap-12 relative z-10">
        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
        >
          <div className="cursor-target group relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
            <div className={`aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 ${drakeMode ? 'border-transparent' : 'border-white'}`}>
              <img
                src={zoubaaImage}
                alt="Mohammed Zoubaa"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-[#4C7766]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 px-2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
        >
          {/* Name Section */}
          <div className="cursor-target mb-4">
            <h1 className={`flex items-end justify-center md:justify-start gap-2 text-xl md:text-2xl font-medium ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
              {t('home.greeting', { defaultValue: "Hi! I'm ZOUBAA Mohammed" })}
              <img
                src={handIcon}
                alt={t('home.wave_alt', { defaultValue: 'Wave' })}
                className="w-6 animate-bounce"
              />
            </h1>
          </div>

          {/* Title Section */}
          <div className="cursor-target mb-8">
            <p className={`max-w-3xl mx-auto md:mx-0 text-base md:text-lg leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('home.intro', { defaultValue: "Full-stack developer and Computer Engineering student, passionate about building modern web applications with React, Node.js, and DevOps practices." })}
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="cursor-target w-full sm:w-auto px-6 py-3 border rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium group text-sm"
            >
              {t('home.contact_button', { defaultValue: 'Contact me' })}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={dynamicCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-target w-full sm:w-auto px-6 py-3 border rounded-full flex items-center justify-center gap-2 transition-all duration-300 font-medium group text-sm ${drakeMode
                ? 'bg-white/5 border-gray-500 text-white hover:bg-white/10'
                : 'bg-white border-gray-500 text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
            >
              {t('home.resume_button', { defaultValue: 'My resume' })}
              <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6 mt-10">
            <a href="https://github.com/zoubaax" target="_blank" rel="noopener noreferrer" className="cursor-target text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-3 group font-medium">
              <div className={`p-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 ${drakeMode ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white group-hover:bg-blue-50'}`}>
                <Github className="w-5 h-5 transition-colors duration-300" />
              </div>
              <span className={`text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.github', { defaultValue: 'GitHub' })}</span>
            </a>

            <a href="https://www.linkedin.com/in/zoubaa-mohammed-398266350" target="_blank" rel="noopener noreferrer" className="cursor-target text-gray-600 hover:text-blue-500 transition-all duration-300 flex items-center justify-center gap-3 group font-medium">
              <div className={`p-2 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 ${drakeMode ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white group-hover:bg-blue-50'}`}>
                <Linkedin className="w-5 h-5 transition-colors duration-300" />
              </div>
              <span className={`text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.linkedin', { defaultValue: 'LinkedIn' })}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}