const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Routes
const adminRoutes = require("./routes/admin");
const librarianRoutes=require("./routes/librarianRoutes")
const authRoutes = require("./routes/authRoutes")
const staffRoutes = require("./routes/staffRoutes")
const studentRoutes = require("./routes/studentRoutes")

app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/librarian", librarianRoutes);


const connectDatabaseAndStartServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");

    // Create Admin account if it doesn't exist
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const adminUser = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123", // You should hash this password in production!
        role: "admin",
      });

      // Save admin user
      await adminUser.save();
      console.log("Admin account created: admin@example.com / admin123");
    } else {
      console.log("Admin account already exists.");
    }

    // Start the server
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

connectDatabaseAndStartServer();