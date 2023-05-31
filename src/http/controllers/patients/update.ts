// import { FastifyReply, FastifyRequest } from 'fastify'

// import { makeGetPatientUseCase } from '@/use-cases/factories/make-get-patient-use-case'
// import { makeUpdatePatientUseCase } from '@/use-cases/factories/make-update-patient-use-case'
// import { createBodySchema as updateBodySchema } from '@/schemas/patient-schemas'
// import { z } from 'zod'

// export async function updateController(
//     req: FastifyRequest,
//     reply: FastifyReply
// ) {
//     const paramsSchema = z.object({
//         id: z.string()
//     })

//     const { id } = paramsSchema.parse(req.params)

//     const {
//         name,
//         birthday,
//         email,
//         gender,
//         phone,
//         reason,
//         city,
//         neighborhood,
//         number,
//         state,
//         street,
//         zipCode,
//         complement,
//         treatment,
//         startDate,
//         endDate
//     } = updateBodySchema.parse(req.body)

//     try {
//         const getPatientUseCase = makeGetPatientUseCase()
//         const updatePatientUseCase = makeUpdatePatientUseCase()

//         const { patient } = await getPatientUseCase.execute({
//             patientId: id
//         })

//         if (!patient) {
//             return reply.code(404).send({
//                 message: 'Patient not found'
//             })
//         }

//         await updatePatientUseCase.execute({
//             patientId: patient.id,
//             name,
//             birthday,
//             email,
//             city,
//             complement,
//             endDate,
//             gender,
//             neighborhood,
//             number,
//             phone,
//             reason,
//             startDate,
//             state,
//             street,
//             treatment,
//             zip_code: zipCode
//         })

//         return reply.code(200).send({
//             message: 'Patient updated successfully'
//         })
//     } catch (error) {
//         return reply.code(400).send({
//             message: 'Patient not found'
//         })
//     }
// }
