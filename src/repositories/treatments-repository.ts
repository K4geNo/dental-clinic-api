import { Prisma, Treatment } from '@prisma/client'

export interface UpdateTreatment {
    treatment: string
    startDate: Date
    endDate: Date
}

export interface TreatmentsRepository {
    create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment>
    findManyByPatientId(id: string): Promise<Treatment[]>
    update(id: string, data: UpdateTreatment): Promise<Treatment>
    delete(id: string): Promise<void>
}
