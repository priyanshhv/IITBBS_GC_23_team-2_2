const express = require('express');
const router = express.Router();
const LostAndFound = require('../models/LostAndFound');
const { verifyToken } = require('../middleware/verifyToken');

// Report a lost or found item
router.post('/', verifyToken, async (req, res) => {
  try {
    const newReport = new LostAndFound({
      ...req.body
    });

    const report = await newReport.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all lost and found reports
router.get('/', async (req, res) => {
  try {
    const reports = await LostAndFound.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;