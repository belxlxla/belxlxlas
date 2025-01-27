import React, { useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import './styles/globalStyle.css';
import './App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Main from './pages/main.jsx';
import About from './pages/about.jsx';
import Skills from './pages/skills.jsx';
import Design from './pages/design.jsx';
import Designwiki from './pages/designwiki.jsx';
import ReactArea from './pages/react.jsx';
import ArchiveArea from './pages/archive.jsx';
import Proposal from './pages/proposal.jsx';

const CHANNEL_PLUGIN_KEY = 'b14f14c2-d96f-4696-b128-0f8d84e8609f';

const MainContent = () => {
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(0);

  const handleWheel = useCallback((e) => {
    if (isAnimating.current) return;

    const currentTime = performance.now();
    if (currentTime - lastScrollTime.current < 3000) return;

    const sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(section => section.id !== 'react');
      
    const windowHeight = window.innerHeight;
    const currentScrollY = window.scrollY;
    const scrollDirection = Math.sign(e.deltaY);
    
    let targetSection = null;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = currentScrollY + rect.top;
      
      if (scrollDirection > 0 && sectionTop > currentScrollY + 1000) {
        targetSection = section;
        break;
      } else if (scrollDirection < 0 && sectionTop < currentScrollY - 1000) {
        targetSection = sections[i - 1] || section;
      }
    }

    if (targetSection) {
      isAnimating.current = true;
      lastScrollTime.current = currentTime;

      const targetY = currentScrollY + targetSection.getBoundingClientRect().top - 
                     (windowHeight - targetSection.offsetHeight) / 2;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id === 'react') return;
          
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    document.querySelectorAll('section[id]').forEach(section => {
      if (section.id !== 'react') {
        observer.observe(section);
      }
    });

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  return (
    <div>
      <Main />
      <section id="about" className="section pt-100">
        <About />
      </section>
      <section id="skills" className="section pt-100">
        <Skills />
      </section>
      <section id="design" className="section pt-200">
        <Design />
      </section>
      <Designwiki />
      <section id="react" className="section react-section pt-40">
        <ReactArea />
      </section>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ArchiveArea />
      </div>
      <section id="proposals" className="section">
        <Proposal />
      </section>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    ChannelService.loadScript();
    ChannelService.boot({
      pluginKey: CHANNEL_PLUGIN_KEY
    });

    const preventImageDownload = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', preventImageDownload);
    document.addEventListener('dragstart', preventImageDownload);

    const applyImageProtection = () => {
      const images = document.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.draggable = false;
        img.addEventListener('contextmenu', preventImageDownload);
        img.addEventListener('dragstart', preventImageDownload);
      });
    };

    applyImageProtection();

    const observer = new MutationObserver(applyImageProtection);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      ChannelService.shutdown();
      document.removeEventListener('contextmenu', preventImageDownload);
      document.removeEventListener('dragstart', preventImageDownload);
      observer.disconnect();
      
      const images = document.getElementsByTagName('img');
      Array.from(images).forEach(img => {
        img.removeEventListener('contextmenu', preventImageDownload);
        img.removeEventListener('dragstart', preventImageDownload);
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/designwiki" element={<Designwiki />} />
          <Route path="/archive" element={<ArchiveArea />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;