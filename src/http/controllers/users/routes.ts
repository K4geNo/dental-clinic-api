import { FastifyInstance } from 'fastify'
import { authenticateController } from './authenticate'
import { profileController } from './profile'
import { refresh } from './refresh'
import { registerController } from './register'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController)

    app.post('/sessions', authenticateController)

    app.patch('/token/refresh', refresh)

    app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
