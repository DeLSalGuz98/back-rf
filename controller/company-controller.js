import { Company } from "../models/company-model.js"
import { validateCompanyData, validateCompanyDataUpdate } from "../schemas/company.js"

export class CompanyController{
  static async SaveCompanyData(req, res){
    const validateData = validateCompanyData(req.body)
    if(validateData.error){
      return res.status(400).json({error: JSON.parse(validateData.error.message)})
    }
    await Company.SaveCompany(validateData)
    res.sendStatus(201)
  }
  static async GetRucAndNameCompany(req, res) {
    const data = await Company.GetRucAndNameCompany()
    res.status(200).json(data)
  }
  static async GetCompanyData(req, res) {
    const {rucCompany} = req.params
    const data = await Company.GetCompanyData(rucCompany)
    res.status(200).json(data)
  }
  static async UpdateCompanyData(req, res) {  
    const {rucCompany} = req.params
    const validateData = validateCompanyDataUpdate({ruc: rucCompany, ...req.body})
    if(validateData.error){
      return res.status(400).json({error: JSON.parse(validateData.error.message)})
    }
    await Company.UpdateCompanyData(validateData)
    res.sendStatus(200)
  }
  static async DeleteCompanyData(req, res) {
    const {rucCompany} = req.params
    await Company.DeleteCompanyData(rucCompany)  
    res.sendStatus(200)
  }
}