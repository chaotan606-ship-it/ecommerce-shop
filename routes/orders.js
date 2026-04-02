'use strict';

const express = require('express');
const router = express.Router();

// Mock data for orders
let orders = [];

// GET all orders
router.get('/', (req, res) => {
    res.status(200).json(orders);
});

// GET a single order by ID
router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found.');
    res.status(200).json(order);
});

// POST a new order
router.post('/', (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        item: req.body.item,
        quantity: req.body.quantity,
        price: req.body.price,
        status: 'pending'
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT to update an existing order
router.put('/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found.');
    order.item = req.body.item || order.item;
    order.quantity = req.body.quantity || order.quantity;
    order.price = req.body.price || order.price;
    order.status = req.body.status || order.status;
    res.status(200).json(order);
});

// DELETE an order
router.delete('/:id', (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send('Order not found.');
    orders.splice(orderIndex, 1);
    res.status(204).send();
});

module.exports = router;
