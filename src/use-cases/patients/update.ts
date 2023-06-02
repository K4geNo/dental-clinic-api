import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

interface UpdatePatientRequestDTO {
    id: string
    name: string
    birth_date: Date
    gender: 'male' | 'female'
    phone: string
    email: string
    reason: string
}

interface UpdatePatientResponseDTO {
    patient: Patient
}

export class UpdatePatientUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        id,
        birth_date,
        email,
        gender,
        name,
        phone,
        reason
    }: UpdatePatientRequestDTO): Promise<UpdatePatientResponseDTO> {
        const patient = await this.patientsRepository.findByEmail(email)

        if (!patient) {
            throw new Error('Patient not found')
        }

        const updatedPatient = await this.patientsRepository.update({
            id,
            birth_date,
            email,
            gender,
            name,
            phone,
            reason
        })

        return {
            patient: updatedPatient
        }
    }
}
