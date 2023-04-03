import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  try {
    const data = req.body;
    const year = String(data.year);
    const marksData = []

    try {
      await prisma.sem_1_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_2_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_3_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_4_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_5_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_6_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_7_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }
    try {
      await prisma.sem_8_internal_marks.findMany({ where: { year } }).then(res => marksData.push(...res))
      // return res.status(201).json(year);
    }
    catch{
      console.log('error');
    }

    return res.status(201).json(marksData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
