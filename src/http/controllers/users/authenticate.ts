import { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateUseCase } from '@/use-cases/factories/authenticate/make-authenticate-use-case'
import { z } from 'zod'

/**
 * Função responsável por lidar com a rota de autenticação do usuário.
 * @param req - O objeto de solicitação FastifyRequest.
 * @param reply - O objeto de resposta FastifyReply.
 * @returns Uma resposta de status HTTP contendo o token de autenticação.
 */
export async function authenticateController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(req.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        // Executa o caso de uso authenticateUseCase para autenticar o usuário
        const { user } = await authenticateUseCase.execute({
            email,
            password,
        })

        // Gera um token de autenticação
        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            }
        )

        // Gera um token de atualização
        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d',
                },
            }
        )

        // TODO: Alterar o httpOnly para true quando o frontend estiver pronto
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                httpOnly: false,
                secure: true,
                sameSite: true,
            })
            .status(200)
            .send({
                token,
            })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({
                message: error.message,
            })
        }

        throw error
    }
}
