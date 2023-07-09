const formidableMiddleware = require('express-formidable');
const router = require("express").Router();
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const { Career } = require("../models/career");
const fs = require("fs");
const logger=require("../routes/logger")


//routes
router.post("/addcareer",requireSignIn,isAdmin,formidableMiddleware(),async (req, res) => {
  try {
    const { name, description} =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const careers = new Career({ ...req.fields});
    if (photo) {
      careers.photo.data = fs.readFileSync(photo.path);
      careers.photo.contentType = photo.type;
    }
    await careers.save();
    res.status(201).send({
      success: true,
      message: "Career added Successfully",
      careers,
    });
    logger.userLogger.log("info","Career added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in adding career",
    });
    logger.userLogger.log("error","Error in adding career");
  }
}
);


//get all careers
router.get("/getcareer", async (req, res) => {
  try {
    const careers = await Career
      .find({})
      .select("-photo")
      .limit(12);
    res.status(200).send({
      success: true,
      counTotal: careers.length,
      message: "All careers ",
      careers,
    });
    logger.userLogger.log("info","successfully getting career!");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting careers",
      error: error.message,
    });
    logger.userLogger.log("error","Erorr in getting careers");
  }
});

//single career
router.get("/getcareer/:name", async (req, res) => {
  try {
    const career = await Career
      .findOne({ name: req.params.name })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Single careers Fetched",
      career,
    });
    logger.userLogger.log("info","Single careers Fetched");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single careers",
      error,
    });
    logger.userLogger.log("error","Error while getting single careers");
  }
});

//get photo
router.get("/careerphoto/:pid", async (req, res) => {
  try {
    const careers = await Career.findById(req.params.pid).select("photo");
    if (careers.photo.data) {
      res.set("Content-type", careers.photo.contentType);
      return res.status(200).send(careers.photo.data);
    }
    logger.userLogger.log("info","Displayed Photo successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
    logger.userLogger.log("error","Erorr while getting photo");
  }
});

//delete career
router.delete("/deletecareer/:pid", async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Career Deleted successfully",
    });
    logger.userLogger.log("info","Career Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting career",
      error,
    });
    logger.userLogger.log("error","Error while deleting career");
  }
});

//routes
router.put("/updatecareer/:pid", requireSignIn, isAdmin, formidableMiddleware(), async (req, res) => {
  try {
    const { name, description } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const careers = await Career.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    if (photo) {
      careers.photo.data = fs.readFileSync(photo.path);
      careers.photo.contentType = photo.type;
    }
    await careers.save();
    res.status(201).send({
      success: true,
      message: "Career added Successfully",
      careers,
    });
    logger.userLogger.log("info","Career added Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in adding career",
    });
    logger.userLogger.log("error","Error in adding career");
  }
}
);



module.exports = router;