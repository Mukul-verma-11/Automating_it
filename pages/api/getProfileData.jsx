import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  // data = req.body
  // return res.status(201).json(req.body);
  
  try {
      const table = await prisma.user_profile.findFirst({
        where : {registration_number : req.body.registration_number}
      });
      return res.status(201).json(table);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
