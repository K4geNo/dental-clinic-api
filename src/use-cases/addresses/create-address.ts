import { Address } from '@prisma/client'
import { AddressesRepository } from '@/repositories/addresses-repository'
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
    constructor(
        private patientsRepository: PatientsRepository,
        private addressesRepository: AddressesRepository
    ) {}

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
        const patient = await this.patientsRepository.findById(patient_id)

        if (!patient) throw new Error('Patient not found')

        const address = await this.addressesRepository.create({
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
