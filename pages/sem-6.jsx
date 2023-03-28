import React from "react";
import styless from "./../styles/Sem-1.module.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import styles from ".././styles/admin_attendance.module.css";
import sub_creds from "./credits.json";

const Semester6 = () => {
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
          setAttendance(...res.data.filter((d) => d.semester == 6)),
          (obj["ATTENDANCE"] = res.data)
        )
      );

    const internalMarks = axios
      .post("./api/getInternalMarks", { registration_number: reg_num })
      .then(
        (resp) => (
          setInternalMarks(...resp.data.filter((d) => d.semester == 6)),
          (obj["INTERNAL_MARKS"] = resp.data)
        )
      );

    const semesterMarks = axios
      .post("./api/getSemesterMarks", { registration_number: reg_num })
      .then(
        (respp) => (
          setSemesterMarks(...respp.data.filter((d) => d.semester == 6)),
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
    (subjectGrade("iot") +
      subjectGrade("complier_design") +
      subjectGrade("deep_learning") +
      subjectGrade("cloud_computing") +
      subjectGrade("android_programming") +
      subjectGrade("professional_elective_2") +
      subjectGrade("cloud_and_data_analytics_lab") +
      subjectGrade("mini_project_android")) /
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
        <h2 className={styless.header}>MARKS DETAILS OF SEMESTER 6</h2>
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
              <td className={styles.td}>IOT</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.iot}</td>
              <td className={styles.td}>{semesterMarks.iot}</td>
              <td className={styles.td}>
                {Number(internalMarks.iot) + Number(semesterMarks.iot)}
              </td>
              <td className={styles.td}>{attendance.iot}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>COMPILER DESIGN</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.complier_design}</td>
              <td className={styles.td}>{semesterMarks.complier_design}</td>
              <td className={styles.td}>
                {Number(internalMarks.complier_design) +
                  Number(semesterMarks.complier_design)}
              </td>
              <td className={styles.td}>{attendance.complier_design}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>DEEP LEARNING</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.deep_learning}</td>
              <td className={styles.td}>{semesterMarks.deep_learning}</td>
              <td className={styles.td}>
                {Number(internalMarks.deep_learning) +
                  Number(semesterMarks.deep_learning)}
              </td>
              <td className={styles.td}>{attendance.deep_learning}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>CLOUD COMPUTING</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.cloud_computing}</td>
              <td className={styles.td}>{semesterMarks.cloud_computing}</td>
              <td className={styles.td}>
                {Number(internalMarks.cloud_computing) +
                  Number(semesterMarks.cloud_computing)}
              </td>
              <td className={styles.td}>{attendance.cloud_computing}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>ANDROID PROG.</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>{internalMarks.android_programming}</td>
              <td className={styles.td}>{semesterMarks.android_programming}</td>
              <td className={styles.td}>
                {Number(internalMarks.android_programming) +
                  Number(semesterMarks.android_programming)}
              </td>
              <td className={styles.td}>{attendance.android_programming}</td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>PROF. ELEC. 2</td>
              <td className={styles.td}>3</td>
              <td className={styles.td}>
                {internalMarks.professional_elective_2}
              </td>
              <td className={styles.td}>
                {semesterMarks.professional_elective_2}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.professional_elective_2) +
                  Number(semesterMarks.professional_elective_2)}
              </td>
              <td className={styles.td}>
                {attendance.professional_elective_2}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>CLOUD & DATA LAB</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.cloud_and_data_analytics_lab}
              </td>
              <td className={styles.td}>
                {semesterMarks.cloud_and_data_analytics_lab}
              </td>
              <td className={styles.td}>
                {Number(internalMarks.cloud_and_data_analytics_lab) +
                  Number(semesterMarks.cloud_and_data_analytics_lab)}
              </td>
              <td className={styles.td}>
                {attendance.cloud_and_data_analytics_lab}
              </td>
            </tr>

            <tr className={styles.tr}>
              <td className={styles.td}>MINI PROJ. ANDROID</td>
              <td className={styles.td}>1</td>
              <td className={styles.td}>
                {internalMarks.mini_project_android}
              </td>
              <td className={styles.td}>
                {(Number(semesterMarks.mini_project_android) / 2).toFixed(0)}
              </td>
              <td className={styles.td}>
                {(
                  (Number(internalMarks.mini_project_android) +
                    Number(semesterMarks.mini_project_android)) /
                  2
                ).toFixed(0)}
              </td>
              <td className={styles.td}>{attendance.mini_project_android}</td>
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

export default Semester6;
