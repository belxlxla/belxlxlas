import { sendEmail } from './email.jsx';

export const handleEmailSend = async (req) => {
  try {
    const { formData } = req.body;
    
    // formData가 undefined인 경우 체크
    if (!formData) {
      console.error('FormData is missing');
      return { success: false, message: '데이터가 올바르지 않습니다.' };
    }

    const emailSubject = 'Job & Project Proposal Confirmation';
    const emailHtml = `
      <h2>새로운 제안이 도착했습니다</h2>
      <p>이름/회사: ${formData.nameCompany}</p>
      <p>연락처: ${formData.contact}</p>
      <p>이메일: ${formData.email}@${formData.domain || ''}</p>
      <p>메시지: ${formData.message}</p>
    `;

    const recipientEmail = `${formData.email}@${formData.domain || ''}`;
    const emailSent = await sendEmail(recipientEmail, emailSubject, emailHtml);

    if (emailSent) {
      return { success: true, message: '이메일이 성공적으로 전송되었습니다.' };
    } else {
      return { success: false, message: '이메일 전송에 실패했습니다.' };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: '이메일 전송 중 오류가 발생했습니다.' };
  }
};