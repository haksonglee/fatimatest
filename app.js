const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev', {}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/test', require('./router/test'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Example skill server listening on port 3000!');
});
