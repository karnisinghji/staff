import { MatchingRepositoryPort, FindWorkersCriteria, WorkerCandidate } from '../ports/outbound/MatchingRepositoryPort';
export declare class FindWorkersUseCase {
    private readonly repo;
    constructor(repo: MatchingRepositoryPort);
    execute(criteria: FindWorkersCriteria): Promise<WorkerCandidate[]>;
}
