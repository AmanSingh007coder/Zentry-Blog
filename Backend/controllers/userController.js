const User = require('../models/UserModel');
const Post = require('../models/PostModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('firebase-admin');
const axios = require('axios');
const mongoose = require('mongoose');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

// --- USER AUTHENTICATION ---

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    newUser.password = undefined;
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    const payload = { _id: user._id, name: user.name, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });
    res.json({ success: true, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { name, email } = decodedToken;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }
    const payload = { _id: user._id, name: user.name, role: user.role, email: user.email };
    const myAppToken = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' });
    res.json({ success: true, token: myAppToken });
  } catch (error) {
    console.error("Google auth failed on backend:", error);
    res.status(401).json({ success: false, message: 'Invalid Google token.' });
  }
};

// --- USER PROFILE & ACTIONS ---

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { postId } = req.params;
    const postIndex = user.savedPosts.indexOf(postId);
    if (postIndex > -1) {
      user.savedPosts.splice(postIndex, 1);
    } else {
      user.savedPosts.push(postId);
    }
    await user.save();
    res.json({ savedPosts: user.savedPosts });
  } catch (error) {
    res.status(500).json({ message: "Error updating saved posts" });
  }
};

// In controllers/userController.js

exports.getSavedPosts = async (req, res) => {
  try {
    // --- THIS IS THE FIX ---
    // Use the ID from the token (req.user._id) to find ONLY the logged-in user.
    const user = await User.findById(req.user._id).populate({
      path: 'savedPosts', // Then, populate their saved posts...
      populate: { // ...and for each post, also get the author's details.
        path: 'author',
        select: 'name avatarUrl'
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Now, you're only sending back the posts for that one specific user.
    res.json(user.savedPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved posts" });
  }
};

exports.uploadAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'avatars' }, (error, result) => {
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
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: result.secure_url },
      { new: true }
    ).select('-password');
    res.json({ message: 'Avatar updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload avatar', error: err });
  }
};

// --- CONTACT & SUBSCRIBE ---

exports.contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const brevoApiUrl = 'https://api.brevo.com/v3/smtp/email';
    const emailData = {
      sender: { name: "Zentry Blog", email: "amansinghrajput1610@gmail.com" },
      to: [{ email: process.env.MY_EMAIL }],
      subject: `New Contact Message from ${name}`,
      htmlContent: `<h1>From: ${name}</h1><p>Email: ${email}</p><p>Message: ${message}</p>`
    };
    await axios.post(brevoApiUrl, emailData, {
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
    });
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Error sending contact email:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    const brevoApiUrl = 'https://api.brevo.com/v3/contacts';
    const contactData = {
      email: email,
      listIds: [Number(process.env.BREVO_LIST_ID)]
    };
    await axios.post(brevoApiUrl, contactData, {
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
    });
    res.status(200).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error("Error subscribing:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Subscription failed.' });
  }
};

// --- ADMIN CONTROLLERS ---

exports.getAllUsersAdmin = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUserAdmin = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    if (userIdToDelete === req.user._id) {
      return res.status(400).json({ message: "Admin cannot delete their own account." });
    }
    const deletedUser = await User.findByIdAndDelete(userIdToDelete);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    await Post.deleteMany({ author: new mongoose.Types.ObjectId(userIdToDelete) });
    res.status(204).send();
  } catch (error) {
    console.error("Error during cascading delete:", error);
    res.status(500).json({ message: 'Error deleting user and their posts' });
  }
};