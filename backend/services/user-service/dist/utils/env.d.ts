interface Options {
    required?: string[];
    serviceName: string;
}
export declare function initEnv({ required, serviceName }: Options): string;
export declare function getRequired(name: string, serviceName: string): string;
export {};
