"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@prisma/client";
import { logOut } from "@/lib/auth/auth.actions";
import { validateRequest } from "@/lib/auth/auth";
import { usePathname } from 'next/navigation';

interface UserContextValue {
  current: User | null;
  session: Session | null;
  signout: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  async function signout() {
    await logOut();
    setUser(null);
    setSession(null);
  }

  async function fetchUser() {
    try {
      const response = await fetch('/api/fetch/user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user data');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  }

  useEffect(() => {
    async function init() {
      try {
        const { user: validUser, session } = await validateRequest();
        if (validUser && session) {
          setSession({
            id: session.id,
            userId: session.userId,
            expiresAt: session.expiresAt,
            xata_id: '',
            xata_version: 0,
            xata_createdat: new Date(),
            xata_updatedat: new Date()
          });
          fetchUser();
        } else {
          setUser(null);
          setSession(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    if (!user) {
      init();
    }
  }, [pathname, user]);

  return (
    <UserContext.Provider value={{ current: user, session, signout, loading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
