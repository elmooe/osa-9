import patients from '../../data/patients';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';
import { parseDiagnosisCodes } from '../utils';

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};
  
const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  if (!entry.description || !entry.date || !entry.specialist || !entry.type) {
    throw new Error('Missing required fields');
  }

  const newEntry = {
    id: uuid(),
    diagnosisCodes: parseDiagnosisCodes(entry),
    ...entry,
  };

  const patient = patients.find(p => p.id === patientId);
  if (!patient) throw new Error('Patient not found');

  switch(newEntry.type) {
    case "Hospital":
      if (!newEntry.discharge) {
        throw new Error('Missing discharge information');
      }
      break;
    case "OccupationalHealthcare":
      if (!newEntry.employerName) {
        throw new Error('Missing employer\'s name');
      }
      break;
    case "HealthCheck":
      if (!newEntry.healthCheckRating) {
        throw new Error('Missing health Check Rating');
      }
      break;
    default:
      throw new Error(`Unhandled entry type: ${JSON.stringify(newEntry)}`);
  }
  patient.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): PatientEntry => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) throw new Error('Patient not found');
  return patient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};
