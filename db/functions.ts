import { prisma } from "./config";

export async function getAccountByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      Session: true,
    },
  });

  if (user) {
    return {
      ...user,
      userId: user.id,
    };
  }

  return null;
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Session: true,
    },
  });

  if (user) {
    console.log(`🎉 Woohoo! We found the amazing user with ID: ${userId}`);
    return {
      ...user,
      userId: user.id,
      funFact: "Did you know? This user is absolutely fantastic!",
    };
  }

  console.log(`😢 Oh no! The awesome user with ID: ${userId} is playing hide and seek!`);
  return null;
}
