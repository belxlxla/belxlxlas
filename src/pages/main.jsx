// Main.jsx
import React, { useRef, useEffect } from 'react';
import '../styles/main.css';
import mainVideo from '../assets/main-video.mp4';

const Main = () => {
  const mainRef = useRef(null);

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

    return () => {
      if (observerTarget) {
        observer.unobserve(observerTarget);
      }
    };
  }, []);

  return (
    <main className="main" ref={mainRef}>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={mainVideo} type="video/mp4" />
      </video>
      
      <div className="content-container">
        <div className="content-wrapper">
          <p className="intro-text">
            With the conviction that 'design is an endless journey of {'\n'}
            evolution,' I continue to push boundaries and {'\n'}
            embrace new challenges each day. I'm passionate about {'\n'}
            creating innovative design journeys with everyone I collaborate with.
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