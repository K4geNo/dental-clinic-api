import { beforeEach, describe, expect, it } from 'vitest'

import { CreatePreviousTreatmentUseCase } from './create-previous-treatment'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: CreatePreviousTreatmentUseCase

describe('CreateAddressUseCase', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new CreatePreviousTreatmentUseCase(patientsRepository)
    })

    it('should create an address', async () => {
        const createdPatient = await patientsRepository.create({
            birth_date: new Date(),
            email: 'johndoe@example.com',
            gender: 'male',
            name: 'John Doe',
            phone: 'any_phone',
            reason: 'any_reason',
            id: '1'
        })

        const { id } = createdPatient

        const treatmentData = {
            treatment: 'Test Treatment',
            startDate: new Date(),
            endDate: new Date(),
            patient_id: id
        }

        const { treatment } = await sut.execute(treatmentData)

        expect(treatment.id).toEqual(expect.any(String))
    })

    it('should not be able to create an address with a non-existent patient', async () => {
        await expect(() =>
            sut.execute({
                treatment: 'Test Treatment',
                startDate: new Date(),
                endDate: new Date(),
                patient_id: 'non-existent-patient-id'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
