const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route/route');
app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('Garnity API');
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})