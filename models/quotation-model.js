export class QuotationModel{
  static async SaveQuotationData({data}){
    console.log(data)
  }
  static async GetListQuotations(filter = ""){
    const data = []
    if(filter === "pending"){
      data.push({
        "numberQuotation": "1050",
        "description": "transformadores de distribucion",
        "client": "gobierno regional",
        "rucClient": "20537147612",
        "dateNotification":"2024-03-12",
        "stateQuotation":"pendiente",
        "sellers": "illapa,redfial",
        "rucResponsibleCompany":"20604442878"
      })
    }else if(filter === "sending"){
      data.push({
        "numberQuotation": "1050",
        "description": "transformadores de distribucion",
        "client": "gobierno regional",
        "rucClient": "20537147612",
        "dateNotification":"2024-03-12",
        "stateQuotation":"enviado",
        "sellers": "illapa,redfial",
        "rucResponsibleCompany":"20604442878"
      })
    }else if(filter === "ignored"){
      data.push({
        "numberQuotation": "1050",
        "description": "transformadores de distribucion",
        "client": "gobierno regional",
        "rucClient": "20537147612",
        "dateNotification":"2024-03-12",
        "stateQuotation":"ignorado",
        "sellers": "illapa,redfial",
        "rucResponsibleCompany":"20604442878"
      })
    }else{
      data.push({
        "numberQuotation": "1050",
        "description": "transformadores de distribucion",
        "client": "gobierno regional",
        "rucClient": "20537147612",
        "dateNotification":"2024-03-12",
        "stateQuotation":"pendiente",
        "sellers": "illapa,redfial",
        "rucResponsibleCompany":"20604442878"
      })
    }
    return data
  }
  static async GetQuotationData({numberQuotation}){
    const data =  {
      "numberQuotation": numberQuotation,
      "description": "transformadores de distribucion",
      "client": "gobierno regional",
      "rucClient": "20537147612",
      "dateNotification":"2024-03-12",
      "stateQuotation":"pendiente",
      "sellers": "illapa,redfial",
      "rucResponsibleCompany":"20604442878"
    }
    return data
  }
  static async UpdateQuotaionData({data}){
    console.log(data)
  }
  static async UpdateStateQuotation({data}){
    console.log(data)
  }
  static async DeleteQuotation({numberQuotation}){
    console.log(numberQuotation)
  }
}