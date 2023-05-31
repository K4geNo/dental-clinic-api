import { AddressesRepository } from '../addresses-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaAddressesRepository implements AddressesRepository {
    async findByPatientId(id: string) {
        const address = await prisma.address.findFirst({
            where: {
                patient_id: id
            }
        })

        return address
    }

    async create(data: Prisma.AddressUncheckedCreateInput) {
        const address = await prisma.address.create({
            data
        })

        return address
    }

    async update(id: string, data: Prisma.AddressUpdateInput) {
        const address = await prisma.address.update({
            where: {
                id
            },
            data
        })

        return address
    }

    async delete(id: string) {
        await prisma.address.delete({
            where: {
                id
            }
        })
    }
}
