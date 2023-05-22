import { Patient } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'
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
    async create(data: Patient) {
        const patient = await prisma.patient.create({
            data
        })

        return patient
    }
}
