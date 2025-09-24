const Favorite = require("../models/Favorite.js");
const errorHandler = require("../utils/errorHandler.js");

// Update or add favorite food items by user ID
const updatefavorite = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { favorite_food_id } = req.body; // Assuming req.body is an array of favorite food IDs

    let favorite = await Favorite.findOne({ user_id });

    // If no favorite record exists for this user, create a new one
    if (!favorite) {
      favorite = await Favorite.create({ user_id, favorite_food_id });
    } else {
      // Update the existing record by replacing favorite_food_id with the newFavorites array
      favorite.favorite_food_id = favorite_food_id;
      await favorite.save();
    }

    res.status(200).json({ success: true, data: favorite });
  } catch (error) {
    console.error(error.message);
    next(errorHandler(400, "Invalid favorite data"));
  }
};

// Get favorite food items by user ID
const getFavoriteById = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOne({ user_id: req.params.id });
    if (!favorite) {
      return next(errorHandler(404, "Favorite items not found"));
    }
    res.status(200).json({ success: true, data: favorite });
  } catch (error) {
    console.error(error.message);
    next(errorHandler(500, "Failed to retrieve favorite items"));
  }
};

// Export the functions for use in other modules
module.exports = {
  updatefavorite,
  getFavoriteById,
};
