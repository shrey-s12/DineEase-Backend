const express = require('express');
const router = express.Router();
const { validateObjectId, validateMerchantIds } = require('../middleware');
const {
    getAllCounters,
    getCounterById,
    createCounter,
    updateCounter,
    deleteCounter,
} = require('../controllers/couterController');

router.get("/", getAllCounters);
router.get("/:id", validateObjectId, getCounterById);
router.post("/", validateMerchantIds, createCounter);
router.put(":id", validateObjectId, updateCounter);
router.delete("/:id", validateObjectId, deleteCounter);

module.exports = router;