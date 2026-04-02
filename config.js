module.exports = {
    port: process.env.PORT || 5000,
    environment: process.env.APP_ENV || 'development',
    database: process.env.DATABASE_URL || './ecommerce.db',
    apiVersion: '1.0.0',
    appName: 'Ecommerce Shop API'
};