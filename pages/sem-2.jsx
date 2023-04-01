import React from 'react'
import styless from './../styles/Sem-1.module.css'
import NavBar from './components/NavBar'
import { useState } from 'react';
import { useEffect } from 'react';
import { getCookies } from 'cookies-next'
import axios from 'axios';
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from './credits.json'
import { RadialChart } from 'react-vis';


const Semester1 = () => {

  
  const [registration_number,setRegNum] = useState('')
  const [attendance,setAttendance] = useState([])
  const [internalMarks,setInternalMarks] = useState([])
  const [semesterMarks,setSemesterMarks] = useState([])
  const [allData,setAllData] = useState({})
  const [semGpa,setSemGpa] = useState(0)

  const [_attendance,set_attendance] = useState([])
  const [_internalMarks,set_internalMarks] = useState([])
  const [_semesterMarks,set_semesterMarks] = useState([])



  useEffect( () => {
    const cookies =  getCookies()
    const reg_num = cookies.registration_number
    const obj = {}
    setRegNum(reg_num)

    const res = axios.post('./api/getStudentAttendance',{'registration_number':reg_num})
    .then(res => (setAttendance(...res.data.filter(d => d.semester == 2)) , obj['ATTENDANCE'] = res.data))
    

    const internalMarks = axios.post('./api/getInternalMarks',{'registration_number':reg_num})
    .then(resp => (setInternalMarks(...resp.data.filter(d => d.semester == 2)), obj['INTERNAL_MARKS'] = resp.data))


    const semesterMarks = axios.post('./api/getSemesterMarks',{'registration_number':reg_num})
    .then(respp => (setSemesterMarks(...respp.data.filter(d => d.semester == 2)), obj['EXTERNAL_MARKS'] = respp.data,setAllData(obj)))

  },[])

  



  console.log(attendance,'attendance');
  console.log(internalMarks,'internalMarks');
  console.log(semesterMarks,'semesterMarks');


  
  useEffect(() => {
    if(attendance){
      const attend = {...attendance}
      delete attend.id ;delete attend.name ; delete attend.year ; delete attend.registration_number ; delete attend.semester ; delete attend.attendance
      console.log(attend,'******************88')

      const total = Object.values(attend).reduce((acc,emm) => acc + Number(emm) , 0)
      Object.keys(attend).forEach(key => {
        attend[key] =( attend[key] / total ) * 100
      })
      
      console.log(total,'total');
      console.log(attend,'******************88')
      // set_attendance(attend)

      set_attendance(
        Object.keys(attend).map((data) => {
          return {
            angle: attend[data],
            label: data,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          };
        })
      );

    }
    if(internalMarks){
      const attend = {...internalMarks}
      delete attend.id ;delete attend.name ; delete attend.year ; delete attend.registration_number ; delete attend.semester ; delete attend.attendance
      console.log(attend,'******************88')

      const total = Object.values(attend).reduce((acc,emm) => acc + Number(emm) , 0)
      Object.keys(attend).forEach(key => {
        attend[key] =( attend[key] / total ) * 100
      })
      
      console.log(total,'total');
      console.log(attend,'******************88')
      // set_internalMarks(attend)

      set_internalMarks(
        Object.keys(attend).map((data) => {
          return {
            angle: attend[data],
            label: data,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          };
        })
      );

    }
    if(semesterMarks){
      const attend = {...semesterMarks}
      delete attend.id ;delete attend.name ; delete attend.year ; delete attend.registration_number ; delete attend.semester ; delete attend.attendance
      console.log(attend,'******************88')

      const total = Object.values(attend).reduce((acc,emm) => acc + Number(emm) , 0)
      Object.keys(attend).forEach(key => {
        attend[key] =( attend[key] / total ) * 100
      })
      
      console.log(total,'total');
      console.log(attend,'******************88')

      set_semesterMarks(
        Object.keys(attend).map((data) => {
          return {
            angle: attend[data],
            label: data,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          };
        })
      );
    }

    


  },[attendance,internalMarks,semesterMarks])


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
    let Gpa = (subjectGrade('basic_electrical_engineering') +
               subjectGrade('basic_electronics_engineering') +
               subjectGrade('computer_programming') +
               subjectGrade('computer_programming_laboratory') +
               subjectGrade('electrical_engineering_workshop') +
               subjectGrade('engineering_chemistry') +
               subjectGrade('engineering_graphics') +
               subjectGrade('environmental_studies')  ) / 20

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
                <h2 className={styless.header} >MARKS DETAILS OF SEMESTER 2</h2>
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
                  <td className={styles.td}>BASIC ELECTRICAL</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.basic_electrical_engineering}</td>
                  <td className={styles.td}>{semesterMarks.basic_electrical_engineering}</td>
                  <td className={styles.td}>{Number(internalMarks.basic_electrical_engineering) + Number(semesterMarks.basic_electrical_engineering)}</td>
                  <td className={styles.td}>{attendance.basic_electrical_engineering}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>BASIC ELECTRONICS.</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.basic_electronics_engineering}</td>
                  <td className={styles.td}>{semesterMarks.basic_electronics_engineering}</td>
                  <td className={styles.td}>{Number(internalMarks.basic_electronics_engineering) + Number(semesterMarks.basic_electronics_engineering)}</td>
                  <td className={styles.td}>{attendance.basic_electronics_engineering}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>COMPUTER PROG.</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.computer_programming}</td>
                  <td className={styles.td}>{semesterMarks.computer_programming}</td>
                  <td className={styles.td}>{Number(internalMarks.computer_programming) + Number(semesterMarks.computer_programming)}</td>
                  <td className={styles.td}>{attendance.computer_programming}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>COMPUTER LAB</td>
                  <td className={styles.td}>1</td>
                  <td className={styles.td}>{internalMarks.computer_programming_laboratory}</td>
                  <td className={styles.td}>{semesterMarks.computer_programming_laboratory}</td>
                  <td className={styles.td}>{Number(internalMarks.computer_programming_laboratory) + Number(semesterMarks.computer_programming_laboratory)}</td>
                  <td className={styles.td}>{attendance.computer_programming_laboratory}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ELECTRICAL ENG WORKSHOP</td>
                  <td className={styles.td}>1</td>
                  <td className={styles.td}>{internalMarks.electrical_engineering_workshop}</td>
                  <td className={styles.td}>{semesterMarks.electrical_engineering_workshop}</td>
                  <td className={styles.td}>{Number(internalMarks.electrical_engineering_workshop) + Number(semesterMarks.electrical_engineering_workshop)}</td>
                  <td className={styles.td}>{attendance.electrical_engineering_workshop}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ENGINEERING WORKSHOP</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.engineering_chemistry}</td>
                  <td className={styles.td}>{semesterMarks.engineering_chemistry}</td>
                  <td className={styles.td}>{Number(internalMarks.engineering_chemistry) + Number(semesterMarks.engineering_chemistry)}</td>
                  <td className={styles.td}>{attendance.engineering_chemistry}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ENGINEERING GRAPHICS</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.engineering_graphics}</td>
                  <td className={styles.td}>{semesterMarks.engineering_graphics}</td>
                  <td className={styles.td}>{Number(internalMarks.engineering_graphics) + Number(semesterMarks.engineering_graphics)}</td>
                  <td className={styles.td}>{attendance.engineering_graphics}</td>
                </tr>

                <tr className={styles.tr}>
                  <td className={styles.td}>ENVIRONMENTAL STUDIES</td>
                  <td className={styles.td}>3</td>
                  <td className={styles.td}>{internalMarks.environmental_studies}</td>
                  <td className={styles.td}>{semesterMarks.environmental_studies}</td>
                  <td className={styles.td}>{Number(internalMarks.environmental_studies) + Number(semesterMarks.environmental_studies)}</td>
                  <td className={styles.td}>{attendance.environmental_studies}</td>
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

          <div className={styless.graphs} >
      <h2>ATTENDANCE CONTRIBUTION</h2>
      <RadialChart
            colorType="literal"
            className="progress-chart"
            innerRadius={0}
            radius={300}
            animation = {{}}
            data={_attendance}
            showLabels={true}
            labelsStyle={{
              fill: "Black",
              dominantBaseline: "middle",
              textAnchor: "middle",
            }}
            width={850}
            height={850}
      />
      <div>
        <h2>INTERNAL MARKS CONTRIBUTION</h2>
      </div>
      <RadialChart
            colorType="literal"
            className="progress-chart"
            innerRadius={0}
            radius={300}
            data={_internalMarks}
            showLabels={true}
            labelsStyle={{
              fill: "Black",
              dominantBaseline: "middle",
              textAnchor: "middle",
            }}
            width={850}
            height={850}
      />

<div>
        <h2>EXTERNAL MARKS CONTRIBUTION</h2>
      </div>
      <RadialChart
            colorType="literal"
            className="progress-chart"
            innerRadius={0}
            radius={300}
            data={_semesterMarks}
            showLabels={true}
            labelsStyle={{
              fill: "Black",
              dominantBaseline: "middle",
              textAnchor: "middle",
            }}
            width={850}
            height={850}
      />
      </div>


      
    </div>
  )
}

export default Semester1
