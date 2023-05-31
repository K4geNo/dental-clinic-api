import { CreateTreatmentUseCase } from '@/use-cases/treatments/create-treatment'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'

export function makeCreateTreatmentUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const prismaTreatmentsRepository = new PrismaTreatmentsRepository()
    const createTreatmentUseCase = new CreateTreatmentUseCase(
        prismaPatientsRepository,
        prismaTreatmentsRepository
    )

    return createTreatmentUseCase
}
