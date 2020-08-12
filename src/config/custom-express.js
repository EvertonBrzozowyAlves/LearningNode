require('marko/node-require')
require('marko/express')

const express = require('express') //express returns a function
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use('/static', express.static('src/app/public')) //to map static files in requests

app.use(bodyParser.urlencoded({
  extended: true    //telling body parser that it`s able to receive complex objects in JSON format 
}))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

const rotas = require('../app/routes/routes')
rotas(app)

module.exports = app