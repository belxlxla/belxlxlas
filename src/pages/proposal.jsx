import React, { useState, useCallback } from "react";
import axios from 'axios';
import "../styles/proposal.css";

const Icons = {
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
};

const INITIAL_FORM_STATE = {
  nameCompany: "",
  contact: "",
  email: "",
  domain: "",
  message: ""
};

const DOMAINS = ["gmail.com", "naver.com", "kakao.com", "outlook.com", "yahoo.com", "직접 입력하기"];

const Proposal = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [domainState, setDomainState] = useState({
    isOpen: false,
    selected: "",
    isDirectInput: false
  });
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    type: "success",
    title: "",
    message: ""
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setDomainState({ isOpen: false, selected: "", isDirectInput: false });
  };

  const closeAlert = () => {
    const overlay = document.querySelector('.proposal-alert-overlay');
    const alert = document.querySelector('.proposal-alert');
    
    overlay?.classList.add('hiding');
    alert?.classList.add('hiding');
    
    setTimeout(() => setAlertConfig(prev => ({ ...prev, show: false })), 300);
  };

  const generateEmailTemplate = (formData, selectedDomain) => {
    const fullEmail = `${formData.email}@${formData.domain || selectedDomain}`;
    return `
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
            max-width: 800px;
            margin: 0 auto;
            padding: 60px 40px;
            background-color: #000000;
            color: #ffffff;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .title {
            font-size: 32px;
            font-weight: 600;
            margin: 0;
            padding: 0;
          }
          .title span {
            font-weight: 300;
          }
          .subtitle {
            font-size: 16px;
            color: #ffffff;
            margin-top: 20px;
            text-align: center;
          }
          .content {
            margin-top: 60px;
          }
          .field {
            display: flex;
            margin-bottom: 30px;
          }
          .field-label {
            width: 200px;
            font-size: 16px;
            color: #ffffff;
            font-weight: 400;
          }
          .field-value {
            flex: 1;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
          }
          .message-box {
            margin-top: 40px;
          }
          .message-label {
            font-size: 16px;
            color: #ffffff;
            margin-bottom: 20px;
          }
          .message-content {
            background-color: #f5f5f5;
            padding: 30px;
            color: #333333;
            border-radius: 4px;
            min-height: 200px;
            white-space: pre-line;
          }
          .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #FF4C4C;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Job & Project <span>Proposals</span></h1>
            <div class="subtitle">제안이 성공적으로 전송되었습니다. 곧 답변드리겠습니다.</div>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Name / Company</div>
              <div class="field-value">${formData.nameCompany}</div>
            </div>

            <div class="field">
              <div class="field-label">Contact Information</div>
              <div class="field-value">${formData.contact}</div>
            </div>

            <div class="field">
              <div class="field-label">e-mail address</div>
              <div class="field-value">${fullEmail}</div>
            </div>

            <div class="message-box">
              <div class="message-label">Message</div>
              <div class="message-content">
                ${formData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>

          <div class="footer">
            * 연락처와 정보가 잘 기재되어 있는지 확인해 주십시오. 답변이 오지 않거나 지연되는 경우, 다시 제안을 부탁드립니다.
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const sendEmail = async (formData, selectedDomain) => {
    const completeEmail = formData.email.includes("@")
      ? formData.email
      : formData.domain || selectedDomain
      ? `${formData.email}@${formData.domain || selectedDomain}`
      : null;
  
    if (!completeEmail) return false;
  
    const emailHtml = generateEmailTemplate(formData, selectedDomain);
    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'SameSite': 'Strict'
      }
    });
  
    const API_URL = process.env.REACT_APP_API_URL || "https://www.belxlxla.com";
  
    try {
      const response = await axiosInstance.post(`${API_URL}/api/send-email`, {
        formData: { ...formData, completeEmail },
        template: emailHtml,
      });
      return response.status === 200;
    } catch (error) {
      console.error("이메일 전송 중 오류 발생:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || (!formData.domain && !domainState.selected)) {
      alert("이메일 또는 도메인이 올바르지 않습니다.");
      return;
    }

    const emailSent = await sendEmail(formData, domainState.selected);
    
    setAlertConfig({
      show: true,
      type: emailSent ? "success" : "error",
      title: emailSent ? "Thank you!" : "Error",
      message: emailSent ? "제안이 정상적으로 전송되었습니다." : "메일 전송에 실패했습니다. 다시 시도해 주세요."
    });

    if (emailSent) resetForm();
  };

  const handleDomainSelect = (domain) => {
    if (domain === "직접 입력하기") {
      setDomainState({ isOpen: false, selected: "", isDirectInput: true });
      setFormData(prev => ({ ...prev, domain: "" }));
    } else {
      setDomainState({ isOpen: false, selected: domain, isDirectInput: false });
      setFormData(prev => ({ ...prev, domain }));
    }
  };

  return (
    <div className="proposal-container">
      <div className="proposal-content">
        <h1 className="proposal-title">Job & Project <span>Proposals</span></h1>
        
        <form className="proposal-form" onSubmit={handleSubmit}>
          <div className="proposal-form-row">
            <FormGroup label="Name / Company">
              <input
                className="proposal-input"
                type="text"
                name="nameCompany"
                placeholder="이름 또는 회사명을 입력해주세요"
                value={formData.nameCompany}
                onChange={handleInputChange}
              />
            </FormGroup>
            
            <FormGroup label="Contact Information">
            <input
                className="proposal-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                name="contact"
                placeholder="연락처를 입력해주세요"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </FormGroup>
          </div>

          <div className="proposal-form-row">
            <FormGroup label="e-mail address" className="proposal-email-group">
              <input
                className="proposal-input"
                type="text"
                name="email"
                placeholder="이메일 아이디를 입력해 주세요"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup label="Domain" className="proposal-domain-group">
              {domainState.isDirectInput ? (
                <input
                  className="proposal-input"
                  type="text"
                  name="domain"
                  placeholder="(예: email.com)"
                  value={formData.domain}
                  onChange={handleInputChange}
                />
              ) : (
                <DomainDropdown
                  isOpen={domainState.isOpen}
                  selected={domainState.selected}
                  onToggle={() => setDomainState(prev => ({ ...prev, isOpen: !prev.isOpen }))}
                  onSelect={handleDomainSelect}
                />
              )}
            </FormGroup>
          </div>

          <FormGroup label="Message">
            <textarea
              className="proposal-textarea"
              name="message"
              placeholder=" Bella (임정민) 에게 채용 제안이나 프로젝트 제안 등 남기실 메세지를 자유롭게 작성해 주세요."
              value={formData.message}
              onChange={handleInputChange}
              inputMode="text"
            />
          </FormGroup>

          <button className="proposal-submit" type="submit">Submit</button>
        </form>
      </div>

      {alertConfig.show && (
        <AlertModal
          config={alertConfig}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

const FormGroup = ({ label, children, className = "" }) => (
  <div className={`proposal-form-group ${className}`}>
    <label className="proposal-label">{label}</label>
    {children}
  </div>
);

const DomainDropdown = ({ isOpen, selected, onToggle, onSelect }) => (
  <div className="proposal-dropdown" onClick={onToggle}>
    <div className="proposal-dropdown-header">
      <span>{selected || "도메인 선택"}</span>
      <Icons.ChevronDown />
    </div>
    {isOpen && (
      <div className="proposal-dropdown-content">
        {DOMAINS.map((domain, index) => (
          <div
            key={index}
            className="proposal-dropdown-item"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(domain);
            }}
          >
            {domain}
          </div>
        ))}
      </div>
    )}
  </div>
);

const AlertModal = ({ config, onClose }) => (
  <div className="proposal-alert-overlay">
    <div className={`proposal-alert ${config.type === "error" ? "proposal-alert-error" : ""}`}>
      <button className="proposal-alert-close" onClick={onClose}>
        <Icons.Close />
      </button>
      <h2>{config.title}</h2>
      <p>{config.message}</p>
      <button 
        className={`proposal-alert-confirm ${config.type === "error" ? "proposal-alert-confirm-error" : ""}`}
        onClick={onClose}
      >
        확인
      </button>
    </div>
  </div>
);

export default Proposal;