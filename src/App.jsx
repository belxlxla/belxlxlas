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
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(Date.now());

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

  const handleScroll = useCallback(() => {
    if (isScrolling.current) {
      return;
    }

    const now = Date.now();
    if (now - lastScrollTime.current < 800) { // 스크롤 쿨다운
      return;
    }

    throttle(() => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      scrollVelocity.current = currentScrollY - lastScrollY.current;

      document.querySelectorAll('section[id]').forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        // 컴포넌트 스냅 구현
        const snapThreshold = windowHeight * 0.3; // 스냅 시작 지점
        const sectionCenter = sectionTop + (sectionHeight / 2);
        const distanceFromViewportCenter = Math.abs(sectionCenter - (windowHeight / 2));

        if (distanceFromViewportCenter < snapThreshold && !isScrolling.current) {
          isScrolling.current = true;
          lastScrollTime.current = now;

          const targetScroll = currentScrollY + sectionTop - (windowHeight / 2) + (sectionHeight / 2);
          
          setTimeout(() => {
            window.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              isScrolling.current = false;
            }, 1000);
          }, 100);
        }

        // Opacity 계산
        const bottomThreshold = windowHeight * 1;
        const isNearBottom = sectionTop < bottomThreshold && sectionTop > -sectionHeight;
        
        let opacity;
        if (isNearBottom) {
          const bottomProgress = (bottomThreshold - sectionTop) / (bottomThreshold * 0.1);
          opacity = Math.min(Math.max(bottomProgress, 0), 1);
        } else {
          const progress = 1 - distanceFromViewportCenter / windowHeight;
          opacity = Math.min(Math.max(progress, 0), 1);
        }

        const translateY = Math.max(0, 30 * (1 - opacity));

        requestAnimationFrame(() => {
          if (!isResisting.current) {
            section.style.opacity = opacity;
            section.style.transform = `translateY(${translateY}px)`;
            section.style.transition = isNearBottom 
              ? 'transform 0.4s ease-out, opacity 0.3s ease-out'
              : 'transform 0.6s ease-out, opacity 0.3s ease-out';
          }
        });
      });

      lastScrollY.current = currentScrollY;
    }, 16);
  }, []);

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
          
          section.style.opacity = Math.min(progress * 1.2, 1);
          if (!isResisting.current) {
            section.style.transform = `translateY(${30 * (1 - progress)}px)`;
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    const currentResistanceTimeout = resistanceTimeout.current;
    const currentAnimationFrame = animationFrame.current;

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (currentResistanceTimeout) {
        clearTimeout(currentResistanceTimeout);
      }
      if (currentAnimationFrame) {
        cancelAnimationFrame(currentAnimationFrame);
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
    zIndex: 1,
    minHeight: '100vh' // 각 섹션의 최소 높이를 화면 높이로 설정
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
