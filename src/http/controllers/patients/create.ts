import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreatePatientUseCase } from '@/use-cases/factories/make-create-patient-use-case'
import { z } from 'zod'

export async function createController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const createBodySchema = z.object({
        name: z.string(),
        birthday: z.coerce.date(),
        gender: z.enum(['male', 'female']),
        phone: z.string(),
        email: z.string().email(),
        reason: z.string()
    })

    const { name, birthday, email, gender, phone, reason } =
        createBodySchema.parse(req.body)

    try {
        const createPatientUseCase = makeCreatePatientUseCase()

        const patient = await createPatientUseCase.execute({
            name,
            birthday,
            email,
            gender,
            reason,
            phone
        })

        reply.code(201).send(patient)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}
