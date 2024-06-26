import express, { json } from 'express'
import cors from 'cors'
//routes-module
import company from './routes/company/company.js'
import quotation from './routes/quotation/quotation.js'
import puchaseOrder from './routes/purchase-order/order.js'

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
app.use(json())
app.use(cors())

//routes
app.use('/company', company)
app.use('/quotation', quotation)
app.use('/purchase-order', puchaseOrder)

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
