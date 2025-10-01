import express from 'express';
/**
 * buildApp
 * Central factory that constructs and configures the Express application for the user-service.
 * This isolates infrastructure wiring from process bootstrap (env loading, listening) enabling:
 *  - Reuse in tests without side effects (no implicit server listen)
 *  - Future dependency injection (pass fakes/mocks) by extending options signature
 *  - Consistent instrumentation & error-handling assembly.
 */
export declare function buildApp(): express.Express;
export default buildApp;
