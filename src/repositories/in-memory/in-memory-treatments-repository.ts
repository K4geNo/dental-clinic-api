import { Prisma, Treatment } from '@prisma/client'

import { TreatmentsRepository } from '../treatments-repository'

export class InMemoryTreatmentsRepository implements TreatmentsRepository {
    public items: Treatment[] = []

    async create(data: Prisma.TreatmentUncheckedCreateInput) {
        const treatment = {
            ...data,
            id: Math.random().toString(36),
            start_date: data.start_date as Date,
            end_date: data.end_date as Date,
            created_at: new Date()
        }

        this.items.push(treatment)

        return treatment
    }
    async findManyByPatientId(id: string) {
        const treatments = this.items.filter(
            (treatment) => treatment.patient_id === id
        )

        return treatments.length > 0 ? treatments : null
    }
    async update(data: Treatment) {
        const treatmentIndex = this.items.findIndex(
            (treatment) => treatment.id === data.id
        )

        if (treatmentIndex >= 0) {
            this.items[treatmentIndex] = data
        }

        return this.items[treatmentIndex]
    }
    async delete(id: string) {
        const treatmentIndex = this.items.findIndex(
            (treatment) => treatment.id === id
        )

        if (treatmentIndex >= 0) {
            this.items.splice(treatmentIndex, 1)
        }
    }
    public async clear() {
        this.items = []
    }
}
