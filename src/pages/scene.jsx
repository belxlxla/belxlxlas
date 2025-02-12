// Scene.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/scene.css';

import sl01 from '../assets/sl01.svg';
import sl02 from '../assets/sl02.svg';
import sl03 from '../assets/sl03.svg';
import sl04 from '../assets/sl04.svg';
import sl05 from '../assets/sl05.svg';
import sl06 from '../assets/sl06.svg';
import sl07 from '../assets/sl07.svg';

const Scene = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const sceneRef = useRef(null);
    const hasScrolledRef = useRef(false);
    
    const slideImages = [
      sl01, sl02, sl03, sl04, sl05, sl06, sl07,
      sl01, sl02, sl03, sl04, sl05, sl06, sl07
    ];
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            setIsExpanded(false);
            hasScrolledRef.current = false;
          }
        },
        {
          threshold: 0.1,
        }
      );
  
      if (sceneRef.current) {
        observer.observe(sceneRef.current);
      }
  
      return () => observer.disconnect();
    }, []);
  
    useEffect(() => {
      const handleScroll = () => {
        if (!isInView || hasScrolledRef.current) return;
        
        const rect = sceneRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          hasScrolledRef.current = true;
          setIsExpanded(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isInView]);
  
    return (
      <div 
        ref={sceneRef}
        className={`scene-container ${isExpanded ? 'scene-expanded' : ''}`}
      >
        <div className="scene-dot">
          <div className="scene-inner-container">
            <div className="scene-text">
              <h1>STANDING TALL</h1>
              <h1>WHEN</h1>
              <h1>FEAR COMES</h1>
            </div>
            <div className="scene-slider-container">
              <div className="scene-slider">
                {slideImages.map((image, index) => (
                  <div key={index} className="scene-slide">
                    <img src={image} alt={`Slide ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Scene;