import { Router } from 'express'
import { validateCompanyData, validateCompanyDataUpdate } from '../../schemas/company.js'
import { Company } from '../../models/company-model.js'
const router = Router()

// post: crear nueva empresa ` /company/ `
router.post('/', async function(req, res) {
  const validateData = validateCompanyData(req.body)
  if(validateData.error){
    return res.status(400).json({error: JSON.parse(validateData.error.message)})
  }
  await Company.SaveCompany(validateData)
  res.sendStatus(201)
})

// get: obtener ruc y razon social ` /company/ `
router.get('/', async function(req, res) {
  const data = await Company.GetRucAndNameCompany()
  res.status(200).json(data)
})

// get: obtener datos de la empresa por su ruc ` /company/:rucCompany `
router.get('/:rucCompany', async function(req, res) {
  const {rucCompany} = req.params
  const data = await Company.GetCompanyData(rucCompany)
  res.status(200).json(data)
})

// put: actualizar datos de la empresa ` /company/:rucCompany `
router.put('/:rucCompany', async function(req, res) {  
  const {rucCompany} = req.params
  const validateData = validateCompanyDataUpdate({ruc: rucCompany, ...req.body})
  if(validateData.error){
    return res.status(400).json({error: JSON.parse(validateData.error.message)})
  }
  await Company.UpdateCompanyData(validateData)
  res.sendStatus(200)
})

// delete: eliminar empresa ` /company/:rucCompany `
router.delete('/:rucCompany',async function(req, res) {
  const {rucCompany} = req.params
  await Company.DeleteCompanyData(rucCompany)  
  res.sendStatus(200)
})

export default router