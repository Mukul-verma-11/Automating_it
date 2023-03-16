import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();

    const data = req.body
    

    const id = Number(data.id)
    const registration_number = String(data.registration_number)
    const attendance = Number(data.attendance)


    try {
      const newUser = await prisma.cumulative_attendance.create({
        data: {
            id,
          registration_number,
          attendance,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 
  } else {
    // Return a 405 Method Not Allowed error for other HTTP methods
    res.status(405).end();
  }
}
