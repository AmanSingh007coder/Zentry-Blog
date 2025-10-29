const express = require('express');
const postController = require('../controllers/PostController'); 
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './config.env' });

const router = express.Router();

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

// --- IMAGE UPLOAD ROUTE (MUST BE BEFORE OTHER /posts ROUTES) ---
router.post('/posts/upload-image', verifyToken, upload.single('imageFile'), postController.uploadImage);

// --- POST ROUTES ---
router.route('/posts/search').get(verifyToken, postController.searchPosts);
router.route('/posts').get(postController.getAllPosts);
router.route('/posts/myposts').get(verifyToken, postController.getMyPosts);
router.route('/posts/:id').get(postController.getOnePost);
router.route('/posts').post(verifyToken, postController.createPost);
router.route('/posts/:id').put(verifyToken, postController.updatePost);
router.route('/posts/:id').delete(verifyToken, postController.deletePost);

// --- COMMENT ROUTES ---
router.route('/posts/:id/comments')
  .get(verifyToken, postController.getComments)
  .post(verifyToken, postController.createComment);
router.route('/comments/:commentId').delete(verifyToken, postController.deleteComment);

router.route('/admin/posts').get(verifyToken, isAdmin, postController.getAllPostsAdmin);
router.route('/admin/posts/:id').delete(verifyToken, isAdmin, postController.deletePostAdmin);

module.exports = router;