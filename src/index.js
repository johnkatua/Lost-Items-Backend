const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/User/index');
const itemRoutes = require('./routes/Item/index');
const genreRoutes = require('./routes/Genre/index');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {  useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database');
    }
  }
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

app.use('/auth', authRoutes);
app.use('/items', itemRoutes);
app.use('/genre', genreRoutes);

const port = process.env.PORT;

app.listen((port), () => {
  console.log(`Server is running on port ${port}`);
});