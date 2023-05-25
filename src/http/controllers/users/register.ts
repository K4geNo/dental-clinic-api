import { FastifyReply, FastifyRequest } from 'fastify'

import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { z } from 'zod'

/**
 * Função responsável por lidar com a rota de registro de usuário.
 * @param request - O objeto de solicitação FastifyRequest.
 * @param reply - O objeto de resposta FastifyReply.
 * @returns Uma resposta de status HTTP indicando o resultado da operação.
 */
export async function registerController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    // Define o esquema de validação para os dados do usuário
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        // Executa o caso de uso registerUseCase para criar um novo usuário
        await registerUseCase.execute({
            name,
            email,
            password
        })

        return reply.status(201).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}
