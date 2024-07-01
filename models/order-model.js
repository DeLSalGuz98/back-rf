import {dbConnection} from '../database/conection.js'

export class OrderModel{
  static async SavePurchaseOrderData({data}){
    const res = await dbConnection(`
      INSERT INTO orden_compra(
        numero_oc, numero_cotizacion,
        fecha_notificacion_oc, plazo_entrega, fecha_limite_oc,
        expediente_siaf, unidad_ejecutora,
        lugar_entrega, estado_oc, estado_pago_oc
      ) VALUES(
        ?, ?,
        ?, ?, ?,
        ?, ?,
        ?, ?, ?
      );`, [data.numberOrder, data.numberQuotation, data.dateNotification, data.deliveryTime, data.deadLine, data.expSiaf, data.executingUnit, data.deliveryPlace.toLowerCase(), data.stateOrder.toLowerCase(), data.statePaymentOrder.toLowerCase()])
      console.log(res)
  }
  static async GetPurchaseOrderList(){
    const data =  await dbConnection(`
        SELECT 
        orden_compra.numero_oc AS numberOrder, 
        orden_compra.numero_cotizacion AS numberQuotation,
        cotizacion.resumen_cotizacion AS description,
        empresa.razon_social AS responibleCompany,
        orden_compra.fecha_notificacion_oc AS dateNotification, 
        orden_compra.plazo_entrega AS deliveryTime,
        orden_compra.fecha_limite_oc AS deadLine,
        orden_compra.estado_oc AS stateOrder
        FROM orden_compra 
        LEFT JOIN cotizacion ON cotizacion.numero_cotizacion = orden_compra.numero_cotizacion
        LEFT JOIN empresa ON empresa.ruc_empresa = cotizacion.ruc_empresa_responsable
        WHERE orden_compra.estado_oc = "pendiente";
        `)
    return data
  }
  static async GetPurchaseOrderListDelivered(date){
    const data = await dbConnection(`
      SELECT 
      orden_compra.numero_oc AS numberOrder, orden_compra.numero_cotizacion AS numberQuotation,
      cotizacion.resumen_cotizacion AS description,
      empresa.razon_social AS responsibleCompany,
      orden_compra.fecha_notificacion_oc AS dateNotification, 
      orden_compra.plazo_entrega AS deliveryTime,
      orden_compra.fecha_limite_oc AS deadLine,
      orden_compra.estado_oc AS stateOrder
      FROM orden_compra 
      LEFT JOIN cotizacion ON cotizacion.numero_cotizacion = orden_compra.numero_cotizacion
      LEFT JOIN empresa ON empresa.ruc_empresa = cotizacion.ruc_empresa_responsable
      WHERE orden_compra.estado_oc = 'entregado'
      AND DATE_FORMAT(orden_compra.fecha_notificacion_oc, '%Y-%m') = ?;
        `, [date])
      return data
  }
  static async GetPurchaseOrderData({numberOrder}){
    const data = await dbConnection(`
      SELECT
      orden_compra.numero_oc AS numberOrder,
      orden_compra.fecha_notificacion_oc AS dateNotification,
      orden_compra.plazo_entrega AS deliveryTime,
      orden_compra.fecha_limite_oc AS deadLine,
      orden_compra.lugar_entrega AS deliveryPlace,
      orden_compra.estado_oc AS stateOrder,
      orden_compra.cod_factura_relacionada AS codInvoice,
      orden_compra.cod_guia_remision AS codReferralguide,
      cotizacion.numero_cotizacion AS numberQuotation,
      cotizacion.cliente AS client,
      cotizacion.ruc_cliente as rucClient,
      cotizacion.total_monto_compra AS purchasePrice,
      cotizacion.total_monto_venta AS salePrice,
      cotizacion.link_tdr AS linkTdr,
      cotizacion.link_cotiz_excel AS linkExcel,
      empresa.razon_social AS responsibleCompany
      FROM orden_compra
      LEFT JOIN cotizacion ON cotizacion.numero_cotizacion = orden_compra.numero_cotizacion
      LEFT JOIN empresa ON empresa.ruc_empresa = cotizacion.ruc_empresa_responsable
      WHERE orden_compra.numero_oc = ?;
      `, [numberOrder])
    return data
  }
  static async GetPaymentTracking(){
    const data = await dbConnection(`
      SELECT
      orden_compra.numero_oc AS numberOrder,
      empresa.razon_social AS responsibleCompany,
      cotizacion.resumen_cotizacion AS description,
      cotizacion.cliente AS client,
      orden_compra.unidad_ejecutora AS executingUnit,
      orden_compra.expediente_siaf AS expSiaf,
      cotizacion.total_monto_venta AS purchasePrice,
      orden_compra.estado_pago_oc AS statePaymentOrder
      FROM orden_compra
      LEFT JOIN cotizacion ON cotizacion.numero_cotizacion = orden_compra.numero_cotizacion
      LEFT JOIN empresa ON empresa.ruc_empresa = cotizacion.ruc_empresa_responsable;`)
    return data
  }
  static async UpdatePurchaseOrderData({data}){
    await dbConnection(`
      UPDATE orden_compra SET
      fecha_notificacion_oc = ?,
      plazo_entrega = ?,
      fecha_limite_oc = ?,
      expediente_siaf = ?,
      unidad_ejecutora = ?,
      lugar_entrega = ?,
      cod_factura_relacionada = ?,
      cod_guia_remision = ?
      WHERE numero_oc = ?;
      `,[data.dateNotification, data.deliveryTime, data.deadLine, data.expSiaf, data.executingUnit, data.deliveryPlace, data.codInvoice, data.codReferralguide, data.numberOrder])
  }
  static async UpdateStateOrder({data}){
    await dbConnection(`
      UPDATE orden_compra SET
      estado_oc = ? WHERE numero_oc = ?
      `,[data.stateOrder, data.numberOrder])
  }
  static async UpdatePaymentStateOrder({data}){
    const res = await dbConnection(`
      UPDATE orden_compra SET
      estado_pago_oc = ? WHERE numero_oc = ?;
      `,[data.statePaymentOrder, data.numberOrder])
    if(res.message === "error_db"){
      return res.message
    }
    return "ok"
  }
  static async DeletePurchaseOrderData({numberOrder}){
    const res = await dbConnection(`
      DELETE FROM orden_compra WHERE numero_oc = ?;
      `,[numberOrder])
    if(res.affectedRows !== 1){
      return res.affectedRows
    }
    if(res.message === "error_db"){
      return res.message
    }
    return "ok"
  }
}