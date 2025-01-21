// Design.jsx
import React, { useState, useEffect } from 'react';
import '../styles/design.css';
import arrow1 from '../assets/arrow1.svg';
import arrow2 from '../assets/arrow2.svg';
import designImg1 from '../assets/design1.svg';
import designImg2 from '../assets/design2.svg';
import designImg3 from '../assets/design3.svg';
import designImg4 from '../assets/design4.svg';

const Design = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const designs = [
    {
      id: 1,
      image: designImg1,
      category: 'Design > Creative > CI,BI',
      title: 'oa Brand logo design',
      subtitle: '(주)오아 브랜드 로고 디자인',
      description: `'발견' 과 '발명' 을 통해 단순한 제품이 아닌 생활가치를 제공하며\n소소비자가 필요한 기능과 서비스를 찾아 담아내는 합리적인 브랜드\n오아의 공식 브랜드 BI 를 디자인 하였습니다.\n\n2015년에 디자인하여 현재까지도 사용자들에게 많은 사랑을\n받고 있는 생활가전 브랜드로 자리매김 하고 있습니다.`,
      stacks: ['Creativity', 'Multiple interpretations', 'Reference', 'Flexible thinking', 'Planning', 'Color sense']
    },
    {
      id: 2,
      image: designImg2,
      category: 'Design > Creative > Artwork',
      title: 'Demure BX Artwork',
      subtitle: '디뮤어 BX 브랜드 아이덴티티 구축 및 아트워크 디자인',
      description: `나와 타인의 취향이 만나는 수줍은 의식을 컨셉으로 하는\n라이프스타일 브랜드 디뮤어는 로고 디자인 뿐만 아니라\n초기 디뮤어의 컨셉드로잉 부터 프로덕트 디자인 및 생산관리까지\n총괄하여 진행하였습니다.\n\n상단에 보이는 드로잉은 차량용 방향제 커버 입니다.\n무신사 입점 까지 진행하여 현재도 판매중에 있습니다.`,
      stacks: ['Creativity', 'Clear judgment', 'Reference', 'Objective thinking', 'Drawing skills']
    },
    {
      id: 3,
      image: designImg3,
      category: 'Design > Creative > CI,BI',
      title: 'iDevel company CI design',
      subtitle: '(주)아이디벨 CI 디자인',
      description: `사용자 경험을 늘 중시하고, 크리에이티브한 산출물로\n클라이언트의 니즈를 정확하게 파악하고 늘 한단계 앞서나가기 위해\n새로운 시선과 다양한 각도로 접근하는 SI IT 디지털 컴퍼니\n아이디벨의 로고를 리뉴얼 하였습니다.\n\n현재도 현행화 되어 있습니다.`,
      stacks: ['Expertise', 'Refined design', 'Stability', 'Credibility', 'Universal validity']
    },
    {
      id: 4,
      image: designImg4,
      category: 'Design > UI/UX',
      title: 'Yo! Toyota! App design',
      subtitle: '요토요타 어플리케이션 디자인 총괄',
      description: `웹앱으로 개발된 요토요타 어플리케이션 디자인 유지보수 총괄로\n현재도 디자인 추가사항이나 신차 출시 시 신차 디자인 추가,\n이벤트 및 프로모션, 공지사항 페이지 추가 등\n어플리케이션의 디자인 유지보수 총괄을 맡고 있습니다.\n\n현재도 디자인을 맡아 진행하고 있으며,\nAOS/iOS 앱 내 모든 디자인 작업 기여도 100% 입니다.`,
      stacks: ['Maintaining corporate tone and manner', 'Optimized UX', 'Clean and crisp design']
    }
  ];

  // 스와이프 감지를 위한 최소 거리
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && !animating) {
      handleNextSlide();
    } else if (isRightSwipe && !animating) {
      handlePrevSlide();
    }
  };

  const handlePrevSlide = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentSlide(prev => (prev === 0 ? designs.length - 1 : prev - 1));
    setTimeout(() => setAnimating(false), 1000);
  };

  const handleNextSlide = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentSlide(prev => (prev === designs.length - 1 ? 0 : prev + 1));
    setTimeout(() => setAnimating(false), 1000);
  };

  useEffect(() => {
    const preventDefaultTouchBehavior = (e) => {
      const target = e.target;
      // 이미지나 특정 요소에만 preventDefault 적용
      if (target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefaultTouchBehavior, { passive: false });
    return () => {
      document.removeEventListener('touchstart', preventDefaultTouchBehavior);
    };
  }, []);

  return (
    <section className="design">
      <h1>Design</h1>

      <div className="design-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          className={`nav-button prev ${animating ? 'disabled' : ''}`}
          onClick={handlePrevSlide}
          disabled={animating}
        >
          <img src={arrow1} alt="Previous" />
        </button>

        <div className="slides-container">
          {designs.map((design, index) => {
            let position = 'next';
            if (index === currentSlide) position = 'active';
            else if (index === (currentSlide - 1 + designs.length) % designs.length) position = 'prev';
            else if (index === (currentSlide + 1) % designs.length) position = 'next';
            else position = 'hidden';

            return (
              <div key={design.id} className={`design-card ${position}`}>
                <div className="card-inner">
                  <img src={design.image} alt={design.title} className="design-image" />
                  <div className="design-details">
                    <div className="design-category">{design.category}</div>
                    <h2 className="design-title">{design.title}</h2>
                    <h3 className="design-subtitle">{design.subtitle}</h3>
                    <div className="divider"></div>
                    <div className="scrollable-description">
                      <p className="design-description">{design.description}</p>
                    </div>
                    <div className="divider"></div>
                    <div className="stacks-section">
                      <h4 className="stacks-title">Stacks</h4>
                      <div className="stack-tags">
                        {design.stacks.map((stack, idx) => (
                          <span key={idx} className="stack-tag">{stack}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className={`nav-button next ${animating ? 'disabled' : ''}`}
          onClick={handleNextSlide}
          disabled={animating}
        >
          <img src={arrow2} alt="Next" />
        </button>
      </div>
    </section>
  );
};

export default Design;