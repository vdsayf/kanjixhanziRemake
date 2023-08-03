const express = require('express');
const cors = require('cors');
const controller = require('./controller.js')

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

app.get('/api/all/', controller.retrieveAll)

app.get('/api/', controller.search)

app.post('/api/', controller.postPair)

app.listen(3002, () => {
  console.log('Server listening on port 3002...');
});