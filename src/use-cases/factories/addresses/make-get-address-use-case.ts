import { GetAddressUseCase } from '@/use-cases/addresses/get-address'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'

export function makeGetAddressUseCase() {
    const prismaAddressesRepository = new PrismaAddressesRepository()
    const getAddressUseCase = new GetAddressUseCase(prismaAddressesRepository)

    return getAddressUseCase
}
