import { Address, Patient } from '@prisma/client'

import { PatientsRepository } from '../patients-repository'

interface IUpdatePatientDTO {
    name: string
    birthday: Date
    gender: 'male' | 'female'
    phone: string
    email: string
    reason: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    treatment: string
    startDate: Date
    endDate: Date
}

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
            id: Math.random().toString(36)
        }

        this.items.push(patient)

        return patient
    }

    async createAddress(data: Address) {
        const address = {
            ...data,
            id: Math.random().toString(36)
        }

        this.addresses.push(address)

        return address
    }

    async createPreviousTreatment(data: PreviousTreatment) {
        const previousTreatment = {
            ...data
        }

        this.previousTreatments.push(previousTreatment)

        return [previousTreatment]
    }

    async update(id: string, data: IUpdatePatientDTO) {
        const patientIndex = this.items.findIndex(
            (patient) => patient.id === id
        )

        if (patientIndex === -1) {
            throw new Error('Patient not found')
        }

        const thisPatient = this.items[patientIndex]

        const patient = {
            ...thisPatient,
            ...data
        }

        this.items[patientIndex] = patient

        return patient
    }

    async findAddressByPatientId(id: string) {
        const address = this.addresses.find(
            (address) => address.patient_id === id
        )

        if (!address) {
            return null
        }

        return address
    }

    async findPreviousTreatmentByPatientId(id: string) {
        const previousTreatment = this.previousTreatments.find(
            (previousTreatment) => previousTreatment.patient_id === id
        )

        if (!previousTreatment) {
            return null
        }

        return [previousTreatment]
    }
}
