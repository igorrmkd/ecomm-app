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
    // get access to the form data submitted
    req.on('data', data => {
        // the data we get needs converting to strings,
        // and split by the & symbol
        const parsed = data.toString('utf8').split('&');

        const formData = {};
        // loop through parsed data, and iuse the values 
        // from both sides of = as key and value
        // email=pero%40mail.comd&password=dddddddddd&passwordConfirmation=kkkkkkkkkk
        for (let pair of parsed) {
            const [key, value] = pair.split('=');
            formData[key] = value;
        }
        //we get this as formData:
        // {
        //     email: 'pero%40mail.comd',
        //     password: 'dddddddddd',
        //     passwordConfirmation: 'kkkkkkkkkk'
        // }
        console.log(formData);

    });
    res.send('Account created!!!');
});

app.listen(3000, () => {
    console.log('Listening!!');
});






