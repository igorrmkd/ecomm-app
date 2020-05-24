const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/// list the products to the administrator
router.get('/admin/products', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

/// create new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

// the post form
router.post('/admin/products/new', upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async (req, res) => {
    // console.log(errors);
    // console.log(req.body);
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    /// save the data
    await productsRepo.create({ title, price, image });



    res.redirect('/admin/products');
}
);

module.exports = router;