const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
var morgan = require('morgan')
const port = 4000

require("./database/connect");

const app = express();
app.use(cors())
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/todos"));

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(port, function () {
  console.log("App serving On" ,port);
});
