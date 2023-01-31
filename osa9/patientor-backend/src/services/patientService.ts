import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from '../types';

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return(newPatient);
};

const getPatient = (id: string): Patient => {
  return patients.filter((patient: Patient) => patient.id === id)[0];
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  for (let i = 0 ; i < patients.length ; i++) {
    if (patients[i].id == patientId) {
      patients[i].entries.push(newEntry as Entry);
      break;
   }
  }

  return(newEntry as Entry);
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};