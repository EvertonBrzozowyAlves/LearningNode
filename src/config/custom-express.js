require('marko/node-require')
require('marko/express')

const express = require('express') //express returns a function
const app = express()

const rotas = require('../app/routes/routes')
rotas(app)

module.exports = app