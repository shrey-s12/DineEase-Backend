const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CounterSchema = new Schema({
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    merchants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;