import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { UpdatePatientUseCase } from '@/use-cases/patients/update'

export function makeUpdatePatientUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const updatePatientUseCase = new UpdatePatientUseCase(
        prismaPatientsRepository
    )

    return updatePatientUseCase
}
