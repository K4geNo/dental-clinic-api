import { Patient } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'

export class InMemoryPatientsRepository implements PatientsRepository {
    public items: Patient[] = []

    async findById(id: string) {
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

    async update(data: Patient) {
        const patientIndex = this.items.findIndex(
            (patient) => patient.id === data.id
        )

        if (patientIndex >= 0) {
            this.items[patientIndex] = data
        }

        return this.items[patientIndex]
    }

    async findMany(page: number, perPage: number) {
        return this.items.slice((page - 1) * perPage, page * perPage)
    }

    async search(query: string, page: number) {
        const patients = this.items.filter((patient) => {
            return patient.name.includes(query) || patient.email.includes(query)
        })

        return patients.slice((page - 1) * 10, page * 10)
    }
}
