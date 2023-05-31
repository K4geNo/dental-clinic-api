import { PatientsRepository } from '../patients-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PrismaPatientsRepository implements PatientsRepository {
    async findById(id: string) {
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

    async update(id: string, data: Prisma.PatientUpdateInput) {
        const patient = await prisma.patient.update({
            where: {
                id
            },
            data
        })

        return patient
    }
}
