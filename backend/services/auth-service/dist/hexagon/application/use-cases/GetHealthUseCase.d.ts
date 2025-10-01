export declare class GetHealthUseCase {
    execute(): Promise<{
        status: string;
        service: string;
    }>;
}
