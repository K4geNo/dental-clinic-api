import { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Atualiza o token de autenticação e retorna o novo token.
 * Além disso, define um cookie refreshToken na resposta.
 *
 * @param req - Objeto de solicitação FastifyRequest.
 * @param reply - Objeto de resposta FastifyReply.
 * @returns A resposta FastifyReply com o novo token.
 */
export async function refresh(req: FastifyRequest, reply: FastifyReply) {
    await req.jwtVerify({
        onlyCookie: true,
    })

    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: req.user.sub,
            },
        }
    )

    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: req.user.sub,
                expiresIn: '7d',
            },
        }
    )

    // TODO: Alterar o httpOnly para true quando o frontend estiver pronto
    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: true,
        })
        .status(200)
        .send({ token })
}
