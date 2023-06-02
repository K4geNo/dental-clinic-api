import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients.repository'
import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'
import { UpdateTreatmentUseCase } from '@/use-cases/treatments/update-treatment'

export function makeUpdateTreatmentUseCase() {
    const prismaPatientsRepository = new PrismaPatientsRepository()
    const prismaTreatmentsRepository = new PrismaTreatmentsRepository()

    const updateTreatmentUseCase = new UpdateTreatmentUseCase(
        prismaPatientsRepository,
        prismaTreatmentsRepository
    )

    return updateTreatmentUseCase
}
