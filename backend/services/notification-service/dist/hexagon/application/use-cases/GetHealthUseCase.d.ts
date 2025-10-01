export interface HealthInfo {
    service: string;
    status: 'healthy';
    timestamp: string;
    version: string;
}
export declare class GetHealthUseCase {
    private readonly version;
    constructor(version: string);
    execute(): HealthInfo;
}
