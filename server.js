const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/payu'));
app.get('*', function (req, res) {
  res.sendFile('./dist/payu/index.html'); });

port = process.env.PORT || 8080;

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);