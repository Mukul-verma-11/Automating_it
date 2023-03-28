import React from "react";
import styless from "./../styles/Sem-1.module.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from "./credits.json";
import { RadialChart } from 'react-vis';

const Semester5 = () => {
  const [registration_number, setRegNum] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [internalMarks, setInternalMarks] = useState([]);
  const [semesterMarks, setSemesterMarks] = useState([]);
  const [allData, setAllData] = useState({});
  const [semGpa, setSemGpa] = useState(0);

  
  const [_attendance,set_attendance] = useState([])
  const [_internalMarks,set_internalMarks] = useState([])
  const [_semesterMarks,set_semesterMarks] = useState([])


  useEffect(() => {
    const cookies = getCookies();
    const reg_num = cookies.registration_number;
    const obj = {};
    setRegNum(reg_num);

    const res = axios
      .post("./api/getStudentAttendance", { registration_number: reg_num })
      .then(
        (res) => (
          setAttendance(...res.data.filter((d) => d.semester == 5)),
          (obj["ATTENDANCE"] = res.data)
        )
      );

    const internalMarks = axios
      .post("./api/getInternalMarks", { registration_number: reg_num })
      .then(
        (resp) => (
          setInternalMarks(...resp.data.filter((d) => d.semester == 5)),
          (obj["INTERNAL_MARKS"] = resp.data)
        )
      );

    const semesterMarks = axios
      .post("./api/getSemesterMarks", { registration_number: reg_num })
      .then(
        (respp) => (
          setSemesterMarks(...respp.data.filter((d) => d.semester == 5)),
          (obj["EXTERNAL_MARKS"] = respp.data),
          setAllData(obj)
        )
      );
  }, []);

  console.log(attendance, "attendance");
  console.log(internalMarks, "internalMarks");
  console.log(semesterMarks, "semesterMarks");

  
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
    90: "10",
    85: "9.5",
    80: "9.0",
    75: "8.5",
    70: "8.0",
    65: "7.5",
    60: "7.0",
    55: "6.5",
    50: "6.0",
  };
  const grade_key = [90, 85, 80, 75, 70, 65, 60, 55, 50];

  let fail = false;
  const subjectGrade = (sub_name) => {
    let mark =
      Number(internalMarks[sub_name]) + Number(semesterMarks[sub_name]);
    const credit = sub_creds[sub_name];
    if (credit < 3) {
      mark = mark * 2;
    }

    for (let m of grade_key) {
      if (mark >= Number(m)) {
        // console.log(m);
        // console.log(grading[m]*credit,'p');
        return grading[m] * credit;
      } else if (mark <= 50) {
        if ((credit === 3 && mark <= 50) || (credit < 3 && mark <= 25)) {
          fail = true;
          return 0;
        }
      }
    }
  };
  let i = 0;
  let Gpa =
    (subjectGrade("nsm") +
      subjectGrade("oomd") +
      subjectGrade("design_and_analysis_of_algorithms") +
      subjectGrade("big_data_analysis") +
      subjectGrade("formal_languages_and_automata_theory") +
      subjectGrade("professional_elective_1") +
      subjectGrade("software_system_lab") +
      subjectGrade("software_engineering_lab")) /
    20;

  if (fail) {
    Gpa = 0;
    fail = false;
  }
  console.log(Gpa, "sem_1");
  // obj[`sem_${i+1}`] = Gpa.toFixed(2)
  const gpa = Gpa.toFixed(2);

  return (
    <div className="">
      <NavBar />
      <div className={styless.sem_table}>
        <h2 className={styless.header}>MARKS DETAILS OF SEMESTER 5</h2>
      </div>

      <div>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>SUBJECT</th>
              <th className={styles.th}>CREDIT</th>
              <th className={styles.th}>INTERNAL MARKS</th>
              <th className={styles.th}>EXTERNAL MARKS</th>
              <th className={styles.th}>TOTAL MARKS</th>
              <th className={styles.th}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td className={styles.td}>NSM</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.nsm}</td>
              <td className={styles.td}>{semesterMarks.nsm}</td>
              <td className={styles.td}>
                {Number(internalMarks.nsm) + Number(semesterMarks.nsm)}
              </td>
              <td className={styles.td}>{attendance.nsm}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>OOMD</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.oomd}</td>
              <td className={styles.td}>{semesterMarks.oomd}</td>
              <td className={styles.td}>
                {Number(internalMarks.oomd) + Number(semesterMarks.oomd)}
              </td>
              <td className={styles.td}>{attendance.oomd}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DAA</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.design_and_analysis_of_algorithms}
              </td>
              <td className={styles.td}>
                {semesterMarks.design_and_analysis_of_algorithms}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.design_and_analysis_of_algorithms) +
                  Number(semesterMarks.design_and_analysis_of_algorithms)}
              </td>
              <td className={styles.td}>
                {attendance.design_and_analysis_of_algorithms}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>BIG DATA</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.big_data_analysis}</td>
              <td className={styles.td}>{semesterMarks.big_data_analysis}</td>
              <td className={styles.td}>
                {Number(internalMarks.big_data_analysis) +
                  Number(semesterMarks.big_data_analysis)}
              </td>
              <td className={styles.td}>{attendance.big_data_analysis}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>FLAT</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.formal_languages_and_automata_theory}
              </td>
              <td className={styles.td}>
                {semesterMarks.formal_languages_and_automata_theory}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.formal_languages_and_automata_theory) +
                  Number(semesterMarks.formal_languages_and_automata_theory)}
              </td>
              <td className={styles.td}>
                {attendance.formal_languages_and_automata_theory}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>PROF. ELEC. 1</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.professional_elective_1}
              </td>
              <td className={styles.td}>
                {semesterMarks.professional_elective_1}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.professional_elective_1) +
                  Number(semesterMarks.professional_elective_1)}
              </td>
              <td className={styles.td}>
                {attendance.professional_elective_1}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>SOFT. SYS. LAB</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>{internalMarks.software_system_lab}</td>
              <td className={styles.td}>{semesterMarks.software_system_lab}</td>
              <td className={styles.td}>
                {Number(internalMarks.software_system_lab) +
                  Number(semesterMarks.software_system_lab)}
              </td>
              <td className={styles.td}>{attendance.software_system_lab}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>SOFT. ENG. LAB</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.software_engineering_lab}
              </td>
              <td className={styles.td}>
                {(Number(semesterMarks.software_engineering_lab) / 2).toFixed(
                  0
                )}
              </td>
              <td className={styles.td}>
                {(
                  (Number(internalMarks.software_engineering_lab) +
                    Number(semesterMarks.software_engineering_lab)) /
                  2
                ).toFixed(0)}
              </td>
              <td className={styles.td}>
                {attendance.software_engineering_lab}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styless.detials}>
        <p className={styless.p}>GPA : {gpa}</p>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

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
  );
};

export default Semester5;
