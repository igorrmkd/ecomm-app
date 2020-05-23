const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

/// list the products to the administrator
router.get('/admin/products', (req, res) => {
    res.send(productsNewTemplate({}));
});

/// create new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

// the post form
router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    res.send('submited');
})

module.exports = router;