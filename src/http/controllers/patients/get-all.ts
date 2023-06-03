import { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function getAllController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const paramsSchema = z.object({
        page: z.string().optional(),
        perPage: z.string().optional()
    })

    const { page = 1, perPage = 10 } = paramsSchema.parse(req.query)

    const pageNumber = Number(page)
    const perPageNumber = Number(perPage)

    const skip = (pageNumber - 1) * perPageNumber

    const patients = await prisma.patient.findMany({
        include: {
            Addresses: true,
            Treatments: true
        },
        take: perPageNumber,
        skip
    })

    return reply.status(200).send({ patients })
}
