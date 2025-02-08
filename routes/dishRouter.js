const express = require('express');
const router = express.Router();
const { validateObjectId, authenticateToken } = require('../middleware');
const {
    getAllDishes,
    getDishById,
    getDishesByCounterId,
    getAllDishesByMerchantId,
    createDish,
    updateDish,
    deleteDish
} = require('../controllers/dishController');

router.get("/", getAllDishes);

router.use(authenticateToken);
router.get("/:id", validateObjectId, getDishById);
router.get("/counter/:counterId", validateObjectId, getDishesByCounterId);
router.get("/merchant/:id", validateObjectId, getAllDishesByMerchantId);
router.post("/", createDish);
router.put("/:id", validateObjectId, updateDish);
router.delete("/:id", validateObjectId, deleteDish);

module.exports = router;