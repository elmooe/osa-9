import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | null;
}

export const OccupationalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
      <p>{entry.description}</p>
      <p>Diagnose by {entry.specialist}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const diagnosis = diagnoses?.find((d) => d.code === code);
          return (
            <li key={code}>
              {code} {diagnosis ? diagnosis.name : ''}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
