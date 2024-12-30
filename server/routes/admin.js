import express from "express";
import { authMiddleware, checkRole } from "../middleware/authMiddleware.js";
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post("/create_account", authMiddleware, checkRole("admin"), adminController.createAccount);
router.get("/users", authMiddleware, checkRole("admin"), adminController.getAllUsers);
router.delete("/users/:id", authMiddleware, checkRole("admin"), adminController.deleteUser);
router.put("/users/:id", authMiddleware, checkRole("admin"), adminController.editUser);

export default router
