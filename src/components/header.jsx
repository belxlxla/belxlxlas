// Header.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import hamburgerIcon from '../assets/ham.svg';
import '../styles/header.css';

const FUNCTIONAL_PATHS = ['/designwiki', '/archive'];
const MENU_ITEMS = [
  { to: "about", text: "It's", textWeight: "light", hasB: true, bText: "Bella", bWeight: "semibold" },
  { to: "skills", text: "Skills ", textWeight: "semibold", hasB: false },
  { to: "design", text: "Design ", textWeight: "semibold", hasB: false },
  { to: "react", text: "", hasB: true, bText: "React" },
  { to: "proposals", text: "", hasB: true, bText: "Job & Project Proposals" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const visibleMenuItems = useMemo(() => 
    FUNCTIONAL_PATHS.includes(location.pathname) ? [] : MENU_ITEMS,
    [location.pathname]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="header-bg"></div>
      
      <nav className="nav-container">
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img src={hamburgerIcon} alt="Menu" className="menu-icon" />
        </button>

        <motion.div 
          className="logo-container"
          onClick={handleLogoClick}
          whileHover={{ scale: [null, 1.05, 1.05] }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-bella">Bella's</span>
          <span className="logo-atelier">Atelier</span>
        </motion.div>

        <AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]  // 이것은 cubic-bezier(0.16, 1, 0.3, 1)와 동일합니다
      }}
    >
      <ul className="mobile-nav-links">
        {visibleMenuItems.map((item, index) => (
          <motion.li 
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.5 }}
            onClick={() => scrollToSection(item.to)}
            className="mobile-nav-item"
          >
            <span className={`nav-text ${item.textWeight ? `nav-text-${item.textWeight}` : ''}`}>
              {item.text}
            </span>
            {item.hasB && 
              <b className={`nav-bold ${item.bWeight ? `nav-bold-${item.bWeight}` : ''}`}>
                {item.bText}
              </b>
            }
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )}
</AnimatePresence>

        <ul className="nav-links desktop-nav">
          {visibleMenuItems.map((item, index) => (
            <motion.li 
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.5 }}
              onClick={() => scrollToSection(item.to)}
              className="nav-item"
            >
              <span className={`nav-text ${item.textWeight ? `nav-text-${item.textWeight}` : ''}`}>
                {item.text}
              </span>
              {item.hasB && 
                <b className={`nav-bold ${item.bWeight ? `nav-bold-${item.bWeight}` : ''}`}>
                  {item.bText}
                </b>
              }
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;