import mongoose from "mongoose";
import User from "../models/User.js"; 
  
export const connectDB = async () => {
    try {        
        const conn =await mongoose.connect(process.env.MONGO_URI);
        // console.log(`Database connected ${conn.connection.host}`);
        console.log(`Database connected`);

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

    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1) // process code 1 code means exit with failer , 0 means sucess
    }
}