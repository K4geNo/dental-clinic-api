import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateAddressUseCase } from '@/use-cases/factories/make-create-address-use-case'
import { makeCreatePatientUseCase } from '@/use-cases/factories/make-create-patient-use-case'
import { makeCreatePreviousTreatmentUseCase } from '@/use-cases/factories/make-create-previous-treatment'
import { z } from 'zod'

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
    // Define o esquema de validação para os dados do paciente
    const createBodySchema = z.object({
        name: z.string(),
        birthday: z.coerce.date(),
        gender: z.enum(['male', 'female']),
        phone: z.string(),
        email: z.string().email(),
        reason: z.string(),
        street: z.string(),
        number: z.string(),
        complement: z.string().optional(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
        treatment: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date()
    })

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
    } = createBodySchema.parse(req.body)

    try {
        // Cria instâncias dos casos de uso
        const createPatientUseCase = makeCreatePatientUseCase()
        const createAddressUseCase = makeCreateAddressUseCase()
        const createPreviousTreatmentUseCase =
            makeCreatePreviousTreatmentUseCase()

        // Executa o caso de uso createPatientUseCase para criar um novo paciente
        const { patient } = await createPatientUseCase.execute({
            name,
            birthday,
            email,
            gender,
            reason,
            phone
        })

        // Executa o caso de uso createAddressUseCase para criar o endereço do paciente
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

        // Executa o caso de uso createPreviousTreatmentUseCase para criar o tratamento anterior do paciente
        await createPreviousTreatmentUseCase.execute({
            patient_id: patient.id,
            treatment,
            startDate,
            endDate
        })

        reply.code(201).send({ patient })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }

        throw error
    }
}
