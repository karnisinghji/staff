interface TracingOptions {
    serviceName?: string;
    disableAutoInstrumentation?: boolean;
    exporter?: 'otlp-http' | 'console';
    resource?: any;
}
export declare function startTracing(opts?: TracingOptions): Promise<void>;
export declare function stopTracing(): Promise<void>;
export declare function isTracingEnabled(): boolean;
export {};
