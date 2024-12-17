const Student = require("../models/Student");

exports.studentDetails=async (req, res) => {
    try {
      const student = await Student.find();
      res.json(student);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" });
    }
  }