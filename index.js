const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <div>
        <form method="Post">
                <input name="email" placeholder="email" /><br>
                <input name="password" placeholder="password" /><br>
                <input name="passwordConfirmation" placeholder="password confirmation" /><br>
                <button>Sign Up</button>
            </form>
        </div>
    `);
});

app.post('/', (req, res) => {
    res.send('Account created!!!');
});

app.listen(3000, () => {
    console.log('Listening!!');
});






