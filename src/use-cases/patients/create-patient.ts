import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

interface CreatePatientRequestDTO {
    name: string
    birthday: Date
    gender: 'male' | 'female'
    phone: string
    email: string
    reason: string
}

interface CreatePatientResponseDTO {
    patient: Patient
}

export class CreatePatientUseCase {
    constructor(private patientRepository: PatientsRepository) {}

    async execute({
        name,
        birthday,
        gender,
        phone,
        email,
        reason
    }: CreatePatientRequestDTO): Promise<CreatePatientResponseDTO> {
        const patientAlreadyExists = await this.patientRepository.findByEmail(
            email
        )

        if (patientAlreadyExists) {
            throw new Error('Patient already exists')
        }

        const patient = await this.patientRepository.create({
            name,
            birth_date: birthday,
            email,
            gender,
            phone,
            reason
        })

        return { patient }
    }
}
