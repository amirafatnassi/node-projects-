const express = require("express");
const cors=require('morgan');
const morgan=require('morgan')
const bodyParser=require('body-parser');

const app = express();

require('./database/connect');

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({
    limit: 1024*1024*10
}));



const api=require('./Routes/api');
app.use('/upload',api);

app.listen(4000, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});
