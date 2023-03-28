import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {

  const prisma = new PrismaClient();

    const data = req.body;

    // const registration_number = String(data.registration_number)
    // const condoFirst = String(data.condoFirst)
    // const condoSecond = String(data.condoSecond)
    // const condoThird = String(data.condoThird)
    const condoLeft = String(data.condoLeft)
    const condoFirst = String(data.condoFirst)
    const condoSecond = String(data.condoSecond)
    const condoThird = String(data.condoThird)
    const id = data.id
    // const registration_number = String(data.registration_number)

    // {condoLeft: '1', condoFirst: '0', condoSecond: '0', condoThird: '0', registration_number: '20419090'}

    try {
      const updateCondo = await prisma.condonation.update({
        where: { id },
        data: { condonation_remaining:condoLeft,condo_first:condoFirst,condo_second:condoSecond,condo_third:condoThird },
      });
      console.log(data,'=====================');

      const table = await prisma.condonation.findMany();
      res.status(200).json({table},'api data');
    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Unable to update user.' });
    }
  }
  