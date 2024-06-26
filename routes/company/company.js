import { Router } from 'express'
import { CompanyController } from '../../controller/company-controller.js'
const router = Router()

// post: crear nueva empresa ` /company/ `
router.post('/', CompanyController.SaveCompanyData)

// get: obtener ruc y razon social ` /company/ `
router.get('/', CompanyController.GetRucAndNameCompany)

// get: obtener datos de la empresa por su ruc ` /company/:rucCompany `
router.get('/:rucCompany', CompanyController.GetCompanyData)

// put: actualizar datos de la empresa ` /company/:rucCompany `
router.put('/:rucCompany', CompanyController.UpdateCompanyData)

// delete: eliminar empresa ` /company/:rucCompany `
router.delete('/:rucCompany',CompanyController.DeleteCompanyData)

export default router