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
    // Verificar o token de autenticação apenas através do cookie.
    await req.jwtVerify({
        onlyCookie: true
    })

    // Gerar um novo token de autenticação com os dados do usuário atual.
    const token = await reply.jwtSign(
        {},
        {
            sign: {
                sub: req.user.sub
            }
        }
    )

    // Gerar um novo refreshToken com os dados do usuário atual e uma expiração de 7 dias.
    const refreshToken = await reply.jwtSign(
        {},
        {
            sign: {
                sub: req.user.sub,
                expiresIn: '7d'
            }
        }
    )

    // Definir um cookie refreshToken na resposta.
    // O cookie é configurado com as seguintes opções: path, httpOnly, secure e sameSite.
    return reply
        .setCookie('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: true
        })
        .status(200)
        .send({ token })
}
