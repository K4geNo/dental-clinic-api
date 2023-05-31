import { FastifyInstance } from 'fastify'
import { createController } from './create'
import { patientsController } from './patients'
import { prisma } from '@/lib/prisma'
// import { updateController } from './update'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function patientsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/patients', { onRequest: [verifyJWT] }, createController)

    // app.put('/patients/:id', { onRequest: [verifyJWT] }, updateController)

    app.get(
        '/patient-profile/:id',
        { onRequest: [verifyJWT] },
        patientsController
    )

    app.get('/patients', { onRequest: [verifyJWT] }, async (request, reply) => {
        const patients = await prisma.patient.findMany()

        return reply.status(200).send({ patients })
    })
}
