import { Router } from 'express'
import { validateQuotationPartialData } from '../../schemas/quotation.js'
const router = Router()

// post: guardar datos iniciales de cotizacion `/quotation`
router.post('/', function (req, res) {
  const validatedData = validateQuotationPartialData(req.body)
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(201)
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
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})

// patch: actualizar estado de la cotizacion `/quotation/:nroQuotation`
router.patch('/:nroQuotation', function (req, res) {
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
  if(validatedData.error){
    return res.status(400).json({error: JSON.parse(validatedData.error.message)})
  }
  console.log(validatedData.data)
  return res.sendStatus(200)
})

// delete: elminar la cotizacion`/quotation/:nroQuotation`
router.delete('/:nroQuotation', function (req, res) {
  const {nroQuotation} = req.params
  const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation})
  return res.sendStatus(200)
})

export default router