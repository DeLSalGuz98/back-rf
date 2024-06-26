import z from 'zod'

const companySchema  = z.object({
  ruc: z.string().max(11).min(11),
  nameCompany: z.string(),
  contact: z.string(),
  dni: z.string().max(8).min(8),
  phoneNumber: z.string().max(12).min(9),
  email: z.string().email(),
  address: z.string(),
  cci: z.string().max(20).min(20),
  bank: z.string(),
})

//validamos todo el obj
export function validateCompanyData(object) {
  return companySchema.safeParse(object)
}
//validamos partes del obj
export function validateCompanyDataUpdate(object) {
  return companySchema.partial().safeParse(object)
}
