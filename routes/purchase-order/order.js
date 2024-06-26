import { Router } from 'express'
import {validateOrderPartialData} from '../../schemas/order.js'
import { OrderModel } from '../../models/order-model.js'

const router = Router()

// post: guardar datos iniciales de la orden de compra. `/purchase-order/`
router.post('/', async function (req, res) {
  const validatedData = validateOrderPartialData(req.body)
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await OrderModel.SavePurchaseOrderData(validatedData)
  return res.sendStatus(201)
})

// get: obtener lista de ordenes de compra **pendientes**  no mayor a 30 dias. `/purchase-order/pending`
router.get('/pending', async function (req, res) {
  const data = await OrderModel.GetPurchaseOrderList("pending")
  return res.status(200).json(data)
})

// get: obtener lista de ordenes de compra **entregados** por mes. `/purchase-order/delivered`
router.get('/delivered',async function (req, res) {
  const data = await OrderModel.GetPurchaseOrderList("delivered")
  return res.status(200).json(data)
})
//get: obtener lista de ordenes de compra para seguimiento de pago. `/purchase-order/payment-tracking`
router.get('/payment-tracking',async function (req, res) {
  const data = await OrderModel.GetPaymentTracking()
  return res.status(200).json(data)
})
//get: obtener datos de la orden de compra segun su **nro de orden**. `/purchase-order/:nroOrder`
router.get('/:nroOrder',async function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  const data = await OrderModel.GetPurchaseOrderData(validatedData.data)
  return res.status(200).json(data)
})
//put: actualizar los datos de la orden de compra. `/purchase-order/:nroOrder`
router.put('/:nroOrder',async function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await OrderModel.UpdatePurchaseOrderData(validatedData)
  return res.sendStatus(200)
})
//patch: actualizar el estado de la orden de compra. `/purchase-order/state/:nroOrder`
router.patch('/state/:nroOrder',async function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await OrderModel.UpdateStateOrder(validatedData.data)
  return res.sendStatus(200)
})
//patch: actualizar el estaddo de pago. `/purchase-order/state-payment/:nroOrder`
router.patch('/state-payment/:nroOrder', async function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await OrderModel.UpdatePaymentStateOrder(validatedData)
  return res.sendStatus(200)
})
//delete: eliminar la orden de compra. `/purchase-order/:nroOrder`
router.delete('/:nroOrder',async function (req, res) {
  const {nroOrder} = req.params
  const validatedData = validateOrderPartialData({numberOrder: nroOrder})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await OrderModel.DeletePurchaseOrderData(validatedData.data)
  return res.sendStatus(200)
})

export default router