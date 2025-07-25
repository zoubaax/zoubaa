import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => setDark((d) => !d);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50">
      {/* Logo - Replaced with text */}
      <div className="mr-14">
        <h1 className={`text-2xl font-bold cursor-pointer ${dark ? "text-white" : "text-black"}`}>
          Zoubaa
        </h1>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ml-8
         bg-bleu shadow-sm bg-opacity-50 font-Ovo
         dark:border dark:border-white/50 dark:bg-transparent">
        <li><a href="#top">Home</a></li>
        <li><a href="#about">About us</a></li>
        <li><a href="#services">Skills</a></li>
        <li><a href="#work">Our work</a></li>
        <li><a href="#contact">Contact us</a></li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          <img
            src="/img/moon.png"
            alt=""
            className={`w-5${dark ? " hidden" : ""}`}
          />
          <img
            src="/img/sun.png"
            alt=""
            className={`w-5${dark ? "" : " hidden"}`}
          />
        </button>

        <a
          href="#contact"
          className="hidden lg:flex items-center gap-3 px-10 py-2.5 border 
                border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50"
        >
          EXPLORE
          <img
            src="/img/arrow-up.png"
            alt=""
            className={`w-4${dark ? " hidden" : ""}`}
          />
          <img
            src="/img/arrow-icon-dark.png"
            alt=""
            className={`w-4${dark ? "" : " hidden"}`}
          />
        </a>

        <button className="block md:hidden ml-3" onClick={openMenu}>
          <img
            src="/img/menu-black.png"
            alt=""
            className={`w-6${dark ? " hidden" : ""}`}
          />
          <img
            src="/img/menu-white.png"
            alt=""
            className={`w-6${dark ? "" : " hidden"}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        id="sideMenu"
        className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 
            w-64 z-50 h-screen bg-blue-50 transition duration-500 font-Ovo dark:text-black
            ${menuOpen ? "right-0" : "-right-64"}`}
      >
        <div className="absolute right-6 top-6" onClick={closeMenu}>
          <img
            src="/img/close-black.png"
            alt=""
            className="w-5 cursor-pointer"
          />
        </div>
        <li>
          <a href="#top" onClick={closeMenu}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={closeMenu}>
            About us
          </a>
        </li>
        <li>
          <a href="#services" onClick={closeMenu}>
            Skills
          </a>
        </li>
        <li>
          <a href="#work" onClick={closeMenu}>
            Our work
          </a>
        </li>
        <li>
          <a href="#contact" onClick={closeMenu}>
            Contact us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;