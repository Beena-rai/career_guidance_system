const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
     
    },
    description: {
      type: String,
      
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
);

const Career = mongoose.model("career", careerSchema);
module.exports = { Career};
