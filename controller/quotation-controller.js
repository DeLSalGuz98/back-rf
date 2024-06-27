import { validateQuotationPartialData } from '../schemas/quotation.js'
import { QuotationModel } from '../models/quotation-model.js'
export class QuotationController{
  static async SaveQuotation(req, res){
    const validatedData = validateQuotationPartialData(req.body)
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await QuotationModel.SaveQuotationData(validatedData)
    return res.sendStatus(201)
  }
  static async GetListQuotation(req, res) {
    const data = await QuotationModel.GetListQuotations()
    return res.status(200).json(data)
  }
  static async GetQuotationData(req, res) {
    const {nroQuotation} = req.params
    const validateData = validateQuotationPartialData({numberQuotation: nroQuotation})
    if(validateData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    const data = await QuotationModel.GetQuotationData(validateData.data)
    return res.status(200).json(data)
  }
  static async UpdateQuotationData(req, res) {
    const {nroQuotation} = req.params
    const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await QuotationModel.UpdateQuotaionData(validatedData)
    return res.sendStatus(200)
  }
  static async UpdateStateQuotation(req, res) {
    const {nroQuotation} = req.params
    const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation,  ...req.body})
    if(validatedData.error){
      return res.status(400).json({error: JSON.parse(validatedData.error.message)})
    }
    await QuotationModel.UpdateStateQuotation(validatedData)
    return res.sendStatus(200)
  }
  static async DeleteQuotation(req, res) {
    const {nroQuotation} = req.params
    const validatedData = validateQuotationPartialData({numberQuotation: nroQuotation})
    await QuotationModel.DeleteQuotation(validatedData.data)
    return res.sendStatus(200)
  }
}