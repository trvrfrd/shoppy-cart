var express = require('express');
var app = express();

app.use(express.static('dist/'));
app.use(express.static('index.html');

app.listen(3000);
