import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

interface GetPatientRequestDTO {
    page: number
    perPage: number
}

interface GetPatientResponseDTO {
    patients: Patient[]
}

export class GetPatientUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        page,
        perPage
    }: GetPatientRequestDTO): Promise<GetPatientResponseDTO> {
        const patients = await this.patientsRepository.findMany(page, perPage)

        return { patients }
    }
}
