import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const prisma = new PrismaClient();

    const data = req.body
    
    const registration_number = String(data.registration_number)
    const semester = String(data.semester)
    const name = String(data.name)
    const year = String(data.year)

    if (data.semester == 1){
    const calculus = String(data.calculus)
    const engineering_physics = String(data.engineering_physics)
    const engineering_mechanics = String(data.engineering_mechanics)
    const basic_civil_engineering = String(data.basic_civil_engineering)
    const soft_skill_development = String(data.soft_skill_development)
    const civil_engineering_workshop = String(data.civil_engineering_workshop)
    const mechanical_engineering_workshop = String(data.mechanical_engineering_workshop)
    const language_lab = String(data.language_lab)
    const nature_conservation_activities = String(data.nature_conservation_activities)
    const basic_mechanical_engineering = String(data.basic_mechanical_engineering)
    const attendance = String(
    (Number(data.calculus) + 
    Number(data.engineering_physics) +
    Number(data.engineering_mechanics) + 
    Number(data.basic_civil_engineering) + 
    Number(data.soft_skill_development)+
    Number(data.civil_engineering_workshop)+
    Number(data.mechanical_engineering_workshop)+
    Number(data.language_lab)+
    Number(data.nature_conservation_activities)+
    Number(data.basic_mechanical_engineering))/10)

    try {
      const newUser = await prisma.sem_1_attendance.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          calculus,
          engineering_physics,
          engineering_mechanics,
          basic_civil_engineering,
          soft_skill_development,
          civil_engineering_workshop, 
          mechanical_engineering_workshop, 
          language_lab,  
          nature_conservation_activities,  
          attendance,  
          basic_mechanical_engineering,  
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(data);
      res.status(500).json({ error: 'Unable to create user' });
    } 

    }

    if(data.semester == 2) {
    const computer_programming = String(data.computer_programming)
    const engineering_chemistry = String(data.engineering_chemistry)
    const engineering_graphics = String(data.engineering_graphics)
    const basic_electrical_engineering = String(data.basic_electrical_engineering)
    const basic_electronics_engineering = String(data.basic_electronics_engineering)
    const environmental_studies = String(data.environmental_studies)
    const electrical_engineering_workshop = String(data.electrical_engineering_workshop)
    const computer_programming_laboratory = String(data.computer_programming_laboratory)
    const attendance = String(
    (Number(computer_programming) + 
    Number(environmental_studies) + 
    Number(engineering_chemistry) +
    Number(engineering_graphics) + 
    Number(basic_electrical_engineering) + 
    Number(basic_electronics_engineering)+
    Number(electrical_engineering_workshop)+
    Number(computer_programming_laboratory))/8)

    try {
      const newUser_sem_2 = await prisma.sem_2_attendance.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          computer_programming,
          environmental_studies,
          engineering_chemistry,
          engineering_graphics,
          basic_electrical_engineering,
          basic_electronics_engineering, 
          electrical_engineering_workshop, 
          computer_programming_laboratory,
          attendance 
        },
      });
      res.status(201).json(newUser_sem_2);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }

  if(data.semester == 3) {
    const linear_algebra_and_transform_techniques = String(data.linear_algebra_and_transform_techniques)
    const descrete_computational_structures = String(data.descrete_computational_structures)
    const digital_electronics = String(data.digital_electronics)
    const database_management_system = String(data.database_management_system)
    const data_structure_and_algorithm_in_c = String(data.data_structure_and_algorithm_in_c)
    const computer_organisation_and_architecture = String(data.computer_organisation_and_architecture)
    const hardware_design_laboratory = String(data.hardware_design_laboratory)
    const data_structure_laboratory_in_c = String(data.data_structure_laboratory_in_c)
    const attendance = String(
    (Number(linear_algebra_and_transform_techniques) + 
    Number(descrete_computational_structures) + 
    Number(digital_electronics) +
    Number(database_management_system) + 
    Number(data_structure_and_algorithm_in_c) + 
    Number(computer_organisation_and_architecture)+
    Number(hardware_design_laboratory)+
    Number(data_structure_laboratory_in_c))/8)

    try {
      const newUser_sem_3 = await prisma.sem_3_attendance.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          linear_algebra_and_transform_techniques,
          descrete_computational_structures,
          digital_electronics,
          database_management_system,
          data_structure_and_algorithm_in_c,
          computer_organisation_and_architecture, 
          hardware_design_laboratory, 
          data_structure_laboratory_in_c,
          attendance 
        },
      });
      res.status(201).json(newUser_sem_3);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }


  if(data.semester == 4) {
    const complex_variables_and_partial_differential_equation = String(data.complex_variables_and_partial_differential_equation)
    const data_communication_and_networking = String(data.data_communication_and_networking)
    const operating_systems = String(data.operating_systems)
    const software_engineering = String(data.software_engineering)
    const internet_programming = String(data.internet_programming)
    const oops_cpp = String(data.oops_cpp)
    const uhv = String(data.uhv)
    const oops_lab_cpp = String(data.oops_lab_cpp)
    const mini_project_rdbms = String(data.mini_project_rdbms)
    const attendance = String(
      Math.round(
      (Number(complex_variables_and_partial_differential_equation) + 
    Number(data_communication_and_networking) + 
    Number(operating_systems) +
    Number(software_engineering) + 
    Number(internet_programming) + 
    Number(oops_cpp)+
    Number(uhv)+
    Number(oops_lab_cpp)+
    Number(mini_project_rdbms))/9)
    )

    try {
      const newUser_sem_4 = await prisma.sem_4_attendance.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          complex_variables_and_partial_differential_equation,
          data_communication_and_networking,
          operating_systems,
          software_engineering,
          internet_programming,
          oops_cpp, 
          uhv, 
          oops_lab_cpp,
          mini_project_rdbms,
          attendance 
        },
      });
      res.status(201).json(newUser_sem_4);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }


    
  } else {
    // Return a 405 Method Not Allowed error for other HTTP methods
    res.status(405).end();
  }





}
