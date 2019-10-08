require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const path = require('path');
const port = 5000;
app.use(express.static('./dist/projectory'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//connect to db
// const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';


// const connectionString = process.env.DATABASE_URL;
// const client = new Client({
//   connectionString: connectionString
// });
// client.connect();

// app.use('/', express.static(path.join(__dirname, '/../client/public/')));
app.use(express.static('/../client/public/'));
app.get('/', function(req, res) {
  // res.send('hello world');
  res.json({ success: true });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
