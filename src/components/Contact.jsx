import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, MessageSquare, User, ArrowRight, Heart, Code, Coffee, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import logoLight from "../assets/img/1.png";
import logoDark from "../assets/img/2.png";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';


const Contact = () => {
  const { isDarkMode: drakeMode } = useTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Read the key from Vite env (must start with VITE_)
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

  // Submit to Web3Forms using the VITE_WEB3FORMS_KEY environment variable
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    if (!WEB3FORMS_KEY) {
      setResult("Missing Web3Forms API key. Add VITE_WEB3FORMS_KEY to .env and restart the dev server.");
      setIsSubmitting(false);
      return;
    }

    try {
      const form = new FormData(e.target);
      form.append("access_key", WEB3FORMS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form
      });
      const data = await response.json();

      if (data?.success) {
        setResult(t('contact.status.success'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult(data?.message || t('contact.status.error'));
      }
    } catch (err) {
      setResult(t('contact.status.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('contact.email'),
      value: "Itsmezoubaa@gmail.com",
      link: "mailto:Itsmezoubaa@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('contact.phone'),
      value: "+212 701-230904",
      link: "tel:+212701230904"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('contact.location'),
      value: t('contact.morocco'),
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com/zoubaax",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/zoubaa-mohammed-398266350",
      color: "hover:text-blue-400"
    },
    // {
    //   icon: <Twitter className="w-5 h-5" />,
    //   name: "Twitter",
    //   url: "https://twitter.com/zoubaa",
    //   color: "hover:text-cyan-400"
    // },
    // {
    //   icon: <Instagram className="w-5 h-5" />,
    //   name: "Instagram",
    //   url: "https://instagram.com/zoubaa",
    //   color: "hover:text-pink-400"
    // }
  ];

  const quickLinks = [
    { name: t('navbar.home'), href: "#home" },
    { name: t('navbar.about'), href: "#about" },
    { name: t('navbar.skills'), href: "#skills" },
    { name: t('navbar.projects'), href: "#projects" },
    { name: t('navbar.contact'), href: "#contact" }
  ];

  return (
    <div className="relative">
      <div id="contact" className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-cyan-400 to-blue-500' : 'from-blue-500 to-cyan-500'
                }`}></div>
              <span className={`text-sm font-semibold tracking-widest uppercase ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                {t('contact.get_in_touch')}
              </span>
              <div className={`w-16 h-0.5 bg-gradient-to-r ${drakeMode ? 'from-blue-500 to-cyan-400' : 'from-cyan-500 to-blue-500'
                }`}></div>
            </div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${drakeMode ? 'text-white' : 'text-gray-900'
              }`}>
              {t('contact.work_together')}
            </h2>

            <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${drakeMode ? 'text-white' : 'text-gray-900'
                  }`}>
                  <MessageCircle className="w-6 h-6 text-cyan-500" />
                  {t('contact.lets_connect')}
                </h3>
                <p className={`text-lg leading-relaxed mb-8 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {t('contact.interest_opportunities')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className={`cursor-target group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 ${drakeMode
                      ? 'bg-[#050A30] border-blue-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
                      : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/5'
                      }`}
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${drakeMode
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'bg-blue-500/10 text-blue-600'
                      }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                        }`}>
                        {item.label}
                      </div>
                      <div className={`font-medium ${drakeMode ? 'text-gray-200' : 'text-gray-900'
                        }`}>
                        {item.value}
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${drakeMode ? 'text-cyan-400' : 'text-blue-500'
                      }`} />
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div className={`p-6 rounded-2xl border backdrop-blur-sm ${drakeMode
                ? 'bg-[#050A30] border-green-500/30'
                : 'bg-green-50 border-green-200'
                }`}>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full bg-green-500 ${drakeMode ? 'shadow-[0_0_12px_rgba(34,197,94,0.5)]' : ''}`}></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                  </div>
                  <div>
                    <div className={`text-sm font-bold uppercase tracking-wider ${drakeMode ? 'text-green-400' : 'text-green-700'
                      }`}>
                      {t('contact.available')}
                    </div>
                    <div className={`font-medium ${drakeMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                      {t('contact.available_subtitle')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`p-1 rounded-3xl backdrop-blur-sm transition-all duration-300 ${drakeMode
              ? 'bg-gradient-to-br from-cyan-500/20 via-blue-500/5 to-purple-500/20'
              : 'bg-white shadow-2xl shadow-blue-500/10 border border-blue-100'
              }`}>
              <div className={`p-8 md:p-10 rounded-3xl ${drakeMode ? 'bg-[#050A30]/90 shadow-2xl' : 'bg-white'}`}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-bold tracking-wide mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.form_name')}
                    </label>
                    <div className="relative group">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${drakeMode ? 'text-gray-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-blue-500'
                        }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all duration-300 ${drakeMode
                          ? 'bg-gray-900/50 border-blue-500/20 text-white focus:border-cyan-500/50 focus:bg-gray-800 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                          : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                          }`}
                        placeholder={t('contact.form_name_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-bold tracking-wide mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.form_email')}
                    </label>
                    <div className="relative group">
                      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${drakeMode ? 'text-gray-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-blue-500'
                        }`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all duration-300 ${drakeMode
                          ? 'bg-gray-900/50 border-blue-500/20 text-white focus:border-cyan-500/50 focus:bg-gray-800 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                          : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                          }`}
                        placeholder={t('contact.form_email_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-bold tracking-wide mb-2 ${drakeMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {t('contact.form_message')}
                    </label>
                    <div className="relative group">
                      <div className={`absolute left-4 top-6 transition-colors duration-300 ${drakeMode ? 'text-gray-500 group-focus-within:text-cyan-400' : 'text-gray-400 group-focus-within:text-blue-500'
                        }`}>
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none transition-all duration-300 resize-none ${drakeMode
                          ? 'bg-gray-900/50 border-blue-500/20 text-white focus:border-cyan-500/50 focus:bg-gray-800 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                          : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                          }`}
                        placeholder={t('contact.form_message_placeholder')}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cursor-target w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${drakeMode
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40'
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{t('contact.send_message')}</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {result && (
                    <div className={`mt-4 p-4 rounded-xl text-center font-medium animate-fade-in ${result.includes('success') || result === t('contact.status.success')
                      ? (drakeMode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-50 text-green-700 border border-green-100')
                      : (drakeMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-100')
                      }`}>
                      {result}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className={`py-12 px-4 border-t ${drakeMode ? 'bg-[#050A30] border-white/5' : 'bg-white border-blue-100'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <img src={drakeMode ? logoDark : logoLight} alt="Logo" className="h-10 w-auto" />
              <p className={`max-w-sm text-lg leading-relaxed ${drakeMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('footer.description')}
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border transition-all duration-300 ${drakeMode
                      ? 'border-white/10 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/5'
                      : 'border-blue-100 text-gray-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50'
                      }`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className={`text-lg font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{t('footer.quick_links')}</h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`text-base transition-colors duration-300 ${drakeMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className={`text-lg font-bold ${drakeMode ? 'text-white' : 'text-gray-900'}`}>{t('footer.legal')}</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className={`text-base transition-colors duration-300 ${drakeMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}>
                    {t('footer.privacy_policy')}
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-base transition-colors duration-300 ${drakeMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}>
                    {t('footer.terms_of_service')}
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-base transition-colors duration-300 ${drakeMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'}`}>
                    {t('footer.cookie_policy')}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${drakeMode ? 'border-white/5' : 'border-blue-100'}`}>
            <p className={`text-sm font-medium ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © {new Date().getFullYear()} ZOUBAA Mohammed. {t('footer.all_rights_reserved')}
            </p>
            <div className={`flex items-center gap-2 text-sm font-medium ${drakeMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{t('footer.made_with')}</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{t('footer.by_mohammed')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
