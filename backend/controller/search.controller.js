const Fuse = require('fuse.js');
const Shoes = require('../models/shoes.js');

const searchAll = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const all_shoes = await Shoes.find();

        const options = {
            includeScore: true,
            threshold: 0.5,
            keys: ['shoes_name', 'shoes_type', 'type'],
        };

        const fuse = new Fuse(all_shoes, options);
        const results = fuse.search(query);
        const formattedResults = results.map(result => result.item);

        res.status(200).json({
            results: formattedResults,
            totalResults: formattedResults.length
        });
    } catch (error) {
        console.error("Search error:", error.message);
        res.status(500).json({ message: 'Error executing search', error: error.message });
    }
};

// Export the searchAll function for use in other modules
module.exports = {
    searchAll,
};