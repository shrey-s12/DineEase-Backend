const getUserWithCart = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const createCart = async (req, res) => {
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
};

const updateCart = async (req, res) => {
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
};

const deleteCartItem = async (req, res) => {
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
};

const deleteAllCartItems = async (req, res) => {
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
}

module.exports = {
    getUserWithCart,
    createCart,
    updateCart,
    deleteCartItem,
    deleteAllCartItems
};