const express = require('express');

const serverless = require('serverless-http')
const connectDB = require('./AtlasDB/Connection')
const app = express();
const bodyParser=require('body-parser');
var cors = require('cors');
let port = 3000

//import routes

const moviesRoute = require('./routes/routeMovies');

// middle ware
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type','Authorization'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(bodyParser.json())
// app.use('/movies', moviesRoute)
app.use('/.netlify/functions/app',moviesRoute)
connectDB();


app.listen(port,()=>console.log("server started on port "+ port));

module.exports.handler = serverless(app)