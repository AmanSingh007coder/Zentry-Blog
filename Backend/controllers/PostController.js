const Post = require('../models/PostModel');
const Comment = require('../models/commentModel');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// --- POST CONTROLLERS ---

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate('author', 'name avatarUrl').sort({ datecreated: -1 });
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.user._id }).populate('author', 'name avatarUrl').sort({ datecreated: -1 });
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

exports.getOnePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name avatarUrl');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, description, content, imageUrl, category, isFeatured } = req.body;
    const newPost = await Post.create({
      title, description, content, imageUrl, category, isFeatured,
      author: req.user._id
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const isAdmin = req.user.role === 'admin';
    const isAuthor = post.author.toString() === req.user._id;
    if (!isAdmin && !isAuthor) {
      return res.status(403).json({ message: "User not authorized to edit this post" });
    }
    const { title, description, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, description, content },
      { new: true, runValidators: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ 
      _id: req.params.id, 
      author: req.user._id 
    });
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found or you're not authorized to delete it." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ message: 'Please provide a search term.' });
    }
    const searchResults = await Post.find({
      $text: { $search: searchTerm }
    }).populate('author', 'name avatarUrl');
    res.json(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: 'Error during search' });
  }
};

// --- IMAGE UPLOAD CONTROLLER ---

exports.uploadImage = async (req, res) => {
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image', error: err });
  }
};

// --- COMMENT CONTROLLERS ---

exports.createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      author: req.user._id,
      post: req.params.id
    });
    const populatedComment = await Comment.findById(newComment._id).populate('author', 'name avatarUrl');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const loggedInUserId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    if (comment.author.toString() !== loggedInUserId) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to delete this comment.' });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment.' });
  }
};

// --- ADMIN CONTROLLERS ---

exports.getAllPostsAdmin = async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate('author', 'name')
      .sort({ datecreated: -1 });
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all posts' });
  }
};

exports.deletePostAdmin = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};