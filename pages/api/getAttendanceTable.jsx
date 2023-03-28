import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  try {
    const data = req.body;
    const semester = String(data.semester);
    const year = String(data.year);

    if (semester === '1') {
      const table = await prisma.sem_1_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '2') {
      const table = await prisma.sem_2_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '3') {
      const table = await prisma.sem_3_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '4') {
      const table = await prisma.sem_4_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '5') {
      const table = await prisma.sem_5_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '6') {
      const table = await prisma.sem_6_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '7') {
      const table = await prisma.sem_7_attendance.findMany({ where: { year } });
      return res.status(201).json(table);
    }

    return res.status(400).json({ error: 'Invalid semester value' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
