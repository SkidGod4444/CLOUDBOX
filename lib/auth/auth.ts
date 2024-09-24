'use server';
import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cookies } from "next/headers";
import { prisma } from "@/db/config";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

const createLucia = () => new Lucia(adapter, {
  sessionCookie: {
    name: "cloudbox-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the password hash!
      email: attributes.email,
    };
  },
});

export async function getLucia() {
  return createLucia();
}

export async function validateRequest() {
  try {
    const lucia = await getLucia();
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (!sessionId) {
      return { user: null, session: null };
    }

    const { user, session } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    return { user, session };
  } catch (error) {
    console.error("Error validating request:", error);
    // Handle the specific error
    if (error instanceof Error && error.message.includes("concurrent connections limit exceeded")) {
      console.error("Database connection limit exceeded. Please try again later.");
      // You might want to implement a retry mechanism or return a specific error
    } else {
      console.error("Unexpected error occurred:", error);
    }
    // Return a default response
    return { user: null, session: null };
  }
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof createLucia>;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
