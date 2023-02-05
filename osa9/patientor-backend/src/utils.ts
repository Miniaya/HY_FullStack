import { NewPatient, NewEntry, Gender, Diagnose, HealthCheckRating, SickLeave, Discharge } from "./types";

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
type EntryFields = { 
  description: unknown,
  date: unknown,
  specialist: unknown,
  type: unknown,
  diagnosisCodes?: unknown,
  healthCheckRating?: unknown,
  employerName?: unknown,
  sickLeave?: SickLeave,
  discharge?: Discharge,
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newPatient;
};

export const toNewEntry = ({ description, date, specialist, type, diagnosisCodes, healthCheckRating, employerName, sickLeave, discharge }: EntryFields): NewEntry => {
  let newEntry: NewEntry;
  switch (type) {
    case 'HealthCheck':
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        type: 'HealthCheck',
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        ...(type === 'HealthCheck' && { healthCheckRating: parseHealthCheckRating(healthCheckRating) }),
      };
      break;
    case 'OccupationalHealthcare':
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        type: 'OccupationalHealthcare',
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        ...(type === 'OccupationalHealthcare' && { employerName: parseName(employerName) }),
        ...(type === 'OccupationalHealthcare' && { sickLeave: {startDate: parseDate(sickLeave?.startDate), endDate: parseDate(sickLeave?.endDate)} }),
      }
      break;
    case 'Hospital':
      newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        type: 'Hospital',
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        ...(type === 'Hospital' && { discharge: {date: parseDate(discharge?.date), criteria: parseDescription(discharge?.criteria)} }),
      }
      break;
    default:
      throw new Error('Incorrect entry type');
  }

  return newEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }

  return description;
}

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose['code']> => {
  if (!codes || !isList(codes)) {
    throw new Error('Incorrect or missing codes: ' + codes);
  }

  return codes;
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }

  return rating;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isList = (list: unknown): list is Array<Diagnose['code']> => {
  return typeof list === 'string' || list instanceof Array;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};