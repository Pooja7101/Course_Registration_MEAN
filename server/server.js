const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Course routes
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);
app.get("/", (req, res) => {
    res.send("Course Registration Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});