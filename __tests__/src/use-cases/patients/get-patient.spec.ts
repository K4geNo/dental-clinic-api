import { beforeAll, describe, expect, it } from 'vitest'

import { GetPatientUseCase } from '@/use-cases/patients/get-patient'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: GetPatientUseCase

describe('Get Patient', () => {
    beforeAll(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new GetPatientUseCase(patientsRepository)
    })

    it('should be able to get a patient', async () => {
        const createdPatient = await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            phone: 'any_phone',
            birth_date: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '1',
            created_at: new Date()
        })

        const { patient } = await sut.execute({
            patientId: createdPatient.id
        })

        expect(patient.id).toEqual(expect.any(String))
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() =>
            sut.execute({
                patientId: 'wrong-id'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
