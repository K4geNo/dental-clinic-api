import { beforeEach, describe, expect, it } from 'vitest'

import { CreateAddressUseCase } from '@/use-cases/patients/create-address'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: CreateAddressUseCase

describe('CreateAddressUseCase', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new CreateAddressUseCase(patientsRepository)
    })

    it('should be able to create a new patient with address', async () => {
        const createdPatient = await patientsRepository.create({
            birth_date: new Date(),
            email: 'johndoe@example.com',
            gender: 'male',
            id: '1',
            name: 'John Doe',
            phone: 'any_phone',
            reason: 'any_reason'
        })

        const { id } = createdPatient

        const addressData = {
            street: 'Test Street',
            number: '123',
            complement: '',
            neighborhood: 'Test Neighborhood',
            city: 'Test City',
            state: 'Test State',
            zip_code: '00000-000',
            patient_id: id
        }

        const { address } = await sut.execute(addressData)

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
