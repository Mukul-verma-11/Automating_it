import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    const data = req.body;

    const registration_number = String(data.registration_number);
    const name = String(data.name);
    const admission = String(data.admission);
    const age_dob = data.age_dob;
    const blood_group = String(data.blood_group);
    const branch = String(data.branch);
    const caste = String(data.caste);
    const catRank = String(data.catRank);
    const currentAddress = String(data.currentAddress);
    const email = String(data.email);
    const fatherEmail = String(data.fatherEmail);
    const fatherMobileNumber = String(data.fatherMobileNumber);
    const fatherName = String(data.fatherName);
    const fatherOccupation = String(data.fatherOccupation);
    const permanentAddress = String(data.permanentAddress);
    const phoneNumber = String(data.phoneNumber);
    const religion = String(data.religion);
    const status = String(data.status);
    const yearOfAdmission = String(data.yearOfAdmission)
    const image = String(data.image)
    // res.status(201).json(data);

    try {
      const user = await prisma.user_profile.create({
        data: {
          name,
          admission,
          branch,
          registration_number,
          yearOfAdmission,
          catRank,
          religion,
          age_dob: new Date(age_dob),
          caste,
          phoneNumber,
          email,
          blood_group,
          fatherOccupation,
          fatherName,
          fatherMobileNumber,
          fatherEmail,
          permanentAddress,
          currentAddress,
          status,
          image
        },
      })
      res.status(201).json("newUser");
    } catch (error) {
      console.error(data);
      res.status(500).json({ error: "Unable to create user" });
    }
  }
}
