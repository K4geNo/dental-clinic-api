import { beforeAll, describe, expect, it } from 'vitest'

import { GetAddressUseCase } from '@/use-cases/addresses/get-address'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'

let addressRepository: InMemoryAddressesRepository
let sut: GetAddressUseCase

describe('Get Address Use Case', () => {
    beforeAll(() => {
        addressRepository = new InMemoryAddressesRepository()
        sut = new GetAddressUseCase(addressRepository)
    })

    it('should be able to get a address', async () => {
        const createAddress = await addressRepository.create({
            street: 'Test Street',
            number: '123',
            complement: '',
            neighborhood: 'Test Neighborhood',
            city: 'Test City',
            state: 'Test State',
            zip_code: '00000-000',
            patient_id: 'patient-id'
        })

        const { address } = await sut.execute(createAddress.patient_id)

        expect(address.id).toEqual(expect.any(String))
    })

    it('should not be able to get a address with wrong id', async () => {
        await expect(() => sut.execute('wrong_id')).rejects.toBeInstanceOf(
            Error
        )
    })
})
