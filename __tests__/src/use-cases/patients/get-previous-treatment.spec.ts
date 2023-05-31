import { beforeAll, describe, expect, it } from 'vitest'

import { GetPreviousTreatmentUseCase } from '@/use-cases/patients/get-previous-treatment'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: GetPreviousTreatmentUseCase

describe('Get Patient', () => {
    beforeAll(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new GetPreviousTreatmentUseCase(patientsRepository)
    })

    it('should be able to get a patient', async () => {
        const createdPatient = await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            phone: 'any_phone',
            birth_date: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '1'
        })

        await patientsRepository.createPreviousTreatment({
            patient_id: createdPatient.id,
            id: '1',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date()
        })

        const { previousTreatment } = await sut.execute(createdPatient.id)

        expect(previousTreatment[0].id).toEqual(expect.any(String))
    })

    it('should be able to get a patient with multiple previous treatments', async () => {
        const createdPatient = await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            phone: 'any_phone',
            birth_date: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '1'
        })

        await patientsRepository.createPreviousTreatment({
            patient_id: createdPatient.id,
            id: '1',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date()
        })

        await patientsRepository.createPreviousTreatment({
            patient_id: createdPatient.id,
            id: '2',
            treatment: 'any_treatment',
            start_date: new Date(),
            end_date: new Date()
        })

        const { previousTreatment } = await sut.execute(createdPatient.id)

        console.log(previousTreatment)

        expect(previousTreatment.length).toBe(2)
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute('wrong_id')).rejects.toBeInstanceOf(
            Error
        )
    })
})
