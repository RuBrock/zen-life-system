import clsx from "clsx";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status, description }: { status: Status, description?: string | null }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="status-badge">
          <Image
            src={StatusIcon[status]}
            alt="doctor"
            width={24}
            height={24}
            className="h-fit w-3"
          />
          <p
            className={clsx("text-12-semibold capitalize", {
              "text-green-500": status === "scheduled",
              "text-blue-500": status === "pending",
              "text-red-500": status === "cancelled",
            })}
          >
            {status}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" className="bg-[#e3e5d0] p-2 text-[12px] text-dark-400">{description || 'Sem detalhes adicionais'}</PopoverContent>
    </Popover>
  );
};