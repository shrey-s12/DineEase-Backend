const express = require('express');
const router = express.Router();
const { validateObjectId } = require('../middleware');
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get("/", getAllUsers);
router.get("/:id", validateObjectId, getUserById);
router.post("/", createUser);
router.put("/:id", validateObjectId, updateUser)
router.delete("/:id", validateObjectId, deleteUser);

module.exports = router;