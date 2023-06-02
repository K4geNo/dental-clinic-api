import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { SearchPatientUseCase } from '@/use-cases/patients/search-patient'

export function makeSearchPatientsUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const searchPatientsUseCase = new SearchPatientUseCase(
        prismaPatientsRepository
    )

    return searchPatientsUseCase
}
