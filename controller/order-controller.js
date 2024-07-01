import { OrderModel } from "../models/order-model.js"
import {validateOrderPartialData} from '../schemas/order.js'
import { deadlineCalculator } from "../utils/deadline-calculator.js"
import format from "date-format"

export class PurchaseOrderController{
  static async SavePurchaseOrder(req, res) {
    const {dateNotification, deliveryTime} = req.body
    const deadLine = deadlineCalculator(dateNotification, deliveryTime)
    const validatedData = validateOrderPartialData({
      deadLine: deadLine,
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
    const {dateNotification} = req.body
    const mont = format("yyyy-MM", new Date(dateNotification))
    let data
    if(req.url === "/pending"){
      data = await OrderModel.GetPurchaseOrderList()
    }else if(req.url === "/delivered"){
      data = await OrderModel.GetPurchaseOrderListDelivered(mont)
    }
    return res.status(200).json(data)
  }
  static async GetListOrderDelivered(req, res){
    const {dateNotification} = req.body
    const validatedData = validateOrderPartialData({dateNotification: dateNotification})
    const mont = format("yyyy-MM", new Date(validatedData.data.dateNotification))
    const   data = await OrderModel.GetPurchaseOrderListDelivered(mont)
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
    const {dateNotification, deliveryTime} = req.body
    const deadLine = deadlineCalculator(dateNotification, deliveryTime)
    const validatedData = validateOrderPartialData({
      numberOrder: nroOrder,
      deadLine: deadLine, 
      ...req.body})
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
    await OrderModel.UpdateStateOrder(validatedData)
    return res.sendStatus(200)
  }
  static async UpdateStatePayment(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder, ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    const data = await OrderModel.UpdatePaymentStateOrder(validatedData)
    if(data !== 'ok'){
      return res.sendStatus(500)
    }
    return res.sendStatus(200)
  }
  static async DeleteOrder(req, res) {
    const {nroOrder} = req.params
    const validatedData = validateOrderPartialData({numberOrder: nroOrder})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    const data = await OrderModel.DeletePurchaseOrderData(validatedData.data)
    console.log(data)
    if(data !== 'ok'){
      if(data === 0){
        return res.sendStatus(404)
      }
      return res.sendStatus(500)
    }
    return res.sendStatus(200)
  }
}