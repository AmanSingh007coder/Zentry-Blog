const mongoose = require('mongoose');
const categories = ['Food', 'Cricket', 'News', 'Technology', 'Travel', 'Lifestyle'];

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A post must have a description'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'A post must have content']
  },
  imageUrl: String,
  datecreated: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  category: {
  type: String,
  required: [true, 'A post must have a category'],
  enum: categories 
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;