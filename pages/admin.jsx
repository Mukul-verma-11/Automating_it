import React from 'react'
import styles from '../styles/admin.module.css'
import Csv from './components/Csv'
import AdminNavBar from './components/AdminNavbar'
import BarGraph1 from './components/BarGraph1'
import { useState, useEffect } from 'react';
import BarGraph2 from './components/BarGraph2';
import BarGraph4 from './components/BarGraph4';
import BarGraph3 from './components/BarGraph3';
// import { LineGraph } from './components/LineGraph';
import MLearning from './components/MlLearning';
import { HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis'

const admin = () => {

  const[one,setOne] = useState(false)
  const[two,setTwo] = useState(false)
  const[three,setThree] = useState(false)
  const[four,setFour] = useState(true)

  const [dataset,setDataset] = useState([])
  const [predictionDataset,setPDataset] = useState([])

  return (
    <div >
      <AdminNavBar/>
    <div className={styles.box} >
      {/* <LineGraph/> */}
      
      <div className={styles.container} >

            <div className={styles.btnbox} >
              <button className={styles.btns} onClick={() => {return one === false ? setOne(true) : setOne(false)} }  >2016</button>
              <button className={styles.btns} onClick={() => {return two === false ? setTwo(true) : setTwo(false)} } >2017</button>
              <button className={styles.btns} onClick={() => {return three === false ? setThree(true) : setThree(false)} }>2018</button>
              <button className={styles.btns} onClick={() => {return four === false ? setFour(true) : setFour(false)} }>2019</button>
            </div>

            <div className={styles.graph} >
              {one ?  <BarGraph1/> : ''}
              {two ?  <BarGraph2/> : ''}
              {three ?  <BarGraph3/> : ''}
              {four ?  <BarGraph4/> : ''}
            </div>

      </div>

      <div className={styles.right_graph} > 
        <MLearning setDataset = {setDataset} setPDataset={setPDataset}  />

        <div className={styles.grp} >
        <XYPlot width={400} height={400} animation
        ><XAxis /><YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <MarkSeries data={dataset} stroke="white"
          opacityType="category"
          opacity="0.8"/>
        </XYPlot>
        </div>

        <div className={styles.grp} >
        <XYPlot width={400} height={400}  
        ><XAxis  /><YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <MarkSeries data={predictionDataset} stroke="white"
          opacityType="category"
          opacity="0.6"/>
        </XYPlot>
        </div>
        </div>

        
          </div>
      </div>
  )
}

export default admin

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if(!cookie){
    return {
      redirect: {
        destination: '/admin-login',
        permanent: false,
      },
    };

  }

  return{
    props:{

    }
  }
  
}