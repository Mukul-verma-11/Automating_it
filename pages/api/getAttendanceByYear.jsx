import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const student_data = []

  try {
    const reg_num = req.body;

    try{
      const sem_1 = await prisma.sem_1_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_1.length > 0){
        student_data.push(...sem_1)
      }
    }
    catch{
      console.log('data not present in 1');
    }

    try{
      const sem_2 = await prisma.sem_2_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_2.length > 0){
        student_data.push(...sem_2)
      }
    }
    catch{
      console.log('data not present in 2');
    }

    try{
      const sem_3 = await prisma.sem_3_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_3.length > 0){
        student_data.push(...sem_3)
      }
    }
    catch{
      console.log('data not present in 3');
    }

    try{
      const sem_4 = await prisma.sem_4_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_4.length > 0){
        student_data.push(...sem_4)
      }
    }
    catch{
      console.log('data not present in 4');
    }

    try{
      const sem_5 = await prisma.sem_5_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_5.length > 0){
        student_data.push(...sem_5)
      }
    }
    catch{
      console.log('data not present in 5');
    }

    try{
      const sem_6 = await prisma.sem_6_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_6.length > 0){
        student_data.push(...sem_6)
      }
    }
    catch{
      console.log('data not present in 6');
    }

    try{
      const sem_7 = await prisma.sem_7_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_7.length > 0){
        student_data.push(...sem_7)
      }
    }
    catch{
      console.log('data not present in 7');
    }

    try{
      const sem_8 = await prisma.sem_8_attendance.findMany({ where: { year:reg_num.year } })
      if(sem_8.length > 0){
        student_data.push(...sem_8)
      }
    }
    catch{
      console.log('data not present in 8');
    }
    
    return  res.status(201).json(student_data)
    // try{
    //   const sem_1 = await prisma.sem_2_attendance.findMany({ where: { registration_number:reg_num.registration_number } })
    //   student_data.push(sem_1)
    // }
    // catch{
    //   console.log('data not present');
    // }


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process request' });
  } 
}
