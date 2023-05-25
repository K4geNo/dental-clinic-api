import { CreateAddressUseCase } from '../patients/create-address'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'

export function makeCreateAddressUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const createAddressUseCase = new CreateAddressUseCase(
        prismaPatientsRepository
    )

    return createAddressUseCase
}
