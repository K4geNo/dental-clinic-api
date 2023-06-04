import { PatientsRepository } from '@/repositories/patients-repository'
import { Treatment } from '@prisma/client'
import { TreatmentsRepository } from '@/repositories/treatments-repository'
import { differenceInMinutes } from 'date-fns'

interface CreateTreatmentRequestDTO {
    patient_id: string
    treatment: string
    startDate: Date
    endDate: Date
    duration?: number
}

interface CreateTreatmentResponseDTO {
    treatments: Treatment
}

export class CreateTreatmentUseCase {
    constructor(
        private patientsRepository: PatientsRepository,
        private treatmentsRepository: TreatmentsRepository
    ) {}

    async execute({
        treatment,
        startDate,
        endDate,
        duration,
        patient_id
    }: CreateTreatmentRequestDTO): Promise<CreateTreatmentResponseDTO> {
        const patient = await this.patientsRepository.findById(patient_id)

        if (!patient) throw new Error('Patient not found')

        const durationInMinutes = differenceInMinutes(endDate, startDate)

        const treatments = await this.treatmentsRepository.create({
            treatment,
            start_date: startDate,
            end_date: endDate,
            duration: duration || durationInMinutes,
            patient_id
        })

        return { treatments }
    }
}
