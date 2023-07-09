require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path=require("path");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const adminPanelRoutes = require("./routes/adminPanel");
const collegeSignUpRoutes = require("./routes/collegeSignup");
const collegeAuthRoutes = require("./routes/collegeAuth");
const updateProfileRoutes = require("./routes/updateProfile");

const collegeRoutes = require("./routes/college");
const examRoutes = require("./routes/exam");
const reportRoutes = require("./routes/reports");
const careerRoutes = require("./routes/career");

// database connection
connection();

// middlewares
app.use(cors());
app.use(express.json());


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/adminPanel", adminPanelRoutes);
app.use("/api/collegeSignup", collegeSignUpRoutes);
app.use("/api/collegeauth", collegeAuthRoutes);
app.use("/api/profile", updateProfileRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/college", collegeRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/reports",reportRoutes);


app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get("*",function(_,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
        res.status(500).send(err);
    });
})
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
