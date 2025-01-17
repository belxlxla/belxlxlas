// Send-email.jsx
import express from 'express';
import { sendEmail } from '../services/email';

const router = express.Router();

router.post('/api/send-email', async (req, res) => {
  const { to, subject, html, formData } = req.body;

  try {
    const emailSent = await sendEmail(to, subject, html);
    if (emailSent) {
      res.json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
    } else {
      res.status(500).json({ success: false, message: '이메일 전송에 실패했습니다.' });
    }
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: '이메일 전송 중 오류가 발생했습니다.' });
  }
});

export default router;