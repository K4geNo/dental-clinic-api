import { AddressesRepository } from '@/repositories/addresses-repository'

export class GetAddressUseCase {
    constructor(private addressesRepository: AddressesRepository) {}

    async execute(patientId: string) {
        const address = await this.addressesRepository.findByPatientId(
            patientId
        )

        if (!address) {
            throw new Error('Address not found')
        }

        return { address }
    }
}
