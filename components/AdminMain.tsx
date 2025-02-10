'use client'

import { StatCard } from "@/components/StatCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { DataTable } from "@/components/table/DataTable"
import { columns } from "@/components/table/columns"
import { useAppointments } from "@/contexts/appointments"

const AdminMain = () => {
  const { revalidateAppointments, toggleRevalidate } = useAppointments();
  const [appointments, setAppointments] = useState({})

  useEffect(() => {
    const getAppointmentsData = async () => {
      try {
        const appointments = await getRecentAppointmentList();
        if (appointments) {
          setAppointments(appointments);
          toggleRevalidate(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (revalidateAppointments) {
      getAppointmentsData();
    }
  }, [revalidateAppointments, toggleRevalidate]);

  return (
        <main className="admin-main">
          <section className="w-full space-y-4 flex flex-col justify-between md:items-center md:flex-row">
            <div>
              <h1 className="header">Bem-vinda(o) 👋</h1>
              <p className="text-dark-500">Comece o dia gerenciando as marcações</p>
            </div>
            <Button className="shad-primary-btn p-6 w-full md:w-auto" asChild>
              <Link href="/admin/new-appointment">Nova Marcação</Link>
            </Button>
          </section>

          <section className="admin-stat">
            <StatCard
              type="scheduled"
              count={appointments?.scheduledCount}
              label="Marcações agendadas"
              icon={"/assets/icons/appointments.svg"}
            />
            <StatCard
              type="cancelled"
              count={appointments?.cancelledCount}
              label="Marcações canceladas"
              icon={"/assets/icons/cancelled.svg"}
            />
          </section>

          <DataTable columns={columns} data={appointments?.documents || []} />
        </main>
  )
}

export default AdminMain;