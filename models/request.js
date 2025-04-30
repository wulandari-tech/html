const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  templateType: String,
  subject: String
});

module.exports = mongoose.model('Request', requestSchema);