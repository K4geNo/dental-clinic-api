import { CreatePreviousTreatmentUseCase } from '../patients/create-previous-treatment'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'

export function makeCreatePreviousTreatmentUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const createPreviousTreatment = new CreatePreviousTreatmentUseCase(
        prismaPatientsRepository
    )

    return createPreviousTreatment
}
