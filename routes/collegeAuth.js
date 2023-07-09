const router = require("express").Router();
const { College } = require("../models/college");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const college = await College.findOne({ email: req.body.email });
		if (!college)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			college.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = college.generateAuthToken();
		res.status(200).send({
			success: true, college: {
				_id: college._id,
				LicenseNo: college.LicenseNo,
				email: college.email,
				name: college.name,
				role: college.role,
			}, data: token, message: "logged in successfully"
		});
		logger.userLogger.log("info","logged in successfully");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		logger.userLogger.log("error","Internal Server Error");
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
