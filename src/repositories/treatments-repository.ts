import { Prisma, Treatment } from '@prisma/client'

export interface TreatmentsRepository {
    create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment>
    findManyByPatientId(id: string): Promise<Treatment[] | null>
    update(data: Treatment): Promise<Treatment>
    delete(id: string): Promise<void>
}
