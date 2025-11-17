const express = require('express');
const postController = require('../controllers/postController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// --- Cloudinary and Multer Setup ---
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// --- IMPORTANT: Specific routes MUST come before parameterized routes ---

// PROTECTED USER ROUTES (Define these FIRST)
router.get('/posts/search', verifyToken, postController.searchPosts);
router.get('/posts/myposts', verifyToken, postController.getMyPosts);

// IMAGE UPLOAD ROUTE
router.post('/posts/upload-image', verifyToken, upload.single('imageFile'), postController.uploadImage);

// PUBLIC/PROTECTED GENERAL POST ROUTES (Define these AFTER specific routes)
router.route('/posts')
  .get(postController.getAllPosts)
  .post(verifyToken, postController.createPost);

router.route('/posts/:id')
  .get(postController.getOnePost)
  .put(verifyToken, postController.updatePost)
  .delete(verifyToken, postController.deletePost);

// --- COMMENT ROUTES ---
router.route('/posts/:id/comments')
  .get(postController.getComments)
  .post(verifyToken, postController.createComment);

router.route('/comments/:commentId')
  .delete(verifyToken, postController.deleteComment);

// --- ADMIN ROUTES ---
router.get('/admin/posts', verifyToken, isAdmin, postController.getAllPostsAdmin);
router.delete('/admin/posts/:id', verifyToken, isAdmin, postController.deletePostAdmin);

module.exports = router;