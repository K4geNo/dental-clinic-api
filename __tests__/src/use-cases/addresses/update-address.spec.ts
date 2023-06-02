import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { UpdateAddressUseCase } from '@/use-cases/addresses/update-address'

let addressRepository: InMemoryAddressesRepository
let patientsRepository: InMemoryPatientsRepository
let sut: UpdateAddressUseCase

describe('Update Address Use Case', () => {
    beforeEach(() => {
        addressRepository = new InMemoryAddressesRepository()
        patientsRepository = new InMemoryPatientsRepository()
        sut = new UpdateAddressUseCase(addressRepository, patientsRepository)
    })

    it('should be able to update a address', async () => {
        const createPatient = await patientsRepository.create({
            id: 'patient-id',
            name: 'Test Patient',
            birth_date: new Date(),
            email: 'johndoe@example.com',
            created_at: new Date(),
            gender: 'male',
            phone: '12312412',
            reason: 'treatment'
        })

        const createAddress = await addressRepository.create({
            city: 'Test City',
            complement: '',
            neighborhood: 'Test Neighborhood',
            number: '123',
            state: 'Test State',
            street: 'Test Street',
            zip_code: '123123123',
            patient_id: createPatient.id,
            created_at: new Date()
        })

        const { address } = await sut.execute({
            city: 'Test City 2',
            complement: '',
            neighborhood: 'Test Neighborhood 2',
            number: '123',
            state: 'Test State 2',
            street: 'Test Street 2',
            zip_code: '123123123',
            patientId: createPatient.id,
            addressId: createAddress.id
        })

        expect(address.city).toBe('Test City 2')
    })

    it('should not be able to update a address if patient does not exists', async () => {
        await expect(
            sut.execute({
                city: 'Test City 2',
                complement: '',
                neighborhood: 'Test Neighborhood 2',
                number: '123',
                state: 'Test State 2',
                street: 'Test Street 2',
                zip_code: '123123123',
                patientId: 'invalid-patient-id',
                addressId: 'invalid-address-id'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
