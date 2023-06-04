import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { CreateTreatmentUseCase } from '@/use-cases/treatments/create-treatment'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'

let patientsRepository: InMemoryPatientsRepository
let treatmentsRepository: InMemoryTreatmentsRepository
let sut: CreateTreatmentUseCase

describe('Create Treatment Use Case', () => {
    beforeEach(async () => {
        patientsRepository = new InMemoryPatientsRepository()
        treatmentsRepository = new InMemoryTreatmentsRepository()
        sut = new CreateTreatmentUseCase(
            patientsRepository,
            treatmentsRepository
        )

        await treatmentsRepository.clear()
    })

    afterEach(async () => {
        await treatmentsRepository.clear()
    })

    it('should create an previous treatment', async () => {
        const createdPatient = await patientsRepository.create({
            birth_date: new Date(),
            email: 'johndoe@example.com',
            gender: 'male',
            name: 'John Doe',
            phone: 'any_phone',
            reason: 'any_reason',
            id: '1',
            created_at: new Date()
        })

        const treatmentData = {
            treatment: 'Test Treatment',
            startDate: new Date('2020-01-01'),
            endDate: new Date('2020-01-02'),
            duration: 1,
            patient_id: createdPatient.id
        }

        const { treatments } = await sut.execute(treatmentData)

        expect(treatments.id).toEqual(expect.any(String))
    })

    it('should not be able to create an previous treatment with a non-existent patient', async () => {
        await expect(() =>
            sut.execute({
                treatment: 'Test Treatment',
                startDate: new Date(),
                endDate: new Date(),
                duration: 1,
                patient_id: 'non-existent-patient-id'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
