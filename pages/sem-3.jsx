import React from "react";
import styless from "./../styles/Sem-1.module.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from "./credits.json";

const Semester1 = () => {
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
          setAttendance(...res.data.filter((d) => d.semester == 3)),
          (obj["ATTENDANCE"] = res.data)
        )
      );

    const internalMarks = axios
      .post("./api/getInternalMarks", { registration_number: reg_num })
      .then(
        (resp) => (
          setInternalMarks(...resp.data.filter((d) => d.semester == 3)),
          (obj["INTERNAL_MARKS"] = resp.data)
        )
      );

    const semesterMarks = axios
      .post("./api/getSemesterMarks", { registration_number: reg_num })
      .then(
        (respp) => (
          setSemesterMarks(...respp.data.filter((d) => d.semester == 3)),
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
    (subjectGrade("linear_algebra_and_transform_techniques") +
      subjectGrade("descrete_computational_structures") +
      subjectGrade("digital_electronics") +
      subjectGrade("database_management_system") +
      subjectGrade("data_structure_and_algorithm_in_c") +
      subjectGrade("computer_organisation_and_architecture") +
      subjectGrade("hardware_design_laboratory") +
      subjectGrade("data_structure_laboratory_in_c")) /
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
        <h2 className={styless.header}>MARKS DETAILS OF SEMESTER 3</h2>
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
              <td className={styles.td}>LATT</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.linear_algebra_and_transform_techniques}
              </td>
              <td className={styles.td}>
                {semesterMarks.linear_algebra_and_transform_techniques}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.linear_algebra_and_transform_techniques) +
                  Number(semesterMarks.linear_algebra_and_transform_techniques)}
              </td>
              <td className={styles.td}>
                {attendance.linear_algebra_and_transform_techniques}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DCS</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.descrete_computational_structures}
              </td>
              <td className={styles.td}>
                {semesterMarks.descrete_computational_structures}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.descrete_computational_structures) +
                  Number(semesterMarks.descrete_computational_structures)}
              </td>
              <td className={styles.td}>
                {attendance.descrete_computational_structures}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DIG. ELECTRONICS</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.digital_electronics}</td>
              <td className={styles.td}>{semesterMarks.digital_electronics}</td>
              <td className={styles.td}>
                {Number(internalMarks.digital_electronics) +
                  Number(semesterMarks.digital_electronics)}
              </td>
              <td className={styles.td}>{attendance.digital_electronics}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DBMS</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.database_management_system}
              </td>
              <td className={styles.td}>
                {semesterMarks.database_management_system}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.database_management_system) +
                  Number(semesterMarks.database_management_system)}
              </td>
              <td className={styles.td}>
                {attendance.database_management_system}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DSA in C</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.data_structure_and_algorithm_in_c}
              </td>
              <td className={styles.td}>
                {semesterMarks.data_structure_and_algorithm_in_c}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.data_structure_and_algorithm_in_c) +
                  Number(semesterMarks.data_structure_and_algorithm_in_c)}
              </td>
              <td className={styles.td}>
                {attendance.data_structure_and_algorithm_in_c}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>COA</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.computer_organisation_and_architecture}
              </td>
              <td className={styles.td}>
                {semesterMarks.computer_organisation_and_architecture}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.computer_organisation_and_architecture) +
                  Number(semesterMarks.computer_organisation_and_architecture)}
              </td>
              <td className={styles.td}>
                {attendance.computer_organisation_and_architecture}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>HARD. DES. LAB</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.hardware_design_laboratory}
              </td>
              <td className={styles.td}>
                {semesterMarks.hardware_design_laboratory}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.hardware_design_laboratory) +
                  Number(semesterMarks.hardware_design_laboratory)}
              </td>
              <td className={styles.td}>
                {attendance.hardware_design_laboratory}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>SOFT SKILL</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.data_structure_laboratory_in_c}
              </td>
              <td className={styles.td}>
                {(
                  Number(semesterMarks.data_structure_laboratory_in_c) / 2
                ).toFixed(0)}
              </td>
              <td className={styles.td}>
                {(
                  (Number(internalMarks.data_structure_laboratory_in_c) +
                    Number(semesterMarks.data_structure_laboratory_in_c)) /
                  2
                ).toFixed(0)}
              </td>
              <td className={styles.td}>
                {attendance.data_structure_laboratory_in_c}
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

export default Semester1;
