import { Address, Patient, PreviousTreatment, Prisma } from '@prisma/client'

export interface PatientsRepository {
    findPatientById(id: string): Promise<Patient | null>
    findByEmail(email: string): Promise<Patient | null>
    create(data: Prisma.PatientCreateInput): Promise<Patient>
    createAddress(data: Prisma.AddressUncheckedCreateInput): Promise<Address>
    createPreviousTreatment(
        data: Prisma.PreviousTreatmentUncheckedCreateInput
    ): Promise<PreviousTreatment>
}
