const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config({ path: './config.env' });
const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
const serviceAccount = JSON.parse(serviceAccountString);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const postRouter = require('./routes/PostRoute');
const UserRouter = require('./routes/UserRoute');

const app = express();
const PORT = process.env.PORT || 3004;


app.use(cors());
app.use(express.json());


app.use(postRouter);
app.use(UserRouter);


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