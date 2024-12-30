import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import path from "path"
import cors from "cors"
import adminRoutes from "./routes/admin.js";
import librarianRoutes from "./routes/librarianRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

app.use(express.json())

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies or authentication headers
};

// Apply CORS middleware
app.use(cors(corsOptions));




const __dirname = path.resolve()

// Routes

app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/librarian", librarianRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/client/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  })  
}

app.listen(process.env.PORT || 3000, () => {
  connectDB()
  console.log(`Server running on port http://localhost:${process.env.PORT || 3000}`);
});