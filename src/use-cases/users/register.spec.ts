import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('RegisterUseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register a new user', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const isPasswordCorrectly = await compare('123456', user.password_hash)

        expect(isPasswordCorrectly).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'johndoe@example.com'

        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
