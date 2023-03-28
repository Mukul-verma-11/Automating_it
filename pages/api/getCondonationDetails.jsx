import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  
  try {
      const table = await prisma.condonation.findMany();
      return res.status(201).json(table);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
