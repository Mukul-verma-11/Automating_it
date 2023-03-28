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
    // const attendance = String(
    // Math.round((Number(data.calculus) + 
    // Number(data.engineering_physics) +
    // Number(data.engineering_mechanics) + 
    // Number(data.basic_civil_engineering) + 
    // Number(data.soft_skill_development)+
    // Number(data.civil_engineering_workshop)+
    // Number(data.mechanical_engineering_workshop)+
    // Number(data.language_lab)+
    // Number(data.nature_conservation_activities)+
    // Number(data.basic_mechanical_engineering))/10)
    // )

    try {
      const semester_1_marks = await prisma.sem_1_semester_marks.create({
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
          basic_mechanical_engineering,  
        },
      });
      res.status(201).json(semester_1_marks);
    } catch (error) {
      console.error(data,'error in data entering');
      res.status(500).json({ error: 'Unable to create user' });
    } 

    }

    else if(data.semester == 2) {
    const computer_programming = String(data.computer_programming)
    const engineering_chemistry = String(data.engineering_chemistry)
    const engineering_graphics = String(data.engineering_graphics)
    const basic_electrical_engineering = String(data.basic_electrical_engineering)
    const basic_electronics_engineering = String(data.basic_electronics_engineering)
    const environmental_studies = String(data.environmental_studies)
    const electrical_engineering_workshop = String(data.electrical_engineering_workshop)
    const computer_programming_laboratory = String(data.computer_programming_laboratory)
    // const attendance = String(
    // Math.round( (Number(computer_programming) + 
    // Number(environmental_studies) + 
    // Number(engineering_chemistry) +
    // Number(engineering_graphics) + 
    // Number(basic_electrical_engineering) + 
    // Number(basic_electronics_engineering)+
    // Number(electrical_engineering_workshop)+
    // Number(computer_programming_laboratory))/8)
    // )

    try {
      const semester_2_marks = await prisma.sem_2_semester_marks.create({
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
        },
      });
      res.status(201).json(semester_2_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }

  else if(data.semester == 3) {
    const linear_algebra_and_transform_techniques = String(data.linear_algebra_and_transform_techniques)
    const descrete_computational_structures = String(data.descrete_computational_structures)
    const digital_electronics = String(data.digital_electronics)
    const database_management_system = String(data.database_management_system)
    const data_structure_and_algorithm_in_c = String(data.data_structure_and_algorithm_in_c)
    const computer_organisation_and_architecture = String(data.computer_organisation_and_architecture)
    const hardware_design_laboratory = String(data.hardware_design_laboratory)
    const data_structure_laboratory_in_c = String(data.data_structure_laboratory_in_c)
    // const attendance = String(
    // Math.round((Number(linear_algebra_and_transform_techniques) + 
    // Number(descrete_computational_structures) + 
    // Number(digital_electronics) +
    // Number(database_management_system) + 
    // Number(data_structure_and_algorithm_in_c) + 
    // Number(computer_organisation_and_architecture)+
    // Number(hardware_design_laboratory)+
    // Number(data_structure_laboratory_in_c))/8)
    // )

    try {
      const semester_3_marks = await prisma.sem_3_semester_marks.create({
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
        },
      });
      res.status(201).json(semester_3_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }


  else if(data.semester == 4) {
    const complex_variables_and_partial_differential_equation = String(data.complex_variables_and_partial_differential_equation)
    const data_communication_and_networking = String(data.data_communication_and_networking)
    const operating_systems = String(data.operating_systems)
    const software_engineering = String(data.software_engineering)
    const internet_programming = String(data.internet_programming)
    const oops_cpp = String(data.oops_cpp)
    const uhv = String(data.uhv)
    const oops_lab_cpp = String(data.oops_lab_cpp)
    const mini_project_rdbms = String(data.mini_project_rdbms)
    // const attendance = String(
    // Math.round(
    // (Number(complex_variables_and_partial_differential_equation) + 
    // Number(data_communication_and_networking) + 
    // Number(operating_systems) +
    // Number(software_engineering) + 
    // Number(internet_programming) + 
    // Number(oops_cpp)+
    // Number(uhv)+
    // Number(oops_lab_cpp)+
    // Number(mini_project_rdbms))/9)
    // )

    try {
      const semester_4_marks = await prisma.sem_4_semester_marks.create({
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
        },
      });
      res.status(201).json(semester_4_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }

  else if(data.semester == 5) {
    const nsm = String(data.nsm)
    const oomd = String(data.oomd)
    const design_and_analysis_of_algorithms = String(data.design_and_analysis_of_algorithms)
    const big_data_analysis = String(data.big_data_analysis)
    const formal_languages_and_automata_theory = String(data.formal_languages_and_automata_theory)
    const professional_elective_1 = String(data.professional_elective_1)
    const software_system_lab = String(data.software_system_lab)
    const software_engineering_lab = String(data.software_engineering_lab)
    // const attendance = String(
    //   Math.round(
    //   ( 
    //     Number(nsm) + 
    //     Number(oomd) + 
    //     Number(design_and_analysis_of_algorithms) +
    //     Number(big_data_analysis) + 
    //     Number(formal_languages_and_automata_theory) + 
    //     Number(professional_elective_1)+
    //     Number(software_system_lab)+
    //     Number(software_engineering_lab))/8)
    // )

    try {
      const semester_5_marks = await prisma.sem_5_semester_marks.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          nsm,
          oomd,
          design_and_analysis_of_algorithms,
          big_data_analysis,
          formal_languages_and_automata_theory,
          professional_elective_1, 
          software_system_lab, 
          software_engineering_lab,
        },
      });
      res.status(201).json(semester_5_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }

  else if(data.semester == 6) {
    const iot = String(data.iot)
    const complier_design = String(data.complier_design)
    const deep_learning = String(data.deep_learning)
    const cloud_computing = String(data.cloud_computing)
    const android_programming = String(data.android_programming)
    const professional_elective_2 = String(data.professional_elective_2)
    const cloud_and_data_analytics_lab = String(data.cloud_and_data_analytics_lab)
    const mini_project_android = String(data.mini_project_android)
    // const attendance = String(
    //   Math.round(
    //   ( 
    //     Number(iot) + 
    //     Number(complier_design) + 
    //     Number(deep_learning) +
    //     Number(cloud_computing) + 
    //     Number(android_programming) + 
    //     Number(professional_elective_2)+
    //     Number(cloud_and_data_analytics_lab)+
    //     Number(mini_project_android))/8)
    // )

    try {
      const semester_6_marks = await prisma.sem_6_semester_marks.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          iot,
          complier_design,
          cloud_computing,
          deep_learning,
          android_programming,
          professional_elective_2,
          cloud_and_data_analytics_lab, 
          mini_project_android, 
        },
      });
      res.status(201).json(semester_6_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }


  else if(data.semester == 7) {
    const principles_of_management = String(data.principles_of_management)
    const data_security_and_cryptography = String(data.data_security_and_cryptography)
    const computer_graphics_and_visual_computing = String(data.computer_graphics_and_visual_computing)
    const professional_elective_3 = String(data.professional_elective_3)
    const open_elective_1 = String(data.open_elective_1)
    const computer_graphics_lab = String(data.computer_graphics_lab)
    const mini_project_multimedia = String(data.mini_project_multimedia)
    const entreprenuership_development = String(data.entreprenuership_development)
    const project_phase_1 = String(data.project_phase_1)
    const industrial_internship = String(data.industrial_internship)
    // const attendance = String(
    //   Math.round(
    //   ( 
    //     Number(principles_of_management) + 
    //     Number(data_security_and_cryptography) + 
    //     Number(computer_graphics_and_visual_computing) +
    //     Number(professional_elective_3) + 
    //     Number(open_elective_1) + 
    //     Number(computer_graphics_lab)+
    //     Number(mini_project_multimedia)+
    //     Number(project_phase_1)+
    //     Number(industrial_internship)+
    //     Number(entreprenuership_development))/10)
    // )

    try {
      const semester_7_marks = await prisma.sem_7_semester_marks.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          principles_of_management,
          data_security_and_cryptography,
          computer_graphics_and_visual_computing,
          professional_elective_3,
          open_elective_1,
          computer_graphics_lab,
          mini_project_multimedia,
          project_phase_1,
          industrial_internship, 
          entreprenuership_development, 
        },
      });
      res.status(201).json(semester_7_marks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    } 

  }

  else if(data.semester == 8) {
    const financial_management_and_E_banking = String(data.financial_management_and_E_banking)
    const professional_elective_4 = String(data.professional_elective_4)
    const professional_elective_5 = String(data.professional_elective_5)
    const open_elective_2 = String(data.open_elective_2)
    const seminar = String(data.seminar)
    const project_phase_2 = String(data.project_phase_2)
    const comprehensive_viva_voce = String(data.comprehensive_viva_voce)
    // const attendance = String(
    //   Math.round(
    //   ( 
    //     Number(financial_management_and_E_banking) + 
    //     Number(professional_elective_4) + 
    //     Number(professional_elective_5) +
    //     Number(open_elective_2) + 
    //     Number(seminar) + 
    //     Number(project_phase_2)+
    //     Number(comprehensive_viva_voce))/7)
    // )

    try {
      const semester_8_marks = await prisma.sem_8_semester_marks.create({
        data: {
          registration_number,
          year,
          name,
          semester,
          financial_management_and_E_banking,
          professional_elective_4,
          professional_elective_5,
          open_elective_2,
          seminar,
          project_phase_2,
          comprehensive_viva_voce,
        },
      });
      res.status(201).json(semester_8_marks);
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
