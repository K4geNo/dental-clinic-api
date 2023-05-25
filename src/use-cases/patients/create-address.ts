import { Address } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

export interface CreateAddressRequestDTO {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
    patient_id: string
}

interface CreateAddressResponseDTO {
    address: Address
}

export class CreateAddressUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zip_code,
        patient_id
    }: CreateAddressRequestDTO): Promise<CreateAddressResponseDTO> {
        const patientNotFound = await this.patientsRepository.findPatientById(
            patient_id
        )

        if (!patientNotFound) throw new Error('Patient not found')

        const address = await this.patientsRepository.createAddress({
            city,
            complement,
            number,
            neighborhood,
            state,
            zip_code,
            street,
            patient_id
        })

        return { address }
    }
}
