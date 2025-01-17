// Archive.jsx
import React from 'react';
import '../styles/archive.css';
import gitIcon from '../assets/gitlogo.svg';
import profileImg from '../assets/gitprofile.svg';
import gitArrow from '../assets/gitarr.svg';

const ArchiveArea = () => {
    return (
      <div className="archive-wrapper">
        <h1 className="archive-title">
          Development <span className="archive-title-bold">Archive</span>
        </h1>
  
        <div className="archive-banner">
          <div className="banner-content">
            <div className="git-section">
              <img src={gitIcon} alt="Git Icon" className="git-icon" />
            </div>
  
            <div className="profile-section">
              <img src={profileImg} alt="Profile" className="profile-image" />
              
              <div className="profile-info">
                <div className="github-info">
                  <a 
                    href="https://github.com/belxlxla" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    @Belxlxla
                  </a>
                  <span className="click-nickname">Click to nickname</span>
                </div>
  
                <div className="contribution-info">
                  <div className="activity-line">
                    <span className="contribution-label">Contribution activity - </span>
                    <span className="recently">Recently</span>
                  </div>
                </div>
  
                <div className="commit-info">
                    <img src={gitArrow} alt="git arrow" className="commit-number" />
                    <span className="commit-text">Created 2 commits in 1 repository</span>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ArchiveArea;