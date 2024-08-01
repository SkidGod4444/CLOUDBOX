import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex">
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
      <Toaster />
    </div>
  );
}
