const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Koneksi ke MongoDB
mongoose.connect('mongodb+srv://zanssxploit:pISqUYgJJDfnLW9b@cluster0.fgram.mongodb.net/?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(()=>console.log("koneksi database berhasil"))
.catch(err=>console.log(err));


// Definisikan skema untuk data request
const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  templateType: String,
  subject: String //tambahkan subject
});

const Request = mongoose.model('Request', requestSchema);

router.get('/', (req, res) => {
  res.render('index', {title: "Request Template" });
});

router.post('/request', async (req, res) => {
  try {
     //tambahkan subject ke body sebelum save ke database
     req.body.subject = "Request Template dari " + req.body.name


    const newRequest = new Request(req.body);
    await newRequest.save();
    res.send('Request berhasil!');
  } catch (error) {
    console.error("Error menyimpan request:", error);
    res.status(500).send('Terjadi kesalahan.');
  }
});

module.exports = router;