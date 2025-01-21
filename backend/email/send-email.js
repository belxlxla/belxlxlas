import { sendEmail } from "./email.js";

// 이메일 전송 핸들러 함수
export const handleEmailSend = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    const { formData, template } = req.body;

    if (!formData || !template) {
      console.error("FormData or template is missing");
      return res
        .status(400)
        .json({ success: false, message: "필수 데이터가 누락되었습니다." });
    }

    const { nameCompany, contact, email, domain, message } = formData;
    const completeEmail = domain ? `${email}@${domain}` : email;

    if (!completeEmail || !completeEmail.includes("@")) {
      console.error("Invalid email address:", completeEmail);
      return res
        .status(400)
        .json({ success: false, message: "올바른 이메일 주소를 입력해주세요." });
    }

    const smtpUser = process.env.SMTP_USER;
    if (!smtpUser) {
      console.error("SMTP_USER is not set in environment variables.");
      return res
        .status(500)
        .json({ success: false, message: "SMTP 설정이 누락되었습니다." });
    }

     // 관리자에게 보낼 이메일 생성
    const adminSubject = "새로운 제안이 도착했습니다!";
    const adminHtml = `
      <h2>새로운 제안이 도착했습니다</h2>
      <p><strong>이름/회사:</strong> ${nameCompany}</p>
      <p><strong>연락처:</strong> ${contact}</p>
      <p><strong>이메일:</strong> ${completeEmail}</p>
      <p><strong>메시지:</strong> ${message}</p>
    `;

    // 사용자에게 보낼 이메일 생성
    const userSubject = "Thank you for your Proposal!";
    const userHtml = template;

    // 메일 전송송
    console.log("Sending emails...");
    const adminEmailSent = await sendEmail(smtpUser, adminSubject, adminHtml);
    const userEmailSent = await sendEmail(completeEmail, userSubject, userHtml);

    // 메일 전송 결과 확인인
    if (adminEmailSent.success && userEmailSent.success) {
      console.log("Emails sent successfully");
      return res
        .status(200)
        .json({ success: true, message: "이메일이 성공적으로 전송되었습니다." });
    } else {
      console.error("Failed to send emails:", {
        adminEmail: adminEmailSent,
        userEmail: userEmailSent,
      });
      return res
        .status(500)
        .json({ success: false, message: "이메일 전송에 실패했습니다." });
    }
  } catch (error) {
    console.error("Email sending error:", error.message, error.stack);
    return res
      .status(500)
      .json({ success: false, message: "이메일 전송 중 오류가 발생했습니다." });
  }
};
