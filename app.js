const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'berlianawan498@gmail.com', 
    pass: 'olre djtq lzyu oaxg' 
  },
});
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/admin', adminRouter(transporter));
app.listen(3000, () => console.log('Server started on port 3000'));