const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/payu'));
app.get('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: `${__dirname}/dist/payu`});
});

port = process.env.PORT || 3000;

app.listen(port);
console.log('todo list RESTful API server started on: ' + port);