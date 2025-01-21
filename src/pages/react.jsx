// React.jsx
import React, { useState } from 'react';
import '../styles/react.css';
import reactVideo from '../assets/video1.mp4';
import arrRight from '../assets/arrright.svg';
import baNner1 from '../assets/banner1.svg';
import baNner2 from '../assets/banner2.svg';
import baNner3 from '../assets/banner3.svg';

const ReactArea = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const portfolioItems = [
    {
      id: 1,
      date: "2024. 01. (0.5 M/M)",
      title: "Kyle’s portfolio website",
      image: baNner1,
      link: "https://kyleportfolio.site/",
      languages: {
        javascript: 64.1,
        css: 35.2,
        html: 0.7
      }
    },
    {
      id: 2,
      date: "2024. 02. (1 M/M)",
      title: "VandiML platform website",
      image: baNner2,
      link: "https://www.vandiml.com",
      languages: {
        javascript: 64.1,
        css: 35.2,
        html: 0.7
      }
    },
    {
      id: 3,
      date: "2024. 01. (1 M/M)",
      title: "Vanishstereotype website",
      image: baNner3,
      link: "https://vanishstereotype.com",
      languages: {
        javascript: 63.6,
        css: 28.6,
        html: 7.8
      }
    }
  ];

  return (
    <div className="react-wrapper">
      <video className="react-video" autoPlay muted loop>
        <source src={reactVideo} type="video/mp4" />
      </video>
      
      <div className="react-container">
        <h1 className="react-title">React</h1>
        
        <div className="react-list">
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className="react-card"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="react-image-section">
                {index === 1 && (
                  <div className="vandi-overlay">
                    <div className="vandi-logo-container">
                      <img src={item.image} alt="Vandi Logo" className="vandi-logo" />
                      <span className="vandi-text"></span>
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div className="vanish-title"></div>
                )}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="react-image"
                />
              </div>
              
              <div className="react-content">
                <div className="react-header">
                <span className="react-date">{item.date}</span>
                    <h3 className="react-card-title">{item.title}</h3>
                </div>

                <div className="language-section">
                <p className="language-title">Language</p>
                <div className="language-bar">
                <div className="js-bar" style={{width: `${item.languages.javascript}%`}} />
                <div className="css-bar" style={{width: `${item.languages.css}%`}} />
                <div className="html-bar" style={{width: `${item.languages.html}%`}} />
                </div>
                <div className="language-labels">
                <span className="js-label">Javascript {item.languages.javascript}%</span>
                <span className="css-label">CSS {item.languages.css}%</span>
                <span className="html-label">HTML {item.languages.html}%</span>
                </div>
                </div>

                <a 
                href={item.link}
                className={`react-link ${hoveredItem === item.id ? 'hovered' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                >
                Go to Website
                <img 
                src={arrRight} 
                alt="arrow" 
                className="react-arrow"
                />
                </a>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactArea;