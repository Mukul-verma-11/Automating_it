import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AdminNavBar from "./components/AdminNavbar";
import styles from ".././styles/admin_attendance.module.css";
import MathematicalGraph from "./components/Mathematical";
import AnalyticsGraph from "./components/AnalyticGraph";
import ProgrammingGraph from "./components/ProgrammingGraph";
import Laboratory from "./components/Laboratory";
import SoftSkillsGraph from "./components/SoftSkillsGraph";
import NavBar from './components/NavBar';
import { getCookies } from "cookies-next";

const Performance = () => {


const [reg,setReg] = useState('')
  useEffect( () => {
    const cookies =  getCookies()
    const reg_num = cookies.registration_number
    setReg(reg_num)
  },[])

  const [show, setShow] = useState(0);
  const [show2, setShow2] = useState(0);
  const [show3, setShow3] = useState(0);
  const [show4, setShow4] = useState(0);
  const [show5, setShow5] = useState(0);

  const handleBtn = () => {
    return show === 0 ? setShow(1) : setShow(0);
  };

  const handleBtn2 = () => {
    return show2 === 0 ? setShow2(1) : setShow2(0);
  };
  const handleBtn3 = () => {
    return show3 === 0 ? setShow3(1) : setShow3(0);
  };
  const handleBtn4 = () => {
    return show4 === 0 ? setShow4(1) : setShow4(0);
  };
  const handleBtn5 = () => {
    return show5 === 0 ? setShow5(1) : setShow5(0);
  };

  return (
    <div className="">
      <NavBar />
      <button className={styles.btnCsv} onClick={handleBtn}>
        <h2>MATHEMATICAL SKILLS </h2>
      </button>

      {show == 0 ? <MathematicalGraph reg = {reg} /> : ""}

      <button className={styles.btnCsv} onClick={handleBtn2}>
        <h2>ANALYTICAL SKILLS </h2>
      </button>

      {show2 == 0 ? <AnalyticsGraph reg = {reg} /> : ""}
      <button className={styles.btnCsv} onClick={handleBtn3}>
        <h2>PROGRAMMING SKILLS </h2>
      </button>
      {show3 == 0 ? <ProgrammingGraph reg = {reg} /> : ""}

      <button className={styles.btnCsv} onClick={handleBtn4}>
        <h2>PRACTICAL SKILLS | LABORATORY </h2>
      </button>
      {show4 == 0 ? <Laboratory reg = {reg} /> : ""}

      <button className={styles.btnCsv} onClick={handleBtn5}>
        <h2>SOFT SKILLS </h2>
      </button>
      {show5 == 0 ? <SoftSkillsGraph reg = {reg} /> : ""}



    </div>
  );
};

export default Performance;
