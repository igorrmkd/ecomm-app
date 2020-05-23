const express = require('express');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');

const router = express.Router();

/// list the products to the administrator
router.get('/admin/products', (req, res) => {
    res.send(productsNewTemplate({}));
});

/// create new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

module.exports = router;