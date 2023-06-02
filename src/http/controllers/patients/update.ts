import { FastifyReply, FastifyRequest } from 'fastify'

import { makeUpdateAddressUseCase } from '@/use-cases/factories/addresses/make-update-address-use-case'
import { makeUpdatePatientUseCase } from '@/use-cases/factories/patients/make-update-use-case'
import { makeUpdateTreatmentUseCase } from '@/use-cases/factories/treatments/make-update-treatment-use-case'
import { patientDataSchema } from '@/schemas/patient-schemas'
import { z } from 'zod'

export async function updateController(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const paramsSchema = z.object({
        patientId: z.string().uuid(),
        addressId: z.string().uuid(),
        treatmentId: z.string().uuid()
    })

    const { patientId, addressId, treatmentId } = paramsSchema.parse(req.params)

    const {
        name,
        birthday,
        email,
        gender,
        phone,
        reason,
        city,
        endDate,
        neighborhood,
        number,
        startDate,
        state,
        street,
        zipCode,
        treatment,
        complement
    } = patientDataSchema.parse(req.body)

    try {
        const updatePatientUseCase = makeUpdatePatientUseCase()
        const updateAddressUseCase = makeUpdateAddressUseCase()
        const updateTreatmentUseCase = makeUpdateTreatmentUseCase()

        await updatePatientUseCase.execute({
            id: patientId,
            name,
            birth_date: birthday,
            email,
            gender,
            phone,
            reason
        })

        await updateAddressUseCase.execute({
            addressId,
            patientId,
            city,
            complement,
            neighborhood,
            number,
            state,
            street,
            zip_code: zipCode
        })

        await updateTreatmentUseCase.execute({
            patientId,
            treatmentId,
            treatment,
            startDate,
            endDate
        })

        return reply.code(200).send({
            message: 'Patient updated successfully'
        })
    } catch (error) {
        console.error(error)

        return reply.code(500).send({
            message: 'Internal server error'
        })
    }
}
