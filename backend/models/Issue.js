const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  photo: String,
  location: String,
  votes: { type: Number, default: 0 },
  comments: [{ text: String, date: { type: Date, default: Date.now } }],
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Reported" },
});

module.exports = mongoose.model("Issue", issueSchema);
