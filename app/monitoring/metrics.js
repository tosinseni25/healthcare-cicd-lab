const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const appointmentsTotal = new client.Counter({
  name: 'appointments_total',
  help: 'Total number of appointments scheduled',
  registers: [register]
});

module.exports = { register, httpRequestsTotal, httpRequestDuration, appointmentsTotal };