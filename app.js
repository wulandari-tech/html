const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const { sendReply } = require('./email/email'); // Import fungsi sendReply


// Konfigurasi view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk file statis
app.use(express.static(path.join(__dirname, 'public')));


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))



// Routing
app.use('/', indexRouter);




// Membuat transporter untuk digunakan di seluruh aplikasi
const transporter = nodemailer.createTransport({
    service: 'gmail', // Atau service email lainnya seperti 'yahoo', 'outlook'
    auth: {
      user: 'berlianawan498@gmail.com', // Ganti dengan email kamu
      pass: 'olre djtq lzyu oaxg', // Ganti dengan password aplikasi yang kamu buat di Google (atau provider email lain)
    },
  });

  
app.use('/admin', adminRouter(transporter)); // Oper transporter ke adminRouter



// Menjalankan server
app.listen(3000, () => console.log('Server started on port 3000'));