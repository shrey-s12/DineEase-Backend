const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    dish: {
        type: Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    },
    quantity: { type: Number, default: 1 }
});

const UserSchema = new Schema({
    image: { type: String, default: "https://res.cloudinary.com/dy88vophl/image/upload/v1732281036/b8gatghaiodpi0bjf9wd.png" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Customer', 'Merchant', 'Admin'], default: 'Customer', required: true },
    cart: { type: [CartItemSchema] }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;