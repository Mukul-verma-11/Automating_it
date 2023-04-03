import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "../../styles/mathematical.module.css";
import Bar from "./Bar";

const Laboratory = ({reg}) => {
  const [show, setShow] = useState(0);

  const handleBtn = () => {
    return show === 0 ? setShow(1) : setShow(0);
  };

  const [internalMarks, setInternalMarks] = useState([]);
  const [semesterMarks, setSemesterMarks] = useState([]);

  const [inputYear, setInputYear] = useState("2019");

  useEffect(() => {
    axios
      .post("../api/getExternalMarksInAdmin", { year: inputYear })
      .then((resp) =>
        // console.log(resp)
        setSemesterMarks(resp.data)
      );
    axios
      .post("../api/getInternalMarksInAdmin", { year: inputYear })
      .then((resp) =>
        // console.log(resp)
        setInternalMarks(resp.data)
      );
  }, [inputYear]);

  console.log(semesterMarks, "semesterMarks");
  console.log(internalMarks, "internalMarks");

  function calcMarks(semesterMarks, calcSubjects) {
    const totalMathMark = [];
    const setCalcSubjects = new Set();

    if (semesterMarks.length > 0) {
      for (let i = 0; i < semesterMarks.length; i++) {
        for (let subject of calcSubjects) {
          if (semesterMarks[i].hasOwnProperty(subject)) {
            const obj = {};
            obj[semesterMarks[i]["registration_number"]] =
              semesterMarks[i][subject];
            totalMathMark.push(obj);
            setCalcSubjects.add(subject);
          }
        }
      }
      let n = setCalcSubjects.size;
      const sumTotalMarks = [];
      const mp = new Map();
      for (const value of totalMathMark) {
        const reg = Object.keys(value)[0];
        const score = Number(value[reg]);
        if (mp.has(reg)) {
          //mp[reg] += val;
          mp.set(reg, mp.get(reg) + score);
        } else {
          mp.set(reg, score);
        }
      }
      for (const [key, value] of mp) {
        const obj = {};
        obj[key] = (value / n).toFixed(0);
        sumTotalMarks.push(obj);
      }
      return sumTotalMarks;
    }
  }

  const calcSubjects = [
    "computer_programming_laboratory",
    "hardware_design_laboratory",
    "data_structure_laboratory_in_c",
    "oops_lab_cpp",
    "software_engineering_lab",
    "software_system_lab",
    "cloud_and_data_analytics_lab",
    "computer_graphics_lab",
  ];

  const totalMarks = [];

  if (semesterMarks.length > 0 && internalMarks.length > 0) {
    const semMarkData = calcMarks(semesterMarks, calcSubjects);
    const intMarkData = calcMarks(internalMarks, calcSubjects);

    console.log(semMarkData, "this is final");
    console.log(intMarkData, "this is final");

    const mp = new Map();
    for (const value of semMarkData) {
      const reg = Object.keys(value)[0];
      const score = Number(value[reg]);
      if (mp.has(reg)) {
        //mp[reg] += val;
        mp.set(reg, mp.get(reg) + score);
      } else {
        mp.set(reg, score);
      }
    }
    for (const value of intMarkData) {
      const reg = Object.keys(value)[0];
      const score = Number(value[reg]);
      if (mp.has(reg)) {
        //mp[reg] += val;
        mp.set(reg, mp.get(reg) + score);
      } else {
        mp.set(reg, score);
      }
    }

    for (const [key, value] of mp) {
      const obj = {};
      obj[key] = value;
      totalMarks.push(obj);
    }
    console.log(totalMarks, "............");
  }

  const [dataFromChild, setDataFromChild] = useState("");

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

//  "computer_programming_laboratory",
// "hardware_design_laboratory",
// "data_structure_laboratory_in_c",
// "oops_lab_cpp",
// "software_engineering_lab",
// "software_system_lab",
// "cloud_and_data_analytics_lab",
// "computer_graphics_lab",
// ];

  const handleSubject = () => {
    alert(`1. HARDAWARE LAB \n2. DATA STRUCTURE IN C LAB \n3. SOFTWARE ENGINEERING LAB\n4. OOPS LAB IN C\n5. SYSTEM ENGINEERING LAB\N6. CLOUD AND DATA ANALYTICS LAB \n7. COMPUTER GRAPHICS LAB `)
  }

  return (
    <div className="">
      <div className={styles.box}>
        <div className={styles.inside}>
        {reg ? '' : <input
            type="text"
            value={inputYear}
            onChange={(e) => setInputYear(e.currentTarget.value)}
          />}
          {dataFromChild && <h3 className={styles.child}>{dataFromChild}</h3>}

          <button className={styles.subjectsBtn} onClick={handleSubject} >SUBJECTS CONSIDERED</button>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.points}>
            <h3>P</h3>
            <h3>O</h3>
            <h3>I</h3>
            <h3>N</h3>
            <h3>T</h3>
            <h3>S</h3>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
            }}
            className={styles.lowerdiv}
          >
            {totalMarks.map((mark) => (
              <Bar
              reg = {reg}
                sendDataToParent={handleDataFromChild}
                dataKey={Object.keys(mark)[0]}
                dataValue={mark[Object.keys(mark)[0]]}
                height={mark[Object.keys(mark)[0]]}
              />
            ))}
          </div>
        </div>

        <h3 className={styles.reg}>REGISTRATION NUMBER </h3>
      </div>
    </div>
  );
};

export default Laboratory;
;
