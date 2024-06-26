import { Router } from 'express'
import { validateQuotationPartialData } from '../../schemas/quotation.js'
import { QuotationModel } from '../../models/quotation-model.js'
const router = Router()

// post: guardar datos iniciales de cotizacion `/quotation`
router.post('/', async function (req, res) {
  const validatedData = validateQuotationPartialData(req.body)
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await QuotationModel.SaveQuotationData(validatedData)
  return res.sendStatus(201)
})

// get: obtener lista de cotizaciones `/quotation/`
router.get('/',async function (req, res) {
  const data = await QuotationModel.GetListQuotations()
  return res.status(200).json(data)
})
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
router.get('/:nroQuotation', async function (req, res) {
  const {nroQuotation} = req.params
  const validateData = validateQuotationPartialData({numberQuotation: nroQuotation})
  if(validateData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  const data = await QuotationModel.GetQuotationData(validateData.data)
  return res.status(200).json(data)
})

// put: actualizar datos de la cotizacion `/quotation/:nroQuotation`
router.put('/:nroQuotation', async function (req, res) {
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await QuotationModel.UpdateQuotaionData(validatedData)
  return res.sendStatus(200)
})

// patch: actualizar estado de la cotizacion `/quotation/:nroQuotation`
router.patch('/:nroQuotation', async function (req, res) {
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  await QuotationModel.UpdateStateQuotation(validatedData)
  return res.sendStatus(200)
})

// delete: elminar la cotizacion`/quotation/:nroQuotation`
router.delete('/:nroQuotation', async function (req, res) {
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation})
  await QuotationModel.DeleteQuotation(validatedData.data)
  return res.sendStatus(200)
})

export default router