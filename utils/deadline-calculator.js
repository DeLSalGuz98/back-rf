import format from "date-format"

export function deadlineCalculator(dateNotificacion, deliveryTime) {
  const notificaion = new Date(dateNotificacion)
  const newDate = new Date((notificaion.valueOf() + ((deliveryTime + 1) * 1000 * 60 * 60 * 24)))
  const deadLine = format("yyyy-MM-dd", newDate)
  return deadLine
}