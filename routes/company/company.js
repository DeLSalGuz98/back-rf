const express = require('express')
const router = express.Router()

// post: crear nueva empresa ` /company/ `
router.post('/', function(req, res) {
  const {ruc, nameCompany, contact,
    dni, phoneNumber, mail, address, cci, bank
  } = req.body 
  console.log(req.body)
  res.status(201).json({"message": "crear nueva empresa"})
})
// get: obtener ruc y razon social ` /company/ `
router.get('/', function(req, res) {  
  res.status(200).json({"message": "ruc y razon social"})
})
// get: obtener datos de la empresa por su ruc ` /company/:rucCompany `
router.get('/:rucCompany', function(req, res) {
  const {rucCompany} = req.params
  console.log(rucCompany)
  res.status(200).json({"message": "obtener datos de la empresa por su ruc"})
})
// put: actualizar datos de la empresa ` /company/:rucCompany `
router.put('/:rucCompany', function(req, res) {  
  const {rucCompany} = req.params
  const {contact, dni, phoneNumber,
    mail, address, cci, bank} = req.body
  console.log(rucCompany)
  console.log(req.body)
  res.status(200).json({"message": "actualizar datos de la empresa"})
})
// delete: eliminar empresa ` /company/:rucCompany `
router.delete('/:rucCompany', function(req, res) {
  const {rucCompany} = req.params
  console.log(rucCompany)  
  res.status(200).json({"message": "eliminar empresa"})
})

module.exports = router