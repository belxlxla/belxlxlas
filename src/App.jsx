import React, { useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { throttle } from 'lodash';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
import './styles/globalStyle.css';
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

  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const isResisting = useRef(false);
  const resistanceTimeout = useRef(null);
  const animationFrame = useRef(null);


// eslint-disable-next-line no-unused-vars
  const createSmoothScroll = useCallback((targetPosition, duration = 800) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress < 0.5
        ? 8 * progress * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animation);
      }
    };

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    animationFrame.current = requestAnimationFrame(animation);
  }, []);

  // 스크롤 저항
  const applyScrollResistance = useCallback((section, direction) => {
    if (isResisting.current) return;
    isResisting.current = true;

    const applyResistanceEffect = () => {
      const moveDistance = direction === 'up' ? 30 : -30;
      
      section.style.transform = `translateY(${moveDistance}px)`;
      section.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

      setTimeout(() => {
        section.style.transform = 'translateY(0)';
        section.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
      }, 150);
    };

    applyResistanceEffect();

    if (resistanceTimeout.current) {
      clearTimeout(resistanceTimeout.current);
    }
    resistanceTimeout.current = setTimeout(() => {
      isResisting.current = false;
    }, 800);
  }, []);

// eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      scrollVelocity.current = currentScrollY - lastScrollY.current;
      const scrollDirection = scrollVelocity.current > 0 ? 'down' : 'up';

      document.querySelectorAll('section[id]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        
        const viewportCenter = windowHeight / 2;
        const distanceFromCenter = Math.abs(sectionTop - viewportCenter);
        
        if (distanceFromCenter < windowHeight * 0.2) { // 뷰포트 중앙 ±20% 영역
          const velocityThreshold = 30; // 스크롤 속도 임계값
          
          if (Math.abs(scrollVelocity.current) > velocityThreshold) {
            applyScrollResistance(section, scrollDirection);
          }
        }

        // 일반 스크롤 애니메이션
        const progress = 1 - Math.abs(sectionTop - viewportCenter) / windowHeight;
        const opacity = Math.min(Math.max(progress * 1.5, 0), 1);
        const translateY = Math.max(0, 50 * (1 - progress));

        requestAnimationFrame(() => {
          if (!isResisting.current) {
            section.style.opacity = opacity;
            section.style.transform = `translateY(${translateY}px)`;
            section.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
          }
        });
      });

      lastScrollY.current = currentScrollY;
    }, 16),
    [applyScrollResistance]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: buildThresholdList()
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const progress = entry.intersectionRatio;
          
          section.style.opacity = Math.min(progress * 1.5, 1);
          if (!isResisting.current) {
            section.style.transform = `translateY(${30 * (1 - progress)}px)`;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (resistanceTimeout.current) {
        clearTimeout(resistanceTimeout.current);
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [handleScroll]);

  const buildThresholdList = () => {
    const thresholds = [];
    const numSteps = 20;
    for (let i = 0; i <= numSteps; i++) {
      thresholds.push(i / numSteps);
    }
    return thresholds;
  };

  const getSectionStyle = (paddingTop = 0) => ({
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease-out',
    paddingTop: paddingTop ? `${paddingTop}px` : 0,
    willChange: 'transform, opacity',
    position: 'relative',
    zIndex: 1
  });

  return (
    <div>
      <Main />
      <section id="about" style={getSectionStyle(100)}>
        <About />
      </section>
      <section id="skills" style={getSectionStyle(100)}>
        <Skills />
      </section>
      <section id="design" style={getSectionStyle(200)}>
        <Design />
      </section>
      <Designwiki />
      <section id="react" style={getSectionStyle(40)}>
        <ReactArea />
      </section>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ArchiveArea />
      </div>
      <section id="proposals" style={getSectionStyle()}>
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