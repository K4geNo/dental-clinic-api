import { FastifyInstance } from 'fastify'
import { createController } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function patientsRoutes(app: FastifyInstance) {
    app.post('/patients', { preHandler: [verifyJWT] }, createController)
}
