require("dotenv").config();

const mongoose = require("mongoose");
const Course = require("./models/Course");

const courses = [
    {
        courseName: "Web Development",
        courseCode: "CS101",
        department: "CSE",
        credits: 4
    },
    {
        courseName: "Database Management",
        courseCode: "CS102",
        department: "CSE",
        credits: 3
    },
    {
        courseName: "Computer Networks",
        courseCode: "CS103",
        department: "CSE",
        credits: 4
    },
    {
        courseName: "Python Programming",
        courseCode: "CS104",
        department: "CSE",
        credits: 3
    }
];

async function addCourses() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Course.insertMany(courses);

        console.log("Courses added successfully!");

    } catch (error) {
        console.log("Error:", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

addCourses();