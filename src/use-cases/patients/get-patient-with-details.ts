import { makeGetAddressUseCase } from '../factories/addresses/make-get-address-use-case'
import { makeGetPatientUseCase } from '../factories/patients/make-get-patient-use-case'
import { makeGetTreatmentsUseCase } from '../factories/treatments/make-get-treatments-use-case'

export class GetPatientWithDetailsUseCase {
    async execute(patientId: string) {
        const getPatientUseCase = makeGetPatientUseCase()
        const getAddressUseCase = makeGetAddressUseCase()
        const getTreatmentUseCase = makeGetTreatmentsUseCase()

        const { patient } = await getPatientUseCase.execute({ patientId })
        const addresses = await getAddressUseCase.execute(patientId)
        const treatments = await getTreatmentUseCase.execute(patientId)

        const patientDetails = {
            patient,
            addresses,
            treatments
        }

        return patientDetails
    }
}
