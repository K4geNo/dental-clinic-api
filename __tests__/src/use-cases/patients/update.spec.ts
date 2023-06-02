import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { UpdatePatientUseCase } from '@/use-cases/patients/update'

let patientsRepository: InMemoryPatientsRepository
let sut: UpdatePatientUseCase

describe('Update Patient UseCase', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new UpdatePatientUseCase(patientsRepository)
    })

    it('should be able to update a patient', async () => {
        const email = 'johndoe@example.com'

        const createdPatient = await patientsRepository.create({
            id: 'patient-1',
            name: 'John Doe',
            email,
            gender: 'male',
            phone: '123456789',
            reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            birth_date: new Date(),
            created_at: new Date()
        })

        const { patient } = await sut.execute({
            id: createdPatient.id,
            name: 'John Doe',
            birth_date: new Date(),
            email,
            gender: 'male',
            phone: '11231456789',
            reason: 'update'
        })

        expect(patient.id).toEqual(expect.any(String))
    })

    it('should not be able to update a patient with a non-existing email', async () => {
        const email = 'johndoe@example.com'

        const createdPatient = await patientsRepository.create({
            id: 'patient-1',
            name: 'John Doe',
            email,
            birth_date: new Date(),
            created_at: new Date(),
            gender: 'male',
            phone: '123456789',
            reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        })

        await expect(
            sut.execute({
                id: createdPatient.id,
                name: 'John Doe',
                birth_date: new Date(),
                email: 'johndoe@test.com',
                gender: 'male',
                phone: '11231456789',
                reason: 'update'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
