const express = require('express');
const Request = require('../models/request'); // Import model Request

module.exports = (transporter) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const requests = await Request.find({});
      res.render('admin', { requests });
    } catch (error) {
      console.error("Error mengambil data request:", error);
      res.status(500).send('Terjadi kesalahan.');
    }
  });

  async function sendReply(recipientEmail, replyMessage, originalMessage, transporter) {
    const mailOptions = {
      from: '"Nama Admin" <emailkamu@gmail.com>', // Ganti dengan email dan nama kamu
      to: recipientEmail,
      subject: `Re: ${originalMessage.subject}`,
      html: `<h1>Reply</h1><p>Original Message:</p><p>From: ${originalMessage.name}</p><p>Email: ${originalMessage.email}</p><p>Message: ${originalMessage.message}</p><br/><p>Reply Message:</p><p>${replyMessage}</p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: "Email terkirim" };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, message: "Email gagal terkirim" };
    }
  }

    router.post('/reply', async (req, res) => {
    try {
        console.log(req.body) //tambahkan ini
      const result = await sendReply(req.body.recipientEmail, req.body.replyMessage, JSON.parse(req.body.originalMessage), transporter);


      console.log(JSON.parse(req.body.originalMessage)) //tambahkan ini

      res.send(result);
    } catch (error) {
         console.log(error) //dan ini
      res.status(500).send("Terjadi kesalahan");
    }
  });
  return router;
};