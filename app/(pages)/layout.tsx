export default function PagesLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="h-full flex">
        <main className="flex-1 h-full overflow-y-auto">
            {children}
        </main>
    </div>
    );
  }