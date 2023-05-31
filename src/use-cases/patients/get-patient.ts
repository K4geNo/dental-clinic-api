import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

interface GetPatientRequestDTO {
    patientId: string
}

interface GetPatientResponseDTO {
    patient: Patient
}

export class GetPatientUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        patientId
    }: GetPatientRequestDTO): Promise<GetPatientResponseDTO> {
        const patient = await this.patientsRepository.findById(patientId)

        if (!patient) {
            throw new Error('Patient not found')
        }

        return {
            patient
        }
    }
}
