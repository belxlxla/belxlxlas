// Proposal.jsx
import React, { useState, useCallback } from "react";
import "../styles/proposal.css";

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
    <path d="m6 9 6 6 6-6" />
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

// 이메일 발송 함수
const sendEmail = async (formData, selectedDomain) => {
  const completeEmail = formData.email.includes("@")
    ? formData.email
    : formData.domain || selectedDomain
    ? `${formData.email}@${formData.domain || selectedDomain}`
    : null;

  if (!completeEmail || !completeEmail.includes("@")) {
    console.error("Invalid email or domain:", {
      email: formData.email,
      domain: formData.domain || selectedDomain,
    });
    return false;
  }

  const emailHtml = generateEmailTemplate(formData, selectedDomain);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData: { ...formData, completeEmail },
        template: emailHtml,
      }),
    });

    console.log("보낸 데이터:", { ...formData, completeEmail });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("이메일 전송 실패:", errorData);
      throw new Error(errorData.message || "이메일 전송에 실패했습니다.");
    }

    return true;
  } catch (error) {
    console.error("이메일 전송 중 오류 발생:", error);
    return false;
  }
};

const Proposal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const [formData, setFormData] = useState({
    nameCompany: "",
    contact: "",
    email: "",
    domain: "",
    message: "",
  });

  const domains = [
    "gmail.com",
    "naver.com",
    "kakao.com",
    "outlook.com",
    "yahoo.com",
    "직접 입력하기",
  ];

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCompositionEnd = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const resetForm = () => {
    setFormData({
      nameCompany: "",
      contact: "",
      email: "",
      domain: "",
      message: "",
    });
    setSelectedDomain("");
    setIsDirectInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.email || (!formData.domain && !selectedDomain)) {
      alert("이메일 또는 도메인이 올바르지 않습니다.");
      return;
    }

    const emailSent = await sendEmail(formData, selectedDomain);

    if (emailSent) {
      setAlertConfig({
        type: "success",
        show: true,
        title: "Thank you!",
        message: "정상적으로 전송되었습니다.",
      });
      resetForm();
    } else {
      setAlertConfig({
        type: "error",
        show: true,
        title: "Error",
        message: "메일 전송에 실패했습니다. 다시 시도해 주세요.",
      });
    }
  };

  const handleDomainSelect = (domain) => {
    if (domain === "직접 입력하기") {
      setIsDirectInput(true);
      setSelectedDomain("");
      setFormData((prev) => ({
        ...prev,
        domain: "",
      }));
    } else {
      setIsDirectInput(false);
      setSelectedDomain(domain);
      setFormData((prev) => ({
        ...prev,
        domain,
      }));
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="proposal-container">
      <div className="proposal-content">
        <h1 className="proposal-title">
          Job & Project <span>Proposals</span>
        </h1>

        <form className="proposal-form" onSubmit={handleSubmit}>
          <div className="proposal-form-row">
            <div className="proposal-form-group">
              <label className="proposal-label">Name / Company</label>
              <input
                className="proposal-input"
                type="text"
                name="nameCompany"
                placeholder="이름 또는 회사명을 입력해주세요"
                value={formData.nameCompany}
                onChange={handleInputChange}
                onCompositionEnd={handleCompositionEnd}
              />
            </div>
            <div className="proposal-form-group">
              <label className="proposal-label">Contact Information</label>
              <input
                className="proposal-input"
                type="text"
                name="contact"
                placeholder="연락처를 입력해주세요"
                value={formData.contact}
                onChange={handleInputChange}
                onCompositionEnd={handleCompositionEnd}
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
                placeholder="이메일 주소를 입력해주세요"
                value={formData.email}
                onChange={handleInputChange}
                onCompositionEnd={handleCompositionEnd}
              />
            </div>
            <div className="proposal-form-group proposal-domain-group">
              <label className="proposal-label">Domain</label>
              {isDirectInput ? (
                <input
                  className="proposal-input"
                  type="text"
                  name="domain"
                  placeholder="(예: email.com)"
                  value={formData.domain}
                  onChange={handleInputChange}
                  onCompositionEnd={handleCompositionEnd}
                />
              ) : (
                <div
                  className="proposal-dropdown"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="proposal-dropdown-header">
                    <span>{selectedDomain || "도메인 선택"}</span>
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
              onChange={handleInputChange}
              onCompositionEnd={handleCompositionEnd}
              inputMode="text"
            />
          </div>

          <button className="proposal-submit" type="submit">
            Submit
          </button>
        </form>
      </div>

      {alertConfig.show && (
        <div className="proposal-alert-overlay">
          <div
            className={`proposal-alert ${
              alertConfig.type === "error" ? "proposal-alert-error" : ""
            }`}
          >
            <button
              className="proposal-alert-close"
              onClick={() =>
                setAlertConfig((prev) => ({ ...prev, show: false }))
              }
            >
              <CloseIcon />
            </button>
            <h2>{alertConfig.title}</h2>
            <p>{alertConfig.message}</p>
            <button
              className={`proposal-alert-confirm ${
                alertConfig.type === "error"
                  ? "proposal-alert-confirm-error"
                  : ""
              }`}
              onClick={() =>
                setAlertConfig((prev) => ({ ...prev, show: false }))
              }
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposal;
