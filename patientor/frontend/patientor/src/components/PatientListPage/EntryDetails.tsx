import { Entry, Diagnosis } from "../../types";
import { HealthCheckEntry } from "./HealthCheckEntry";
import { HospitalEntry } from "./HospitalEntry";
import { OccupationalEntry } from "./OccupationalEntry";

export const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] | null }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };