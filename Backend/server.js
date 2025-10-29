const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
require('dotenv').config({ path: './config.env' });

const postRouter = require('./routes/PostRoute');
const userRouter = require('./routes/UserRoute');

const allowedOrigins = [
  'http://localhost:5173', // local frontend for development
  'https://zentry-blog.vercel.app' // LIVE VERCEL URL
];


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
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));
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