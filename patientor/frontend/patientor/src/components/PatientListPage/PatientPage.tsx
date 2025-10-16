import { useMatch } from "react-router-dom";
import patientsService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { Patient, Diagnosis, NewEntry } from "../../types";
import { EntryDetails } from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import axios from 'axios';
import { Button } from "@mui/material";

interface Props {
  id: string;
}

export const PatientPage = ({ id }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const match = useMatch("/patients/:id");

  useEffect(() => {
    const fetchPatient = async () => {
      if (match && match.params.id) {
        const patientData = await patientsService.getPatientById(match.params.id);
        setPatient(patientData);
      }
    };
    void fetchPatient();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnoseService.getAll();
      setDiagnoses(diagnosesData);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const updatedPatient = await patientsService.addEntry(patient.id, values);
      setPatient({ ...patient, entries: [...patient.entries, updatedPatient] });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data.error) {
          const messages = e.response.data.error.replace('Something went wrong. Error: ', '');
          console.error(messages);
          setError(messages);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>{patient.name} {patient.gender}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      <h3>Entries</h3>
      <br />
      {patient.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        <>
          {patient.entries.map((entry) => (
            <div key={entry.id} style={{ border: "1px solid black", borderRadius: "5px", marginBottom: "10px", padding: "10px" }}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};