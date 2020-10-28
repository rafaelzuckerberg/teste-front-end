
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routeProducts = require('./routes/products');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header(
        'Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, application/json'
        );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PATCH, GET, POST, OPTIONS, DELETE, PUT');
        return res.status(200).send({});
    }
    next();
});


app.use('/products', routeProducts);


module.exports = app;