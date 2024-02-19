import HomeNavbar from "@/components/global/navbar/navbar";
import SideNavbar from "@/components/global/sidebar/sidebar";

export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full flex">
          <HomeNavbar />
          <SideNavbar />
        <main className="flex-1 h-full overflow-y-auto">
            {children}
        </main>
    </div>
    );
  }