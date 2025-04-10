const Counter = require('../model/counterModel');
const Dish = require('../model/dishModel');

// Get all dishes
const getAllDishes = async (req, res) => {
    const { inStock } = req.query;
    try {
        const dishes = await Dish.find().populate('counter');

        if (inStock) {
            const inStockDishes = dishes.filter(dish => dish.inStock);
            return res.status(200).json(inStockDishes);
        }

        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a dish by ID
const getDishById = async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findById(id).populate('counter');

        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get dishes by counter ID
const getDishesByCounterId = async (req, res) => {
    const { counterId } = req.params;
    try {
        const dishes = await Dish.find({ counter: counterId }).populate({
            path: 'counter',
            populate: { path: 'merchants' }
        });

        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all dishes by merchant ID
const getAllDishesByMerchantId = async (req, res) => {
    const { id } = req.params; // Merchant ID
    const { inStock } = req.query;
    try {
        const counters = await Counter.find({ merchants: id }).select('_id');
        const counterIds = counters.map(counter => counter._id);

        const dishes = await Dish.find({ counter: { $in: counterIds } }).populate('counter');

        if (inStock) {
            const inStockDishes = dishes.filter(dish => dish.inStock);
            return res.status(200).json(inStockDishes);
        }
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new dish
const createDish = async (req, res) => {
    const { image, name, description, category, price, inStock, counter } = req.body;

    if (!name || !description || !category || !price) {
        return res.status(400).json({ message: "Name, description, category, and price are required" });
    }

    try {
        const newDish = new Dish({ image, name, description, category, price, inStock, counter });
        const dish = await newDish.save();
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a dish by ID
const updateDish = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedDish = await Dish.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(updatedDish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a dish by ID
const deleteDish = async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findByIdAndDelete(id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDishes,
    getDishById,
    getDishesByCounterId,
    getAllDishesByMerchantId,
    createDish,
    updateDish,
    deleteDish
};
