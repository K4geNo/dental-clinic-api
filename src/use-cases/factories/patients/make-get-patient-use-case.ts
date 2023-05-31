import { GetPatientUseCase } from '@/use-cases/patients/get-patient'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'

export function makeGetPatientUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const getPatientUseCase = new GetPatientUseCase(prismaPatientsRepository)

    return getPatientUseCase
}
