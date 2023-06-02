import { Prisma, Treatment } from '@prisma/client'

import { TreatmentsRepository } from '../treatments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTreatmentsRepository implements TreatmentsRepository {
    async create(data: Prisma.TreatmentUncheckedCreateInput) {
        const treatments = await prisma.treatment.create({
            data
        })

        return treatments
    }

    async findManyByPatientId(id: string) {
        const treatments = await prisma.treatment.findMany({
            where: {
                patient_id: id
            }
        })

        return treatments
    }

    async update(data: Treatment) {
        const treatments = await prisma.treatment.update({
            where: {
                id: data.id
            },
            data
        })

        return treatments
    }

    async delete(id: string) {
        await prisma.treatment.delete({
            where: {
                id
            }
        })
    }
}
