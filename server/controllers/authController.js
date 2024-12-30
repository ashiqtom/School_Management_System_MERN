import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login=async (req, res) => {
    const { email, password } = req.body;
  
    try { 
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({role:user.role, accessToken:token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

export default{
  login
}
  // const User = require("../models/User");
  // const crypto = require('crypto');
  // const bcrypt = require("bcryptjs");
  // const jwt = require("jsonwebtoken");
  
  // // Helper functions for validation
  // const isValidEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //   return emailRegex.test(email);
  // };
  
  // // Login user
  // exports.login= async (req, res) => {
  //   const { email, password } = req.body;
  //   try {    
  //     if (email && !isValidEmail(email)) {
  //       return res.status(400).send('Invalid email format');
  //     }
  
  //     const user = await User.findOne({email});
  
  //     if (!user) {
  //         return res.status(400).json({ message: 'Invalid email or password' });
  //     }
  
  //     // Compare the password
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ message: 'Invalid email or password' });
  //     }
  
  //     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  //     // const refreshToken = crypto.randomBytes(40).toString('hex');
  
  //     // user.refreshToken = refreshToken; 
  //     // await user.save();
  
  //     res.status(201).json({
  //       user,
  //       accessToken, 
  //       // refreshToken
  //     });
  
  //   } catch (err) {
  //       console.error(err);
  //       res.status(500).json({ message: 'Server error' });
  //   }
  // };