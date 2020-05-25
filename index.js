const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");


const app = express();

// let express use whatever we put in public folder - like main.css
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['sdfsaaffsf32d1f5h32ds54']
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);

app.listen(3000, () => {
    console.log('Listening!!');
});






