import React from 'react';
import '../styles/footer.css';
import footerProfile from '../assets/footerprofile.svg';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-profile-card">
          <img src={footerProfile} alt="Bella Profile" className="footer-profile-image" />
          <div className="footer-info">
            <div className="footer-title">
              <span className="footer-name">Bella</span>
              <span className="footer-title-separator">'s</span>
              <span className="footer-atelier">Atelier</span>
            </div>
            
            <div className="footer-details">
              <div className="footer-left">
                <div className="footer-detail-item">
                  <span className="footer-label">Name</span>
                  <span className="footer-value">IM JUNG MIN</span>
                </div>
                <div className="footer-detail-item">
                  <span className="footer-label">phone</span>
                  <a 
                    href="tel:+82-2-10-9901-8906" 
                    className="footer-value footer-link"
                  >
                    +82-2-10-9901-8906
                  </a>
                </div>
              </div>
              
              <div className="footer-right">
                <div className="footer-detail-item">
                  <span className="footer-label">e-mail</span>
                  <a 
                    href="mailto:imbellalm@gmail.com"
                    className="footer-value footer-link"
                  >
                    imbellalm@gmail.com
                  </a>
                </div>
                <div className="footer-detail-item">
                  <span className="footer-label">mbti</span>
                  <a 
                    href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj" target='_blank' rel="noopener noreferrer"
                    className="footer-value footer-link"
                  >
                    ESTJ-A
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;