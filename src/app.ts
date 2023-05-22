import { ZodError } from 'zod'
import { env } from './env'
import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJWT from '@fastify/jwt'
import { patientsRoutes } from './http/controllers/patients/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJWT, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

// App Routes
app.register(usersRoutes)
app.register(patientsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation failed',
            issues: error.format()
        })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    if (error.statusCode) {
        return reply.status(error.statusCode).send({
            message: error.message
        })
    }

    console.error(error)

    return reply.status(500).send({
        message: 'Internal server error'
    })
})
