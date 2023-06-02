import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'
import { UpdateTreatmentUseCase } from '@/use-cases/treatments/update-treatment'

let patientsRepository: InMemoryPatientsRepository
let treatmentsRepository: InMemoryTreatmentsRepository
let sut: UpdateTreatmentUseCase

describe('Update Treatment Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        treatmentsRepository = new InMemoryTreatmentsRepository()
        sut = new UpdateTreatmentUseCase(
            patientsRepository,
            treatmentsRepository
        )
    })

    it('should be able to update a treatment', async () => {
        const createdPatient = await patientsRepository.create({
            id: 'patient-1',
            name: 'John Doe',
            birth_date: new Date(),
            email: 'johndoe@example.com',
            gender: 'male',
            phone: '2312312',
            reason: 'treatments',
            created_at: new Date()
        })

        const createdTreatment = await treatmentsRepository.create({
            id: 'treatment-1',
            treatment: 'treatment',
            start_date: new Date(),
            end_date: new Date(),
            patient_id: createdPatient.id
        })

        const { treatment } = await sut.execute({
            patientId: createdPatient.id,
            treatmentId: createdTreatment.id,
            treatment: 'updated treatment',
            startDate: new Date(),
            endDate: new Date()
        })

        expect(treatment.treatment).toBe('updated treatment')
    })

    it('should not be able to update a treatment if patient does not exist', async () => {
        await expect(
            sut.execute({
                patientId: 'non-existing-patient',
                treatmentId: 'non-existing-treatment',
                treatment: 'updated treatment',
                startDate: new Date(),
                endDate: new Date()
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
