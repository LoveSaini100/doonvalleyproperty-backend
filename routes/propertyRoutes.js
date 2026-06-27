import express from "express";
import {
    addProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
} from "../controllers/propertyController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.array("images", 6), addProperty);
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.put("/:id", upload.array("images", 6), updateProperty);
router.delete("/:id", deleteProperty);

export default router;