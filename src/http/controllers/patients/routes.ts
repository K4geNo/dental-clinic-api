import { FastifyInstance } from 'fastify'
import { createController } from './create'
import { getAllController } from './get-all'
import { patientsController } from './patients'
import { searchController } from './search'
import { updateController } from './update'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function patientsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/patients', { onRequest: [verifyJWT] }, createController)

    app.put(
        '/patients/:patientId/:addressId/:treatmentId',
        { onRequest: [verifyJWT] },
        updateController
    )

    app.get(
        '/patient-profile/:id',
        { onRequest: [verifyJWT] },
        patientsController
    )

    app.get('/search-patient', { onRequest: [verifyJWT] }, searchController)

    app.get('/patients', { onRequest: [verifyJWT] }, getAllController)
}
