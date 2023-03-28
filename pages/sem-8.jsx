import React from "react";
import styless from "./../styles/Sem-1.module.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from "./credits.json";

const Semester8 = () => {
  const [registration_number, setRegNum] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [internalMarks, setInternalMarks] = useState([]);
  const [semesterMarks, setSemesterMarks] = useState([]);
  const [allData, setAllData] = useState({});
  const [semGpa, setSemGpa] = useState(0);

  useEffect(() => {
    const cookies = getCookies();
    const reg_num = cookies.registration_number;
    const obj = {};
    setRegNum(reg_num);

    const res = axios
      .post("./api/getStudentAttendance", { registration_number: reg_num })
      .then(
        (res) => (
          setAttendance(...res.data.filter((d) => d.semester == 8)),
          (obj["ATTENDANCE"] = res.data)
        )
      );

    const internalMarks = axios
      .post("./api/getInternalMarks", { registration_number: reg_num })
      .then(
        (resp) => (
          setInternalMarks(...resp.data.filter((d) => d.semester == 8)),
          (obj["INTERNAL_MARKS"] = resp.data)
        )
      );

    const semesterMarks = axios
      .post("./api/getSemesterMarks", { registration_number: reg_num })
      .then(
        (respp) => (
          setSemesterMarks(...respp.data.filter((d) => d.semester == 8)),
          (obj["EXTERNAL_MARKS"] = respp.data),
          setAllData(obj)
        )
      );
  }, []);

  console.log(attendance, "attendance");
  console.log(internalMarks, "internalMarks");
  console.log(semesterMarks, "semesterMarks");

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
    (subjectGrade("financial_management_and_E_banking") +
      subjectGrade("professional_elective_4") +
      subjectGrade("professional_elective_5") +
      subjectGrade("open_elective_2") +
      subjectGrade("seminar") +
      subjectGrade("project_phase_2") +
      subjectGrade("comprehensive_viva_voce")) /
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
        <h2 className={styless.header}>MARKS DETAILS OF SEMESTER 7</h2>
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
              <td className={styles.td}>FINANCIAL MANAGE. AND E BANKING</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.financial_management_and_E_banking}
              </td>
              <td className={styles.td}>
                {semesterMarks.financial_management_and_E_banking}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.financial_management_and_E_banking) +
                  Number(semesterMarks.financial_management_and_E_banking)}
              </td>
              <td className={styles.td}>
                {attendance.financial_management_and_E_banking}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>PROF. ELEC. 4</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.professional_elective_4}
              </td>
              <td className={styles.td}>
                {semesterMarks.professional_elective_4}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.professional_elective_4) +
                  Number(semesterMarks.professional_elective_4)}
              </td>
              <td className={styles.td}>
                {attendance.professional_elective_4}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>PROF. ELEC. 5</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.professional_elective_5}
              </td>
              <td className={styles.td}>
                {semesterMarks.professional_elective_5}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.professional_elective_5) +
                  Number(semesterMarks.professional_elective_5)}
              </td>
              <td className={styles.td}>
                {attendance.professional_elective_5}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>OPEN. ELEC. 2</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.open_elective_2}</td>
              <td className={styles.td}>{semesterMarks.open_elective_2}</td>
              <td className={styles.td}>
                {Number(internalMarks.open_elective_2) +
                  Number(semesterMarks.open_elective_2)}
              </td>
              <td className={styles.td}>{attendance.open_elective_2}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>SEMINAR</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>{internalMarks.seminar}</td>
              <td className={styles.td}>{semesterMarks.seminar}</td>
              <td className={styles.td}>
                {Number(internalMarks.seminar) + Number(semesterMarks.seminar)}
              </td>
              <td className={styles.td}>{attendance.seminar}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>COMPREHENSIVE VIVA VOCE</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.comprehensive_viva_voce}
              </td>
              <td className={styles.td}>
                {semesterMarks.comprehensive_viva_voce}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.comprehensive_viva_voce) +
                  Number(semesterMarks.comprehensive_viva_voce)}
              </td>
              <td className={styles.td}>
                {attendance.comprehensive_viva_voce}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>PROJECT PHASE 2</td>
              <td className={styles.td}>6</td>
              <td className={styles.td}>{internalMarks.project_phase_2}</td>
              <td className={styles.td}>
                {(Number(semesterMarks.project_phase_2) / 2).toFixed(0)}
              </td>
              <td className={styles.td}>
                {(
                  (Number(internalMarks.project_phase_2) +
                    Number(semesterMarks.project_phase_2))
                  
                ).toFixed(0)}
              </td>
              <td className={styles.td}>{attendance.project_phase_2}</td>
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

      <div className={styless.sem_table}>
        <h2 className={styles.h2}>CHARTS & GRAPHS</h2>
      </div>

      <div className={styless.graph_btns}>
        <button className={styless.skill_btn}>Mathematical Skills</button>
        <button className={styless.skill_btn}>Technical Skills</button>
      </div>

      {/* <a href="http://127.0.0.1:5000/login">Login</a> */}

      {/* <Graph/> */}
    </div>
  );
};

export default Semester8;
