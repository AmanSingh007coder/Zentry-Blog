const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
require('dotenv').config({ path: './config.env' });

const postRouter = require('./routes/PostRoute');
const userRouter = require('./routes/UserRoute');


const allowedOrigins = [
  'http://localhost:5173',
  'https://zentry-blog.vercel.app/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true 
};


let serviceAccount;

if (process.env.NODE_ENV === 'production') {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  serviceAccount = JSON.parse(serviceAccountString);
} else {
  serviceAccount = require('./serviceprivatekey.json');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 3004;


app.options('*', cors(corsOptions)); 


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