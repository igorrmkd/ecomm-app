const express = require('express');

const router = express.Router();

/// list the products to the administrator
router.get('/admin/products', (req, res) => {
    res.send('alooo products');
});

/// create new product
router.get('/admin/products/new', (req, res) => {
    res.send('alooo new products');
});

module.exports = router;