"use server";

import { z } from "zod";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/db/config";
import { getLucia } from "./auth";
import { signInSchema, signUpSchema } from "@/components/global/auth/auth.form";

export async function signUp(values: z.infer<typeof signUpSchema>) {
  const lucia = await getLucia();
  try {
    // if user already exists, throw an error
    const existingUser = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });
    if (existingUser) {
      return { error: "User already exists", success: false };
    }

    const hashedPassword = await new Argon2id().hash(values.password);
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(), // Generate a unique ID
        email: values.email.toLowerCase(),
        name: values.name,
        hashedPassword,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong", success: false };
  }
}

export async function signIn(values: z.infer<typeof signInSchema>) {
  const lucia = await getLucia();
  const user = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });
  if (!user || !user.hashedPassword) {
    return { success: false, error: "Invalid Credentials!" };
  }
  const passwordMatch = await new Argon2id().verify(
    user.hashedPassword,
    values.password,
  );
  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials!" };
  }
  // successfully login
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return { success: true };
}

export async function logOut() {
  const lucia = await getLucia();
  const sessionCookie = await lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/auth");
}

