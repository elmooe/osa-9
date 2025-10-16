import { Diagnosis, HealthCheckEntry as HealthCheckEntryType } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntryType;
  diagnoses: Diagnosis[] | null;
}

export const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <p>{entry.date} <MedicalServicesIcon /></p>
      <p>{entry.description}</p>
      <p>
        <FavoriteIcon 
          sx={{ 
            color: entry.healthCheckRating === 0 ? 'gold' : 
                   entry.healthCheckRating === 1 ? 'green' : 'red',
          }} 
        />
      </p>
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
