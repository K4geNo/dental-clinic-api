import { PatientsRepository } from '../patients-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPatientsRepository implements PatientsRepository {
    async findPatientById(id: string) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        return patient
    }
    async findByEmail(email: string) {
        const patient = await prisma.patient.findUnique({
            where: {
                email
            }
        })

        return patient
    }
    async create(data: Prisma.PatientCreateInput) {
        const patient = await prisma.patient.create({
            data
        })

        return patient
    }
    async createAddress(data: Prisma.AddressUncheckedCreateInput) {
        const address = await prisma.address.create({
            data
        })

        return address
    }
    async createPreviousTreatment(
        data: Prisma.PreviousTreatmentUncheckedCreateInput
    ) {
        const previousTreatment = await prisma.previousTreatment.create({
            data
        })

        return previousTreatment
    }
}
