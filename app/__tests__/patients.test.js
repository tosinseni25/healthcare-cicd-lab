const request = require('supertest');
const app = require('../server');

describe('Health Check', () => {
  test('GET /health returns healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

describe('Patients API', () => {
  test('GET /api/patients returns array', async () => {
    const res = await request(app).get('/api/patients');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/patients creates a patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', dob: '1990-01-01', insuranceId: 'INS-99999' });
    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('John');
  });

  test('POST /api/patients fails without required fields', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ firstName: 'John' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/patients/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/patients/nonexistent-id');
    expect(res.statusCode).toBe(404);
  });
});

describe('Appointments API', () => {
  test('GET /api/appointments returns array', async () => {
    const res = await request(app).get('/api/appointments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/appointments creates an appointment', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ patientName: 'John Doe', provider: 'Dr. Smith', department: 'Cardiology', date: '2026-05-01', time: '10:00', type: 'New Patient' });
    expect(res.statusCode).toBe(201);
    expect(res.body.patientName).toBe('John Doe');
  });

  test('POST /api/appointments fails without required fields', async () => {
    const res = await request(app)
      .post('/api/appointments')
      .send({ patientName: 'John Doe' });
    expect(res.statusCode).toBe(400);
  });
});