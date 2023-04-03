import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "../../styles/mathematical.module.css";
import Bar from "./Bar";

const SoftSkillsGraph = ({reg}) => {
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
    "soft_skill_development",
    "language_lab",
    "uhv",
    "entreprenuership_development",
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

// // "soft_skill_development",
// "language_lab",
// "uhv",
// "entreprenuership_development",
// ];
  const handleSubject = () => {
    alert(`1. LANGUAGE LAB \n2. U.H.V \n3. SOFT SKILL DEVELOPMENT\n4. ENTREPRENEUR DEVELOPMENT `)
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

export default SoftSkillsGraph;
;
