import { CreatePatientUseCase } from '@/use-cases/patients/create-patient'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'

export function makeCreatePatientUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const createPatientUseCase = new CreatePatientUseCase(
        prismaPatientsRepository
    )

    return createPatientUseCase
}
