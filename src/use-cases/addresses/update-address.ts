import { Address } from '@prisma/client'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { PatientsRepository } from '@/repositories/patients-repository'

interface UpdateAddressRequestDTO {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
    patientId: string
    addressId: string
}

interface UpdateAddressResponseDTO {
    address: Address
}

export class UpdateAddressUseCase {
    constructor(
        private addressesRepository: AddressesRepository,
        private patientsRepository: PatientsRepository
    ) {}

    async execute({
        city,
        complement,
        neighborhood,
        number,
        state,
        street,
        zip_code,
        patientId,
        addressId
    }: UpdateAddressRequestDTO): Promise<UpdateAddressResponseDTO> {
        const patient = await this.patientsRepository.findById(patientId)

        if (!patient) {
            throw new Error('Patient not found')
        }

        const address = await this.addressesRepository.update({
            city,
            complement,
            neighborhood,
            created_at: new Date(),
            number,
            state,
            zip_code,
            street,
            patient_id: patientId,
            id: addressId
        })

        return { address }
    }
}
