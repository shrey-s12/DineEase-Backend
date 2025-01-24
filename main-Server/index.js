const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
require('../config/connection');
const CartRouter = require('./routes/cartRouter');
const CounterRouter = require('./routes/counterRouter');
const DishRouter = require('./routes/dishRouter');
const UserRouter = require('./routes/userRouter');

const PORT1 = process.env.PORT1; // 5000
const app = express();

app.use(express.json());
app.use(cors());

app.use('/cart', CartRouter);
app.use('/counter', CounterRouter);
app.use('/dish', DishRouter);
app.use('/user', UserRouter);

app.listen(PORT1, () => {
    console.log(`Server is running on port ${PORT1}`);
});