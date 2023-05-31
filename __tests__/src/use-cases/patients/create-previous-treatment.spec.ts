import { beforeEach, describe, expect, it } from 'vitest'

import { CreatePreviousTreatmentUseCase } from '@/use-cases/patients/create-previous-treatment'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: CreatePreviousTreatmentUseCase

describe('Create Previous Treatment', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new CreatePreviousTreatmentUseCase(patientsRepository)
    })

    it('should create an previous treatment', async () => {
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
            startDate: new Date('2020-01-01'),
            endDate: new Date('2020-01-02'),
            patient_id: id
        }

        const { treatment } = await sut.execute(treatmentData)

        expect(treatment).toEqual([
            {
                id: expect.any(String),
                start_date: new Date('2020-01-01'),
                end_date: new Date('2020-01-02'),
                patient_id: id,
                treatment: 'Test Treatment'
            }
        ])
    })

    it('should not be able to create an previous treatment with a non-existent patient', async () => {
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
