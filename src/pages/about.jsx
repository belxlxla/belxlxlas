// About.jsx
import React, { useRef, useEffect } from 'react';
import '../styles/about.css';
import myname from '../assets/myname.svg';
import profile1 from '../assets/profile1.svg';

const About = () => {
    const sectionRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (!sectionRef.current) return;
        
        const scrolled = window.scrollY;
        // bella : 스크롤 제한 위치
        const maxScroll = 200;
        
        // bella : 스크롤 속도
        const limitedScroll = Math.min(scrolled, maxScroll);
        const rate = limitedScroll * 0.4;
        
        sectionRef.current.style.transform = `translateY(${rate}px)`;
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return ( // bella : 메인 소개 문구
        <section className="about-section">
            <div className="about-container" ref={sectionRef}>
                <div className="about-header">
                    <p className="about-sub-title">
                        <span className="about-text-bold">!사용자 경험을 디자인</span>
                        <span className="about-text-light">하는 </span>
                        <span className="about-text-bold">15년차 시니어 아트디렉터</span>
                    </p>
                    <div className="about-name-wrapper">
                        <p className="about-sub-description">임정민 입니다.</p>
                        <img src={myname} alt="임정민" className="about-name-img" />
                    </div>
                </div>
                
                <div className="about-content">
                    <div className="about-profile-image">
                        <img src={profile1} alt="프로필 이미지" />
                    </div>
                    
                    <div className="about-text-content">
                        <p className="about-intro">안녕하세요, 사용자 경험을 디자인하는 아트디렉터 임정민입니다.</p>
                        
                        <p className="about-description">
                            15년간 수많은 프로젝트를 이끌며 쌓아온 경험을 바탕으로,<br />
                            사용자와 브랜드 사이의 의미 있는 연결을 창조하는 것이 저의 핵심 가치입니다.<br />
                            UI/UX 디자인을 통해 복잡한 문제를 우아한 솔루션으로 변환하는 과정에서<br />
                            특별한 즐거움을 느낍니다.
                        </p>
                        
                        <p className="about-description">
                            끊임없이 변화하는 디지털 환경 속에서, '영원한 학습자' 의 자세를 잃지 않습니다.<br />
                            디자인과 개발 분야의 기술적 혁신을 주시하며, 이를 실제 프로젝트에 적용하는 과정에서<br />
                            새로운 가능성을 발견합니다.<br />
                            15년의 경력이 안주할 수 있는 편안한 자리가 아닌,<br />
                            더 높은 도약을 위한 발판이 되어야 한다고 믿습니다.
                        </p>
                        
                        <p className="about-description">
                            유연한 사고방식과 창의적 문제해결 능력은 제가 가장 자부심을 느끼는 부분입니다.<br />
                            고정된 틀에 얽매이지 않고, 각 프로젝트의 독특한 맥락과 요구사항에 맞춰<br />
                            최적의 해결책을 제시합니다.<br />
                            이 과정에서 팀원 들의 다양한 관점을 존중하고, 이를 통합하여 더 나은 결과를 만드는 것이<br />
                            제 역할이라고 생각합니다.
                        </p>
                        
                        <p className="about-quote">
                            <span className="about-highlight">"나는 끊임없는 진화하는 과정속에 있다"</span> 라는 믿음으로, <br />
                            저는 오늘도 새로운 도전을 향해 항해하고 있습니다.<br />
                            함께 일하는 모든 분들과 혁신적인 디자인 여정을 만들어 가고 싶습니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;