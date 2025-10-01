import { MatchingRepositoryPort, FindContractorsCriteria, ContractorCandidate } from '../ports/outbound/MatchingRepositoryPort';
export declare class FindContractorsUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(criteria: FindContractorsCriteria): Promise<ContractorCandidate[]>;
}
