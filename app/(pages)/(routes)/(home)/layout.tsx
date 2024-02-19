import HomeNavbar from "@/components/global/navbar/navbar";

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full">
            <HomeNavbar />
            <main className="h-full">
                {children}
            </main>
        </div>
    );
  }