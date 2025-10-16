const express = require('express');
const jwksClient = require('jwks-rsa');
const cors = require('cors');
const { createVerifyTokenMiddleware, verifyPermission} = require('./middlewares')
const app = express();

const port = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost', // lub np. 'http://localhost:5173' jeśli używasz Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Konfiguracja JWKS
const client = jwksClient({
  jwksUri: 'https://dev-tah3h7wxplpcrg31.eu.auth0.com/.well-known/jwks.json'
});


const verifyToken = createVerifyTokenMiddleware(client)

app.get('/authorized', verifyToken, (req, res) => {
  res.json({status: 200, message: 'Secured Resource', data: req.user });
});

app.get('/posts', verifyToken, verifyPermission(['read:posts']), (req, res) => {
  posts = require('./mockDB.json').posts;
  res.json({status: 200, message: 'Posts', data: posts });
});


app.get('/public', (req, res) => {
  res.send('Public Resource – każdy może to zobaczyć');
});



app.listen(port);
console.log('Running on port ', port);