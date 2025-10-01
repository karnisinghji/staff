export interface HealthInfo { service: string; status: 'healthy'; timestamp: string; version: string; }
export class GetHealthUseCase { constructor(private readonly version: string) { } execute(): HealthInfo { return { service: 'Notification Service', status: 'healthy', timestamp: new Date().toISOString(), version: this.version }; } }
