const express = require("express");
const app = express();
const { port } = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
//parser
app.use(bodyParser.json());

//routes
app.use('/api',require('./routes/api'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

//server
app.listen(port, () => {
    console.log('serwer słucha... http://localhost:'+port);
})