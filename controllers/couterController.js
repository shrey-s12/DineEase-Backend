const Counter = require('../model/counterModel');

// Get all counters
const getAllCounters = async (req, res) => {
    try {
        const counters = await Counter.find();
        res.status(200).json(counters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get counter by ID
const getCounterById = async (req, res) => {
    const { id } = req.params;
    try {
        const counter = await Counter.findById(id);
        if (!counter) {
            return res.status(404).json({ message: 'Counter not found' });
        }
        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new counter
const createCounter = async (req, res) => {
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
};

// Update a counter by ID
const updateCounter = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCounter = await Counter.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedCounter) {
            return res.status(404).json({ message: 'Counter not found' });
        }

        res.status(200).json(updatedCounter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a counter by ID
const deleteCounter = async (req, res) => {
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
};

module.exports = {
    getAllCounters,
    getCounterById,
    createCounter,
    updateCounter,
    deleteCounter,
};
