import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ drakeMode, setDrakeMode }) => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setDark((d) => !d);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${
        scrolled
          ? drakeMode
            ? "bg-[#1A1A1A]/90 text-[#FF4A01] backdrop-blur-md"
            : dark
            ? "bg-gray-900/90 text-white backdrop-blur-md"
            : "bg-white/90 text-black backdrop-blur-md"
          : drakeMode
          ? "bg-[#1A1A1A] text-[#FF4A01]"
          : dark
          ? "bg-gray-900 text-white"
          : "bg-transparent text-black"
      }`}
    >
      {/* Logo */}
      <div className="mr-14">
        <h1
          className={`text-2xl font-bold cursor-pointer ${
            drakeMode
              ? "text-[#FF4A01]"
              : dark
              ? "text-white"
              : "text-black"
          }`}
        >
          {drakeMode ? "Zoubaa" : "Zoubaa"}
        </h1>
      </div>

      {/* Desktop Nav */}
      <ul
        className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ml-8
         bg-bleu shadow-sm bg-opacity-50 font-Ovo
         ${
           drakeMode
             ? "bg-[#232323] border border-[#FF4A01]/30 text-[#FF4A01]"
             : dark
             ? "border border-white/50 bg-transparent text-white"
             : "bg-white/50 border border-gray-200 text-black"
         }`}
      >
        <li>
          <a
            href="#top"
            className={`hover:opacity-80 transition ${
              drakeMode
                ? "text-[#FF4A01]"
                : dark
                ? "text-white"
                : "text-black"
            }`}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className={`hover:opacity-80 transition ${
              drakeMode
                ? "text-[#FF4A01]"
                : dark
                ? "text-white"
                : "text-black"
            }`}
          >
            About us
          </a>
        </li>
        <li>
          <a
            href="#services"
            className={`hover:opacity-80 transition ${
              drakeMode
                ? "text-[#FF4A01]"
                : dark
                ? "text-white"
                : "text-black"
            }`}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#work"
            className={`hover:opacity-80 transition ${
              drakeMode
                ? "text-[#FF4A01]"
                : dark
                ? "text-white"
                : "text-black"
            }`}
          >
            Our work
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={`hover:opacity-80 transition ${
              drakeMode
                ? "text-[#FF4A01]"
                : dark
                ? "text-white"
                : "text-black"
            }`}
          >
            Contact us
          </a>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">


        {/* Drake Mode Toggle */}
        <button
          onClick={() => setDrakeMode((d) => !d)}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            drakeMode
              ? "bg-[#FF4A01] text-[#1A1A1A]"
              : dark
              ? "bg-white/10 text-white"
              : "bg-black/10 text-black"
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
          className={`hidden lg:flex items-center gap-3 px-6 py-2 border rounded-full ml-4 font-Ovo transition hover:scale-105 ${
            drakeMode
              ? "border-[#FF4A01] text-[#FF4A01] hover:bg-[#FF4A01]/10"
              : dark
              ? "border-white/50 text-white hover:bg-white/10"
              : "border-gray-500 text-black hover:bg-black/10"
          }`}
        >
          EXPLORE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              drakeMode ? "text-[#FF4A01]" : dark ? "text-white" : "text-black"
            }`}
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
          className="block md:hidden ml-3"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={drakeMode ? "#FF4A01" : dark ? "white" : "black"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black ${
            menuOpen ? "opacity-30" : "opacity-0"
          }`}
          onClick={closeMenu}
        ></div>
        <div
          className={`flex flex-col gap-8 py-20 px-10 fixed top-0 right-0 bottom-0 
            w-64 z-50 h-screen transition-transform duration-300 font-Ovo ${
              drakeMode
                ? "bg-[#232323] text-[#FF4A01]"
                : dark
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            } ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            className="absolute right-6 top-6 p-2"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={drakeMode ? "#FF4A01" : dark ? "white" : "black"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <a
            href="#top"
            onClick={closeMenu}
            className={`text-xl py-2 border-b ${
              drakeMode
                ? "border-[#FF4A01]/30 hover:text-[#FF4A01]"
                : dark
                ? "border-white/30 hover:text-white/80"
                : "border-black/30 hover:text-black/80"
            }`}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className={`text-xl py-2 border-b ${
              drakeMode
                ? "border-[#FF4A01]/30 hover:text-[#FF4A01]"
                : dark
                ? "border-white/30 hover:text-white/80"
                : "border-black/30 hover:text-black/80"
            }`}
          >
            About us
          </a>
          <a
            href="#services"
            onClick={closeMenu}
            className={`text-xl py-2 border-b ${
              drakeMode
                ? "border-[#FF4A01]/30 hover:text-[#FF4A01]"
                : dark
                ? "border-white/30 hover:text-white/80"
                : "border-black/30 hover:text-black/80"
            }`}
          >
            Skills
          </a>
          <a
            href="#work"
            onClick={closeMenu}
            className={`text-xl py-2 border-b ${
              drakeMode
                ? "border-[#FF4A01]/30 hover:text-[#FF4A01]"
                : dark
                ? "border-white/30 hover:text-white/80"
                : "border-black/30 hover:text-black/80"
            }`}
          >
            Our work
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className={`text-xl py-2 ${
              drakeMode
                ? "hover:text-[#FF4A01]"
                : dark
                ? "hover:text-white/80"
                : "hover:text-black/80"
            }`}
          >
            Contact us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;