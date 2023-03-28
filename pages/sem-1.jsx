import React from 'react'
import styless from './../styles/Sem-1.module.css'
import NavBar from './components/NavBar'
import { useState } from 'react';
import { useEffect } from 'react';
import { getCookies } from 'cookies-next'
import axios from 'axios';
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from './credits.json'


const Semester1 = () => {

  
  const [registration_number,setRegNum] = useState('')
  const [attendance,setAttendance] = useState([])
  const [internalMarks,setInternalMarks] = useState([])
  const [semesterMarks,setSemesterMarks] = useState([])
  const [allData,setAllData] = useState({})
  const [semGpa,setSemGpa] = useState(0)


  useEffect( () => {
    const cookies =  getCookies()
    const reg_num = cookies.registration_number
    const obj = {}
    setRegNum(reg_num)

    const res = axios.post('./api/getStudentAttendance',{'registration_number':reg_num})
    .then(res => (setAttendance(...res.data.filter(d => d.semester == 1)) , obj['ATTENDANCE'] = res.data))
    

    const internalMarks = axios.post('./api/getInternalMarks',{'registration_number':reg_num})
    .then(resp => (setInternalMarks(...resp.data.filter(d => d.semester == 1)), obj['INTERNAL_MARKS'] = resp.data))


    const semesterMarks = axios.post('./api/getSemesterMarks',{'registration_number':reg_num})
    .then(respp => (setSemesterMarks(...respp.data.filter(d => d.semester == 1)), obj['EXTERNAL_MARKS'] = respp.data,setAllData(obj)))

  },[])

  



  console.log(attendance,'attendance');
  console.log(internalMarks,'internalMarks');
  console.log(semesterMarks,'semesterMarks');



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

  let fail = false
  const subjectGrade = (sub_name) => {
    let mark = (Number(internalMarks[sub_name]) + Number(semesterMarks[sub_name])) 
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
    let i = 0
    let Gpa = (subjectGrade('basic_mechanical_engineering') +
               subjectGrade('basic_civil_engineering') +
               subjectGrade('calculus') +
               subjectGrade('engineering_mechanics') +
               subjectGrade('engineering_physics') +
               subjectGrade('civil_engineering_workshop') +
               subjectGrade('language_lab') +
               subjectGrade('mechanical_engineering_workshop') +
               subjectGrade('nature_conservation_activities') +
               subjectGrade('soft_skill_development') ) / 20

    if (fail){
      Gpa = 0
      fail = false
    }
    console.log(Gpa,'sem_1')
    // obj[`sem_${i+1}`] = Gpa.toFixed(2)
    const gpa = Gpa.toFixed(2)



  return (
      <div className='' >
          
          <NavBar/>
          <div className={styless.sem_table}>
                <h2 className={styless.header} >MARKS DETAILS OF SEMESTER 1</h2>
          </div>

        <div >

        <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>SUBJECT</th>
                <th className={styles.th}>CREDIT</th>
                <th className={styles.th}>INTERNAL MARKS</th>
                <th className={styles.th}>EXTERNAL MARKS</th>
                <th className={styles.th}>TOTAL MARKS</th>
                <th className={styles.th} >
                  Attendance
                </th>
              </tr>
            </thead>
            <tbody>
                <tr className={styles.tr}>
                  <td className={styles.td}>BASIC CIVIL ENG.</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.basic_civil_engineering}</td>
                  <td className={styles.td}>{semesterMarks.basic_civil_engineering}</td>
                  <td className={styles.td}>{Number(internalMarks.basic_civil_engineering) + Number(semesterMarks.basic_civil_engineering)}</td>
                  <td className={styles.td}>{attendance.basic_civil_engineering}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>BASIC MECH. ENG.</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.basic_mechanical_engineering}</td>
                  <td className={styles.td}>{semesterMarks.basic_mechanical_engineering}</td>
                  <td className={styles.td}>{Number(internalMarks.basic_mechanical_engineering) + Number(semesterMarks.basic_mechanical_engineering)}</td>
                  <td className={styles.td}>{attendance.basic_mechanical_engineering}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>CALCULUS.</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.calculus}</td>
                  <td className={styles.td}>{semesterMarks.calculus}</td>
                  <td className={styles.td}>{Number(internalMarks.calculus) + Number(semesterMarks.calculus)}</td>
                  <td className={styles.td}>{attendance.calculus}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ENG. MECHANICS</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.engineering_mechanics}</td>
                  <td className={styles.td}>{semesterMarks.engineering_mechanics}</td>
                  <td className={styles.td}>{Number(internalMarks.engineering_mechanics) + Number(semesterMarks.engineering_mechanics)}</td>
                  <td className={styles.td}>{attendance.engineering_mechanics}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ENG. PHYSICS</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.engineering_physics}</td>
                  <td className={styles.td}>{semesterMarks.engineering_physics}</td>
                  <td className={styles.td}>{Number(internalMarks.engineering_physics) + Number(semesterMarks.engineering_physics)}</td>
                  <td className={styles.td}>{attendance.engineering_physics}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>LANGUAGE LAB</td>
                  <td className={styles.td}>1</td>
                  <td className={styles.td}>{internalMarks.language_lab}</td>
                  <td className={styles.td}>{semesterMarks.language_lab}</td>
                  <td className={styles.td}>{Number(internalMarks.language_lab) + Number(semesterMarks.language_lab)}</td>
                  <td className={styles.td}>{attendance.language_lab}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>MECH. ENG. WORKSHOP</td>
                  <td className={styles.td}>1</td>
                  <td className={styles.td}>{internalMarks.mechanical_engineering_workshop}</td>
                  <td className={styles.td}>{semesterMarks.mechanical_engineering_workshop}</td>
                  <td className={styles.td}>{Number(internalMarks.mechanical_engineering_workshop) + Number(semesterMarks.mechanical_engineering_workshop)}</td>
                  <td className={styles.td}>{attendance.mechanical_engineering_workshop}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>NSS</td>
                  <td className={styles.td}>0</td>
                  <td className={styles.td}>{internalMarks.nature_conservation_activities}</td>
                  <td className={styles.td}>{semesterMarks.nature_conservation_activities}</td>
                  <td className={styles.td}>{Number(internalMarks.nature_conservation_activities) + Number(semesterMarks.nature_conservation_activities)}</td>
                  <td className={styles.td}>{attendance.nature_conservation_activities}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>SOFT SKILL</td>
                  <td className={styles.td}>1</td>
                  <td className={styles.td}>{internalMarks.soft_skill_development}</td>
                  <td className={styles.td}>{(Number(semesterMarks.soft_skill_development)/2).toFixed(0)}</td>
                  <td className={styles.td}>{((Number(internalMarks.soft_skill_development) + Number(semesterMarks.soft_skill_development))/2).toFixed(0)}</td>
                  <td className={styles.td}>{attendance.soft_skill_development}</td>
                </tr>
            </tbody>
          </table>

        </div>







          <div className={styless.detials}>
              <p className={styless.p} >GPA : {gpa}</p>
          </div>

        <br /><br /><br /><br /><br />

          <div className={styless.sem_table}>
             <h2 className={styles.h2} >CHARTS & GRAPHS</h2>
          </div>

          <div className={styless.graph_btns}>
              <button className={styless.skill_btn}>Mathematical Skills</button>
              <button className={styless.skill_btn}>Technical Skills</button>
          </div>
      
          {/* <a href="http://127.0.0.1:5000/login">Login</a> */}


    {/* <Graph/> */}

    </div>
  )
}

export default Semester1
