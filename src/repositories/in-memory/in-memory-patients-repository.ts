import { Patient } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'

export class InMemoryPatientsRepository implements PatientsRepository {
    public items: Patient[] = []

    async findPatientById(id: string) {
        const patient = this.items.find((patient) => patient.id === id)

        if (!patient) {
            return null
        }

        return patient
    }

    async findByEmail(email: string) {
        const patient = this.items.find((patient) => patient.email === email)

        if (!patient) {
            return null
        }

        return patient
    }

    async create(data: Patient) {
        const patient = {
            ...data,
            id: Math.random().toString(36),
            created_at: new Date()
        }

        this.items.push(patient)

        return patient
    }
}
