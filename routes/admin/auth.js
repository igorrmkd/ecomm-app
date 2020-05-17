const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require("../../views/admin/auth/signup");

//subrouter to link our route handlers to index.js
// the router const, its an object to track all of our (app.get/post routes)
const router = express.Router();


router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});


// first run the bodyParser(middleware) - function, and then the callback
router.post('/signup', async (req, res) => {
    // console.log(req.body); // req.body = the names of the inputs
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if (existingUser) {
        return res.send("Email already used!")
    }

    if (password !== passwordConfirmation) {
        return res.send("passwords must match");
    }

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
    res.send(`
        <div>
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <button>Sign In</button>
            </form>
        </div>    
    `);
});

// compare the login data with the saved users data 
router.post('/signin', async (req, res) => {
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