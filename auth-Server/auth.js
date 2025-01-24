const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
require('../config/connection');
const AuthRoutes = require('./routes/authRouter');

const PORT2 = process.env.PORT2; // 5001
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRoutes);

app.listen(PORT2, () => {
    console.log(`Auth Server running on port ${PORT2}`);
});