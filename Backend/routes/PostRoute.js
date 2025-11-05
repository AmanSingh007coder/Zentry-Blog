const express = require('express');
const postController = require('../controllers/postController'); // Corrected to camelCase
const { verifyToken, isAdmin } = require('../middleware/authMiddleware'); // Added isAdmin
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// --- Cloudinary and Multer Setup (Unchanged) ---
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// --- PUBLIC ROUTES (No Token Required) ---
router.route('/posts')
  .get(postController.getAllPosts)
  .post(verifyToken, postController.createPost); // This was a protected POST, kept it here

router.route('/posts/:id')
  .get(postController.getOnePost)
  .put(verifyToken, postController.updatePost)
  .delete(verifyToken, postController.deletePost);

// --- PROTECTED USER ROUTES (Token Required) ---
router.route('/posts/search').get(verifyToken, postController.searchPosts);
router.route('/posts/myposts').get(verifyToken, postController.getMyPosts);

// --- IMAGE UPLOAD ROUTE ---
// The 'upload.single()' middleware runs before the controller function
router.route('/posts/upload-image').post(verifyToken, upload.single('imageFile'), postController.uploadImage);

// --- COMMENT ROUTES ---
router.route('/posts/:id/comments')
  .get(postController.getComments)
  .post(verifyToken, postController.createComment);
router.route('/comments/:commentId').delete(verifyToken, postController.deleteComment);

// --- ADMIN ROUTES (Protected by verifyToken and isAdmin) ---
router.route('/admin/posts').get(verifyToken, isAdmin, postController.getAllPostsAdmin);
router.route('/admin/posts/:id').delete(verifyToken, isAdmin, postController.deletePostAdmin);

module.exports = router;