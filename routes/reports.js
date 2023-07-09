const express = require("express");
const router = express.Router();
const { requireSignInRepo} = require("../middlewares/authMiddleware.js");
const Report = require("../models/reports");

router.post("/add-report", requireSignInRepo, async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    return res.status(200).json({
      message: "Report added succesfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

router.get("/get-all-reports",requireSignInRepo, async (req, res) => {
  try {
    const reports = await Report.find({}).populate("exam").populate("user");

    return res.status(200).json({
      message: "Report fetched succesfully",
      success: true,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

router.get("/get-all-reports-by-user",requireSignInRepo, async (req, res) => {
  try {
    
    const reports = await Report.find({ user: req.body.userId })
      .populate("exam")
      .populate("user");
  
    return res.status(200).json({
      message: "Report fetched succesfully",
      success: true,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
