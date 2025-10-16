import express, { NextFunction, Request, Response } from 'express';
import patientService from '../services/patientService';
import { Entry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { NewPatientEntrySchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<PatientEntry | { error: string }>) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/:id/entries', (req, res: Response<Entry | { error: string }>) => {
  const patientId = req.params.id;
  const entry = req.body as Entry;

  try {
    const newEntry = patientService.addEntry(patientId, entry);
    res.status(201).send(newEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser,(req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware);

export default router;