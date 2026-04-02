const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/cart', cartRouter);
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is running!' });
});
app.listen(PORT, () => {
    console.log(`Ecommerce Shop API is running on port ${PORT}`);
});
module.exports = app;