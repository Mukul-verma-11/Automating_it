import React, { useState } from 'react';
import { csv } from 'd3';
import { csvParse } from 'd3-dsv';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
// import Attendance from './getAttendance';

import styles from '../../styles/csvAttendance.module.css'




const CsvReader =  () => {

  const [attendance,setAttendance] = useState([])
  const [loading,setLoading] = useState(0)

  const sendData = async () => {

    console.log('clicked');
    for(let att_data of attendance){
      try {
        const response = await axios.post('../api/addStudentInternalMarks', att_data);
        console.log(attendance,'csv att');
        if (response.status === 200) {
          const data = response.data;
          console.log(data,'csv'); // Log the newly created user objects
        } 
      } catch (error) {
        console.error(error);
      }
    }

    setLoading(1)
  
}

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const text = await file.text();
    const data = csvParse(text);

    console.log(data);
    setAttendance(data)
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  // }

  return (
    <div className={styles.container} >
      <h1>CSV Reader</h1>
      

      {/* <form action="" onSubmit={handleSubmit} className={styles.form}  > */}
      <input className={styles.input} type="file" accept=".csv" required onChange={handleFileChange} />
      <button  className={styles.btn} onClick={() => sendData()}  >INSERT DATA</button>
      {/* </form> */}

      {/* {loading === 1 ? <Attendance/> : 'loading'} */}
    </div>
  );
};

export default CsvReader;
