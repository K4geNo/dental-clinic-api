import { CreateAddressUseCase } from '@/use-cases/addresses/create-address'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'

export function makeCreateAddressUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const prismaAddressesRepository = new PrismaAddressesRepository()
    const createAddressUseCase = new CreateAddressUseCase(
        prismaPatientsRepository,
        prismaAddressesRepository
    )

    return createAddressUseCase
}
