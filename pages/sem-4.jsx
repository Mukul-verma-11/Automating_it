import React from "react";
import styless from "./../styles/Sem-1.module.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from "./credits.json";

const Semester4 = () => {
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
          setAttendance(...res.data.filter((d) => d.semester == 4)),
          (obj["ATTENDANCE"] = res.data)
        )
      );

    const internalMarks = axios
      .post("./api/getInternalMarks", { registration_number: reg_num })
      .then(
        (resp) => (
          setInternalMarks(...resp.data.filter((d) => d.semester == 4)),
          (obj["INTERNAL_MARKS"] = resp.data)
        )
      );

    const semesterMarks = axios
      .post("./api/getSemesterMarks", { registration_number: reg_num })
      .then(
        (respp) => (
          setSemesterMarks(...respp.data.filter((d) => d.semester == 4)),
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
    (subjectGrade("complex_variables_and_partial_differential_equation") +
      subjectGrade("data_communication_and_networking") +
      subjectGrade("operating_systems") +
      subjectGrade("software_engineering") +
      subjectGrade("internet_programming") +
      subjectGrade("oops_cpp") +
      subjectGrade("uhv") +
      subjectGrade("oops_lab_cpp") +
      subjectGrade("mini_project_rdbms")) /
    22;

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
        <h2 className={styless.header}>MARKS DETAILS OF SEMESTER 4</h2>
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
              <td className={styles.td}>CV & PD</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {
                  internalMarks.complex_variables_and_partial_differential_equation
                }
              </td>
              <td className={styles.td}>
                {
                  semesterMarks.complex_variables_and_partial_differential_equation
                }
              </td>
              <td className={styles.td}>
                {Number(
                  internalMarks.complex_variables_and_partial_differential_equation
                ) +
                  Number(
                    semesterMarks.complex_variables_and_partial_differential_equation
                  )}
              </td>
              <td className={styles.td}>
                {attendance.complex_variables_and_partial_differential_equation}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DCN</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.data_communication_and_networking}
              </td>
              <td className={styles.td}>
                {semesterMarks.data_communication_and_networking}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.data_communication_and_networking) +
                  Number(semesterMarks.data_communication_and_networking)}
              </td>
              <td className={styles.td}>
                {attendance.data_communication_and_networking}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>OS</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.operating_systems}</td>
              <td className={styles.td}>{semesterMarks.operating_systems}</td>
              <td className={styles.td}>
                {Number(internalMarks.operating_systems) +
                  Number(semesterMarks.operating_systems)}
              </td>
              <td className={styles.td}>{attendance.operating_systems}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>SOFT. ENG</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.software_engineering}
              </td>
              <td className={styles.td}>
                {semesterMarks.software_engineering}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.software_engineering) +
                  Number(semesterMarks.software_engineering)}
              </td>
              <td className={styles.td}>{attendance.software_engineering}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>IP</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.internet_programming}
              </td>
              <td className={styles.td}>
                {semesterMarks.internet_programming}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.internet_programming) +
                  Number(semesterMarks.internet_programming)}
              </td>
              <td className={styles.td}>{attendance.internet_programming}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>OOPS</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>{internalMarks.oops_cpp}</td>
              <td className={styles.td}>{semesterMarks.oops_cpp}</td>
              <td className={styles.td}>
                {Number(internalMarks.oops_cpp) +
                  Number(semesterMarks.oops_cpp)}
              </td>
              <td className={styles.td}>{attendance.oops_cpp}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>UHV</td>
              <td className={styles.td}>2</td>
              <td className={styles.td}>{internalMarks.uhv}</td>
              <td className={styles.td}>{semesterMarks.uhv}</td>
              <td className={styles.td}>
                {Number(internalMarks.uhv) + Number(semesterMarks.uhv)}
              </td>
              <td className={styles.td}>{attendance.uhv}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>OOPS LAB</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>{internalMarks.oops_lab_cpp}</td>
              <td className={styles.td}>{semesterMarks.oops_lab_cpp}</td>
              <td className={styles.td}>
                {Number(internalMarks.oops_lab_cpp) +
                  Number(semesterMarks.oops_lab_cpp)}
              </td>
              <td className={styles.td}>{attendance.oops_lab_cpp}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>MINI PROJECT RDBMS</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>{internalMarks.mini_project_rdbms}</td>
              <td className={styles.td}>
                {(Number(semesterMarks.mini_project_rdbms) / 2).toFixed(0)}
              </td>
              <td className={styles.td}>
                {(
                  (Number(internalMarks.mini_project_rdbms) +
                    Number(semesterMarks.mini_project_rdbms)) /
                  2
                ).toFixed(0)}
              </td>
              <td className={styles.td}>{attendance.mini_project_rdbms}</td>
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

export default Semester4;
