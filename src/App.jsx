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
  const scrollAccumulator = useRef(0);
  const touchStartY = useRef(0);
  const touchMoveY = useRef(0);
  const SCROLL_THRESHOLD = 100; // 웹 임계값
  const TOUCH_THRESHOLD = 50; // 모바일 스크롤 임계값

  const moveToSection = useCallback((direction) => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
      .filter(section => section.id !== 'footer');
      
    const windowHeight = window.innerHeight;
    const currentScrollY = window.scrollY;
    
    // 현재 섹션 서치
    let currentSectionIndex = -1;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const rect = section.getBoundingClientRect();
      if (rect.top <= windowHeight/2 && rect.bottom >= windowHeight/2) {
        currentSectionIndex = i;
        break;
      }
    }

    let targetIndex = currentSectionIndex;
    if (direction > 0 && currentSectionIndex < sections.length - 1) {
      targetIndex = currentSectionIndex + 1;
    } else if (direction < 0 && currentSectionIndex > 0) {
      targetIndex = currentSectionIndex - 1;
    }

    const targetSection = sections[targetIndex];

    if (targetSection && targetIndex !== currentSectionIndex) {
      isAnimating.current = true;
      lastScrollTime.current = performance.now();
      scrollAccumulator.current = 0;

      const targetY = currentScrollY + targetSection.getBoundingClientRect().top - 
                     (windowHeight - targetSection.offsetHeight) / 2;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isAnimating.current = false;
      }, 1000);
    }
  }, []);

  const handleWheel = useCallback((e) => {
    if (isAnimating.current) return;

    const currentTime = performance.now();
    if (currentTime - lastScrollTime.current < 50) return;

    scrollAccumulator.current += Math.abs(e.deltaY);

    if (scrollAccumulator.current > SCROLL_THRESHOLD) {
      moveToSection(Math.sign(e.deltaY));
    }

    if (!isAnimating.current) {
      setTimeout(() => {
        scrollAccumulator.current = 0;
      }, 200);
    }
  }, [moveToSection]);

  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isAnimating.current) {
      e.preventDefault();
      return;
    }

    touchMoveY.current = e.touches[0].clientY;
    const touchDiff = touchStartY.current - touchMoveY.current;

    // 모바일 터치 움직임 -> 섹션이동
    if (Math.abs(touchDiff) > TOUCH_THRESHOLD) {
      e.preventDefault();
      moveToSection(Math.sign(touchDiff));
      // 터치 초기화
      touchStartY.current = touchMoveY.current;
    }
  }, [moveToSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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
      observer.observe(section);
    });

    // 이벤트 리스너
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  // CSS 스타일 하단
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        overscroll-behavior: none;
        touch-action: none;
        -webkit-overflow-scrolling: touch;
      }
      @media (max-width: 768px) {
        .section {
          height: 100vh;
          overflow: hidden;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div>
      <section id="main" className="section">
        <Main />
      </section>
      <section id="about" className="section pt-100">
        <About />
      </section>
      <section id="skills" className="section pt-100">
        <Skills />
      </section>
      <section id="design" className="section pt-200">
        <Design />
      </section>
      <section id="designwiki" className="section pt-100">
        <Designwiki />
      </section>
      <section id="react" className="section react-section pt-40">
        <ReactArea />
      </section>
      <section id="archive" className="section">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ArchiveArea />
        </div>
      </section>
      <section id="proposals" className="section">
        <Proposal />
      </section>
    </div>
  );
};

const App = () => {
  // 앱 컴포넌트 코드는 동일하게 유지
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