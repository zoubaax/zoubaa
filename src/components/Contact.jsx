import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, User, ArrowRight, Heart, Code, Coffee, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
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
        setResult("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResult(data?.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setResult("Network error. Please try again.");
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
      label: "Email",
      value: "Itsmezoubaa@gmail.com",
      link: "mailto:Itsmezoubaa@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+212 701-230904",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Morocco, MA",
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
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
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
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`font-semibold ${drakeMode ? 'text-green-400' : 'text-green-700'
                    }`}>
                    {t('contact.available_projects')}
                  </span>
                </div>
                <p className={`text-sm ${drakeMode ? 'text-green-300' : 'text-green-600'
                  }`}>
                  {t('contact.currently_accepting')}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`cursor-target p-8 rounded-3xl border-2 backdrop-blur-sm transition-all duration-500 ${drakeMode
              ? 'bg-[#050A30] border-blue-500/30 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10'
              : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/5'
              }`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                    }`}>
                    <User className="w-4 h-4" />
                    {t('form.full_name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] focus:outline-none ${drakeMode
                      ? 'bg-[#050A30] border-blue-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'
                      : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10'
                      }`}
                    placeholder={t('form.placeholder_name')}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                    }`}>
                    <Mail className="w-4 h-4" />
                    {t('form.email_address')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] focus:outline-none ${drakeMode
                      ? 'bg-[#050A30] border-blue-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'
                      : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10'
                      }`}
                    placeholder={t('form.placeholder_email')}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 text-sm font-semibold ${drakeMode ? 'text-cyan-400' : 'text-blue-600'
                    }`}>
                    <MessageCircle className="w-4 h-4" />
                    {t('form.your_message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`cursor-target w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] focus:outline-none resize-none ${drakeMode
                      ? 'bg-[#050A30] border-blue-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20'
                      : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:shadow-lg focus:shadow-blue-500/10'
                      }`}
                    placeholder={t('form.placeholder_message')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${drakeMode
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/25'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send_message')}
                    </>
                  )}
                </button>

                {/* API result message */}
                {result && (
                  <p className={`text-center mt-2 text-sm ${result.toLowerCase().includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                    {result}
                  </p>
                )}

                {/* Privacy Note */}
                <p className={`text-center text-xs ${drakeMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  {t('contact.privacy')}
                </p>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center mt-16">
            <p className={`text-lg mb-6 ${drakeMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
              {t('contact.prefer_social')}
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`cursor-target flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${drakeMode
                    ? 'bg-[#050A30] text-gray-300 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                    } ${social.color}`}
                >
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Matching Hero Section Colors */}

      <footer className={`relative overflow-hidden font-sans antialiased ${drakeMode ? 'bg-[#050A30]' : 'bg-[#eff9ff]'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="cursor-target flex items-center gap-3 mb-4">

                <img
                  src={drakeMode ? logoDark : logoLight}
                  alt="ZOUBAA Logo"
                  className="h-12 object-contain"
                />
              </div>
              <p className={`mb-4 max-w-md leading-relaxed ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Full-stack developer and Computer Engineering student passionate about building
                modern web applications with cutting-edge technologies.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`cursor-target p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${drakeMode
                      ? 'bg-[#050A30] border border-blue-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400/50'
                      : 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-400 shadow-sm hover:shadow-md'
                      }`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${drakeMode ? 'text-white' : 'text-gray-900'
                }`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`cursor-target transition-all duration-300 hover:translate-x-2 inline-block ${drakeMode
                        ? 'text-gray-300 hover:text-cyan-400'
                        : 'text-gray-700 hover:text-blue-600'
                        }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${drakeMode ? 'text-white' : 'text-gray-900'
                }`}>
                Let's Talk
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:Itsmezoubaa@gmail.com"
                  className={`cursor-target flex items-center gap-3 transition-all duration-300 hover:translate-x-2 ${drakeMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  <Mail className="w-4 h-4" />
                  Itsmezoubaa@gmail.com
                </a>
                <a
                  href="tel:+212701230904"
                  className={`cursor-target flex items-center gap-3 transition-all duration-300 hover:translate-x-2 ${drakeMode ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                    }`}
                >
                  <Phone className="w-4 h-4" />
                  +212 701-230904
                </a>
                <div className={`flex items-center gap-3 ${drakeMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  <MapPin className="w-4 h-4" />
                  FEZ, Morocco
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Bar */}
          <div className={`pt-8 border-t ${drakeMode ? 'border-blue-500/30' : 'border-blue-200'
            }`}>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <div className={`flex items-center gap-2 text-sm ${drakeMode ? 'text-gray-300' : 'text-gray-500'
                }`}>
                <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;