import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateAddressUseCase } from '@/use-cases/factories/addresses/make-create-address-use-case'
import { makeCreatePatientUseCase } from '@/use-cases/factories/patients/make-create-patient-use-case'
import { makeCreateTreatmentUseCase } from '@/use-cases/factories/treatments/make-create-treatment-use-case'
import { patientDataSchema } from '@/schemas/patient-schemas'

/**
 * Função responsável por lidar com a rota de criação de paciente.
 * @param req - O objeto de solicitação FastifyRequest.
 * @param reply - O objeto de resposta FastifyReply.
 * @returns Uma resposta de status HTTP contendo os dados do paciente criado.
 */
export async function createController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const {
        name,
        birthday,
        email,
        gender,
        phone,
        reason,
        city,
        neighborhood,
        number,
        state,
        street,
        zipCode,
        complement,
        treatment,
        startDate,
        endDate
    } = patientDataSchema.parse(req.body)

    try {
        const createPatientUseCase = makeCreatePatientUseCase()
        const createAddressUseCase = makeCreateAddressUseCase()
        const createPreviousTreatmentUseCase = makeCreateTreatmentUseCase()

        const { patient } = await createPatientUseCase.execute({
            name,
            birthday,
            email,
            gender,
            reason,
            phone
        })

        await createAddressUseCase.execute({
            patient_id: patient.id,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
            zip_code: zipCode
        })

        await createPreviousTreatmentUseCase.execute({
            patient_id: patient.id,
            treatment,
            startDate,
            endDate
        })

        return reply.code(201).send({ patient })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}
