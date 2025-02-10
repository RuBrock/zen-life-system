"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { StatusBadge } from "../StatusBadge";
import { AppointmentModal } from "../AppointmentModal";
import { Button } from "../ui/button";
import Image from "next/image";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patientName",
    header: "Paciente",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patientName}</p>;
    },
  },
  {
    accessorKey: "patientPhone",
    header: "Contato Paciente",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patientPhone} {appointment?.patientEmail ? ` - ${appointment.patientEmail}` : ''}</p>;
    },
  },
  {
    accessorKey: "schedule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Marcação
          <Image
            src="/assets/icons/sort.svg"
            height={24}
            width={24}
            alt="sort icon"
          />
        </Button>
      )
    },
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge 
            status={appointment.status} 
            description={appointment.status === 'cancelled' ? appointment.cancellationReason : appointment.note} 
          />
        </div>
      );
    },
  },
  {
    accessorKey: "employee",
    header: "Doutor(a)",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap">{appointment.employee.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            appointment={appointment}
            type="cancel"
            disabled={appointment.status === 'cancelled'}
          />
        </div>
      );
    },
  },
];