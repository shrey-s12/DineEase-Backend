// const express = require('express');
// const router = express.Router();
// const User = require('../model/userModel');

// router.use(auth);

// router.get('/', async (req, res) => {
//     const user = req.user;
//     res.status(200).json(user);
// });

// router.post('/:dishId', async (req, res) => {
//     req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
//     await req.user.save().then(u => u.populate('cart.dish'));
//     res.status(200).json(req.user.cart);
// });

// router.patch('/:dishId', async (req, res) => {
//     const item = req.user.cart.find(item => item.dish.id === req.params.dishId);
//     item.quantity += req.body.changeQuantity;
//     await req.user.save();
//     res.status(200).json(req.user.cart);
// });

// router.delete('/:dishId', async (req, res) => {
//     req.user.cart = req.user.cart.filter(item => item.dish.id !== req.params.dishId);
//     const cart = req.user.cart;
//     await req.user.save();
//     res.status(200).json(cart);
// });

// router.delete('/', async (req, res) => {
//     req.user.cart = [];
//     await req.user.save();
//     res.status(200).json(cart);
// });

// async function auth(req, res, next) {
//     const id = "67937229db3ad7ada578cd50";
//     req.user = await User.findById(id).populate('cart.dish');
//     next();
// }

// module.exports = router;

const express = require('express');
const router = express.Router();
// const User = require('../model/userModel');

// // Middleware to authenticate and populate user
// router.use(auth);

// Get the cart details for the authenticated user
router.get('/', async (req, res) => {
    try {
        console.log("req.user", req.user);
        const user = req.user;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Add a new dish to the cart
router.post('/:dishId', async (req, res) => {
    try {
        const { dishId } = req.params;

        // Check if dish already exists in the cart
        const existingItem = req.user.cart.find(item => item.dish.id === dishId);
        if (existingItem) {
            return res.status(400).json({ message: "Dish is already in the cart" });
        }

        // Add the new dish to the cart
        req.user.cart.push({ dish: dishId, quantity: 1 });
        await req.user.save().then(u => u.populate('cart.dish'));
        res.status(200).json(req.user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Update the quantity of a dish in the cart
router.patch('/:dishId', async (req, res) => {
    try {
        const { dishId } = req.params;
        const { changeQuantity } = req.body;

        const item = req.user.cart.find(item => item.dish.id === dishId);
        if (!item) {
            return res.status(404).json({ message: "Dish not found in the cart" });
        }

        // Update quantity and validate
        item.quantity += changeQuantity;

        // If quantity falls below 1, remove the dish from the cart
        if (item.quantity < 1) {
            req.user.cart = req.user.cart.filter(cartItem => cartItem.dish.id !== dishId);
        }

        await req.user.save().then(u => u.populate('cart.dish'));
        res.status(200).json(req.user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Remove a dish from the cart
router.delete('/:dishId', async (req, res) => {
    try {
        const { dishId } = req.params;

        const item = req.user.cart.find(item => item.dish.id === dishId);
        if (!item) {
            return res.status(404).json({ message: "Dish not found in the cart" });
        }

        req.user.cart = req.user.cart.filter(item => item.dish.id !== dishId);
        await req.user.save();
        res.status(200).json(req.user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Clear the entire cart
router.delete('/', async (req, res) => {
    try {
        if (req.user.cart.length === 0) {
            return res.status(200).json({ message: "Cart is already empty" });
        }

        req.user.cart = [];
        await req.user.save();
        res.status(200).json(req.user.cart);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// // Middleware to authenticate the user and populate the cart
// async function auth(req, res, next) {
//     try {
//         const id = "67937229db3ad7ada578cd50"; // Hardcoded user ID for now
//         const user = await User.findById(id).populate('cart.dish');
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         res.status(500).json({ message: "Error authenticating user", error: err.message });
//     }
// }

module.exports = router;
