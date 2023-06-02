import { Address, Prisma } from '@prisma/client'

export interface AddressesRepository {
    findByPatientId(id: string): Promise<Address | null>
    create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
    update(data: Address): Promise<Address>
    delete(id: string): Promise<void>
}
