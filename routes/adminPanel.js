const router = require("express").Router();
const { requireSignIn,isAdmin} = require("../middlewares/authMiddleware.js");

//protected admin route
router.get("/",requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;
