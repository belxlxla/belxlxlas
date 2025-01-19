// Main.jsx
import React, { useRef, useEffect, useState } from 'react';
import '../styles/main.css';
import mainVideo from '../assets/main-video.mp4';

const Main = () => {
  const mainRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const observerTarget = mainRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const textElements = observerTarget.querySelectorAll('.intro-text, .main-title');
            textElements.forEach(element => {
              element.classList.remove('fade-slide-in');
              void element.offsetWidth;
              element.classList.add('fade-slide-in');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (observerTarget) {
      observer.observe(observerTarget);
    }

    // 화면 크기 변경 감지
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 모바일 버전의 텍스트
  const mobileIntroText = `With the conviction that 'design is an endless journey of evolution,' I continue to push boundaries and embrace new challenges each day. I'm passionate about creating innovative design journeys with everyone I collaborate with.`;

  // 데스크톱 버전의 텍스트
  const desktopIntroText = `With the conviction that 'design is an endless journey of ${'\n'}
    evolution,' I continue to push boundaries and ${'\n'}
    embrace new challenges each day. I'm passionate about ${'\n'}
    creating innovative design journeys with everyone I collaborate with.`;

  return (
    <main className="main" ref={mainRef}>
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        poster={mainVideo.replace('.mp4', '.jpg')} // 비디오 로딩 전 표시될 이미지
      >
        <source src={mainVideo} type="video/mp4" />
      </video>
      
      <div className="content-container">
        <div className="content-wrapper">
          <p className="intro-text">
            {isMobile ? mobileIntroText : desktopIntroText}
          </p>
          <h1 className="main-title">
            STANDING TALL<br />
            WHEN<br />
            FEAR COMES
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Main;