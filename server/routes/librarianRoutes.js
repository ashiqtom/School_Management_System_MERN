import express from "express";
import librarianController from '../controllers/librarianController.js';
import { authMiddleware, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// View library history
router.get("/students", authMiddleware, checkRole("admin", "librarian"), librarianController.studentDetails);
router.get("/student/:id", authMiddleware, checkRole("admin", "librarian"), librarianController.getstudent);
router.put("/student/:id", authMiddleware, checkRole("admin", "librarian"), librarianController.editStudent);
export default router;
