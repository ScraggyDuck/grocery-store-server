const mongoose = require('mongoose');

const DB = process.env.DATABASE;

const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));
};

module.exports = connectDB;
