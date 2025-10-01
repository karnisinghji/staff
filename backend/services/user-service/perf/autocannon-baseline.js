// Simple autocannon baseline script for user-service
// Usage: node perf/autocannon-baseline.js (ensure service running locally)

import autocannon from 'autocannon';

const target = process.env.TARGET || 'http://localhost:3002';

async function run() {
  const instance = autocannon({
    url: target,
    connections: 20,
    duration: 15,
    timeout: 10,
    requests: [
      { method: 'GET', path: '/api/health' },
      { method: 'GET', path: '/metrics' },
      { method: 'GET', path: '/api/skills' }
    ]
  });

  autocannon.track(instance, { renderProgressBar: true });

  instance.on('done', (result) => {
    const summary = {
      latencyP95: result.latency.p95,
      rpsAvg: result.requests.average,
      errors: result.errors,
      timeouts: result.timeouts
    };
    // eslint-disable-next-line no-console
    console.log('\nBaseline Summary:', JSON.stringify(summary, null, 2));
  });
}

run();
