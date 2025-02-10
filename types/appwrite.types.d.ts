import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
}

export interface Employee extends Models.Document {
  name: string;
}

export interface Appointment extends Models.Document {
  employee: Employee;
  patientName: string;
  patientEmail: string | null;
  patientPhone: string;
  schedule: Date;
  status: Status;
  note: string | null;
  cancellationReason: string | null;
}