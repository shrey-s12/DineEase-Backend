const mongoose = require('mongoose');
const User = require('./model/userModel')

// Middleware to validate MongoDB ObjectID
const validateObjectId = (req, res, next) => {
    const id = req.params.id || req.params.counterId;
    if (!mongoose.Types.ObjectId.isValid({ id })) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    next();
};

// Middleware to validate Merchant IDs
const validateMerchantIds = async (req, res, next) => {
    const { merchants } = req.body;

    if (!merchants || !Array.isArray(merchants)) {
        return res.status(400).json({ message: 'Merchants must be an array of valid IDs' });
    }

    try {
        for (const merchantId of merchants) {
            // Validate if the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(merchantId)) {
                return res.status(400).json({ message: `Invalid Merchant ID: ${merchantId}` });
            }

            // Check if the ID belongs to a user with the role "Merchant"
            // .lean() is used to return a plain JavaScript object instead of a Mongoose document
            const merchant = await User.findOne({ _id: merchantId, role: 'Merchant' }).lean();
            if (!merchant) {
                return res.status(404).json({ message: `Merchant not found or not a valid merchant: ${merchantId}` });
            }
        }

        next(); // Proceed if all validations pass
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    validateObjectId,
    validateMerchantIds,
}