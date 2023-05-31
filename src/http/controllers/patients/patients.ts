import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetPatientWithDetailsUseCase } from '@/use-cases/factories/users/make-patient-with-details-use-case'
import { z } from 'zod'

export async function patientsController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const paramsSchema = z.object({
        id: z.string()
    })

    const { id } = paramsSchema.parse(req.params)

    try {
        const getPatientWithDetails = makeGetPatientWithDetailsUseCase()

        const patientDetails = await getPatientWithDetails.execute(id)

        return reply.status(200).send(patientDetails)
    } catch (error) {
        return reply.status(400).send({ message: 'Patient not found' })
    }
}
