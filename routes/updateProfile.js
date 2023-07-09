const router = require("express").Router();
const { User} = require("../models/user");
const bcrypt = require("bcrypt");
const { requireSignIn } = require("../middlewares/authMiddleware.js");

router.put("/", requireSignIn, async (req, res) => {
  try {
    const { firstName, lastName, phone, mark10, mark12 } = req.body;
    const user = await User.findById(req.user._id);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        phone: phone || user.phone,
        mark10: mark10 || user.mark10,
        mark12: mark12 || user.mark12,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
    logger.userLogger.log("info","Profile Updated Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating profile",
      error,
    });
    logger.userLogger.log("error","Error While Updating profile");
  }
});

module.exports = router;