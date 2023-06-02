import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { GetTreatmentUseCase } from '@/use-cases/treatments/get-treatments'
import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'

let treatmentsRepository: InMemoryTreatmentsRepository
let sut: GetTreatmentUseCase

describe('Get Treatments Use Case', () => {
    beforeAll(async () => {
        treatmentsRepository = new InMemoryTreatmentsRepository()
        sut = new GetTreatmentUseCase(treatmentsRepository)

        await treatmentsRepository.clear()
    })

    afterEach(async () => {
        await treatmentsRepository.clear()
    })

    it('should be able to get a previous treatments with patient_id', async () => {
        const createdTreatment = await treatmentsRepository.create({
            id: '1',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date(),
            patient_id: 'patient_id-1',
            created_at: new Date()
        })

        const { previousTreatment } = await sut.execute(
            createdTreatment.patient_id
        )

        expect(previousTreatment).toHaveLength(1)
    })

    it('should be able to get a multiple previous treatments with patientId', async () => {
        await treatmentsRepository.create({
            id: '1',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date(),
            patient_id: 'patient_id-1',
            created_at: new Date()
        })

        await treatmentsRepository.create({
            id: '2',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date(),
            patient_id: 'patient_id-1',
            created_at: new Date()
        })

        const { previousTreatment } = await sut.execute('patient_id-1')

        expect(previousTreatment).toHaveLength(2)
    })

    it('should not be able to get a previous treatment with wrong id patient_id', async () => {
        await expect(async () =>
            sut.execute('non-existent-patient-id')
        ).rejects.toBeInstanceOf(Error)
    })
})
