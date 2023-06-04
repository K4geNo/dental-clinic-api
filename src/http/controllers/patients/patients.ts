import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetPatientUseCase } from '@/use-cases/factories/patients/make-get-patient-use-case'
import { z } from 'zod'

export async function patientsController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const paramsSchema = z.object({
        page: z.string(),
        perPage: z.string().optional()
    })

    const { page = 1, perPage = 10 } = paramsSchema.parse(req.query)

    const pageNumber = Number(page)
    const perPageNumber = Number(perPage)

    const getPatientsUseCase = makeGetPatientUseCase()

    const patients = await getPatientsUseCase.execute({
        page: pageNumber,
        perPage: perPageNumber
    })

    return reply.status(200).send(patients)
}
