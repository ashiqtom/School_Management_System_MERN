const express = require("express");
const studentController = require("../controllers/studentController.js")

const router = express.Router();

router.get("/studentDetails", studentController.studentDetails);

module.exports = router;
