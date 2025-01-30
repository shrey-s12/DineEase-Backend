const express = require('express');
const router = express.Router();
const {
    getUserWithCart,
    createCart,
    updateCart,
    deleteCartItem,
    deleteAllCartItems
} = require('../controllers/cartController');

router.get('/', getUserWithCart);
router.post('/:dishId', createCart);
router.patch('/:dishId', updateCart);
router.delete('/:dishId', deleteCartItem);
router.delete('/', deleteAllCartItems);

module.exports = router;