const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
require('./config/connection');
const CartRouter = require('./routes/cartRouter');
const CounterRouter = require('./routes/counterRouter');
const DishRouter = require('./routes/dishRouter');
const UserRouter = require('./routes/userRouter');
const { authenticateToken } = require('./middleware');

const MAIN_PORT = process.env.MAIN_PORT; // 5000
const app = express();

app.use(express.json());
app.use(cors());

app.use(authenticateToken);
    
app.use('/cart', CartRouter);
app.use('/counter', CounterRouter);
app.use('/dish', DishRouter);
app.use('/user', UserRouter);

app.listen(MAIN_PORT, () => {
    console.log(`Server is running on port ${MAIN_PORT}`);
});