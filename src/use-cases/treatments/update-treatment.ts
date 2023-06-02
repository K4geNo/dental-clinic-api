import { PatientsRepository } from '@/repositories/patients-repository'
import { Treatment } from '@prisma/client'
import { TreatmentsRepository } from '@/repositories/treatments-repository'

interface UpdateTreatmentRequestDTO {
    patientId: string
    treatmentId: string
    treatment: string
    startDate: Date
    endDate: Date
}

interface UpdateTreatmentResponseDTO {
    treatment: Treatment
}

export class UpdateTreatmentUseCase {
    constructor(
        private patientsRepository: PatientsRepository,
        private treatmentsRepository: TreatmentsRepository
    ) {}

    async execute({
        patientId,
        treatmentId,
        treatment,
        startDate,
        endDate
    }: UpdateTreatmentRequestDTO): Promise<UpdateTreatmentResponseDTO> {
        const patient = await this.patientsRepository.findById(patientId)

        if (!patient) {
            throw new Error('Patient not found')
        }

        const updatedTreatment = await this.treatmentsRepository.update({
            treatment,
            start_date: startDate,
            end_date: endDate,
            patient_id: patientId,
            id: treatmentId,
            created_at: new Date()
        })

        return { treatment: updatedTreatment }
    }
}
