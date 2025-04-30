const express = require('express');


module.exports= (transporter)=>{
     const router = express.Router();

    
router.get('/', (req, res) => {
  // Ambil data request dari database di sini... (kode untuk mengambil data dari database)
  const requests = [
    // contoh data, ganti dengan data dari database
    {name:"reqeys", email:"request@gmail.com", templateType: "website", message:"ingin req min"},

  ]

  res.render('admin', { requests });
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



router.post('/reply', async (req, res) =>  res.send(await sendReply(req.body.recipientEmail, req.body.replyMessage, JSON.parse(req.body.originalMessage), transporter)));


return router

}