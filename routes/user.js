const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const { validateObjectId } = require('../middleware');

router.get("/", async (req, res) => {
    try {
        const users = await User.find().select('-cart -password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-cart -password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const { image, name, email, password, role } = req.body;
    try {

        // Check existingUser
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ image, name, email, password: hashedPassword, role });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.password) {
        const salt = await bcrypt.genSalt();
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = await updatedUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", validateObjectId, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;