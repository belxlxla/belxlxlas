import express from 'express';
import { handleEmailSend } from './api/send-email';

const app = express();
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  const result = await handleEmailSend(req, res);
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

export default app;