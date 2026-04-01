const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let patients = [
  { id: uuidv4(), firstName: 'Sarah', lastName: 'Johnson', dob: '1985-03-15', email: 'sarah.johnson@email.com', insuranceId: 'INS-10234' },
  { id: uuidv4(), firstName: 'Michael', lastName: 'Chen', dob: '1979-07-22', email: 'michael.chen@email.com', insuranceId: 'INS-10235' },
  { id: uuidv4(), firstName: 'Emily', lastName: 'Rodriguez', dob: '1992-11-08', email: 'emily.rodriguez@email.com', insuranceId: 'INS-10236' }
];

router.get('/', (req, res) => {
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
});

router.post('/', (req, res) => {
  const { firstName, lastName, dob, email, insuranceId } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'firstName, lastName, and email are required' });
  }
  const patient = { id: uuidv4(), firstName, lastName, dob, email, insuranceId };
  patients.push(patient);
  res.status(201).json(patient);
});

router.put('/:id', (req, res) => {
  const index = patients.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Patient not found' });
  patients[index] = { ...patients[index], ...req.body };
  res.json(patients[index]);
});

router.delete('/:id', (req, res) => {
  const index = patients.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Patient not found' });
  patients.splice(index, 1);
  res.status(204).send();
});

module.exports = router;