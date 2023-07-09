
const formidableMiddleware = require('express-formidable');
const router = require("express").Router();

const { requireCollegeSignIn } = require("../middlewares/authMiddleware.js");
const { College, validate } = require("../models/college");
const fs = require("fs");

router.get("/", requireCollegeSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//get all colleges
router.get("/getcollege", async (req, res) => {
  try {
    const colleges = await College
      .find({})
      .select("-photo")
      .limit(12);
    res.status(200).send({
      success: true,
      counTotal: colleges.length,
      message: "All colleges ",
      colleges,
    });
    logger.userLogger.log("info","All colleges");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting colleges",
      error: error.message,
    });
    logger.userLogger.log("error","Erorr in getting colleges");
  }
});

//single college
router.get("/getcollege/:name", async (req, res) => {
  try {
    const college = await College
      .findOne({ name: req.params.name })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single colleges Fetched",
      college,
    });
    logger.userLogger.log("info","Single colleges Fetched");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single colleges",
      error,
    });
    logger.userLogger.log("error","Error while getting single colleges");
  }
});



//get photo
router.get("/collegephoto/:pid", async (req, res) => {
  try {
    const colleges = await College.findById(req.params.pid).select("photo");
    if (colleges.photo.data) {
      res.set("Content-type", colleges.photo.contentType);
      return res.status(200).send(colleges.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
    logger.userLogger.log("error","Error while getting photo");
  }
});

//delete college
router.delete("/deletecollege/:pid", async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "college Deleted successfully",
    });
    logger.userLogger.log("info","college Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting college",
      error,
    });
    logger.userLogger.log("error","Error while deleting college");
  }
});

//routes
router.put("/updatecollege/:pid", requireCollegeSignIn, formidableMiddleware(), async (req, res) => {
  try {
    const { name, description, eligibility, ranking, country, region, fee } =
      req.fields;

    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !eligibility:
        return res.status(500).send({ error: "eligibility is Required" });
      case !ranking:
        return res.status(500).send({ error: "ranking is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const colleges = await College.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      colleges.photo.data = fs.readFileSync(photo.path);
      colleges.photo.contentType = photo.type;
    }
    await colleges.save();
    res.status(201).send({
      success: true,
      message: "college added Successfully",
      colleges,
    });
    logger.userLogger.log("info","college added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in adding college",
    });
    logger.userLogger.log("error","Error in adding college");
  }
}
);




router.post("/college-filters", async (req, res) => {
  try {
    const { radiof, radior, region, country } = req.body;
    let args = {};
    if (radiof.length) args.fee = { $gte: radiof[0], $lte: radiof[1] };
    if (radior.length) args.ranking = { $gte: radior[0], $lte: radior[1] };
    if (region.length) args.region = req.body.region;
    if (country.length) args.country = req.body.country;
    const colleges = await College.find(args);
    res.status(200).send({
      success: true,
      colleges,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering ",
      error,
    });
    logger.userLogger.log("error","Error WHile Filtering");
  }
});


module.exports = router;
