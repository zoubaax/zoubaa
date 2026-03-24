import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getCVUrl } from '../services/cvService';
import zoubaaImage from '../assets/img/zoubaa2.jpg';
import handIcon from '../assets/img/hand-icon.png';
import resumePDF from '../assets/img/ZOUBAA-Mohammed.pdf';
// import ShapeGrid from './ShapeGrid';

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
  const navigate = useNavigate();
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
    <div className={`min-h-screen flex items-center justify-center p-4 md:p-10 font-sans antialiased relative overflow-hidden transition-colors duration-700 ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
      
      {/* Interactive Shape Grid Background - Uncomment to enable */}
      {/* 
      <div className="absolute inset-0 w-full h-full z-0 opacity-40">
        <ShapeGrid 
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor={drakeMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}
          hoverFillColor={drakeMode ? '#1A1E37' : '#e2e8f0'}
          shape='square'
          hoverTrailAmount={5}
        />
      </div>
      */}

      <div className="max-w-6xl w-full flex flex-col pt-24 pb-6 md:py-16 md:flex-row items-center gap-10 md:gap-14 relative z-10">
        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
        >
          <div className="cursor-target group relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
            <div className={`aspect-square overflow-hidden rounded-3xl shadow-2xl border-2 md:border-4 ${drakeMode ? 'border-cyan-500/20' : 'border-white'}`}>
              <img
                src={zoubaaImage}
                alt="Mohammed Zoubaa"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            {/* Subtle Glow behind image */}
            <div className={`absolute -inset-4 rounded-full blur-3xl opacity-20 -z-10 ${drakeMode ? 'bg-cyan-500' : 'bg-blue-500'}`}></div>
          </div>
        </motion.div>

        {/* Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 px-4 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1"
        >
          {/* Greeting Section */}
          <div className="cursor-target mb-3">
            <h1 className={`flex items-center justify-center md:justify-start gap-2 text-xl md:text-3xl font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
              {t('home.greeting')}
              <img
                src={handIcon}
                alt={t('home.wave_alt', { defaultValue: 'Wave' })}
                className="w-6 md:w-8 animate-bounce"
              />
            </h1>
          </div>

          {/* Headline Section */}
          <div className="cursor-target mb-4">
             <div className={`text-sm md:text-lg font-extrabold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-600 to-cyan-500'}`}>
               {t('home.headline')}
             </div>
          </div>

          {/* Intro Section */}
          <div className="cursor-target mb-10 text-justify md:text-left">
            <p className={`max-w-2xl mx-auto md:mx-0 text-base md:text-lg leading-relaxed font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.intro')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-2 w-full max-w-sm sm:max-w-none">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="cursor-target flex-1 md:w-auto px-4 sm:px-8 py-3 sm:py-4 border rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center gap-1.5 sm:gap-3 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 font-bold group text-[10px] xs:text-xs md:text-base transform hover:-translate-y-1"
            >
              <span className="whitespace-nowrap">{t('home.contact_button', { defaultValue: 'Contact me' })}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={dynamicCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-target flex-1 md:w-auto px-4 sm:px-8 py-3 sm:py-4 border rounded-xl flex items-center justify-center gap-1.5 sm:gap-3 transition-all duration-300 font-bold group text-[10px] xs:text-xs md:text-base transform hover:-translate-y-1 ${drakeMode
                ? 'bg-white/5 border-gray-600 text-white hover:bg-white/10 hover:border-gray-400 shadow-lg'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-xl'
                }`}
            >
              <span className="whitespace-nowrap">{t('home.resume_button', { defaultValue: 'My resume' })}</span>
              <Download className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start items-center space-x-8 mt-12 w-full md:w-auto">
            <a href="https://github.com/zoubaax" target="_blank" rel="noopener noreferrer" className="cursor-target group flex flex-col items-center gap-2">
              <div className={`p-4 rounded-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 ${drakeMode ? 'bg-white/10 group-hover:bg-white/20 text-white' : 'bg-white group-hover:bg-blue-50 text-gray-700 shadow-sm'}`}>
                <Github className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('home.github', { defaultValue: 'GitHub' })}</span>
            </a>

            <a href="https://www.linkedin.com/in/zoubaa-mohammed-398266350" target="_blank" rel="noopener noreferrer" className="cursor-target group flex flex-col items-center gap-2">
              <div className={`p-4 rounded-2xl transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 ${drakeMode ? 'bg-white/10 group-hover:bg-white/20 text-white' : 'bg-white group-hover:bg-blue-50 text-gray-700 shadow-sm'}`}>
                <Linkedin className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('home.linkedin', { defaultValue: 'LinkedIn' })}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}