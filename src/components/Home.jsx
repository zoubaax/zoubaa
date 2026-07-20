import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, ShieldCheck, Cloud, ServerCog, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getCVUrl } from '../services/cvService';
import zoubaaImage from '../assets/img/zoubaa2.jpg';
import resumePDF from '../assets/img/ZOUBAA-Mohammed.pdf';

export default function Home() {
  const navigate = useNavigate();
  const { isDarkMode: drakeMode } = useTheme();
  const { t } = useTranslation();
  const [dynamicCvUrl, setDynamicCvUrl] = useState(resumePDF);

  useEffect(() => {
    async function fetchCv() {
      const { url } = await getCVUrl();
      if (url) setDynamicCvUrl(url);
    }
    fetchCv();
  }, []);

  const dna = [
    { icon: ShieldCheck, label: t('home.dna.qa', { defaultValue: 'QA Automation & Testing' }) },
    { icon: Cloud, label: t('home.dna.devops', { defaultValue: 'CI/CD Pipelines (DevOps)' }) },
    { icon: ServerCog, label: t('home.dna.cloud', { defaultValue: 'Cloud Infrastructure' }) },
    { icon: Cpu, label: t('home.dna.fullstack', { defaultValue: 'Full-Stack Development' }) },
  ];

  return (
    <div className={`min-h-screen font-sans antialiased relative overflow-hidden transition-colors duration-700 ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>

      {/* Ambient glows */}
      <div className={`absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none ${drakeMode ? 'bg-cyan-400' : 'bg-blue-400'}`} />
      <div className={`absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full blur-[80px] opacity-10 pointer-events-none ${drakeMode ? 'bg-blue-500' : 'bg-cyan-400'}`} />

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on sm and above)
      ══════════════════════════════════════════════ */}
      <div className="block sm:hidden relative z-10">
        {/* Big portrait photo — fills screen width, tall enough to show person properly */}
        <div className="px-5 pt-28">
          <div className="relative">
            {/* 4 corner bracket decorations */}
            <div className={`absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 z-10 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
            <div className={`absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 z-10 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
            <div className={`absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 z-10 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
            <div className={`absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 z-10 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
            {/* Glow */}
            <div className={`absolute -inset-3 rounded-2xl blur-2xl opacity-20 -z-10 ${drakeMode ? 'bg-cyan-500' : 'bg-blue-400'}`} />
            {/* Photo */}
            <div className="w-full h-[85vw] overflow-hidden rounded-2xl">
              <img
                src={zoubaaImage}
                alt="Zoubaa Mohammed"
                className="w-full h-full object-cover object-[center_bottom]"
              />
            </div>
          </div>
        </div>

        {/* Content below image */}
        <div className="px-5 pt-6 pb-10">
          {/* Label + Name + Title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center mb-5"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <div className={`w-5 h-0.5 ${drakeMode ? 'bg-cyan-400' : 'bg-blue-500'}`} />
              <span className={`text-xs font-bold tracking-[0.2em] uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                {t('home.engineer_label', { defaultValue: 'THE ENGINEER' })}
              </span>
              <div className={`w-5 h-0.5 ${drakeMode ? 'bg-cyan-400' : 'bg-blue-500'}`} />
            </div>

            <h1 className={`text-[8vw] font-extrabold leading-tight mb-2 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
              {t('home.name', { defaultValue: 'ZOUBAA MOHAMMED' })}
            </h1>

            <div className={`text-xs font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r mb-4 ${drakeMode ? 'from-cyan-400 to-blue-400' : 'from-blue-600 to-cyan-500'}`}>
              {t('home.headline', { defaultValue: 'QA Engineer · DevOps · Full-Stack' })}
            </div>

            <p className={`text-sm leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.intro_mobile', { defaultValue: 'QA & DevOps Engineer with a full-stack background. I build reliable, automated, and scalable systems.' })}
            </p>
          </motion.div>

          {/* GitHub + LinkedIn */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex justify-center gap-3 mb-4"
          >
            <a
              href="https://github.com/zoubaax"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${drakeMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-gray-800 shadow hover:bg-gray-50'}`}
            >
              <Github className="w-4 h-4" />
              {t('home.github', { defaultValue: 'GitHub' })}
            </a>
            <a
              href="https://www.linkedin.com/in/zoubaa-mohammed-398266350"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[#0A66C2] text-white hover:bg-[#0958a8] transition-all"
            >
              <Linkedin className="w-4 h-4" />
              {t('home.linkedin', { defaultValue: 'LinkedIn' })}
            </a>
          </motion.div>

          {/* Contact + Resume */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex gap-3"
          >
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
              className="cursor-target flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center gap-2 font-bold text-sm hover:shadow-lg transition-all"
            >
              {t('home.contact_button', { defaultValue: 'Contact me' })}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={dynamicCvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-target flex-1 px-4 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${drakeMode ? 'bg-white/5 border-white/20 text-white' : 'bg-white border-gray-300 text-gray-700 shadow-sm'}`}
            >
              {t('home.resume_button', { defaultValue: 'Resume' })}
              <Download className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden on mobile)
      ══════════════════════════════════════════════ */}
      <div className="hidden sm:flex items-center justify-center px-6 md:px-10 min-h-screen pt-20 relative z-10">
        <div className="max-w-5xl w-full flex flex-row items-center gap-12 lg:gap-20 py-16">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-start text-left"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`w-6 h-0.5 ${drakeMode ? 'bg-cyan-400' : 'bg-blue-500'}`} />
              <span className={`text-xs font-bold tracking-[0.2em] uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                {t('home.engineer_label', { defaultValue: 'THE ENGINEER' })}
              </span>
            </div>

            {/* Name */}
            <h1 className={`text-5xl md:text-6xl font-extrabold leading-tight mb-4 ${drakeMode ? 'text-white' : 'text-gray-900'}`}>
              {t('home.name', { defaultValue: 'ZOUBAA MOHAMMED' })}
            </h1>

            {/* Titles */}
            <div className={`text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r mb-6 ${drakeMode ? 'from-cyan-400 to-blue-400' : 'from-blue-600 to-cyan-500'}`}>
              {t('home.headline', { defaultValue: 'QA Engineer · DevOps · Full-Stack Developer' })}
            </div>

            {/* Bio */}
            <p className={`max-w-lg text-base leading-relaxed mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.intro_desktop_1', { defaultValue: "I am a QA & DevOps Engineer with a solid full-stack background, driven by quality, automation, and scalable infrastructure." })}
            </p>
            <p className={`max-w-lg text-base leading-relaxed mb-8 ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('home.intro_desktop_2', { defaultValue: "My approach combines rigorous testing with CI/CD pipelines. I don't just ship code — I engineer reliable, secure systems." })}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-10">
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate('/contact'); }}
                className="cursor-target px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center gap-2 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 font-bold group transform hover:-translate-y-0.5"
              >
                {t('home.contact_button', { defaultValue: 'Contact me' })}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={dynamicCvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`cursor-target px-6 py-3 rounded-xl border flex items-center gap-2 transition-all duration-300 font-bold group transform hover:-translate-y-0.5 ${drakeMode ? 'bg-white/5 border-white/20 text-white hover:bg-white/10' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md'}`}
              >
                {t('home.resume_button', { defaultValue: 'My Resume' })}
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Bottom: DNA + Status + Connect */}
            <div className="flex flex-wrap gap-10">
              <div>
                <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${drakeMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {t('home.technical_dna', { defaultValue: 'TECHNICAL DNA' })}
                </p>
                <ul className="space-y-2">
                  {dna.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${drakeMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                      <span className={`text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${drakeMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t('home.status_label', { defaultValue: 'STATUS' })}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className={`text-xs font-bold tracking-widest ${drakeMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t('home.status_available', { defaultValue: 'AVAILABLE' })}
                    </span>
                  </div>
                </div>

                <div>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-3 ${drakeMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t('home.connect_label', { defaultValue: 'CONNECT' })}
                  </p>
                  <div className="flex gap-2">
                    <a href="https://github.com/zoubaax" target="_blank" rel="noopener noreferrer"
                      className={`cursor-target p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${drakeMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100'}`}>
                      <Github className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/zoubaa-mohammed-398266350" target="_blank" rel="noopener noreferrer"
                      className={`cursor-target p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${drakeMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-100'}`}>
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="shrink-0"
          >
            <div className="relative">
              <div className={`absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
              <div className={`absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
              <div className={`absolute -bottom-3 -left-3 w-7 h-7 border-b-2 border-l-2 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
              <div className={`absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 ${drakeMode ? 'border-cyan-400' : 'border-blue-500'}`} />
              <div className={`absolute -inset-4 rounded-2xl blur-3xl opacity-20 -z-10 ${drakeMode ? 'bg-cyan-500' : 'bg-blue-400'}`} />

              <div className="w-72 h-[380px] rounded-2xl overflow-hidden">
                <img
                  src={zoubaaImage}
                  alt="Zoubaa Mohammed"
                  className="w-full h-full object-cover object-[center_bottom] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}