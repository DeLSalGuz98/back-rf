import { Router } from 'express'
import { validateQuotationPartialData } from '../../schemas/quotation.js'
import { QuotationModel } from '../../models/quotation-model.js'
import { QuotationController } from '../../controller/quotation-controller.js'
const router = Router()

// post: guardar datos iniciales de cotizacion `/quotation`
router.post('/',QuotationController.SaveQuotation)

// get: obtener lista de cotizaciones `/quotation/`
router.get('/',QuotationController.GetListQuotation)

// get: obtener lista de cotizaciones solo con estado **pendiente**. `/quotation/pending`
router.get('/pending',async function (req, res) {
  const data = await QuotationModel.GetListQuotations("pending")
  return res.status(200).json(data)
})

// get: obtener lista de cotizaciones solo con estado **enviado**. `/quotation/sent`
router.get('/sent',async function (req, res) {
  const data = await QuotationModel.GetListQuotations("sending")
  return res.status(200).json(data)
})

// get: obtener lista de cotizaciones solo con estado **ignorado**. `/quotation/ignored`
router.get('/ignored',async function (req, res) {
  const data = await QuotationModel.GetListQuotations("ignored")
  return res.status(200).json(data)
})

// get: obtener datos de una cotizacion por su numero de cotizacion. `/quotation/:nroQuotation`
router.get('/:nroQuotation', QuotationController.GetQuotationData)

// put: actualizar datos de la cotizacion `/quotation/:nroQuotation`
router.put('/:nroQuotation', QuotationController.UpdateQuotationData)

// patch: actualizar estado de la cotizacion `/quotation/:nroQuotation`
router.patch('/:nroQuotation', QuotationController.UpdateStateQuotation)

// delete: elminar la cotizacion`/quotation/:nroQuotation`
router.delete('/:nroQuotation', QuotationController.DeleteQuotation)

export default router