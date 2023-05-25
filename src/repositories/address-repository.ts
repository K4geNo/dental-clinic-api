import { Address, Prisma } from '@prisma/client'

export interface AddressRepository {
    findAddressById(id: string): Promise<Address | null>
    create(data: Prisma.AddressCreateInput): Promise<Address>
}
