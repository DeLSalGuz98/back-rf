const express = require('express')

const router = express.Router()

// post: guardar datos iniciales de la orden de compra. `/purchase-order/`
router.post('/', function (req, res) {
  return res.sendStatus(201)
})

// get: obtener lista de ordenes de compra **pendientes**  no mayor a 30 dias. `/purchase-order/pending`
router.get('/pending', function (req, res) {
  return res.status(200).json({"message":"obtener lista de ordenes de compra **pendientes**  no mayor a 30 dias."})
})

// get: obtener lista de ordenes de compra **entregados** por mes. `/purchase-order/delivered`
router.get('/delivered', function (req, res) {
  return res.status(200).json({"message":"obtener lista de ordenes de compra **entregados** por mes."})
})
// get: obtener datos de la orden de compra segun su **nro de orden**. `/purchase-order/:nroOrder`
router.get('/:nroOrder', function (req, res) {
  return res.status(200).json({"message":"obtener datos de la orden de compra segun su **nro de orden**."})
})
// get: obtener lista de ordenes de compra para seguimiento de pago. `/purchase-order/payment-tracking`
router.get('/payment-tracking', function (req, res) {
  return res.status(200).json({"message":"obtener lista de ordenes de compra para seguimiento de pago."})
})
// put: actualizar los datos de la orden de compra. `/purchase-order/:nroOrder`
router.put('/:nroOrder', function (req, res) {
  
  return res.sendStatus(200)
})
// patch: actualizar el estado de la orden de compra. `/purchase-order/state/:nroOrder`
router.patch('/state/:nroOrder', function (req, res) {
  
  return res.sendStatus(200)
})
// patch: actualizar el estaddo de pago. `/purchase-order/state-payment/:nroOrder`
router.patch('/state-payment/:nroOrder', function (req, res) {
  
  return res.sendStatus(200)
})
// delete: eliminar la orden de compra. `/purchase-order/:nroOrder`
router.delete('/:nroOrder', function (req, res) {
  
  return res.sendStatus(200)
})

module.exports = router