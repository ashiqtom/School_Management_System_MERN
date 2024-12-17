const Student = require("../models/Student");

exports.createStudent=async (req,res) =>{
  const { name, studentClass, libraryHistory, feesHistory } = req.body;

  try{
    const student = new Student({name, class: studentClass, libraryHistory, feesHistory})
    const response = await student.save()
    res.json({message: "Student created successfully"})
  }catch(err){
    console.log(err)
    res.status(500).json({message:"Server error"})
  }
}

exports.getStudents=async (req, res) => {
    try {
      const student = await Student.find();
      res.json(student);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" });
    }
}

exports.getstudent=async (req, res) => {
  const { id } = req.params;
    try {
      const student = await Student.findById(id);
      res.json(student);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server error" });
    }
}


exports.editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if the user exists
    const existingStudent = await Student.findById(id);
    if (!existingStudent) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user
    await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({message: "User updated successfully"});
  } catch (err) {
    console.error("Error editing user:", err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};


exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};