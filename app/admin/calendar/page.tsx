'use client'

import withAuth from "@/components/withAuth";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";
import { SetStateAction, useCallback, useEffect, useState } from "react";

import { Calendar, dateFnsLocalizer, Event, Views } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { ptBR } from 'date-fns/locale'

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const CalendarPage = () => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [myEvents, setMyEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    const getAppointmentsData = async () => {
      try {
        const appointmentsList = await getRecentAppointmentList();
        const appointments: Array<Appointment> = appointmentsList.documents;

        if (appointments) {
          const newEvents: Event = appointments.map((appointment, i) => {
            return {
              id: i,
              title: `${appointment?.patientName} - ${appointment?.employee?.name}`,
              start: new Date(appointment?.schedule),
              end: new Date(new Date(appointment?.schedule).setHours(new Date(appointment?.schedule).getHours() + 1)),
            }
          })
          setMyEvents(newEvents);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getAppointmentsData();
  }, []);

  const handleNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const handleViewChange = useCallback((newView: SetStateAction<any>) => {
    setView(newView);
  }, []);

  return (
    <main className="mx-auto flex max-w-7xl flex-col my-10">
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

        </div>
      </section>
          <Calendar
            culture={"pt-BR"}
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            date={date}
            onNavigate={handleNavigate}
            view={view}
            onView={handleViewChange}
            style={{ height: 600, width: "100%" }}
          />
    </main>
  );
};

export default withAuth(CalendarPage);