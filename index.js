const express = require('express');
var path = require('path');
var app = express();

app.use(express.static('resources'))

/* - Main / INDEX PAGE - */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/app.html'))
});

app.get('/vue', (req, res) => {
    res.sendFile(path.join(__dirname + '/resources/vueApp.html'))
});

app.listen(process.env.PORT || 8080)
