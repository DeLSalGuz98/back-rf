import { OrderModel } from "../models/order-model.js"
import {validateOrderPartialData} from '../schemas/order.js'
import format from 'date-format'

export class PurchaseOrderController{
  static async SavePurchaseOrder(req, res) {
    const {dateNotificacion, deliveryTime} = req.body
    const notificaion = new Date(dateNotificacion)
    const deadLine = new Date((notificaion.valueOf() + ((deliveryTime + 1) * 1000 * 60 * 60 * 24)))
    const validatedData = validateOrderPartialData({
      deadLine: format("yyyy-MM-dd", deadLine),
      stateOrder:"pendiente",
      statePaymentOrder:"pendiente",
      ...req.body
    })
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await OrderModel.SavePurchaseOrderData(validatedData)
    return res.sendStatus(201)
  }
  static async GetListOrder(req, res) {
    let data
    if(req.url === "/pending"){
      data = await OrderModel.GetPurchaseOrderList("pending")
    }else if(req.url === "/delivered"){
      data = await OrderModel.GetPurchaseOrderList("delivered")
    }
    return res.status(200).json(data)
  }
  static async GetPaymentTrackingList(req, res) {
    const data = await OrderModel.GetPaymentTracking()
    return res.status(200).json(data)
  }
  static async GetPurchaseOrderData(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    const data = await OrderModel.GetPurchaseOrderData(validatedData.data)
    return res.status(200).json(data)
  }
  static async UpdatePurchaseOrder (req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await OrderModel.UpdatePurchaseOrderData(validatedData)
    return res.sendStatus(200)
  }
  static async UpdateStateOrder(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await OrderModel.UpdateStateOrder(validatedData.data)
    return res.sendStatus(200)
  }
  static async UpdateStatePayment(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await OrderModel.UpdatePaymentStateOrder(validatedData)
    return res.sendStatus(200)
  }
  static async DeleteOrder(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await OrderModel.DeletePurchaseOrderData(validatedData.data)
    return res.sendStatus(200)
  }
}