import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const hashedPassword = await bcrypt.hash(
            "Doon@123",
            10
        );

        const admin = await Admin.create({
            email: "admin@doonvalleyproperties.com",
            password: hashedPassword,
        });

        console.log("Admin Created:");
        console.log(admin);

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

createAdmin();