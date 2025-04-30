const nodemailer = require('nodemailer');

// Buat transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ganti dengan service email Anda (e.g., 'yahoo', 'outlook')
  auth: {
    user: 'berlianawan498@gmail.com', // Ganti dengan email Anda
    pass: 'olre djtq lzyu oaxg', // Ganti dengan password aplikasi email Anda
  },
});



async function sendReply(recipientEmail, replyMessage, originalMessage) {

     const mailOptions = {
        from: 'ADMIN" <wanzofc.tech@gmail.com>',
        to: recipientEmail,
        subject: `Re: ${originalMessage.subject}`,
        html: `<h1>Reply</h1><p>Original Message:</p><p>From: ${originalMessage.name}</p><p>Email: ${originalMessage.email}</p><p>Message: ${originalMessage.message}</p><br/><p>Reply Message:</p><p>${replyMessage}</p>` //
      };

 try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email terkirim" };
  } catch (error) {
      console.log(error)
    return { success: false, message: "Email gagal terkirim" };
  }
}

module.exports = { sendReply };