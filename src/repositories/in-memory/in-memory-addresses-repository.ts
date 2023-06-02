import { Address, Prisma } from '@prisma/client'

import { AddressesRepository } from '../addresses-repository'

export class InMemoryAddressesRepository implements AddressesRepository {
    public items: Address[] = []

    async findByPatientId(id: string): Promise<Address | null> {
        const address = this.items.find((address) => address.patient_id === id)

        if (!address) {
            return null
        }

        return address
    }
    async create(data: Prisma.AddressUncheckedCreateInput): Promise<Address> {
        const address = {
            ...data,
            complement: data.complement || null,
            id: Math.random().toString(36),
            created_at: new Date()
        }

        this.items.push(address)

        return address
    }
    async update(data: Address): Promise<Address> {
        const addressIndex = this.items.findIndex(
            (address) => address.id === data.id
        )

        if (addressIndex >= 0) {
            this.items[addressIndex] = data
        }

        return data
    }
    async delete(id: string): Promise<void> {
        const addressIndex = this.items.findIndex(
            (address) => address.id === id
        )

        if (addressIndex >= 0) {
            this.items.splice(addressIndex, 1)
        }
    }
}
