import { Patient, Prisma } from '@prisma/client'

export interface UpdatePatientDTO {
    id: string
    name: string
    birth_date: Date
    gender: 'male' | 'female'
    phone: string
    email: string
    reason: string
}

export interface PatientsRepository {
    findById(id: string): Promise<Patient | null>
    findByEmail(email: string): Promise<Patient | null>
    findAll(page: number): Promise<Patient[]>
    create(data: Prisma.PatientCreateInput): Promise<Patient>
    update(data: UpdatePatientDTO): Promise<Patient>
    search(query: string, page: number): Promise<Patient[]>
}
