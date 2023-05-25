import { PatientsRepository } from '@/repositories/patients-repository'
import { PreviousTreatment } from '@prisma/client'

interface CreatePreviousTreatmentRequestDTO {
    patient_id: string
    treatment: string
    startDate: Date
    endDate: Date
}

interface CreatePreviousTreatmentResponseDTO {
    treatment: PreviousTreatment
}

export class CreatePreviousTreatmentUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        treatment,
        startDate,
        endDate,
        patient_id
    }: CreatePreviousTreatmentRequestDTO): Promise<CreatePreviousTreatmentResponseDTO> {
        const patientNotFound = await this.patientsRepository.findPatientById(
            patient_id
        )

        if (!patientNotFound) throw new Error('Patient not found')

        const previousTreatment =
            await this.patientsRepository.createPreviousTreatment({
                treatment,
                start_date: startDate,
                end_date: endDate,
                patients_id: patient_id
            })

        return { treatment: previousTreatment }
    }
}
