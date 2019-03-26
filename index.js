const express = require('express');
var path = require('path');
var app = express();

//app.use(express.static('resources'))

/* - Main / INDEX PAGE - */
app.get('/', (req, res) => {
    res.sendfile('./app.html')
});

app.listen(process.env.PORT || 8080)

