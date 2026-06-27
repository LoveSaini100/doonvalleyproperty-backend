import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            required: true,
            enum: [
                "Plot",
                "House",
                "Villa",
                "Apartment",
                "Commercial",
                "Office",
                "Shop",
                "Land",
                "Farm House",
                "Other",
            ],
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        size: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Available", "Sold"],
            default: "Available",
        },

        image: {
            public_id: String,
            url: String,
        },

        images: {
            type: [
                {
                    public_id: String,
                    url: String,
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Property", propertySchema);