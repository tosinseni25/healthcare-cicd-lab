const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { appointmentsTotal } = require('../monitoring/metrics');

let appointments = [
  { id: uuidv4(), patientName: 'Sarah Johnson', provider: 'Dr. James Wilson', department: 'Cardiology', date: '2026-04-05', time: '09:00', type: 'Follow-up', status: 'scheduled', notes: 'Annual checkup' },
  { id: uuidv4(), patientName: 'Michael Chen', provider: 'Dr. Emily Torres', department: 'Neurology', date: '2026-04-06', time: '11:00', type: 'New Patient', status: 'scheduled', notes: 'Initial consultation' },
  { id: uuidv4(), patientName: 'Emily Rodriguez', provider: 'Dr. Sarah Park', department: 'Orthopedics', date: '2026-04-07', time: '14:00', type: 'Follow-up', status: 'scheduled', notes: 'Post-surgery checkup' }
];

router.get('/', (req, res) => {
  let result = appointments;
  if (req.query.date) result = result.filter(a => a.date === req.query.date);
  if (req.query.status) result = result.filter(a => a.status === req.query.status);
  res.json(result);
});

router.get('/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === req.params.id);
  if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
  res.json(appointment);
});

router.post('/', (req, res) => {
  const { patientName, provider, department, date, time, type } = req.body;
  if (!patientName || !provider || !date || !time) {
    return res.status(400).json({ error: 'patientName, provider, date, and time are required' });
  }
  const appointment = { id: uuidv4(), patientName, provider, department, date, time, type, status: 'scheduled', notes: req.body.notes || '' };
  appointments.push(appointment);
  appointmentsTotal.inc();
  res.status(201).json(appointment);
});

router.put('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Appointment not found' });
  appointments[index] = { ...appointments[index], ...req.body };
  res.json(appointments[index]);
});

router.delete('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Appointment not found' });
  appointments[index].status = 'cancelled';
  res.status(204).send();
});

module.exports = router;