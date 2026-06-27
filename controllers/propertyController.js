import Property from "../models/Property.js";

// Add property

export const addProperty = async (req, res) => {
    try {
        const { title, type, description, location, size, price, status } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one property image is required" });
        }

        const images = req.files.map((file) => ({
            public_id: file.filename,
            url: file.path,
        }));

        const property = await Property.create({
            title,
            type,
            description,
            location,
            size,
            price,
            status,
            image: images[0],
            images,
        });

        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find().sort({ createdAt: -1 });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single property
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update property
export const updateProperty = async (req, res) => {
    try {
        const { title, type, description, location, size, price, status } = req.body;

        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        property.title = title || property.title;
        property.type = type || property.type;
        property.description = description || property.description;
        property.location = location || property.location;
        property.size = size || property.size;
        property.price = price || property.price;
        property.status = status || property.status;

        if (req.files && req.files.length > 0) {
            const images = req.files.map((file) => ({
                public_id: file.filename,
                url: file.path,
            }));

            property.images = images;
            property.image = images[0];
        }

        const updatedProperty = await property.save();

        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await property.deleteOne();

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

