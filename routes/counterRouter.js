const express = require('express');
const router = express.Router();
const { validateObjectId, validateMerchantIds, authenticateToken } = require('../middleware');
const {
    getAllCounters,
    getCounterById,
    getCountersByMerchantId,
    createCounter,
    updateCounter,
    deleteCounter,
} = require('../controllers/couterController');

router.get("/", getAllCounters);

router.use(authenticateToken);
router.get("/:id", validateObjectId, getCounterById);
router.get("/merchant/:id", validateObjectId, getCountersByMerchantId);
router.post("/", validateMerchantIds, createCounter);
router.put(":id", validateObjectId, updateCounter);
router.delete("/:id", validateObjectId, deleteCounter);

module.exports = router;