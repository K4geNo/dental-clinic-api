import { beforeEach, describe, expect, it } from 'vitest'

import { CreateAddressUseCase } from '@/use-cases/addresses/create-address'
import { InMemoryAddressesRepository } from '@/repositories/in-memory/in-memory-addresses-repository'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let addressesRepository: InMemoryAddressesRepository
let sut: CreateAddressUseCase

describe('Create Address Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        addressesRepository = new InMemoryAddressesRepository()
        sut = new CreateAddressUseCase(patientsRepository, addressesRepository)
    })

    it('should be able to create address with patientId', async () => {
        const { id } = await patientsRepository.create({
            id: 'patient-id',
            name: 'John Doe',
            email: 'johndoe@example.com',
            birth_date: new Date(),
            gender: 'male',
            phone: 'any_phone',
            reason: 'any_reason',
            created_at: new Date()
        })

        const { address } = await sut.execute({
            street: 'Test Street',
            number: '123',
            complement: '',
            neighborhood: 'Test Neighborhood',
            city: 'Test City',
            state: 'Test State',
            zip_code: '00000-000',
            patient_id: id
        })

        expect(address.id).toEqual(expect.any(String))
    })

    it('should not be able to create an address with a non-existent patient', async () => {
        await expect(() =>
            sut.execute({
                street: 'Test Street',
                number: '123',
                complement: '',
                neighborhood: 'Test Neighborhood',
                city: 'Test City',
                state: 'Test State',
                zip_code: '00000-000',
                patient_id: 'non-existent-patient-id'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
