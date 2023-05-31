import { GetPatientWithDetailsUseCase } from '@/use-cases/patients/get-patient-with-details'

export function makeGetPatientWithDetailsUseCase() {
    const getPatientWithDetailsUseCase = new GetPatientWithDetailsUseCase()

    return getPatientWithDetailsUseCase
}
