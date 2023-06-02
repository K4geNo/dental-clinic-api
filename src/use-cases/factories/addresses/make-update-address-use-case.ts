import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { UpdateAddressUseCase } from '@/use-cases/addresses/update-address'

export function makeUpdateAddressUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const prismaAddressRepository = new PrismaAddressesRepository()

    const updateAddressUseCase = new UpdateAddressUseCase(
        prismaAddressRepository,
        prismaPatientsRepository
    )

    return updateAddressUseCase
}
