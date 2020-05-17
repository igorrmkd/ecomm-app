

app.get('/signup', (req, res) => {
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
app.post('/signup', async (req, res) => {
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

app.get('/signout', (req, res) => {
    req.session = null;
    res.send("You are logged out");
});

app.get("/signin", (req, res) => {
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
app.post('/signin', async (req, res) => {
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