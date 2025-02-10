import { z } from "zod"

export const PatientFormValidation = z.object({
  name: z.string()
  .min(2, "Nome precisa conter pelo menos 2 caracteres")
  .max(100, "Nome deve conter no máximo 100 caracteres"),
  email: z.string().email("Endereço de email inválido"),
  phone: z.string()
  .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número de celular inválido"),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "O paciente deve concordar com a política de privacidade",
    }),
})

export const ScheduleAppointmentSchema = z.object({
  employee: z.string().min(2, "Selecione pelo menos um(a) doutor(a)"),
  schedule: z.coerce.date(),
  patientName: z.string()
  .min(2, "Nome precisa conter pelo menos 2 caracteres")
  .max(100, "Nome deve conter no máximo 100 caracteres"),
  patientEmail: z.string().optional(),
  patientPhone: z.string()
  .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número de celular inválido"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  employee: z.string().optional(),
  schedule: z.coerce.date().optional(),
  patientName: z.string().optional(),
  patientEmail: z.string().optional(),
  patientPhone: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Razão para cancelamento deve ter pelo menos 2 caracteres")
    .max(500, "Razão para cancelamento deve ter no máximo 1000 caracteres"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "schedule":
      return ScheduleAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}