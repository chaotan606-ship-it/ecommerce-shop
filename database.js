const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'ecommerce.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

const initializeDatabase = () => {
    db.serialize(() => {
        // Users table
        db.run(`CREATE TABLE IF NOT EXISTS users (`+
            `id INTEGER PRIMARY KEY AUTOINCREMENT,`+
            `name TEXT NOT NULL,`+
            `email TEXT NOT NULL UNIQUE,`+
            `password TEXT NOT NULL,`+
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP`+
        `)`);

        // Products table
        db.run(`CREATE TABLE IF NOT EXISTS products (`+
            `id INTEGER PRIMARY KEY AUTOINCREMENT,`+
            `name TEXT NOT NULL,`+
            `description TEXT,`+
            `price REAL NOT NULL,`+
            `stock INTEGER DEFAULT 0,`+
            `category TEXT,`+
            `image_url TEXT,`+
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP`+
        `)`);

        // Cart table
        db.run(`CREATE TABLE IF NOT EXISTS cart (`+
            `id INTEGER PRIMARY KEY AUTOINCREMENT,`+
            `user_id INTEGER NOT NULL,`+
            `product_id INTEGER NOT NULL,`+
            `quantity INTEGER DEFAULT 1,`+
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP,`+
            `FOREIGN KEY(user_id) REFERENCES users(id),`+
            `FOREIGN KEY(product_id) REFERENCES products(id)`+
        `)`);

        // Orders table
        db.run(`CREATE TABLE IF NOT EXISTS orders (`+
            `id INTEGER PRIMARY KEY AUTOINCREMENT,`+
            `user_id INTEGER NOT NULL,`+
            `total_price REAL NOT NULL,`+
            `status TEXT DEFAULT 'pending',`+
            `created_at DATETIME DEFAULT CURRENT_TIMESTAMP,`+
            `FOREIGN KEY(user_id) REFERENCES users(id)`+
        `)`);

        // Order items table
        db.run(`CREATE TABLE IF NOT EXISTS order_items (`+
            `id INTEGER PRIMARY KEY AUTOINCREMENT,`+
            `order_id INTEGER NOT NULL,`+
            `product_id INTEGER NOT NULL,`+
            `quantity INTEGER NOT NULL,`+
            `price REAL NOT NULL,`+
            `FOREIGN KEY(order_id) REFERENCES orders(id),`+
            `FOREIGN KEY(product_id) REFERENCES products(id)`+
        `)`);

        console.log('Database tables initialized successfully!');
    });
};

module.exports = db;