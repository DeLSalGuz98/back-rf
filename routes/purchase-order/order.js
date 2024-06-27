import { Router } from 'express'
import {validateOrderPartialData} from '../../schemas/order.js'
import { OrderModel } from '../../models/order-model.js'
import { PurchaseOrderController } from '../../controller/order-controller.js'

const router = Router()

// post: guardar datos iniciales de la orden de compra. `/purchase-order/`
router.post('/', PurchaseOrderController.SavePurchaseOrder)

// get: obtener lista de ordenes de compra **pendientes**  no mayor a 30 dias. `/purchase-order/pending`
router.get('/pending', PurchaseOrderController.GetListOrder)

// get: obtener lista de ordenes de compra **entregados** por mes. `/purchase-order/delivered`
router.get('/delivered', PurchaseOrderController.GetListOrder)

//get: obtener lista de ordenes de compra para seguimiento de pago. `/purchase-order/payment-tracking`
router.get('/payment-tracking', PurchaseOrderController.GetPaymentTrackingList)

//get: obtener datos de la orden de compra segun su **nro de orden**. `/purchase-order/:nroOrder`
router.get('/:nroOrder', PurchaseOrderController.GetPurchaseOrderData)
//put: actualizar los datos de la orden de compra. `/purchase-order/:nroOrder`
router.put('/:nroOrder', PurchaseOrderController.UpdatePurchaseOrder)
//patch: actualizar el estado de la orden de compra. `/purchase-order/state/:nroOrder`
router.patch('/state/:nroOrder', PurchaseOrderController.UpdateStateOrder)
//patch: actualizar el estaddo de pago. `/purchase-order/state-payment/:nroOrder`
router.patch('/state-payment/:nroOrder', PurchaseOrderController.UpdateStatePayment)
//delete: eliminar la orden de compra. `/purchase-order/:nroOrder`
router.delete('/:nroOrder', PurchaseOrderController.DeleteOrder)

export default router