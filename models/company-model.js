import { dbConnection } from "../database/conection.js"
export class Company{
  static async SaveCompany({data}){
    await dbConnection(`INSERT INTO empresa (
      ruc_empresa,  razon_social,
      nombre_contacto,  dni,  telefono,
      correo,  direccion,
      cci,  entidad_bancaria
      )VALUES(
        ?,  ?, ?,  ?,  ?, ?,  ?, ?,  ?
      );`, [data.ruc,  data.nameCompany.toLowerCase(), data.contact.toLowerCase(),  data.dni,  data.phoneNumber, data.email,  data.address.toLowerCase(), data.cci, data.bank.toLowerCase()])
  }
  static async GetRucAndNameCompany(){
    const data = await dbConnection(`
      SELECT 
      ruc_empresa AS ruc, 
      razon_social AS empresa 
      FROM empresa;
      `)
    return data
  }
  static async GetCompanyData(ruc){
    const data = await dbConnection(`
      SELECT 
      ruc_empresa as ruc,
      razon_social as empresa,
      nombre_contacto as contacto,
      dni,
      telefono,
      correo,
      direccion,
      cci,
      entidad_bancaria as banco
      FROM empresa WHERE ruc_empresa = ?;
      `, [ruc])
    return data
  }
  static async UpdateCompanyData({data}){
    await dbConnection(`
      UPDATE empresa SET nombre_contacto = ?,  dni = ?,  telefono = ?,
      correo = ?,  direccion = ?,
      cci = ?,  entidad_bancaria = ?
      WHERE ruc_empresa = ?;
      `, [data.contact.toLowerCase(), data.dni, data.phoneNumber, data.email, data.address.toLowerCase(), data.cci, data.bank.toLowerCase(), data.ruc])
  }
  static async DeleteCompanyData(ruc){
    await dbConnection(`DELETE FROM empresa WHERE ruc_empresa = ?;`, [ruc])
  }
}