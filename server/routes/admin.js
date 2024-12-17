const express = require("express");
const {authMiddleware, checkRole } = require("../middleware/authMiddleware");
const adminController=require('../controllers/adminController')

const router = express.Router();

router.post("/create_account", authMiddleware, checkRole("admin"), adminController.createAccount);
router.get("/users", authMiddleware, checkRole("admin"), adminController.getAllUsers);
router.delete("/users/:id", authMiddleware, checkRole("admin"), adminController.deleteUser);
router.put("/users/:id", authMiddleware, checkRole("admin"), adminController.editUser);

module.exports = router;
