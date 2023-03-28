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
      const table = await prisma.sem_1_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '2') {
      const table = await prisma.sem_2_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '3') {
      const table = await prisma.sem_3_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '4') {
      const table = await prisma.sem_4_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '5') {
      const table = await prisma.sem_5_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '6') {
      const table = await prisma.sem_6_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '7') {
      const table = await prisma.sem_7_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }
    else if (semester === '8') {
      const table = await prisma.sem_8_semester_marks.findMany({ where: { year } });
      return res.status(201).json(table);
    }

    return res.status(400).json({ error: 'Invalid semester value' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
