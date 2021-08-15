var express = require('express');
var request = require('request');
const path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var multer = require('multer');
const axios = require('axios').default;

app.use('/public', express.static(__dirname + '/public'));

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};

app.use(bodyParser.urlencoded({ extended: false }));


var corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

var BASE_URL = process.env.JAVA_API
app.use(express.urlencoded());
app.use(express.json());

app.use(cors(corsOptions));               

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

// Serve any static files built by React
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/saveOrg',  async (req, res, next) => {

  axios.post('http://localhost:4000/api/organization/create',req.body).then((result)=>{
     return res.json(result.data)
  }).catch((error)=>{
    console.log(error)
  })
})
