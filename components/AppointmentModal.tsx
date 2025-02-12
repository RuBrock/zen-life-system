"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Appointment } from "@/types/appwrite.types";
import AppointmentForm from "@/components/forms/AppointmentForm";

export const AppointmentModal = ({
  appointment,
  type,
  disabled,
}: {
  appointment?: Appointment;
  type: "schedule" | "edit" | "cancel";
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);
  let typeLabel = '';
  switch(type) {
    case 'schedule': 
      typeLabel = 'agendar';
      break;
    case 'cancel':
      typeLabel = 'cancelar';
      break;
    case "edit":
      typeLabel = 'editar';
      break;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "edit" && "text-green-500"}`}
          disabled={disabled}
        >
          {typeLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{typeLabel} Marcação</DialogTitle>
          <DialogDescription>
            Por favor preencha os seguintes detalhes para {typeLabel} a marcação
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};