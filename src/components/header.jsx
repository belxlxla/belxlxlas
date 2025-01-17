// Header.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
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
      <motion.div 
        className="logo-container"
        onClick={handleLogoClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.5 }}
        style={{ cursor: 'pointer' }}
      >
        <span className="logo-bella">Bella's</span>
        <span className="logo-atelier">Atelier</span>
      </motion.div>
      <ul className="nav-links">
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