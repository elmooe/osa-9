import { NewEntry, Entry, Diagnosis, HealthCheckRating } from "../../types";
import { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, ListItemText, OutlinedInput } from "@mui/material";
import diagnoseService from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosesFromDB, setallDiagnosesFromDB] = useState<Diagnosis[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnoseService.getAll();
        setallDiagnosesFromDB(diagnoses);
      } catch (error) {
        console.error('Error fetching diagnoses', error);
      }
    };
    void fetchDiagnoses();
  }, []);

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      date,
      specialist,
      description,
      diagnosisCodes: diagnosisCodes.filter(code => code !== ''),
    };

    switch (entryType) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating
        });
        break;
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
            sickLeave: {
              startDate: sickLeaveStartDate,
              endDate: sickLeaveEndDate
            }
        });
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={entryType}
            label="Entry Type"
            onChange={(e) => setEntryType(e.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare')}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Date"
          type="date"
          fullWidth 
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth 
          margin="normal"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          fullWidth 
          margin="normal"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={(event) => {
              const value = event.target.value;
              setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
            }}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {allDiagnosesFromDB.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
                <ListItemText primary={`${diagnosis.code} - ${diagnosis.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === 'HealthCheck' && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
        )}

        {entryType === 'Hospital' && (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth 
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth 
              margin="normal"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {entryType === 'OccupationalHealthcare' && (
          <>
            <TextField
              label="Employer Name"
              fullWidth 
              margin="normal"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth 
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth 
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}

        <div style={{ marginTop: '16px' }}>
          <Button type="submit" style={{ float: "right" }} variant="contained">Add</Button>
          <Button type="button" style={{ float: "left" }} variant="contained" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;