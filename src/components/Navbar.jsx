import { useState, useEffect } from "react";
// removed Link import
import logoLight from "../assets/img/1.png";
import logoDark from "../assets/img/2.png";
import TargetCursor from '../hooks/TargetCursor';

const Navbar = ({ drakeMode, setDrakeMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  // new helper: smooth-scroll to section id
  const scrollToSection = (e, id) => {
    if (e && e.preventDefault) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback: scroll to top if id not found
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      
      <nav
        className={`w-full fixed px-6 lg:px-12 xl:px-16 py-5 flex items-center justify-between z-50 transition-all duration-500 ${
          scrolled
            ? drakeMode
              ? "bg-[#050A30]/80 backdrop-blur-xl shadow-2xl"
              : "bg-white/80 backdrop-blur-xl shadow-lg"
            : drakeMode
            ? "bg-[#050A30]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex-shrink-0 cursor-target">
          {/* changed to in-page anchor */}
          <a href="#home" aria-label="Go to home" onClick={(e) => scrollToSection(e, 'home')}>
            <img
              src={drakeMode ? logoDark : logoLight}
              alt="Zoubaa Logo"
              className="h-10 w-auto cursor-pointer transition-all duration-300 transform hover:scale-105"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul
          className={`hidden md:flex items-center gap-8 rounded-full px-10 py-3 mx-8 backdrop-blur-sm border font-medium transition-all duration-300 ${
            drakeMode
              ? "bg-[#0A1A3A]/80 border-blue-500/30 text-white"
              : "bg-white/80 border-gray-200 text-gray-700 shadow-sm"
          }`}
        >
          {/* only include routes that exist and map Home -> "/" */}
          {['Home', 'About', 'Skills', 'Contact'].map((item) => {
            const id = item === 'Home' ? 'home' : item.toLowerCase();
            return (
              <li key={item} className="cursor-target">
                <a
                  href={`#${id}`}
                  onClick={(e) => scrollToSection(e, id)}
                  className={`hover:opacity-80 transition-all duration-300 text-sm tracking-wide transform hover:-translate-y-0.5 ${
                    drakeMode ? "text-white hover:text-blue-400" : "text-gray-700"
                  }`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDrakeMode((d) => !d)}
            className={`cursor-target p-3 rounded-full transition-all duration-300 hover:scale-110 border transform hover:-translate-y-0.5 ${
              drakeMode
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent hover:shadow-lg hover:shadow-blue-500/30"
                : "bg-white text-gray-900 border-gray-300 shadow-md hover:shadow-lg"
            }`}
            aria-label="Toggle Drake Mode"
          >
            {drakeMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Explore Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className={`cursor-target hidden lg:flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 font-medium text-sm transform hover:-translate-y-0.5 ${
              drakeMode
                ? "border-blue-500 text-white hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                : "border-gray-400 text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-lg"
            }`}
          >
            EXPLORE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="cursor-target block md:hidden p-2 transition-all duration-300 hover:scale-110 transform hover:-translate-y-0.5"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={drakeMode ? "white" : "currentColor"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 ${
            menuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              menuOpen 
                ? "bg-black/40 backdrop-blur-sm" 
                : "bg-black/0"
            }`}
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div
            className={`flex flex-col gap-6 py-24 px-8 fixed top-0 right-0 bottom-0 w-80 h-screen transition-transform duration-500 shadow-2xl ${
              drakeMode 
                ? "bg-[#050A30] text-white" 
                : "bg-white text-gray-900"
            } ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Close Button */}
            <button
              className="cursor-target absolute right-6 top-6 p-3 transition-all duration-300 hover:scale-110 transform hover:-translate-y-0.5"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu Items */}
            {['Home', 'About', 'Skills', 'Contact'].map((item) => {
              const id = item === 'Home' ? 'home' : item.toLowerCase();
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => scrollToSection(e, id)}
                  className={`cursor-target text-xl py-4 border-b transition-all duration-300 hover:pl-4 transform hover:-translate-y-0.5 ${
                    drakeMode
                      ? "border-blue-500/30 hover:text-blue-400"
                      : "border-gray-200 hover:text-gray-600"
                  }`}
                >
                  {item}
                </a>
              );
            })}
            
            {/* Mobile Explore Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className={`cursor-target mt-8 px-6 py-4 rounded-lg border text-center transition-all duration-300 font-medium transform hover:-translate-y-0.5 ${
                drakeMode
                  ? "border-blue-500 text-white hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                  : "border-gray-400 text-gray-700 hover:bg-gray-100 hover:shadow-lg"
              }`}
            >
              EXPLORE NOW
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;