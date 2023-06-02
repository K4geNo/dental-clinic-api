import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'

interface SearchPatientRequestDTO {
    query: string
    page: number
}

interface SearchPatientResponseDTO {
    patients: Patient[]
}

export class SearchPatientUseCase {
    constructor(private patientsRepository: PatientsRepository) {}

    async execute({
        query,
        page
    }: SearchPatientRequestDTO): Promise<SearchPatientResponseDTO> {
        const patients = await this.patientsRepository.search(query, page)

        return {
            patients
        }
    }
}
