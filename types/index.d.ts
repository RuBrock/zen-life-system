/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}
declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  employee: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  appointment: Appointment;
};