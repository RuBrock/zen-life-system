"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment, Employee } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { getEmployees } from "@/lib/actions/employee.actions";
import { useAppointments } from "@/contexts/appointments";

interface Props {
  type: "schedule" | "edit" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const AppointmentForm = ({
  type = "schedule",
  appointment,
  setOpen,
}: Props) => {
  const { toggleRevalidate } = useAppointments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  useEffect(() => {
    const getEmployeesData = async () => {
      try {
        const employees = await getEmployees();
        if (employees) {
          setEmployees(employees);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getEmployeesData();
  }, [])

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      employee: appointment?.employee.$id || "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      patientName: appointment?.patientName || "",
      patientEmail: appointment?.patientEmail || "",
      patientPhone: appointment?.patientPhone || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    console.log('ONSUBMIT')
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
      case "edit":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = null;
    }

    try {
      if (type === "schedule" && values.employee) {
        const appointment = {
          employee: values.employee,
          schedule: new Date(values.schedule),
          patientName: values.patientName,
          patientEmail: values.patientEmail,
          patientPhone: values.patientPhone,
          note: values.note,
          status: status as Status,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          toast.success('Marcação criada com sucesso!');
          router.push(
            `/admin`
          );
        }
      } else {
        const appointmentToUpdate = {
          appointmentId: appointment.$id,
          appointment: {
            employee: values?.employee,
            schedule: new Date(values.schedule),
            patientName: values?.patientName,
            patientEmail: values?.patientEmail,
            patientPhone: values?.patientPhone,
            note: values?.note,
            status: status as Status,
            cancellationReason: values?.cancellationReason ? values.cancellationReason : null,
          }
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          form.reset();
          toast.success(`Marcação ${type === 'cancel' ? 'cancelada' : 'atualizada'} com sucesso!`);
          toggleRevalidate(true);
          if(typeof setOpen === 'function') {
            setOpen(false);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancelar Marcação";
      break;
    case "schedule":
      buttonLabel = "Confirmar Marcação";
      break;
    case "edit":
      buttonLabel = "Atualizar Marcação";
      break;
    default:
      buttonLabel = null;
  }

  const onInvalid = (errors: any) => console.error(errors)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="flex-1 space-y-6">
        {type === "cancel" && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Razão para cancelamento"
              placeholder="Surgiu uma reunião urgente"
            />
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="employee"
              label="Doutor(a)"
              placeholder="Selecione um(a) doutor(a)"
            >
              {employees.map((employee) => (
                <SelectItem className="shad-select-item" key={employee.$id} value={employee.$id}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{employee.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data da marcação"
              showTimeSelect
            />

          <section className="space-y-2 mt-4">
            <div className="mb-2">
              <h2 className="sub-header">Informações do Paciente</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="patientName"
              label="Nome Completo"
              placeholder="John Doe"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="patientEmail"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="patientPhone"
              label="Celular"
              placeholder="(11) 99999-9999"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="note"
              label="Comentários/Notas"
              placeholder="Liberação de pontos-gatilho, dores na lombar"
            />

          </section>
          </>
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full p-6`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;