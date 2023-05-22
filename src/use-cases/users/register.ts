import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterRequestDTO {
    email: string
    password: string
    name: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        email,
        password,
        name
    }: RegisterRequestDTO): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const user = await this.usersRepository.create({
            email,
            password_hash,
            name
        })

        return { user }
    }
}
