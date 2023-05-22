import { beforeEach, describe, expect, it } from 'vitest'

import { CreatePatientUseCase } from './create-patient'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: CreatePatientUseCase

describe('Create Patient Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new CreatePatientUseCase(patientsRepository)
    })

    it('should be able to create a new patient', async () => {
        const { patient } = await sut.execute({
            name: 'John Doe',
            birthday: new Date(),
            phone: '123456789',
            email: 'johndoe@example.com',
            gender: 'male',
            reason: 'reason'
        })

        expect(patient.id).toEqual(expect.any(String))
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'johndoe@example.com'

        await sut.execute({
            name: 'John Doe',
            birthday: new Date(),
            phone: '123456789',
            email,
            gender: 'male',
            reason: 'reason'
        })

        await expect(
            async () =>
                await sut.execute({
                    name: 'John Doe',
                    birthday: new Date(),
                    phone: '123456789',
                    email,
                    gender: 'male',
                    reason: 'reason'
                })
        ).rejects.toBeInstanceOf(Error)
    })
})
