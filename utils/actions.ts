import { auth } from "@clerk/nextjs/server";
import { createAndEditJobSchema, CreateAndEditJobType } from "./types";
import { redirect } from "next/navigation";
import prisma from "./db";

async function authenticateAndRedirect() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export async function createJobAction(values: CreateAndEditJobType) {
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job = prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}
