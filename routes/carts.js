const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a post request to add an item to cart
router.post('/cart/products', async (req, res) => {
    // console.log(req.body.productId);

    // figure out the cart!!
    let cart;
    if (!req.session.cartId) {
        // if there is no cart.. create it, and 
        // store the cart id on the req.session.cartId property
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        // we have a cart!, get it from the repo..
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    const existingItem = cart.items.find(item => item.id === req.body.productId);

    if (existingItem) {
        // increment quantity and save cart
        existingItem.quantity++;
    } else {
        // add new product id to the items array
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    // save the changes
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    // either increment quantity for existing product
    // or add new product to items array

    res.send('Product added to cart');

});

// Receive a get request to show all items in cart


// Receive a post request to delete an item from cart



module.exports = router;

