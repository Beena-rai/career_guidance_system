const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
require("dotenv").config();

const collegeSchema = new mongoose.Schema({
	LicenseNo: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: {
		type: Number,
		default: 0,
	  },
	name:{
		type : String,
		
	  },
	description: {
		type : String
	},
	eligibility: {
		type : String
	},
	region: {
		type : String
	},
	ranking: {
		type : Number
	},
	fee: {
		type : Number
	},
	photo: {
		data: Buffer,
		contentType: String,
	  },

	country: {
		type: String,
	  },
});

collegeSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	return token;
};

const College = mongoose.model("college", collegeSchema);

const validate = (data) => {
	const schema = Joi.object({
		LicenseNo: Joi.string().required().label("License No."),
		name: Joi.string().required().label("Name."),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};


module.exports = { College, validate};
