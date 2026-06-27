import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoute.js";

config();
connectDB();

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
    res.send("Doon Valley Properties API is running");
});

app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});