const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const request = require('request');

const upload = multer();

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  console.log('[GET] root');
  res.send({ 'msg': 'Welcome to CORS proxy-server 😁' })
});

app.post('/proxy', upload.array(), (req, res, next) => {
  console.log('[POST] /proxy');
  const { endpoint, query } = req.body;
  // const endpoint = 'https://graphql-pokemon2.vercel.app';
  // const query = `{
  //   pokemons(first: 1) {
  //     id
  //     name
  //   }
  //   pokemon(id: "UG9rZW1vbjowMDE=") {
  //     name
  //   }
  // }`;

  request.post(endpoint,
    {
      body: JSON.stringify({query}),
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(res);
});

app.listen(port, () =>
  console.log(`Proxy listening on port ${port}!`)
);
