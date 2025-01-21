// Skills.jsx
import React, { useEffect, useRef } from 'react';
import '../styles/skills.css';

// bella : 이미지 imports 첫번째 줄
import macIcon from '../assets/macicon.svg';
import figmaIcon from '../assets/figmaicin.svg';
import sketchIcon from '../assets/zeplinicon.svg';
import psIcon from '../assets/ptshopicon.svg';
import aiIcon from '../assets/illusticon.svg';
import xdIcon from '../assets/xdicon.svg';
import aeIcon from '../assets/eeicon.svg';
import prIcon from '../assets/pricon.svg';
import notionIcon from '../assets/notionicon.svg';
import docsIcon from '../assets/docsicon.svg';
import officeIcon from '../assets/microicon.svg';
// 두 번째 줄
import proCreateIcon from '../assets/procicon.svg';
import midIcon from '../assets/midicon.svg';
import cldIcon from '../assets/claudeicon.svg';
import pikaIcon from '../assets/pikaicon.svg';
import discordIcon from '../assets/dicoicon.svg';
import youtubeIcon from '../assets/youtubeicon.svg';
import htmlIcon from '../assets/htmlicon.svg';
import cssIcon from '../assets/cssicon.svg';
import jsIcon from '../assets/jsicon.svg';
import reactIcon from '../assets/reacticon.svg';
import vscodeIcon from '../assets/vsicon.svg';
// 세 번째 줄
import githubIcon from '../assets/giticon.svg';

const Skills = () => {
    const skillsRef = useRef(null);
  
    useEffect(() => {
      const observerTarget = skillsRef.current;
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const gaugeBars = document.querySelectorAll('.icon-gauge-fill, .bar-fill');
              gaugeBars.forEach(bar => {
                bar.classList.remove('animate');
                void bar.offsetWidth;
                bar.classList.add('animate');
              });
            }
          });
        },
        { 
          threshold: 0.1,  // bella : 10% 정도 보일 때 트리거
          // rootMargin: '0px 0px -10% 0px' 필요시 추가해도됨
        }
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


    const skillsData = {
      firstRow: [
        { 
          name: 'Mac', 
          icon: macIcon, 
          category: 'OS',
          proficiency: 80, // bella : 수치 조절하면 그래프가 바뀜
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #fff)'
        },
        { 
          name: 'Figma', 
          icon: figmaIcon, 
          category: 'Design Tool',
          proficiency: 80,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #A259FF)'
        },
        { 
          name: 'Zeplin', 
          icon: sketchIcon, 
          category: 'Design Tool',
          proficiency: 80,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #FDBD39)'
        },
        { 
          name: 'Photoshop', 
          icon: psIcon, 
          category: 'Design Tool',
          proficiency: 70,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #31A8FF)'
        },
        { 
          name: 'Illustrator', 
          icon: aiIcon, 
          category: 'Design Tool',
          proficiency: 75,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #FF9A00)'
        },
        { 
          name: 'XD', 
          icon: xdIcon, 
          category: 'Design Tool',
          proficiency: 90,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #FF61F6)'
        },
        { 
          name: 'After Effects', 
          icon: aeIcon, 
          category: 'Design Tool',
          proficiency: 40,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #9999FF)'
        },
        { 
          name: 'Premiere Pro', 
          icon: prIcon, 
          category: 'Design Tool',
          proficiency: 45,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #9999FF)' 
        },
        { 
          name: 'Notion', 
          icon: notionIcon, 
          category: 'Documents',
          proficiency: 65,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #fff)'
        },
        { 
          name: 'Google Docs', 
          icon: docsIcon, 
          category: 'Documents',
          proficiency: 55,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #1050F0)'
        },
        { 
          name: 'Microsoft Office', 
          icon: officeIcon, 
          category: 'Documents',
          proficiency: 55,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #D83C03)'
        }
      ],
      secondRow: [
        { 
          name: 'Procreate', 
          icon: proCreateIcon, 
          category: 'Drawing Tool',
          proficiency: 85,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #4430AD)'
        },
        { 
          name: 'Midjourney', 
          icon: midIcon, 
          category: 'AI Tool',
          proficiency: 65,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #fff)'
        },
        { 
          name: 'Claude', 
          icon: cldIcon, 
          category: 'AI Tool',
          proficiency: 85,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #CA9C7A)'
        },
        { 
          name: 'Pika', 
          icon: pikaIcon, 
          category: 'AI Tool',
          proficiency: 85,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #FFEDD2)'
        },
        { 
          name: 'Discord', 
          icon: discordIcon, 
          category: 'Chat Platform',
          proficiency: 85,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #505CD6)'
        },
        { 
          name: 'YouTube', 
          icon: youtubeIcon, 
          category: 'Media',
          proficiency: 85,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #FF0001)'
        },
        { 
          name: 'HTML5', 
          icon: htmlIcon, 
          category: 'Development Language',
          proficiency: 55,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #E44D26)'
        },
        { 
          name: 'CSS3', 
          icon: cssIcon, 
          category: 'Development Language',
          proficiency: 65,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #1758A7)'
        },
        { 
          name: 'JavaScript', 
          icon: jsIcon, 
          category: 'Development Language',
          proficiency: 45,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #F0DB4F)'
        },
        { 
          name: 'React', 
          icon: reactIcon, 
          category: 'Development Language',
          proficiency: 65,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #00DCF9)'
        },
        { 
          name: 'VS Code', 
          icon: vscodeIcon, 
          category: 'Development Tool',
          proficiency: 55,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #24ADF3)'
        }
      ],
      thirdRow: [
        { 
          name: 'GitHub', 
          icon: githubIcon, 
          category: 'Productivity',
          proficiency: 45,
          gaugeColor: 'linear-gradient(to right, #3e3e3e, #fff)'
        }
      ],
      skillBars: [
        { name: '디자인', percentage: 95 },
        { name: '기획력', percentage: 85 },
        { name: '작업 속도', percentage: 90 },
        { name: '운영', percentage: 88 },
        { name: '협업', percentage: 92 },
        { name: '개발', percentage: 85 },
        { name: '자기 객관화', percentage: 87 },
        { name: '예술적 감각', percentage: 83 }
      ]
    };

    return (
        <section className="skills" ref={skillsRef}>
      <h2 className="skills-title">Skills</h2>
      
      <div className="skills-content">
        <div className="tools-grid">
          <div className="tools-row">
            {skillsData.firstRow.map((tool, index) => (
              <div key={index} className="skill-item">
                <img src={tool.icon} alt={tool.name} />
                    <div className="icon-gauge-bar">
                        <div 
                        className={`icon-gauge-fill`}
                        style={{
                        '--gauge-value': `${tool.proficiency}%`,
                        background: tool.gaugeColor
                        }}
                        ></div>
                    </div>
                <div className="tooltip">
                  <span className="tooltip-description">{tool.category} </span>
                  <div className="tooltip-title">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="tools-row">
            {skillsData.secondRow.map((tool, index) => (
              <div key={index} className="skill-item">
                <img src={tool.icon} alt={tool.name} />
                    <div className="icon-gauge-bar">
                    <div 
                        className={`icon-gauge-fill`}
                        style={{
                        '--gauge-value': `${tool.proficiency}%`,
                        background: tool.gaugeColor
                        }}
                        ></div>
                    </div>
                <div className="tooltip">
                  <span className="tooltip-description">{tool.category}</span>
                  <div className="tooltip-title">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="tools-row">
            {skillsData.thirdRow.map((tool, index) => (
              <div key={index} className="skill-item">
                <img src={tool.icon} alt={tool.name} />
                    <div className="icon-gauge-bar">
                    <div 
                        className={`icon-gauge-fill`}
                        style={{
                        '--gauge-value': `${tool.proficiency}%`,
                        background: tool.gaugeColor
                        }}
                        ></div>
                    </div>
                <div className="tooltip">
                  <span className="tooltip-description">{tool.category}</span>
                  <div className="tooltip-title">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-bars">
          {skillsData.skillBars.map((skill, index) => (
            <div key={index} className="skill-bar">
              <span className="skill-name">{skill.name}</span>
              <div className="bar-container">
                    <div 
                    className={`bar-fill`}
                    style={{
                    '--fill-value': `${skill.percentage}%`,
                    background: skill.barColor || 'linear-gradient(to right, #333, #FF1493)'
                    }}
                    ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;