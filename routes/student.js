const router = require("express").Router();
const { requireSignIn} = require("../middlewares/authMiddleware.js");

//protected route auth
router.get("/",requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

module.exports = router;
