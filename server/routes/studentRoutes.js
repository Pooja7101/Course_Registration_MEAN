const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Course = require("../models/Course");

// Register a student for a course
router.post("/register", async (req, res) => {
    try {
        const { name, rollNumber, email, courseId } = req.body;

        let student = await Student.findOne({ rollNumber });

        if (!student) {
            student = new Student({
                name,
                rollNumber,
                email,
                registeredCourses: []
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (student.registeredCourses.includes(courseId)) {
            return res.status(400).json({
                message: "Already registered for this course"
            });
        }

        student.registeredCourses.push(courseId);
        await student.save();

        res.json({
            message: "Course registered successfully",
            student
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// View student registrations
router.get("/:rollNumber", async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNumber: req.params.rollNumber
        }).populate("registeredCourses");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Cancel course registration
router.delete("/:rollNumber/cancel/:courseId", async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNumber: req.params.rollNumber
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        student.registeredCourses =
            student.registeredCourses.filter(
                id => id.toString() !== req.params.courseId
            );

        await student.save();

        res.json({
            message: "Course registration cancelled"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;