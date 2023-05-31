import { TreatmentsRepository } from '@/repositories/treatments-repository'

export class GetTreatmentUseCase {
    constructor(private treatmentsRepository: TreatmentsRepository) {}

    async execute(patientId: string) {
        const previousTreatment =
            await this.treatmentsRepository.findManyByPatientId(patientId)

        if (!previousTreatment) {
            throw new Error('Previous treatment not found')
        }

        return { previousTreatment }
    }
}
