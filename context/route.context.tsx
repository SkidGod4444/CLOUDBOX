"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "./user.context";

export const RoutesContext = ({
  children,
  protectedRoutes,
  publicRoutes,
}: {
  children: React.ReactNode;
  protectedRoutes: string[];
  publicRoutes: string[];
}) => {
  const { current , loading } = useUser();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!loading) {
      const handleRedirect = async () => {
        if (current && publicRoutes.includes(path)) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 0.1 seconds
          router.replace("/");
        } else if (!current && protectedRoutes.includes(path)) {
          await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 0.1 seconds
          router.replace("/auth");
        }
      };

      handleRedirect();
    }
  }, [current, loading, path, publicRoutes, protectedRoutes, router]);

  return children;
};