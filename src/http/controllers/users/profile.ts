import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

/**
 * Função responsável por lidar com a rota de perfil do usuário.
 * @param req - O objeto de solicitação FastifyRequest.
 * @param reply - O objeto de resposta FastifyReply.
 * @returns Uma resposta de status HTTP contendo o perfil do usuário.
 */
export async function profileController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const getUserProfile = makeGetUserProfileUseCase()

    // Executa o caso de uso getUserProfile para obter o perfil do usuário
    const { user } = await getUserProfile.execute({
        userId: req.user.sub
    })

    return reply.status(200).send({
        user: {
            ...user,
            password_hash: undefined
        }
    })
}
