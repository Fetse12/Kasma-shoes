const Shoes = require("../models/shoes.js");

// Create a new shoe
const createShoe = async (req, res) => {
    const { shoes_name, shoes_type, discription, type, Price, isSpecial, shoe_Size, isAvailable, DiscountPercent, imgUrl } = req.body;

    try {
        const newShoe = new Shoes({
            shoes_name,
            shoes_type,
            type,
            Price,
            discription,
            shoe_Size,
            isSpecial,
            isAvailable,
            DiscountPercent,
            imgUrl,
        });

        const savedShoe = await newShoe.save();
        res.status(201).json(savedShoe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating shoe', error });
    }
};

// Create multiple shoes at once
const createMultipleShoes = async (req, res) => {
    const shoesData = req.body; // Expect an array of shoe objects

    try {
        const savedShoes = await Shoes.insertMany(shoesData);
        res.status(201).json(savedShoes);
    } catch (error) {
        res.status(500).json({ message: 'Error creating multiple shoes', error });
    }
};

// Get all shoes
const getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoes.find();
        res.status(200).json(shoes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoes', error });
    }
};

// Get a specific shoe by ID
const getShoeById = async (req, res) => {
    const { id } = req.params;

    try {
        const shoe = await Shoes.findById(id);
        if (!shoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json(shoe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shoe', error });
    }
};

// Update a shoe by ID
const updateShoe = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedShoe = await Shoes.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedShoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json(updatedShoe);
    } catch (error) {
        res.status(500).json({ message: 'Error updating shoe', error });
    }
};

// Delete a shoe by ID
const deleteShoe = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShoe = await Shoes.findByIdAndDelete(id);
        if (!deletedShoe) {
            return res.status(404).json({ message: 'Shoe not found' });
        }
        res.status(200).json({ message: 'Shoe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shoe', error });
    }
};

// Export the functions for use in other modules
module.exports = {
    createShoe,
    createMultipleShoes,
    getAllShoes,
    getShoeById,
    updateShoe,
    deleteShoe,
};