import { MatchingRepositoryPort, FindWorkersCriteria, WorkerCandidate } from '../ports/outbound/MatchingRepositoryPort';

export class FindWorkersUseCase {
    constructor(private readonly repo: MatchingRepositoryPort) { }

    async execute(criteria: FindWorkersCriteria): Promise<WorkerCandidate[]> {
        // TODO: add validation + scoring enrichment pipeline
        return this.repo.findWorkers(criteria);
    }
}
