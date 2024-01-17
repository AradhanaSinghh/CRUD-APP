const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/crud");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  job: String
});

// Corrected: use mongoose.model (lowercase 'm')
module.exports = mongoose.model("users", userSchema);
