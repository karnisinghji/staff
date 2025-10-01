import { MatchingRepositoryPort, FindContractorsCriteria, ContractorCandidate } from '../ports/outbound/MatchingRepositoryPort';

export class FindContractorsUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(criteria: FindContractorsCriteria): Promise<ContractorCandidate[]> {
        // TODO: add validation + scoring enrichment pipeline
        return this.repo.findContractors(criteria);
    }
}
