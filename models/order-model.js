export class OrderModel{
  static async SavePurchaseOrderData({data}){
    console.log(data)
  }
  static async GetPurchaseOrderList(filter = ""){
    const data = []
    if(filter === "pending"){
      data.push({
        "numberOrder":"795",
        "dataNotificacion":"2024-04-16",
        "deliveryTime":10,
        "expSiaf":"1748",
        "executingUnit":"789",
        "deliveryPlace":"almacen ex pronna",
        "numberQuotation":"1050"
      })
    }else if(filter === "delivered"){
      data.push({
        "numberOrder":"795",
        "dataNotificacion":"2024-04-16",
        "deliveryTime":10,
        "expSiaf":"1748",
        "executingUnit":"789",
        "deliveryPlace":"almacen ex pronna",
        "numberQuotation":"1050"
      })
    }else{
      data.push({
        "numberOrder":"795",
        "dataNotificacion":"2024-04-16",
        "deliveryTime":10,
        "expSiaf":"1748",
        "executingUnit":"789",
        "deliveryPlace":"almacen ex pronna",
        "numberQuotation":"1050"
      })
    }
    return data
  }
  static async GetPurchaseOrderData({numberOrder}){
    const data = {
      "numberOrder": numberOrder,
      "dataNotificacion": "2024-04-16",
      "deliveryTime": 10,
      "expSiaf": "1748",
      "executingUnit": "789",
      "deliveryPlace": "almacen ex pronna",
      "numberQuotation": "1050"
    }
    return data
  }
  static async GetPaymentTracking(){
    const data = [
      {
        "numberOrder": "1050",
        "dataNotificacion": "2024-04-16",
        "deliveryTime": 10,
        "expSiaf": "1748",
        "executingUnit": "789",
        "deliveryPlace": "almacen ex pronna",
        "numberQuotation": "1050"
      }
    ]
    return data
  }
  static async UpdatePurchaseOrderData({data}){
    console.log(data)
  }
  static async UpdateStateOrder({data}){
    console.log(data)
  }
  static async UpdatePaymentStateOrder({data}){
    console.log(data)
  }
  static async DeletePurchaseOrderData({numberOrder}){
    console.log(numberOrder)
  }
}