import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'

interface getUserProfileRequestDTO {
    userId: string
}

interface getUserProfileResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        userId
    }: getUserProfileRequestDTO): Promise<getUserProfileResponse> {
        const user = await this.usersRepository.findUserById(userId)

        if (!user) {
            throw new Error('User not found')
        }

        return { user }
    }
}
