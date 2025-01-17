// Proposal.jsx
import React, { useState } from 'react';
import '../styles/proposal.css';

const ChevronDownIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
  
  const CloseIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
  
  const Proposal = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [isDirectInput, setIsDirectInput] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
      nameCompany: '',
      contact: '',
      email: '',
      domain: '',
      message: ''
    });
  
    const domains = [
      'gmail.com',
      'naver.com',
      'kakao.com',
      'outlook.com',
      'yahoo.com',
      '직접 입력하기'
    ];
  
    const initialFormState = {
      nameCompany: '',
      contact: '',
      email: '',
      domain: '',
      message: ''
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      requestAnimationFrame(() => {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      });
    };

    const handleTextareaChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const resetForm = () => {
      setFormData(initialFormState);
      setSelectedDomain('');
      setIsDirectInput(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setShowAlert(true);
      resetForm();
    };
  
    const handleDomainSelect = (domain) => {
      if (domain === '직접 입력하기') {
        setIsDirectInput(true);
        setSelectedDomain('');
      } else {
        setIsDirectInput(false);
        setSelectedDomain(domain);
      }
      setIsDropdownOpen(false);
    };
  
    return (
      <div className="proposal-container">
        <div className="proposal-content">
          <h1 className="proposal-title">Job & Project <span>Proposals</span></h1>
          
          <form className="proposal-form" onSubmit={handleSubmit}>
            <div className="proposal-form-row">
              <div className="proposal-form-group">
                <label className="proposal-label">Name / Company</label>
                <input
                  className="proposal-input"
                  type="text"
                  name="nameCompany"
                  placeholder="Enter your name or company"
                  value={formData.nameCompany}
                  onChange={handleInputChange}
                />
              </div>
              <div className="proposal-form-group">
                <label className="proposal-label">Contact Information</label>
                <input
                  className="proposal-input"
                  type="text"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
            </div>
  
            <div className="proposal-form-row">
              <div className="proposal-form-group proposal-email-group">
                <label className="proposal-label">e-mail address</label>
                <input
                  className="proposal-input"
                  type="text"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="proposal-form-group proposal-domain-group">
                <label className="proposal-label">Domain</label>
                {isDirectInput ? (
                  <input
                    className="proposal-input"
                    type="text"
                    name="domain"
                    placeholder="(예: @email.com)"
                    value={formData.domain}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div 
                    className="proposal-dropdown"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="proposal-dropdown-header">
                      <span>{selectedDomain || 'Choose domain'}</span>
                      <ChevronDownIcon />
                    </div>
                    {isDropdownOpen && (
                      <div className="proposal-dropdown-content">
                        {domains.map((domain, index) => (
                          <div 
                            key={index}
                            className="proposal-dropdown-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDomainSelect(domain);
                            }}
                          >
                            {domain}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
  
            <div className="proposal-form-group">
              <label className="proposal-label">Message</label>
              <textarea
                className="proposal-textarea"
                name="message"
                placeholder="Bella에게 채용 제안이나 프로젝트 제안 등 남기실 메세지를 자유롭게 남겨 주세요."
                value={formData.message}
                onChange={handleTextareaChange}
                style={{ imeMode: 'auto' }}
                autoComplete="off"
                lang="ko"
              />
            </div>
  
            <button className="proposal-submit" type="submit">Submit</button>
          </form>
        </div>
  
        {showAlert && (
          <div className="proposal-alert-overlay">
            <div className="proposal-alert">
              <button 
                className="proposal-alert-close"
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon />
              </button>
              <h2>Thank you!</h2>
              <p>정상적으로 전송되었습니다.</p>
              <button 
                className="proposal-alert-confirm"
                onClick={() => setShowAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Proposal;