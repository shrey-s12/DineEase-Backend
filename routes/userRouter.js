const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware');
const {
    getAllUsers,
    getUserById,
    getMerchants,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get("/", getAllUsers);
router.get("/merchants", getMerchants);
router.get("/:id", validateObjectId, getUserById);
router.post("/", createUser);
router.put("/:id", validateObjectId, updateUser)
router.delete("/:id", validateObjectId, deleteUser);

module.exports = router;