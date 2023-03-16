import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const posts = await prisma.student_login.findMany()
  res.json(posts)
  return posts
}
