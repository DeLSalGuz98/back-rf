import format from "date-format"

export function deadlineCalculator(dateNotification, deliveryTime) {
  const notification = new Date(dateNotification)
  const newDate = new Date((notification.valueOf() + ((deliveryTime + 1) * 1000 * 60 * 60 * 24)))
  const deadLine = format("yyyy-MM-dd", newDate)
  return deadLine
}