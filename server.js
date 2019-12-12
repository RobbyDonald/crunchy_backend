const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 2000;
const cors = require('cors');
const errorHandler = require('./error-handler');
const crunchy_feedback = require('./feedback/crunchy_feedback');
const la_feedback = require('./feedback/la_feedback');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use('/feedback/crunchy_cake', crunchy_feedback);
app.use('/feedback/la_locca', la_feedback);

app.use(errorHandler);
server.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});
