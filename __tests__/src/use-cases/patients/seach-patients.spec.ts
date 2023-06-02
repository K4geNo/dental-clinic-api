import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { SearchPatientUseCase } from '@/use-cases/patients/search-patient'

let patientsRepository: InMemoryPatientsRepository
let sut: SearchPatientUseCase

describe('Search Patient Use Case', () => {
    beforeEach(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new SearchPatientUseCase(patientsRepository)
    })

    it('should be able to search patients', async () => {
        await patientsRepository.create({
            id: 'patient-id',
            name: 'John Doe',
            birth_date: new Date(),
            email: 'johndoe@example.com',
            gender: 'male',
            phone: '99999999999',
            reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod.',
            created_at: new Date()
        })

        const { patients } = await sut.execute({
            query: 'John Doe',
            page: 1
        })

        expect(patients).toHaveLength(1)
    })
})
