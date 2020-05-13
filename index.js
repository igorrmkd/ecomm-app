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

// this is a middleware, reusable "get the data" function..
const bodyParser = (req, res, next) => {
    if (req.method === 'POST') {
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
            req.body = formData;
            next(); // to tell Express taht we are done here, move on..

        });
    } else {
        next();
    }
};

// first run the bodyParser(middleware) - function, and then the callback
app.post('/', bodyParser, (req, res) => {
    console.log(req.body);
    res.send('Account created!!!');
});

app.listen(3000, () => {
    console.log('Listening!!');
});






