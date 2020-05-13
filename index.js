const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hi there, how are you?');
});

app.listen(3000, () => {
    console.log('Listening!!');
});






