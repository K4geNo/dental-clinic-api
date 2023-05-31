import { beforeAll, describe, expect, it } from 'vitest'

import { GetAddressUseCase } from '@/use-cases/patients/get-address'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let sut: GetAddressUseCase

describe('Get Patient', () => {
    beforeAll(() => {
        patientsRepository = new InMemoryPatientsRepository()
        sut = new GetAddressUseCase(patientsRepository)
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

        await patientsRepository.createAddress({
            street: 'any_street',
            number: 'any_number',
            neighborhood: 'any_neighborhood',
            city: 'any_city',
            state: 'any_state',
            complement: 'any_complement',
            zip_code: 'any_zip_code',
            patient_id: createdPatient.id,
            id: '1'
        })

        const { address } = await sut.execute(createdPatient.id)

        expect(address.id).toEqual(expect.any(String))
    })

    it('should not be able to get user profile with wrong id', async () => {
        await expect(() => sut.execute('wrong_id')).rejects.toBeInstanceOf(
            Error
        )
    })
})
