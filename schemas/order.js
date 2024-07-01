import z from "zod"

const purchaseOrderSchema = z.object({
  numberOrder: z.string().max(6),
  dateNotification: z.string().date(),
  deliveryTime: z.number().positive(),
  deadLine: z.string().date(),
  expSiaf: z.string().max(10),
  executingUnit: z.string().max(10),
  deliveryPlace: z.string(),
  stateOrder: z.enum(["pendiente", "entregado"]),
  codInvoice: z.string().max(10),
  codReferralguide: z.string().max(10),
  statePaymentOrder: z.enum(["pendiente", "devengado", "pagado"]),
  numberQuotation: z.string().max(6)
})

export function validateOrderPartialData(object) {
  return purchaseOrderSchema.partial().safeParse(object)
}
