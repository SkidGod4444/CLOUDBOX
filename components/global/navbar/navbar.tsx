"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AuthBtn from "../auth/auth.btn";
import { Logo } from "../logo";
import CommunityBtn from "./community.btn";
import SettingsBtn from "../auth/settings.btn";
import { useUser } from "@/context/user.context";
import RulesBtn from "./rules.btn";
import SourceBtn from "./source.btn";
// import { PushUser } from '@/db/functions';

export default function HomeNavbar() {
  const { current } = useUser();

  return (
    <div
      className={cn(
        "fixed z-50 bg-background top-0 flex items-center w-full p-3 border-b-2 border-muted shadow-md transition-all duration-300 ease-in-out",
      )}
    >
      <Logo />
      <div className="flex ml-auto items-center gap-3">
        {/* Check if CloudKey exists in local storage */}
        {current ? (
          <SourceBtn />
        ) : (
          <div className="hidden md:block">
            <AuthBtn />
          </div>
        )}
        <RulesBtn />
        <CommunityBtn />
        {current ? <SettingsBtn /> : null}
      </div>
    </div>
  );
}
