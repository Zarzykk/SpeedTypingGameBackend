const express = require("express");
const app = express();
const { port } = require('./config');
const bodyParser = require('body-parser');

//parser
app.use(bodyParser.json());

//routes
app.use(require('./routes/api'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//server
app.listen(port, () => {
    console.log('serwer słucha... http://localhost:'+port);
})