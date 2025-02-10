import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "scheduled" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card bg-[#0000001a]", {
        "bg-appointments": type === "scheduled",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={`${type} appointments`}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-dark-500">{count}</h2>
      </div>

      <p className="text-14-regular text-dark-500">{label}</p>
    </div>
  );
};