import ErrorIcon from "@/icons/error-icon";
import InfoIcon from "@/icons/info-icon";
import SuccessIcon from "@/icons/success-icon";
import WarningIcon from "@/icons/warning-icon";
import { toast } from "sonner";
import { cn } from "./utils";

export function showToast(message: string, type: "success" | "error" | "info" | "warning") {
  toast.custom(() => (
    <div className={cn("w-96 flex items-center shadow-md  bg-[#fefefe] p-3 px-4 rounded-md", type === "success" && "shadow-green-400", type === "error" && "shadow-red-400", type === "warning" && "shadow-yellow-400", type === "info" && "shadow-blue-400")}>
      {type === "success" && <SuccessIcon className="mr-[6px] shrink-0" fill="#008236" width={22} height={22} />}
      {type === "info" && <InfoIcon className="mr-[6px] shrink-0" fill="#2b7fff" width={22} height={22} />}
      {type === "warning" && <WarningIcon className="mr-[6px] shrink-0" fill="#efb100" width={22} height={22} />}
      {type === "error" && <ErrorIcon className="mr-[6px] shrink-0" fill="#fb2c36" width={22} height={22} />}

      <h1 className={cn("font-bold", type === "success" && "text-green-700", type === "error" && "text-red-500", type === "warning" && "text-yellow-500", type === "info" && "text-blue-500")}>{message}</h1>
    </div>
  ));
}
