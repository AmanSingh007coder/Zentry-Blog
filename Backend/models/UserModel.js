const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6
  },
  datecreated: {
    type: Date,
    default: Date.now
  },
  avatarUrl: {
    type: String,
    default: '' 
  },
   savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
   role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user' 
  }
});


userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;