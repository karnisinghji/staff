export class GetHealthUseCase {
    async execute() { return { status: 'ok', service: 'auth' }; }
}
