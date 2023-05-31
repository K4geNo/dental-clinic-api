import { TreatmentsRepository, UpdateTreatment } from '../treatments-repository'

import { Prisma } from '@prisma/client'
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

    async update(id: string, data: UpdateTreatment) {
        const treatments = await prisma.treatment.update({
            where: {
                id
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
