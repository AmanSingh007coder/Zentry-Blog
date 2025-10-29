const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
require('dotenv').config({ path: './config.env' });

const postRouter = require('./routes/PostRoute');
const userRouter = require('./routes/UserRoute');


let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  console.log("Running in production mode. Loading Firebase key from ENV.");
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  serviceAccount = JSON.parse(serviceAccountString);
} else {
  console.log("Running in development mode. Loading Firebase key from file.");
  serviceAccount = require('./serviceprivatekey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(postRouter);
app.use(userRouter);

// Function to start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB with Mongoose!');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();