import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    const data = req.body;
    const name = String(data.name);

    const registration_number = String(data.registration_number);
    const year = String(data.year);

    try {
      const user = await prisma.condonation.create({
        data: {
            condo_first:'NOT USED',
            condo_second:'NOT USED',
            condo_third:'NOT USED',
            condonation_remaining:'3',
            name : name,
            registration_number:registration_number,
            year:year
        },
      })
      res.status(201).json("newUser");
    } catch (error) {
      console.error(data);
      res.status(500).json({ error: "Unable to create user" });
    }
  }
}
