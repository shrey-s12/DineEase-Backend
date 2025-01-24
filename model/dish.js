const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: [1, "Price must be atleast 1"] },
    inStock: { type: Boolean, default: true },
    counter: [{ type: Schema.Types.ObjectId, ref: 'Counter' }],
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;