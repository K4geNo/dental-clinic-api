import { beforeAll, describe, expect, it } from 'vitest'

import { GetPatientUseCase } from '@/use-cases/patients/get-patients'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: GetPatientUseCase

describe('Get Patient', () => {
    beforeAll(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new GetPatientUseCase(patientsRepository)
    })

    it('should be able to get a patient', async () => {
        await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            phone: 'any_phone',
            birth_date: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '1',
            created_at: new Date()
        })

        const { patients } = await sut.execute({
            page: 1,
            perPage: 10
        })

        expect(patients).toHaveLength(1)
    })

    it('should be able to get a patient specifying the page and perPage', async () => {
        await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            phone: 'any_phone',
            birth_date: new Date(),
            created_at: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '1'
        })

        await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@dev.com',
            phone: 'any_phone',
            birth_date: new Date(),
            created_at: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '2'
        })

        await patientsRepository.create({
            name: 'john doe',
            email: 'johndoe@dev.com',
            phone: 'any_phone',
            birth_date: new Date(),
            created_at: new Date(),
            gender: 'male',
            reason: 'any_reason',
            id: '3'
        })

        const { patients } = await sut.execute({
            page: 1,
            perPage: 2
        })

        expect(patients).toHaveLength(2)
    })
})
