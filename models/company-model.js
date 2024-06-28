import { dbConnection } from "../database/conection.js"
export class Company{
  static async SaveCompany({data}){
    console.log(data)
  }
  static async GetRucAndNameCompany(){
    const data = await dbConnection('SELECT * FROM empresa')
    return data
  }
  static async GetCompanyData(ruc){
    const data = {
      "ruc": ruc,
      "nameCompany":"RED FIAL E.I.R.L.",
      "contact":"Rhodo Ajak Figueroa Gutierrez",
      "dni":"45074635",
      "phoneNumber":"239860137",
      "email":"redfial@hotmail.com",
      "address":"urb bancopata i-7",
      "cci":"00228500258654702250",
      "bank":"banco de credito"
    }
    return data
  }
  static async UpdateCompanyData({data}){
    console.log(data)
  }
  static async DeleteCompanyData(ruc){
    console.log(ruc)
  }
}