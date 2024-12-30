import express from "express";
import staffController from "../controllers/staffController.js";
import { authMiddleware, checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create_student", authMiddleware, checkRole('admin',"staff"), staffController.createStudent);
router.get("/students", authMiddleware, checkRole("admin","staff"), staffController.getStudents);
router.get("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.getstudent);
router.put("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.editStudent);
router.delete("/student/:id", authMiddleware, checkRole("admin","staff"), staffController.deleteStudent);

export default router;
