const express = require('express');
const { check, validationResult } = require('express-validator');

const usersRepo = require('../../repositories/users');
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const { requireEmail, requirePassword, requirePasswordConfirmation } = require('./validators');

//subrouter to link our route handlers to index.js
// the router const, its an object to track all of our (app.get/post routes)
const router = express.Router();


router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});


// first run the bodyParser(middleware) - function, and then the callback
router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    async (req, res) => {
        //validation
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors }));
        }

        // console.log(req.body); // req.body = the names of the inputs
        const { email, password, passwordConfirmation } = req.body;

        // Create a user, in our user repo
        const user = await usersRepo.create({ email, password });

        // Store the id of that user inside the users cookie
        // req.session === {}// Added by cookie session
        req.session.userId = user.id;

        res.send('Account created!!!');
    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.send("You are logged out");
});

router.get("/signin", (req, res) => {
    res.send(signinTemplate({ req }));
});

// compare the login data with the saved users data 
router.post('/signin', [
    check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error("Email not found!");
            }
        }),
    check('password').trim()
], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password } = req.body;

    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send("Email not found");
    }

    const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
    );

    if (!validPassword) {
        return res.send("Wrong Password!")
    }

    req.session.userId = user.id;
    res.send("You are signed In");
});


module.exports = router;