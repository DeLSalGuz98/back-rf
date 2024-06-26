import { Router } from 'express'
import {validateOrderPartialData} from '../../schemas/order.js'

const router = Router()

// post: guardar datos iniciales de la orden de compra. `/purchase-order/`
router.post('/', function (req, res) {
  const validatedData = validateOrderPartialData(req.body)
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
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
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})
// patch: actualizar el estado de la orden de compra. `/purchase-order/state/:nroOrder`
router.patch('/state/:nroOrder', function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})
// patch: actualizar el estaddo de pago. `/purchase-order/state-payment/:nroOrder`
router.patch('/state-payment/:nroOrder', function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})
// delete: eliminar la orden de compra. `/purchase-order/:nroOrder`
router.delete('/:nroOrder', function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})

export default router