import { LayoutDashboard } from "lucide-react";

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-md overflow-hidden bg-white">
                <img 
                    src="/assets/logo.png" 
                    alt="Alus Astech Logo" 
                    className="size-full object-contain"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left">
                <span className="truncate leading-tight font-bold text-lg tracking-tight">
                    Alus Astech
                </span>
            </div>
        </div>
    );
}
