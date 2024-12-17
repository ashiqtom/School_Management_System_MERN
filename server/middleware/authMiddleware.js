const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Token is not valid" });
  }
};

exports.checkRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) { // Check if user's role is in the array
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};


