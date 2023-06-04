import { PatientsRepository, UpdatePatientDTO } from '../patients-repository'

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
        const patient = await prisma.patient.findFirst({
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

    async update(data: UpdatePatientDTO) {
        const patient = await prisma.patient.update({
            where: {
                id: data.id
            },
            data
        })

        return patient
    }

    async findMany(page: number, perPage: number) {
        const skip = (page - 1) * perPage

        const patients = await prisma.patient.findMany({
            include: {
                Addresses: true,
                Treatments: true
            },
            take: perPage,
            skip
        })

        return patients
    }

    async search(query: string, page: number) {
        const patients = await prisma.patient.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query
                        }
                    },
                    {
                        email: {
                            contains: query
                        }
                    }
                ]
            },
            take: 10,
            skip: (page - 1) * 10
        })

        return patients
    }
}
