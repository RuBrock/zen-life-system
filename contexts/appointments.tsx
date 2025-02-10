import { createContext, useState, useContext, ReactNode, useCallback } from "react";

interface AppointmentsContextType {
  revalidateAppointments: boolean;
  toggleRevalidate: (revalidate: boolean) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  const [revalidateAppointments, setRevalidateAppointments] = useState(true);

  const toggleRevalidate = useCallback((revalidate: boolean) => {
    setRevalidateAppointments(revalidate);
  }, []);

  return (
    <AppointmentsContext.Provider
      value={{ revalidateAppointments, toggleRevalidate }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within an AppointmentsProvider");
  }
  return context;
};