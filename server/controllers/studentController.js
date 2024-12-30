import Student from "../models/Student.js";

const studentDetails=async (req, res) => {
    try {
      const student = await Student.find();
      res.json(student);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" });
    }
  }
  export default{
    studentDetails
  }