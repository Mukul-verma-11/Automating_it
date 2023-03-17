import React, { useState } from 'react'
import AdminNavBar from './components/AdminNavbar'
import Csv from './components/Csv'
import { PrismaClient } from '@prisma/client';
import styles from '.././styles/admin_attendance.module.css'
import axios from 'axios';
import { RadialChart } from 'react-vis';

const LABELNAMES = {
  'lessThanFifty':'<50','btwFiftyAndSeventyFive':'>=50 && <75','greaterThanSeventyFive':'>=75'
}

const attendanceAdmin = ({posts}) => {
  // console.log(posts);

  // const [data,setData] = useState(posts)
  const [sem,setSem] = useState(1)
  const [year,setYear] = useState(2019)
  const [filterTable,setFilterTable] = useState([])
  const [show,setShow] = useState(0)
  const [isSorted,setIsSorted] = useState('')
  const [attendanceCount,setAttCount] = useState([])
  const [from,setFrom] = useState(0)
  const [to,setTo] = useState(100)
  

  const handleSem = (e) => {
    setSem(e.currentTarget.value)
    console.log(sem);
  }

  const handleYear = (e) => {
    setYear(e.currentTarget.value)
    console.log(year);
  }

  // console.log(data.length,'dataaaaaaaaaa');

  const handleFilter = async () => {
    console.log(sem,'sem');
    console.log(year,'year');
    const filters = {'semester':sem,'year':year}

    const response = await axios.post('./api/getAttendanceTable',filters)
    setFilterTable(response.data)
    console.log(response.data);

    const dataSet = {
      'lessThanFifty':0,'btwFiftyAndSeventyFive':0,'greaterThanSeventyFive':0
    }
    response.data.forEach(da => {
      if(da.attendance < 50){
        dataSet.lessThanFifty += 1
      }
      else if(da.attendance>= 50 && da.attendance < 75 ){
        dataSet.btwFiftyAndSeventyFive += 1
      }
      else{
        dataSet.greaterThanSeventyFive += 1
      }
    })

    // console.log();
    setAttCount(Object.keys(dataSet).map(data => {
      return {angle:dataSet[data],label:LABELNAMES[data] + ' [' + dataSet[data] +'] ',color:'#' + Math.floor(Math.random()*16777215).toString(16)}
    }))
  }

  const handleBtn = () => {
    return show === 0 ? setShow(1) : setShow(0) 
  }

  const sortAttendance = () =>{
    const fTable = filterTable
    if(isSorted != 'asc'){
      fTable.sort((a,b) => {
        return Number(a.attendance)>Number(b.attendance) ? -1 : 1
      })
      console.log(fTable);
      setFilterTable([...fTable])
      setIsSorted('asc')
    }else{
      fTable.sort((a,b) => {
        return Number(a.attendance)>Number(b.attendance) ? 1 : -1
      })
      console.log(fTable);
      setFilterTable([...fTable])
      setIsSorted('desc')
    }
  }

  const handleFilterAttendance = () => {
    
    const filterTableAtt = filterTable.filter(tabledata => {
      return Number(tabledata.attendance) >= from && Number(tabledata.attendance) <= to
    })

    setFilterTable([...filterTableAtt])
    console.log(filterTableAtt);
  }

  return (
    <div>
      <AdminNavBar/>

      <button className={styles.btnCsv} onClick={handleBtn}  > <h2>CSV</h2> </button>

    {show == 1 ? <Csv/> : ''}
      {/* <Csv /> */}


      


      
      <div className={styles.attendanceTable} >
        <input className={styles.input} value={year} onChange={handleYear} type="text" name="" placeholder='Enter year' required />
        <input className={styles.input} value={sem} onChange={handleSem} type="number" name="" min="1" max="8" placeholder='Enter Semester' required />
        <button onClick={handleFilter} >FILTER</button>
      </div>


<div className={styles.sem_graph}>


      <RadialChart
          colorType="literal"
          className="progress-chart"
          innerRadius={0}
          radius={100}
          data={attendanceCount}
          showLabels={true}
          labelsStyle={{
            fill: "Black",
            dominantBaseline:"middle",
            textAnchor:"middle"
          }}
          width={250}
          height={250} />

          
</div>


      {filterTable.length > 0 ? 

      
      <table className={styles.table}>
        <div className={styles.filter_attendance}>
              <h2>Enter Range</h2>
              <input type="number" onChange={(e)=>setFrom(e.currentTarget.value)} value={from} placeholder='From..' />
              <input type="number" onChange={(e)=>setTo(e.currentTarget.value)} value={to} placeholder='To..'  />
              <button onClick={handleFilterAttendance} className={styles.btnCsv} >Apply</button>
          </div>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Registration Number</th>
          <th className={styles.th} >Name</th>
          <th className={styles.th}>Year</th>
          <th className={styles.th} onClick={sortAttendance} >Attendance</th>
        </tr>
      </thead>
      <tbody>
        {filterTable.map((row, index) => (
          <tr key={index} className={styles.tr}>
            <td className={styles.td}>{row.registration_number}</td>
            <td className={styles.td}>{row.name}</td>
            <td className={styles.td}>{row.year}</td>
            <td className={styles.td}>{row.attendance}</td>
          </tr>
        ))}
      </tbody>
    </table>
      : ''}

      

    </div>
  )
}

export default attendanceAdmin

export async function getServerSideProps(){
  const prisma = new PrismaClient();

  const posts = await prisma.sem_1_attendance.findMany()

  return{
    props:{
      posts
    }
  }



}