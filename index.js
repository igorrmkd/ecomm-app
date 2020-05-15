const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['sdfsaaffsf32d1f5h32ds54']
}));

app.get('/', (req, res) => {
    res.send(`
        <div>
        Your ID is: ${req.session.userId}
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <input name="passwordConfirmation" placeholder="password confirmation" /><br>
                <button>Sign Up</button>
            </form>
        </div>
    `);
});


// first run the bodyParser(middleware) - function, and then the callback
app.post('/', async (req, res) => {
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

app.listen(3000, () => {
    console.log('Listening!!');
});






