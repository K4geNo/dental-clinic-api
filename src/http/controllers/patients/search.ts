import { FastifyReply, FastifyRequest } from 'fastify'

import { makeSearchPatientsUseCase } from '@/use-cases/factories/patients/make-search-patients-use-case'
import { z } from 'zod'

export async function searchController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const paramsSchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page } = paramsSchema.parse(req.query)

    const searchPatientUseCase = makeSearchPatientsUseCase()

    const { patients } = await searchPatientUseCase.execute({
        query,
        page
    })

    return reply.status(200).send({ patients })
}
