// designwiki.jsx
import React, { useState } from 'react';
import '../styles/designwiki.css';
import arrUp from '../assets/arrup.svg';
import arrDown from '../assets/arrdown.svg';
import conTents1 from '../assets/contents1.svg';
import conTents2 from '../assets/contents2.svg';
import conTents3 from '../assets/contents3.svg';
import conTents4 from '../assets/contents4.svg';

const DesignWiki = () => {
 const [openItems, setOpenItems] = useState({ 1: true });

 const wikiItems = [
    {
        id: 1, // bella : 위키 추가 부분
        date: '2025년.',
        title: '생성형 AI 를 이용한 txt to img 와 직접 이미지를 디자인 하는 산출물에 대한 간극',
        content: (
            <div style={{ whiteSpace: 'pre-line' }}>
                {`인공지능의 시대가 도래한 지 어느덧 2년이 넘었다. 
                그 중에서도 특히 생성형 AI의 급격한 발전은 많은 디자이너들에게 충격과 함께 자신의 역할에 대한 의문을 갖게 했다.
                단순히 몇 개의 단어를 입력하는 것만으로도 그럴듯한 이미지를 쏟아내는 AI 플랫폼들이 우후죽순 등장하면서,
                디자이너의 미래는 어떻게 될 것인가에 대한 우려의 목소리가 커졌다.`}
            </div>
        ),
        image: conTents1,
        afterImageContent: (
            <div style={{ whiteSpace: 'pre-line' }}>
                {`[@txt to img 멀티모달 형식의 디스코드 베이스 플랫폼 미드저니로 생성한 이미지 산출물]

                생성형 AI의 등장으로 디자이너의 역할은 분명 변화할 것이다.
                하지만 이는 위기가 아닌 기회로 바라볼 필요가 있다. 이제 디자이너는 단순 이미지 제작자에서 벗어나,
                문제를 해결하고 혁신을 주도하는 역할로 나아가야 한다.
                AI를 효과적인 디자인 도구로 활용하여 창의력을 증대시키고, 사용자 중심의 인사이트를 발굴하여 
                차별화된 UX 전략을 수립해야 할 것이다.
                
                생성형 AI의 등장은 UIUX 디자이너에게 새로운 도전과 기회를 동시에 제공하고 있다.
                이제 우리는 두려움 대신 적극적인 자세로 변화를 받아들이고,
                디자이너만의 고유한 가치와 역량을 더욱 강화해 나가야 할 때이다.
                AI와 협업하며 끊임없이 성장하는 것, 그것이 바로 생성형 AI 시대를 맞이한 
                UIUX 디자이너가 나아가야 할 길이 아닐까.`}
            </div>
        )
    },
    {
      id: 2,
      date: '2025년.',
      title: '디자이너와 프론트 개발자의 경계가 무너지는 순간',
      content: (
          <div style={{ whiteSpace: 'pre-line' }}>
              {`"네? 리액트도 할 줄 아냐구요?" 처음에는 내 귀를 의심했다.
              디자이너와 프론트 개발자는 서로 다른 영역의 전문가로, 각자의 역할과 책임이 분명히 구분되어 있었기 때문이다.
              하지만 그 경계가 아무렇지도 않게 무너지는 순간을 마주하게 되었다.`}
          </div>
      ),
      image: conTents2,
      afterImageContent: (
          <div style={{ whiteSpace: 'pre-line' }}>
              {`[@분명하게 존재했던, 그리고 구분되어 있었던 IT 직군이 허물어지는 요즘]

              최근 들어 디자인과 개발의 경계가 점점 모호해지고 있다.
              디자이너에게 코딩 능력이, 개발자에게 디자인 감각이 요구되는 시대가 된 것이다.
              이러한 변화의 배경에는 급격히 발전하는 기술과 사용자 경험에 대한 높아진 기대치가 자리잡고 있다.
              
              과거에는 디자이너가 와이어프레임과 목업을 만들면, 개발자가 이를 바탕으로 코드를 작성하는 방식이었다.
              하지만 이제는 디자이너가 직접 코드를 짜서 인터랙션을 구현하고, 
              개발자는 디자인 시스템을 이해하고 적용할 수 있어야 한다.
              이는 더 나은 사용자 경험을 제공하기 위한 필수불가결한 과정이 되었다.
              물론 여전히 각자의 전문 영역에서 깊이 있는 지식과 경험을 쌓는 것이 중요하지만 
              서로의 영역을 이해하고 소통할 수 있는 능력은 점점 더 강조되고 있다.

              경계가 무너진다는 것은 두려움으로 다가올 수 있다.
              하지만 이는 새로운 가능성을 열어주는 기회이기도 하다. 디자이너와 프론트 개발자가 서로의 영역을 존중하면서도,
              협력과 소통을 통해 성장한다면 우리는 더욱 혁신적이고 사용자 친화적인 제품과 서비스를 만들어낼 수 있을 것이다.
              경계를 넘나드는 융합의 시대, 우리는 이 변화의 물결을 긍정적으로 받아들여 봄 직 하다.`}
          </div>
      )
  },
  {
    id: 3,
    date: '2025년.',
    title: '오래된 디자인도 존중받아야 하는 이유',
    content: (
        <div style={{ whiteSpace: 'pre-line' }}>
            {`디자인 트렌드는 패션처럼 돌고 도는 것 같다. 15년 동안 디자이너로 일하면서 내가 배운 교훈 중 하나다.
            새로운 디자인 스타일이 등장하고 유행하다가도,
            어느 순간 다시 과거의 디자인이 주목받는 모습을 여러 번 목격했다.`}
        </div>
    ),
    image: conTents3,
    afterImageContent: (
        <div style={{ whiteSpace: 'pre-line' }}>
            {`[@다시 돌아온 레트로 디자인, 지금은 새로운 레트로라고 해서 뉴(new)트로 디자인이라고 한다.]

            우리는 종종 최신 트렌드에 매몰되어 과거의 디자인을 낡고 구식이라고 치부하곤 한다.
            하지만 오래된 디자인 또한 그 나름의 가치와 의미를 지니고 있다.
            당시의 사회상과 기술 수준, 그리고 사람들의 미적 감각을 반영하는 것이 바로 디자인이기 때문이다.
            과거의 디자인은 현재의 디자인에 영감을 주기도 한다. 레트로 디자인이 유행하는 이유는 
            바로 과거 디자인의 매력이 현대적으로 재해석되었기 때문이다.

            또한, 오래된 디자인은 그 자체로도 예술적 가치를 지닌다. 
            시대를 아우르는 디자인 클래식은 단순히 유행을 타고 사라지는 것이 아니라, 박물관에 전시될 만큼 가치를 인정받는다. 
            그것은 디자이너의 창의성과 혁신성, 그리고 시대정신이 녹아있는 결과물이기 때문이다.
            오래된 디자인의 가치를 인정하고 존중하는 자세야말로 진정한 디자이너의 자질이 아닐까.

            시대를 초월한 가치를 지닌 디자인을 만들기 위해서는, 과거와 현재를 아우르는 안목이 필요할 것이다.`}
        </div>
    )
},
    {
        id: 4,
        date: '2024년.',
        title: '콘텐츠 디자이너가 기획력이 좋을수 밖에',
        content: (
            <div style={{ whiteSpace: 'pre-line' }}>
                {`콘텐츠 디자이너는 단순히 글과 이미지를 배치하는 역할을 넘어, 
                사용자의 니즈를 파악하고 이를 효과적으로 충족시키는 콘텐츠를 기획해야 한다. 
                이는 곧 뛰어난 기획력을 필요로 하는 일이다.`}
            </div>
        ),
        image: conTents4,
        afterImageContent: (
            <div style={{ whiteSpace: 'pre-line' }}>
                {`[@신세계 빌리브 메인 배너, 기획자 없는 콘텐츠 디자이너는 기획부터 디자인까지 거의 다 해야 한다.]
                
                콘텐츠 디자이너가 기획력을 갖추어야 하는 첫 번째 이유는 사용자 중심적 사고에 있다. 
                사용자의 관점에서 콘텐츠를 바라보고, 그들이 원하는 정보와 경험을 제공할 수 있어야 한다. 
                이를 위해서는 사용자 리서치와 데이터 분석 능력이 필수적이다.
                
                두 번째로, 콘텐츠 디자이너는 브랜드의 메시지와 가치를 효과적으로 전달할 수 있는 전략을 수립해야 한다. 
                일관되고 통일성 있는 콘텐츠를 기획함으로써 브랜드 아이덴티티를 구축하고 강화할 수 있다.
                
                마지막으로, 콘텐츠 디자이너는 다양한 채널과 플랫폼에 적합한 콘텐츠를 기획할 수 있어야 한다. 
                각 채널의 특성과 사용자 행동 패턴을 이해하고, 이에 맞는 최적화된 콘텐츠를 제공하는 것이 중요하다.
                결국 콘텐츠 디자이너에게 있어 기획력은 선택이 아닌 필수 역량이다. 
                사용자 중심적 사고, 브랜드 전략 수립, 채널 특성 이해 등 다양한 요소를 고려한 기획 능력이 있어야만 
                성공적인 콘텐츠 디자인이 가능하다.`}
            </div>
        )
    },
    {
        id: 5,
        date: '2024년.',
        title: '사용자 인터페이스에 관련한 소소한 이야기',
        content: (
            <div style={{ whiteSpace: 'pre-line' }}>
                {`우리는 일상 속에서 수많은 사용자 인터페이스(UI)와 마주한다. 스마트폰 애플리케이션부터 웹사이트, 
                심지어 커피 머신에 이르기까지 UI는 우리 삶의 곳곳에 스며들어 있다. 
                하지만 우리는 이러한 UI에 대해 깊이 생각해 볼 기회가 많지 않다.
                
                UI 디자이너로서 나는 사람들이 UI와 상호작용하는 모습을 관찰하는 것을 즐긴다. 
                어떤 이는 직관적으로 UI를 탐색하는 반면, 어떤 이는 버튼 하나를 찾기 위해 애를 쓰기도 한다. 
                이러한 모습을 보면서 UI 디자인의 중요성을 깨닫게 된다.
                
                좋은 UI란 사용자가 의식하지 않아도 자연스럽게 상호작용할 수 있는 것이다. 사용자의 목적을 정확히 파악하고, 
                그들의 행동 패턴을 고려하여 설계되어야 한다. 단순히 기능을 나열하는 것이 아니라, 
                사용자의 감성을 자극하고 긍정적인 경험을 제공할 수 있어야 한다.
                
                반면 사용자를 혼란스럽게 만드는 UI도 있다. 일관성 없는 디자인, 직관적이지 않은 아이콘, 
                복잡한 네비게이션 등은 사용자의 경험을 저하시킨다. 
                이는 사용자의 불만을 야기할 뿐만 아니라, 브랜드 이미지에도 부정적인 영향을 미칠 수 있다.
                
                일상 속 소소한 UI의 모습을 관찰해 보자. 그 안에는 사용자를 배려하는 디자이너의 노력과 창의성이 담겨 있다. 
                UI는 단순한 디자인 요소가 아닌, 우리 삶의 경험을 형성하는 중요한 도구임을 잊지 말아야 할 것이다.`}
            </div>
        )
    }
 ];

 const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="design-wiki">
      <div className="wiki-content">
        <div className="wiki-title-wrapper">
         <h1 className="wiki"><b>Design</b>Wiki</h1>
        </div>
        <div className="wiki-list">
          {wikiItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`wiki-item ${openItems[item.id] ? 'open' : ''}`}
              style={{
                opacity: Math.max(1 - (index * 0.2), 0.3)
              }}
            >
              <div className="wiki-header" onClick={() => toggleItem(item.id)}>
                <div className="wiki-date">{item.date}</div>
                <h2 className="wiki-title">{item.title}</h2>
                <button className="toggle-button">
                    <div className="toggle-image-container">
                    <img 
                    src={arrDown} 
                    alt="toggle down" 
                    className={`toggle-arrow down ${openItems[item.id] ? 'hidden' : 'visible'}`}
                    />
                    <img 
                    src={arrUp} 
                    alt="toggle up" 
                    className={`toggle-arrow up ${openItems[item.id] ? 'visible' : 'hidden'}`}
                    />
                    </div>
                    </button>
              </div>
              <div className="wiki-body">
                <p>{item.content}</p>
                {item.image && (
                <>
                <img src={item.image} alt="content" className="content-image" />
                {item.afterImageContent && <p className="after-image-text">{item.afterImageContent}</p>}
                </>
                )}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignWiki;