const router = require("express").Router();
const { College, validate } = require("../models/college");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const college = await College.findOne({ LicenseNo: req.body.LicenseNo });
		if (college)
			return res
				.status(409)
				.send({ message: "This College is already Registered!" });


		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new College({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ success: true, message: "College is Registered successfully" });
		logger.userLogger.log("info","College is Registered successfully");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		logger.userLogger.log("error","Internal Server Error");
	}
});

module.exports = router;
