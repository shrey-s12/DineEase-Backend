const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../../middleware');
const {
    getAllDishes,
    getDishById,
    getDishesByCounterId,
    createDish,
    updateDish,
    deleteDish
} = require('../controllers/dishController');

router.get("/", getAllDishes);
router.get("/:id", validateObjectId, getDishById);
router.get("/counter/:counterId", validateObjectId, getDishesByCounterId);
router.post("/", createDish);
router.put("/:id", validateObjectId, updateDish);
router.delete("/:id", validateObjectId, deleteDish);

module.exports = router;