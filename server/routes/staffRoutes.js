const express = require("express");
const staffController = require("../controllers/staffController")
const {authMiddleware, checkRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create_student", authMiddleware, checkRole('admin',"staff"), staffController.createStudent);
router.get("/students", authMiddleware, checkRole("admin","staff"), staffController.getStudents);
router.get("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.getstudent);
router.put("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.editStudent);
router.delete("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.deleteStudent);

module.exports = router;
