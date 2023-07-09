const express = require("express");
const router = express.Router();
const Exam = require("../models/exam");
const Question = require("../models/question");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const logger=require("../routes/logger");

router.post("/add", requireSignIn, isAdmin, async (req, res) => {
  try {
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    return res.json({
      message: "Exam added succesfully",
      data: newExam,
      success: true,
    });
    logger.userLogger.log("info","Exam added succesfully");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
    logger.userLogger.log("error","Internal server error");
  }
});
router.get("/get-all-exams", requireSignIn, async (req, res) => {
  try {
    const exams = await Exam.find({});
    if (!exams) {
      return res.status(404).json({
        error: "No exams found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: exams,
      message: "Exams fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
    logger.userLogger.log("error","Internal server error");
  }
});
router.get("/get-exam-by-id/:id", requireSignIn, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: exam,
      message: "Exam fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
    logger.userLogger.log("error","Internal server error");
  }
});

router.post("/edit/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findByIdAndUpdate(id, req.body);
    if (!exam) {
      return res.status(404).json({
        success: false,
        error: "Exam not found",
      });
    }
    return res.status(200).json({
      message: "Exam edited successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
    
  }
});

router.delete("/delete/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({
        success: false,
        error: "Exam not found",
      });
    }
    exam.remove();
    return res.status(200).json({
      message: "Exam deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

router.post("/add-question", requireSignIn, isAdmin, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    await newQuestion.save();
    const exam = await Exam.findById(req.body.exam);
    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
        success: false,
      });
    }
    exam.questions.push(newQuestion._id);
    await exam.save();
    return res.status(200).json({
      message: "Question added successfully",
      success: true,
      data: newQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });

  }
});

router.post("/edit-question-in-exam/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, req.body);
    if (!question) {
      return res.status(404).json({
        error: "Question not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Question edited successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

router.post("/delete-question/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(req.body.examId);
    if (!exam) {
      return res.status(404).json({
        error: "Exam not found",
        success: false,
      });
    }
    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({
        error: "Question not found",
        success: false,
      });
      logger.userLogger.log("error","Question not found");
    }

    exam.questions = exam.questions.filter((question) => question._id !== id);
    await exam.save();
    return res.status(200).json({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
});

module.exports = router;
