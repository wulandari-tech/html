const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Request = require('../models/request'); // Import model Request


mongoose.connect('mongodb+srv://zanssxploit:pISqUYgJJDfnLW9b@cluster0.fgram.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("koneksi database berhasil"))
  .catch(err => console.log(err));



router.get('/', (req, res) => {
  res.render('index', { title: "Request Template" });
});

router.post('/request', async (req, res) => {
  try {
    req.body.subject = "Request Template dari " + req.body.name; // Menambahkan subject ke req.body
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.send('Request berhasil!');
  } catch (error) {
    console.error("Error menyimpan request:", error);
    res.status(500).send('Terjadi kesalahan.');
  }
});

module.exports = router;