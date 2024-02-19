"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/theme.toggler";


export default function HomeNavbar() {
  return (
    <div className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-3 border-b-2 border-muted shadow-md transition-all duration-300 ease-in-out"
    )}>
     {/* <Logo /> */}
     <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ThemeToggle />
     </div>
    </div>
  )
}
