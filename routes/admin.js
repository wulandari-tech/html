const express = require('express');
const mongoose = require('mongoose');


// Koneksi ke MongoDB (sama seperti di index.js)
mongoose.connect('mongodb+srv://zanssxploit:pISqUYgJJDfnLW9b@cluster0.fgram.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>console.log("koneksi database berhasil")).catch(err=>console.log(err));

// Definisikan skema untuk data request (sama seperti di index.js)
const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  templateType: String
});

const Request = mongoose.model('Request', requestSchema);



module.exports = (transporter) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const requests = await Request.find({}); // Ambil semua data request dari database
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
      subject: `Re: ${originalMessage.subject}`, // Gunakan subject asli dengan prefix "Re:"
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

    try{

         const result = await sendReply(req.body.recipientEmail, req.body.replyMessage, JSON.parse(req.body.originalMessage), transporter);
         res.send(result);

    }catch(error){
        res.status(500).send("terjadi kesalahan")
    }
  });

  return router;
};