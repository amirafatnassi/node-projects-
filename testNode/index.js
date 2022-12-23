const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();
const port = 4000;

require('./db/connect');
require('./passport-strategies/bearer')

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use('/client', require('./routes/client'));
app.use('/produit', require('./routes/produit'));
app.use('/commande', require('./routes/commande'));

app.listen(port, function () { 
  console.log("test app working on port:", port);
});
