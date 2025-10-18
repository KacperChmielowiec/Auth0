const express = require('express');
const jwksClient = require('jwks-rsa');
const cors = require('cors');
const path = require('path')
const { createVerifyTokenMiddleware, verifyPermission} = require('./middlewares')


const app = express();

const port = process.env.PORT || 8080;


app.use(cors({
  origin: 'http://localhost', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Konfiguracja JWKS
const client = jwksClient({
  jwksUri: 'https://dev-tah3h7wxplpcrg31.eu.auth0.com/.well-known/jwks.json'
});


const verifyToken = createVerifyTokenMiddleware(client)

//token only 
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({status: 200, message: 'Secured Resource', data: req.user });
});

// token + role permissions
app.get('/api/posts', verifyToken, verifyPermission(['read:posts']), (req, res) => {
  // mocked data
  try{
    const posts = require('./mockDB.json').posts;
    res.json({status: 200, message: 'Posts', data: posts });
  }
  catch(e)
  {
    res.json({error: true, status: 500, message: e });
  }

});


// token + role permissions
app.get('/api/docs', verifyToken, verifyPermission(['read:docs']), (req, res) => {

  // mocked data
  try{
    const docs = require('./mockDB.json').docs;
    res.json({status: 200, message: 'Docs', data: docs });
  }
  catch(e)
  {
    res.json({error: true, status: 500, message: e });
  }

});



app.use('/photos', express.static(path.join(process.cwd(), 'photos')));

// free access 
app.get('/api/photos', (req, res) => {
  // mocked data
  try{
    const photos = require("./photos/data.json")
    res.json({status: 200, message: 'Photos', data: photos });
  }
  catch(e)
  {
    res.json({error: true, status: 500, message: e, });
  }

});

// only token access
app.get('/api/news', verifyToken, async (req, res) => {
  const allNews = require("./mockDB.json").news;


  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 3;


  const totalItems = allNews.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;


  const paginatedNews = allNews.slice(start, end);
  await new Promise(r => setTimeout(r, 2000));
  

  if (page > totalPages) {
    return res.json({
      status: 200,
      message: "No more news",
      data: {news: [], totalPages}
    });
  }

  
  res.json({
    status: 200,
    message: "News list",
    data: {news: paginatedNews, totalPages }
  });
});



app.listen(port);
console.log('Running on port ', port);