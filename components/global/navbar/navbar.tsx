"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AuthBtn from "../auth/auth.btn";
import { Logo } from "../logo";
import SourceBtn from "./source.btn";
import CommunityBtn from "./community.btn";
import SettingsBtn from '../auth/settings.btn';
import { PushUser } from '@/db/functions';

export default function HomeNavbar() {
  const [cloudKeyExists, setCloudKeyExists] = useState(false);

  useEffect(() => {
    // Check local storage for the presence of 'CloudKey' when the component mounts
    if (typeof window !== 'undefined') {
    const cloudKey = localStorage.getItem('CloudKey');
    if (cloudKey) {
      setCloudKeyExists(true);
      PushUser(cloudKey.toString());
    } else {
      setCloudKeyExists(false);
    }}

    // Add event listener for changes to local storage
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
      const updatedCloudKey = localStorage.getItem('CloudKey');
      if (updatedCloudKey) {
        setCloudKeyExists(true);
      } else {
        setCloudKeyExists(false);
      }
    }};

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={cn(
        "fixed z-50 bg-background top-0 flex items-center w-full p-3 border-b-2 border-muted shadow-md transition-all duration-300 ease-in-out"
    )}>
     <Logo />
     <div className='flex ml-auto items-center gap-3'>
      {/* Check if CloudKey exists in local storage */}
      {cloudKeyExists ? null : <AuthBtn />}
      <SourceBtn />
      <CommunityBtn />
      {cloudKeyExists ? <SettingsBtn /> : null}
     </div>
    </div>
  )
}
