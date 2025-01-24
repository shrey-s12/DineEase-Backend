const express = require('express');
const router = express.Router();
const Counter = require('../model/counterModel');
const validateObjectId = require('../middleware');

router.get("/", async (req, res) => {
    try {
        const counters = await Counter.find();
        res.status(200).json(counters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const counter = await Counter.findById(id);
        if (!counter) {
            return res.status(404).json({ message: 'counter not found' });
        }
        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { image, name, description, merchants } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const newCounter = new Counter({ image, name, description, merchants });
        const counter = await newCounter.save();
        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put(":id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCounter = await Counter.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedCounter) {
            return res.status(404).json({ message: 'counter not found' });
        }

        const counter = await updatedCounter.save();
        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;

    try {
        const counter = await Counter.findByIdAndDelete(id);
        if (!counter) {
            return res.status(404).json({ message: 'Counter not found' });
        }
        res.status(200).json({ message: 'Counter deleted successfully', counter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;