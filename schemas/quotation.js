import z from "zod"

const quotationSchema = z.object({
  numberQuotation: z.string().max(6),
  description: z.string().max(500),
  client: z.string(),
  rucClient: z.string().max(11).min(11),
  dateNotification: z.string().date(),
  dateSent: z.string().date(),
  stateQuotation: z.enum(['pendiente', 'enviado', 'ignorado']),
  purchasePrice: z.number().nonnegative(),
  salePrice: z.number().nonnegative(),
  sellers: z.string(),
  linkTdr: z.string().url(),
  linkRequest: z.string().url(),
  linkExcel: z.string().url(),
  observation: z.string().max(500),
  rucResponsibleCompany:  z.string().max(11).min(11)
})

export function validateQuotationData(object) {
  return quotationSchema.safeParse(object)
}
export function validateQuotationPartialData(object) {
  return quotationSchema.partial().safeParse(object)
}
