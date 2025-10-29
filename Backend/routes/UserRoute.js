const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- AUTHENTICATION ---
router.post('/users', userController.createUser);
router.post('/users/login', userController.loginUser);
router.post('/users/google-auth', userController.googleAuth);

// --- USER PROFILE & ACTIONS ---
router.get('/users/saved-posts', verifyToken, userController.getSavedPosts);
router.get('/users/:id', verifyToken, userController.getOneUser);
router.put('/users/save/:postId', verifyToken, userController.toggleSavePost);
router.put('/users/avatar', verifyToken, upload.single('avatarFile'), userController.uploadAvatar);

// --- GENERAL ROUTES ---
router.post('/contact', userController.contactForm);
router.post('/subscribe', userController.subscribe);

// --- ADMIN ROUTES ---
router.get('/admin/users', verifyToken, isAdmin, userController.getAllUsersAdmin);
router.delete('/admin/users/:id', verifyToken, isAdmin, userController.deleteUserAdmin);

module.exports = router;