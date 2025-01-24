const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectID
const validateObjectId = (req, res, next) => {
    const id = req.params.id || req.params.counterId;
    if (!mongoose.Types.ObjectId.isValid({ id })) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    next();
};

module.exports = {
    validateObjectId,
}