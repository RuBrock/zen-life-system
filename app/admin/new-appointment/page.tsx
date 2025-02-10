'use client'

import Image from "next/image";

import AppointmentForm from "@/components/forms/AppointmentForm";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppointmentsProvider } from "@/contexts/appointments";

const NewAppointment = () => {
  return (
    <AppointmentsProvider>
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between pb-12">
          <div className="flex justify-between items-center mb-12">
          <Button asChild>
            <Link href="/admin" title="Voltar" className="!p-0">
              <Image
                src="/assets/icons/back-arrow.svg"
                height={1000}
                width={1000}
                alt="back arrow"
                className="h-12 w-fit"
              />
            </Link>
          </Button>

          <Image
            src="/assets/images/zen-life-logo-full.jpg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-14 w-fit rounded-md"
          />
          </div>

          <AppointmentForm type="schedule" />
        </div>
      </section>
    </div>
    </AppointmentsProvider>
  );
};

export default withAuth(NewAppointment);