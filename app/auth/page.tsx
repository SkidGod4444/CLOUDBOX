"use client";
import { AuthFormCard } from "@/components/global/auth/auth.form";
import { useUser } from "@/context/user.context";
import React, { useEffect } from "react";

export default function Auth() {
  const { current } = useUser();

  useEffect(() => {
    if (current) {
      window.location.href = "/";
    }
  }, [current]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {current ? null : <AuthFormCard />}
    </div>
  );
}
