import { NewPatientEntry, Gender, DiagnoseEntry } from './types';
import { z } from 'zod';

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.any())
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};