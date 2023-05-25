import { Address, Patient, PreviousTreatment } from '@prisma/client'

import { PatientsRepository } from '../patients-repository'

export class InMemoryPatientsRepository implements PatientsRepository {
    public items: Patient[] = []
    public addresses: Address[] = []
    public previousTreatments: PreviousTreatment[] = []

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

    async createAddress(data: Address) {
        const address = {
            ...data,
            id: Math.random().toString(36),
            created_at: new Date()
        }

        this.addresses.push(address)

        return address
    }

    async createPreviousTreatment(data: PreviousTreatment) {
        const previousTreatment = {
            ...data,
            id: Math.random().toString(36),
            created_at: new Date()
        }

        this.previousTreatments.push(previousTreatment)

        return previousTreatment
    }
}
