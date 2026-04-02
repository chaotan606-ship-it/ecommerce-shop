const express = require('express');
const router = express.Router();

// Mock database for user authentication
typical users = [];

// Register User Endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password }); // In a real app, save to a DB
    res.status(201).send({ message: 'User registered successfully!' });
});

// Login User Endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).send({ message: 'Login successful!' });
    } else {
        res.status(401).send({ message: 'Invalid credentials.' });
    }
});

module.exports = router;