import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  const data = req.body

  try {
    const updatedUser = await prisma.user_profile.update({
      where: { registration_number: data.reg_numm },
      data: { status: 'APPROVED' }
    })
    
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
