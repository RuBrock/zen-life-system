'use client'

import withAuth from "@/components/withAuth"
import Image from "next/image"
import Link from "next/link"
import { AppointmentsProvider } from "@/contexts/appointments"
import AdminMain from "@/components/AdminMain"

const Admin = () => {
  return (
    <AppointmentsProvider>
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/images/zen-life-logo.png"
              height={48}
              width={48}
              alt="zen life logo"
              className="h-12 w-fit"
            />
          </Link>

          <p className="text-16-semibold text-white">Dashboard</p>
        </header>

        <AdminMain />
      </div>
    </AppointmentsProvider>
  )
}

export default withAuth(Admin)