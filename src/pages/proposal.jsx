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

const generateEmailTemplate = (formData, selectedDomain) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Montserrat', Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #000000;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      background-color: #000000;
      color: #ffffff;
    }
    .header {
      margin-bottom: 60px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
    }
    .title span {
      font-weight: 300;
    }
    .form-row {
      margin-bottom: 34px;
    }
    .form-label {
      font-size: 12px;
      color: #ffffff;
      margin-bottom: 24px;
      display: block;
    }
    .form-value {
      font-size: 16px;
      padding: 12px 0;
      border-bottom: 1px solid #333333;
      color: #ffffff;
    }
    .message-box {
      background-color: #161515;
      padding: 20px;
      margin-top: 20px;
      min-height: 200px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Job & Project <span>Proposals</span></h1>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <div class="form-label">Name / Company</div>
        <div class="form-value">${formData.nameCompany}</div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <div class="form-label">Contact Information</div>
        <div class="form-value">${formData.contact}</div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <div class="form-label">e-mail address</div>
        <div class="form-value">${formData.email}@${formData.domain || selectedDomain}</div>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <div class="form-label">Message</div>
        <div class="message-box">
          ${formData.message.replace(/\n/g, '<br>')}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;

const sendEmail = async (formData, selectedDomain) => {
  const emailTemplate = generateEmailTemplate(formData, selectedDomain);
  const completeEmail = `${formData.email}@${formData.domain || selectedDomain}`;
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: completeEmail,
        subject: 'Job & Project Proposal Confirmation',
        html: emailTemplate,
        formData: {
          ...formData,
          completeEmail
        }
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const Proposal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailSent = await sendEmail(formData, selectedDomain);
    
    if (emailSent) {
      setAlertConfig({
        type: 'success',
        show: true,
        title: 'Thank you!',
        message: '정상적으로 전송되었습니다.'
      });
      resetForm();
    } else {
      setAlertConfig({
        type: 'error',
        show: true,
        title: 'Error',
        message: '메일 전송에 실패했습니다. 다시 시도해 주세요.'
      });
    }
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

      {alertConfig.show && (
        <div className="proposal-alert-overlay">
          <div className={`proposal-alert ${alertConfig.type === 'error' ? 'proposal-alert-error' : ''}`}>
            <button 
              className="proposal-alert-close"
              onClick={() => setAlertConfig(prev => ({ ...prev, show: false }))}
            >
              <CloseIcon />
            </button>
            <h2>{alertConfig.title}</h2>
            <p>{alertConfig.message}</p>
            <button 
              className={`proposal-alert-confirm ${alertConfig.type === 'error' ? 'proposal-alert-confirm-error' : ''}`}
              onClick={() => setAlertConfig(prev => ({ ...prev, show: false }))}
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