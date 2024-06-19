const express = require('express')
const router = express.Router()

// post: guardar datos iniciales de cotizacion `/quotation`
router.post('/', function (req, res) {
  return res.status(200).json({"message": "guardar datos iniciales de cotizacion"})
})

// get: obtener lista de cotizaciones `/quotation/`
router.get('/', function (req, res) {
  return res.status(200).json({"message": "obtener lista de cotizaciones"})
})
// get: obtener lista de cotizaciones solo con estado **pendiente**. `/quotation/pending`
router.get('/pending', function (req, res) {
  return res.status(200).json({"message": "pendiente"})
})

// get: obtener lista de cotizaciones solo con estado **enviado**. `/quotation/sent`
router.get('/sent', function (req, res) {
  return res.status(200).json({"message": "enviado"})
})

// get: obtener lista de cotizaciones solo con estado **ignorado**. `/quotation/ignored`
router.get('/ignored', function (req, res) {
  return res.status(200).json({"message": "ignorado"})
})

// get: obtener datos de una cotizacion por su numero de cotizacion. `/quotation/:nroQuotation`
router.get('/:nroQuotation', function (req, res) {
  return res.status(200).json({"message": "obtener datos de una cotizacion por su numero de cotizacion"})
})

// put: actualizar datos de la cotizacion `/quotation/:nroQuotation`
router.put('/:nroQuotation', function (req, res) {
  return res.status(200).json({"message": "actualizar datos de la cotizacion"})
})

// patch: actualizar estado de la cotizacion `/quotation/:nroQuotation`
router.patch('/:nroQuotation', function (req, res) {
  return res.status(200).json({"message": "actualizar estado de la cotizacion"})
})

// delete: elminar la cotizacion`/quotation/:nroQuotation`
router.delete('/:nroQuotation', function (req, res) {
  return res.status(200).json({"message": "elminar la cotizacion"})
})

module.exports = router