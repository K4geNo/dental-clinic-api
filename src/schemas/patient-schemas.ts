import { z } from "zod"

export const patientDataSchema = z.object({
    name: z.string(),
    birthday: z.coerce.date(),
    gender: z.enum(["male", "female"]),
    phone: z.string(),
    email: z.string().email(),
    reason: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    treatment: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
})
