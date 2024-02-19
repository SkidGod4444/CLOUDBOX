"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/theme.toggler";


export default function HomeNavbar() {
  return (
    <div className={cn(
        "fixed z-50 bg-background top-0 flex items-center w-full p-3 border-b-2 border-muted shadow-md transition-all duration-300 ease-in-out"
    )}>
     {/* <Logo /> */}
     <div className='flex ml-auto items-center gap-3'>
        <ThemeToggle />
     </div>
    </div>
  )
}
