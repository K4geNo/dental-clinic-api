import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'

interface AuthenticateRequestDTO {
    email: string
    password: string
}

interface AuthenticateResponseDTO {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({
        email,
        password
    }: AuthenticateRequestDTO): Promise<AuthenticateResponseDTO> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error('Incorrect email/password combination.')
        }

        const passwordMatched = await compare(password, user.password_hash)

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.')
        }

        return {
            user
        }
    }
}
