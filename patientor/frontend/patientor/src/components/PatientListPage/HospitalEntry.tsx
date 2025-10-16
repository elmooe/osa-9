import { Diagnosis, HospitalEntry as HospitalEntryType } from "../../types";

interface Props {
  entry: HospitalEntryType;
  diagnoses: Diagnosis[] | null;
}

export const HospitalEntry = ({ entry, diagnoses }: Props) => {
  return (
    <div>
      <h3>{entry.date}</h3>
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
      <p>
        <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
      </p>
    </div>
  );
};