const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

router.use(auth);

router.get('/', async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

router.post('/:dishId', async (req, res) => {
    req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
    await req.user.save().then(u => u.populate('cart.dish'));
    res.status(200).json(req.user.cart);
});

router.patch('/:dishId', async (req, res) => {
    const item = req.user.cart.find(item => item.dish.id === req.params.dishId);
    item.quantity += req.body.changeQuantity;
    await req.user.save();
    res.status(200).json(req.user.cart);
});

router.delete('/:dishId', async (req, res) => {
    req.user.cart = req.user.cart.filter(item => item.dish.id !== req.params.dishId);
    const cart = req.user.cart;
    await req.user.save();
    res.status(200).json(cart);
});

router.delete('/', async (req, res) => {
    req.user.cart = [];
    await req.user.save();
    res.status(200).json(cart);
});

async function auth(req, res, next) {
    const id = "67937229db3ad7ada578cd50";
    req.user = await User.findById(id).populate('cart.dish');
    next();
}

module.exports = router;