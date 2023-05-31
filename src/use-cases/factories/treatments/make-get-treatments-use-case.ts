import { GetTreatmentUseCase } from '@/use-cases/treatments/get-treatments'
import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'

export function makeGetTreatmentsUseCase() {
    const treatmentsRepository = new PrismaTreatmentsRepository()
    const getTreatmentsUseCase = new GetTreatmentUseCase(treatmentsRepository)

    return getTreatmentsUseCase
}
