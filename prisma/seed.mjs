import { PrismaClient } from "@prisma/client";
import data from "./mock-data.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const clerkId = process.env.CLERKID;
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
