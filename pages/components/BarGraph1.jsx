import React, { useState, useEffect, useRef } from 'react';
import BarChart from 'react-bar-chart';
import axios from 'axios'
import styles from '../../styles/BarGraph.module.css'

let data = [];

const margin = {top: 20, right: 20, bottom: 30, left: 40};

const BarGraph1 = () => {
  const [width, setWidth] = useState(500);
  const rootRef = useRef(null);

  const handleBarClick = (element, id) => { 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  };

  const [allSems,setAllSems] = useState([])

  const [graphData,setGraphData] = useState({})
  const [loading,setLoading] = useState(false)
  const [year,setYear] = useState('')
  const [newYear,setNewYear] = useState('2016')


  useEffect(() => {

    const filters = { year: '2016'  };
    
    console.log(newYear,'+++++++===');
    axios.post("./api/getAttendanceByYear", filters).then(
        res => {
            setAllSems(res.data,'bar table')
            console.log(res.data)
           
            let att = new Array(10);
            let cnt = new Array(10);
            for(let i=0; i<10; i++){
                att[i] = cnt[i] = 0;
            }

            for(const value of res.data){
                att[Number(value.semester)] += Number(value.attendance);
                cnt[Number(value.semester)] += 1;
            }

            for(let i=0; i<10; i++){
                if(cnt[i] != 0){
                    att[i] /= cnt[i];
                }
            }
            const obj = {};
            for(let i=1; i<=8; i++){
                obj[`sem${i}`] = att[i].toFixed(0)
            }
           
            console.log(obj)
            setGraphData(obj)
            data = []
            data.push(
                {text: 'SEM-1', value: graphData.sem1},
                {text: 'SEM-2', value: graphData.sem2},
                {text: 'SEM-3', value: graphData.sem3},
                {text: 'SEM-4', value: graphData.sem4},
                {text: 'SEM-5', value: graphData.sem5},
                {text: 'SEM-6', value: graphData.sem6},
                {text: 'SEM-7', value: graphData.sem7},
                {text: 'SEM-8', value: graphData.sem8}
            )
            setLoading(true)
            
    }

    )

    // const onResize = () => {
    //   setWidth(rootRef.current.offsetWidth);
    // };
    // window.addEventListener('resize', onResize);
    // return () => window.removeEventListener('resize', onResize);

  }, [loading]);


//   console.log(allSems,'sems');

    

  return (
    <div ref={rootRef} className={styles.barGraph} >
    
      <div style={{color:'black',margin:'20px'}} >
        <h2>ATTENDANCE ANALYSIS GRAPH FOR BATCH 2016 </h2>
      </div>

      <div > 
        <BarChart
        //   ylabel='Quantity'
          width={600}
          height={500}
          margin={margin}
          data={data}
          onBarClick={handleBarClick}
        />
      </div>
    </div>
  );
};

export default BarGraph1;
