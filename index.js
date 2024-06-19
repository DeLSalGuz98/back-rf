const express = require('express')
//routes-module
const company = require('./routes/company/company')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

// midleware
app.use(function (req, res, next) {
  console.log('---')
  console.log(req.method)
  console.log(req.url)
  next()
})
app.use(express.json())

//routes
app.use('/company', company)

app.get('/', function (req, res) {
  res.status(200).send('iniciando RF API')
})

//route 404 not found
app.use(function (req, res) {
  res.sendStatus(404)
})

//starting server
app.listen(PORT, ()=>{
  console.log(`server listenig on port http://localhost:${PORT}`)
})
