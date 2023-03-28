// import '../styles/Semesters.css'
import { getCookies } from 'cookies-next'
import styles from '.././styles/Semesters.module.css'
import NavBar from './components/NavBar'
import SemCard from './components/SemCard'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import sub_creds from './credits.json'
import { Link } from 'next/link';

const Semesters = (reg_num) => {

  useEffect( () => {
    const cookies =  getCookies()
    const reg_num = cookies.registration_number
    const obj = {}
    setRegNum(reg_num)

    const res = axios.post('./api/getStudentAttendance',{'registration_number':reg_num})
    .then(res => (setAttendance(res.data) , obj['ATTENDANCE'] = res.data,setName(res.data[0].name)))
    

    const internalMarks = axios.post('./api/getInternalMarks',{'registration_number':reg_num})
    .then(resp => (setInternalMarks(resp.data), obj['INTERNAL_MARKS'] = resp.data))


    const semesterMarks = axios.post('./api/getSemesterMarks',{'registration_number':reg_num})
    .then(respp => (setSemesterMarks(respp.data), obj['EXTERNAL_MARKS'] = respp.data,setAllData(obj)))

  },[])


  

  const [registration_number,setRegNum] = useState('')
  const [attendance,setAttendance] = useState([])
  const [internalMarks,setInternalMarks] = useState([])
  const [semesterMarks,setSemesterMarks] = useState([])
  const [allData,setAllData] = useState({})
  const [semGpa,setSemGpa] = useState({})
  const [name,setName] = useState('')
  

    const grading = {
      '90':'10',
      '85':'9.5',
      '80':'9.0',
      '75':'8.5',
      '70':'8.0',
      '65':'7.5',
      '60':'7.0',
      '55':'6.5',
      '50':'6.0',
    }
    const grade_key = [90,85,80,75,70,65,60,55,50]
  
    console.log(internalMarks,'*****************************************8');
    // console.log(semesterMarks,'*****************************************8');
    let fail = false
    const subjectGrade = (sub_name,sem) => {
      let mark = (Number(internalMarks[sem][sub_name]) + Number(semesterMarks[sem][sub_name])) 
      if (sem == 5){
        console.log('marks =>>>>>>>>>',mark,Number(internalMarks[sem][sub_name]),Number(semesterMarks[sem][sub_name]));
      }
      const credit = sub_creds[sub_name]
      if(credit < 3 ){
        mark = mark*2
      }
  
      for(let m of grade_key){
  
        if(mark >= Number(m)){
          // console.log(m);
          // console.log(grading[m]*credit,'p');
          return (grading[m]*credit);
        }else if( mark <= 50){
          if((credit === 3 && mark <= 50) || (credit < 3 && mark <= 25)){
            fail = true
            return (0);
          }
          
        }
      }
    }
    
   
      const obj = {}
      for(let i = 0 ; i < semesterMarks.length ; i++){
    
        if(i == 0){
          let Gpa = (subjectGrade('basic_mechanical_engineering',i) +
                     subjectGrade('basic_civil_engineering',i) +
                     subjectGrade('calculus',i) +
                     subjectGrade('engineering_mechanics',i) +
                     subjectGrade('engineering_physics',i) +
                     subjectGrade('civil_engineering_workshop',i) +
                     subjectGrade('language_lab',i) +
                     subjectGrade('mechanical_engineering_workshop',i) +
                     subjectGrade('nature_conservation_activities',i) +
                     subjectGrade('soft_skill_development',i) ) / 20
    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_1')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }
    
        else  if(i == 1){
          let Gpa = (subjectGrade('computer_programming',i) +
                     subjectGrade('engineering_chemistry',i) +
                     subjectGrade('engineering_graphics',i) +
                     subjectGrade('basic_electrical_engineering',i) +
                     subjectGrade('environmental_studies',i) +
                     subjectGrade('basic_electronics_engineering',i) +
                     subjectGrade('electrical_engineering_workshop',i) +
                     subjectGrade('computer_programming_laboratory',i)) / 20
    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_2')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }
    
        else  if(i == 2){
          let Gpa = (subjectGrade('linear_algebra_and_transform_techniques',i) +
                     subjectGrade('descrete_computational_structures',i) +
                     subjectGrade('digital_electronics',i) +
                     subjectGrade('database_management_system',i) +
                     subjectGrade('data_structure_and_algorithm_in_c',i) +
                     subjectGrade('computer_organisation_and_architecture',i) +
                     subjectGrade('hardware_design_laboratory',i) +
                     subjectGrade('data_structure_laboratory_in_c',i)) / 20
    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_3')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }

        else  if(i == 3){
          let Gpa = (subjectGrade('complex_variables_and_partial_differential_equation',i) +
                     subjectGrade('data_communication_and_networking',i) +
                     subjectGrade('operating_systems',i) +
                     subjectGrade('software_engineering',i) +
                     subjectGrade('internet_programming',i) +
                     subjectGrade('oops_cpp',i) +
                     subjectGrade('uhv',i) +
                     subjectGrade('mini_project_rdbms',i) +
                     subjectGrade('oops_lab_cpp',i)) / 22

    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_4')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }

        else  if(i == 4){
          let Gpa = (subjectGrade('nsm',i) +
                     subjectGrade('oomd',i) +
                     subjectGrade('design_and_analysis_of_algorithms',i) +
                     subjectGrade('big_data_analysis',i) +
                     subjectGrade('formal_languages_and_automata_theory',i) +
                     subjectGrade('professional_elective_1',i) +
                     subjectGrade('software_system_lab',i) +
                     subjectGrade('software_engineering_lab',i)) / 20

    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_5')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }
        
        else  if(i == 5){
          let Gpa = (subjectGrade('iot',i) +
                     subjectGrade('complier_design',i) +
                     subjectGrade('deep_learning',i) +
                     subjectGrade('cloud_computing',i) +
                     subjectGrade('android_programming',i) +
                     subjectGrade('professional_elective_2',i) +
                     subjectGrade('cloud_and_data_analytics_lab',i) +
                     subjectGrade('mini_project_android',i)) / 20
                    
                     console.log(subjectGrade('iot',i));
                     console.log(subjectGrade('complier_design',i));
                     console.log(subjectGrade('deep_learning',i));
                     console.log(subjectGrade('cloud_computing',i));
                     console.log(subjectGrade('android_programming',i));
                     console.log(subjectGrade('professional_elective_2',i));
                     console.log(subjectGrade('cloud_and_data_analytics_lab',i));
                     console.log(subjectGrade('mini_project_android',i));

    
          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_6')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }

        else  if(i == 6){
          let Gpa = (subjectGrade('principles_of_management',i) +
                     subjectGrade('data_security_and_cryptography',i) +
                     subjectGrade('computer_graphics_and_visual_computing',i) +
                     subjectGrade('professional_elective_3',i) +
                     subjectGrade('open_elective_1',i) +
                     subjectGrade('computer_graphics_lab',i) +
                     subjectGrade('mini_project_multimedia',i) +
                     subjectGrade('project_phase_1',i) +
                     subjectGrade('industrial_internship',i) +
                     subjectGrade('entreprenuership_development',i)) / 20

          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_7')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }

        else  if(i == 7){
          let Gpa = (subjectGrade('financial_management_and_E_banking',i) +
                     subjectGrade('professional_elective_4',i) +
                     subjectGrade('professional_elective_5',i) +
                     subjectGrade('open_elective_2',i) +
                     subjectGrade('seminar',i) +
                     subjectGrade('project_phase_2',i) +
                     subjectGrade('comprehensive_viva_voce',i)) / 20

                     

          if (fail){
            Gpa = 0
            fail = false
          }
          console.log(Gpa,'sem_8')
          obj[`sem_${i+1}`] = Gpa.toFixed(2)
        }

      }
    

    

  // console.log(semGpa,'semGpa')
  // console.log(semGpa,'semGpa');

 


  const details = []
  for(let i in attendance){
    let o = {}

    o[`semester`] = Number(i) + 1 
    o['attendance'] = attendance[i].attendance
    o['gpa'] = obj[`sem_${Number(i)+1}`]

    details.push(o)
  }
  
  
  console.log(details,'det');

  // console.log('semGpa',obj);

  console.log(allData,'********************8');

  return (
    <div >
          <NavBar reg_num = {registration_number} name={name} />
        <div className={styles.semesters_box} >
        <h3 style={{margin:'5px'}} >{registration_number}</h3>
        <h3 className={styles.h3} >CLICK ON ANY SEMESTER TO GET DETAILS</h3>

        <div className={styles.boxy}>
          {details.map((data, i) => (
            <div key={i}>
                <a>
                  <SemCard semester={data.semester} attendance={data.attendance} gpa={data.gpa} />
                </a>
            </div>
          ))}
        </div>
        

         </div>
          
    </div>
  )
}

export default Semesters

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if(!cookie){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  }

  // const reg_num = getCookie('registration_number')

  return{
    props:{
    }
  }
  
}
