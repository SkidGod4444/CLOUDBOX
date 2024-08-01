"use client";
import { AppwriteUser } from "@/db/config";
import { SignIn, SignUp } from "@/db/functions";
import { Models } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";

type User = Models.User<Models.Preferences>;
interface UserContextValue {
  current: User | null;
  session: any;
  signin: (code: string) => Promise<boolean | string | undefined>;
  signout: () => Promise<boolean | string | undefined>;
  signup: (email: string) => Promise<boolean | string | undefined>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [userId, setUserId] = useState("");

  async function signin(code: string) {
    const loggedIn = await SignIn(userId, code);
    setSession(loggedIn);
    return true;
  }

  async function signout() {
    await AppwriteUser.deleteSession("current");
    setSession(null);
    return true;
  }

  async function signup(email: string) {
    const uid: any = await SignUp(email);
    console.log(uid);
    setUserId(uid);
    return true;
  }

  async function init() {
    try {
      const loggedIn = await AppwriteUser.get();
      console.log(loggedIn);
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
      console.log(err);
    }
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, session, signin, signout, signup }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const value = useContext(UserContext);
  if (!value) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return value;
};
