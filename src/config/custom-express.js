require('marko/node-require')
require('marko/express')

const express = require('express') //express returns a function
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true    //telling body parser that it`s able to receive complex objects in JSON format 
}))

const rotas = require('../app/routes/routes')
rotas(app)

module.exports = app