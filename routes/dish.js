const express = require('express');
const router = express.Router();
const Dish = require('../model/dishModel');
const validateObjectId = require('../middleware');

router.get("/", async (req, res) => {
    try {
        const dishes = await Dish.find().populate('counter');
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findById(id).populate('counter'); // Populate counter if needed

        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/counter/:counterId", validateObjectId, async (req, res) => {
    const { counterId } = req.params;

    try {
        const dishes = await Dish.find({ counter: counterId }).populate('counter');

        if (dishes.length === 0) {
            return res.status(404).json({ message: "No dishes found for this counter" });
        }

        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
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
});

router.put("/:id", validateObjectId, async (req, res) => {
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
});


router.delete("/:id", validateObjectId, async (req, res) => {
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
});

module.exports = router;