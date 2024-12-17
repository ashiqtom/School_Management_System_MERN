const express = require("express");
const librarianController= require('../controllers/librarianController')
const {authMiddleware, checkRole } = require("../middleware/authMiddleware");

const router = express.Router();

// View library history
router.get("/students", authMiddleware, checkRole("admin", "librarian"), librarianController.studentDetails);
router.get("/student/:id", authMiddleware, checkRole("admin", "librarian"), librarianController.getstudent);
router.put("/student/:id", authMiddleware, checkRole("admin", "librarian"), librarianController.editStudent);
module.exports = router;
