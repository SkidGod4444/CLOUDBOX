import MobBottomNavbar from "@/components/global/navbar/mob.nav";
import HomeNavbar from "@/components/global/navbar/navbar";
import SideNavbar from "@/components/global/sidebar/sidebar";
import { Toaster } from "@/components/ui/toaster"

export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full flex">
          <HomeNavbar />
          <SideNavbar />
          <MobBottomNavbar />
        <main className="flex-1 h-full overflow-y-auto">
            {children}
        </main>
        <Toaster />
    </div>
    );
  }