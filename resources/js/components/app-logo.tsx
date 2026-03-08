import { LayoutDashboard } from "lucide-react";

export default function AppLogo() {
    return (
        <div className="flex items-center gap-5">
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <LayoutDashboard className="size-5 fill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Astech Alus
                </span>
            </div>
        </div>
    );
}
