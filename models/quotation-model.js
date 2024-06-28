import {dbConnection} from '../database/conection.js'
import format from "date-format"

export class QuotationModel{
  static async SaveQuotationData({data}){
    await dbConnection(`
      INSERT INTO cotizacion(
      numero_cotizacion,
      resumen_cotizacion,
      cliente,
      ruc_cliente,
      fecha_notificacion_cotizacion,
      vendedores_notificados,
      estado_cotizacion,
      link_tdr,
      link_doc_cotizacion,
      link_cotiz_excel) VALUES(
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ? );`,[data.numberQuotation, data.description, data.client, data.rucClient, data.dateNotification, data.sellers, data.stateQuotation, data.linkTdr, data.linkRequest, data.linkExcel])
  }
  static async GetListQuotations(filter = ""){
    let data
    if(filter === "pending"){
      data = await dbConnection(`
        SELECT 
        numero_cotizacion AS numberQuotation, 
        fecha_notificacion_cotizacion AS dateNotification,
        resumen_cotizacion AS description,
        cliente AS client,
        vendedores_notificados AS sellers,
        estado_cotizacion AS stateQuotation
        FROM cotizacion
        WHERE estado_cotizacion = "pendiente";
        `)
    }else if(filter === "sending"){
      data = await dbConnection(`
        SELECT 
        numero_cotizacion AS numberQuotation, 
        fecha_notificacion_cotizacion AS dateNotification,
        resumen_cotizacion AS description,
        cliente AS client,
        vendedores_notificados AS sellers,
        estado_cotizacion AS stateQuotation
        FROM cotizacion
        WHERE estado_cotizacion = "enviado";
        `)
    }else if(filter === "ignored"){
      data = await dbConnection(`
        SELECT 
        numero_cotizacion AS numberQuotation, 
        fecha_notificacion_cotizacion AS dateNotification,
        resumen_cotizacion AS description,
        cliente AS client,
        vendedores_notificados AS sellers,
        estado_cotizacion AS stateQuotation
        FROM cotizacion
        WHERE estado_cotizacion = "ignorado";
        `)
    }else{
      data = await dbConnection(`
        SELECT 
        numero_cotizacion AS numberQuotation, 
        fecha_notificacion_cotizacion AS dateNotification,
        resumen_cotizacion AS description,
        cliente AS client,
        vendedores_notificados AS sellers,
        estado_cotizacion AS stateQuotation
        FROM cotizacion
        WHERE fecha_notificacion_cotizacion >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
        `)
    }
    return data
  }
  static async GetQuotationData({numberQuotation}){
    const [row] =  await dbConnection(`
      SELECT 
      numero_cotizacion AS numberQuotation,
      resumen_cotizacion AS description,
      fecha_notificacion_cotizacion AS dateNotification,
      fecha_envio_cotizacion AS dateSent,
      estado_cotizacion AS stateQuotation,
      total_monto_venta AS purchasePrice,
      total_monto_compra AS salePrice,
      link_tdr AS linkTdr,
      link_doc_cotizacion AS linkRequest,
      link_cotiz_excel AS linkExcel,
      observacion AS observation,
      empresa.razon_social AS responsibleCompany
      FROM cotizacion 
      LEFT JOIN empresa ON empresa.ruc_empresa = cotizacion.ruc_empresa_responsable WHERE numero_cotizacion = ?;
      `,[numberQuotation])
    return row
  }
  static async UpdateQuotaionData({data}){
    await dbConnection(`
        UPDATE cotizacion SET resumen_cotizacion = ?, cliente = ?, ruc_cliente = ?, fecha_notificacion_cotizacion = ?, fecha_envio_cotizacion = ?, total_monto_compra = ?, total_monto_venta = ?,vendedores_notificados = ?, link_tdr = ?, link_doc_cotizacion = ?, link_cotiz_excel = ?, observacion = ?, ruc_empresa_responsable = ? WHERE numero_cotizacion = ?;
        `, [data.description.toLowerCase(), data.client.toLowerCase(), data.rucClient, data.dateNotification, data.dateSent, data.purchasePrice, data.salePrice, data.sellers.toLowerCase(), data.linkTdr, data.linkRequest, data.linkExcel, data.observation.toLowerCase(), data.rucResponsibleCompany, data.numberQuotation])
  }
  static async UpdateStateQuotation({data}){
    const currentDate = format("yyyy-MM-dd", new Date())
    if(data.stateQuotation === "enviado"){
      await dbConnection(`
        UPDATE cotizacion SET estado_cotizacion =  ?, fecha_envio_cotizacion = ?
        WHERE numero_cotizacion = ?
        `, [data.stateQuotation, currentDate, data.numberQuotation])
    }else{
      await dbConnection(`
        UPDATE cotizacion SET estado_cotizacion = ?, fecha_envio_cotizacion = null 
        WHERE numero_cotizacion = ?
        `, [data.stateQuotation, data.numberQuotation])
    }
  }
  static async DeleteQuotation({numberQuotation}){
    await dbConnection('DELETE FROM cotizacion WHERE numero_cotizacion = ?;', [numberQuotation])
  }
}