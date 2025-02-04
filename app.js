const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//Import Utils
const AppError = require('./utils/appError');

//Import Routes
const viewRouter = require('./routes/view.route');
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const orderRouter = require('./routes/order.route');

//Config env
dotenv.config('.env');

//Init app
const app = express();

//Set template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

//1. GLOBAL MIDDLEWARES

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors());

//2. ROUTES
app.use('/', viewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/orders', orderRouter);

//Check Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
