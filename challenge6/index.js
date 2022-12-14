const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();



const CronJob = require('cron').CronJob;
const job = new CronJob(
	' * * * * *',
	function() {
		console.log('You will see this message every mn');
	},
	null,
	true,
	''
);


app.unsubscribe(morgan("tiny"));
app.use(cors);
app.use(express.json());
app.use(bodyParser.json());



app.listen(4000, function (error) {
  if (error) throw error;
  console.log("server created successfully !");
});
