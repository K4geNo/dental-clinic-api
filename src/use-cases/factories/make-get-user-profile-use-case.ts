import { GetUserProfileUseCase } from '../users/get-user-profile'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetUserProfileUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUseCase(prismaUsersRepository)

    return useCase
}
