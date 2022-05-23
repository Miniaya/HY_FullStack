import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

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

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
};