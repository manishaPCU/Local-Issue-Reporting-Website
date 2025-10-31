const express = require("express");
const multer = require("multer");
const Issue = require("../models/Issue");
const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create new issue
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const issue = await Issue.create({
      ...req.body,
      photo: req.file ? req.file.filename : null,
    });
    res.json({ msg: "Issue created", issue });
  } catch (err) {
    res.status(500).json({ msg: "Error creating issue", err });
  }
});

// Get all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ _id: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching issues" });
  }
});

// Upvote
router.post("/:id/vote", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    issue.votes += 1;
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ msg: "Error voting" });
  }
});

// Add comment
router.post("/:id/comment", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    issue.comments.push({ text: req.body.text });
    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ msg: "Error adding comment" });
  }
});

// Update status
router.patch("/:id/status", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(issue);
  } catch (err) {
    res.status(500).json({ msg: "Error updating status" });
  }
});

module.exports = router;
