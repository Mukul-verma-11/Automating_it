import React from 'react'
import styles from '../../styles/Sem-1.module.css'


const Semester1 = () => {

  

  return (
      <div className='' >
          
          <div className={styles.sem_table}>

<h2>MARKS DETAILS</h2>
<table className={styles.table}>
  <tr>
                      <th className='th' >S.No.</th>
                      <th className='th' >Subject</th>
                      <th className='th' >Credit</th>
                      <th className='th' >Internal Marks</th>
                      <th className='th' >Semester Marks</th>
                      <th className='th' >Total Marks</th>
                      <th className='th' >Grade</th>
                      <th className='th' >Attendance</th>
  </tr>
  <tr>
    <td>1</td>
    <td>ENG. PHYSICS</td>
    <td>3</td>
    <td>31</td>
    <td>50</td>
    <td>81</td>
    <td>A</td>
    <td>82</td>
                  </tr>
                  
  <tr>
    <td>2</td>
    <td>ENG. Mechnics</td>
    <td>3</td>
    <td>30</td>
    <td>54</td>
    <td>85</td>
    <td>A</td>
    <td>72</td>
  </tr>
  
  <tr>
    <td>3</td>
    <td>Calculus</td>
    <td>3</td>
    <td>35</td>
    <td>53</td>
    <td>88</td>
    <td>A</td>
    <td>70</td>
  </tr>
 
  <tr>
    <td>4</td>
    <td>Basic Civil Eng</td>
    <td>3</td>
    <td>37</td>
    <td>52</td>
    <td>89</td>
    <td>A</td>
    <td>87</td>
                  </tr>

    <tr>
    <td>5</td>
    <td>Basic Mechanical Eng</td>
    <td>3</td>
    <td>30</td>
    <td>59</td>
    <td>89</td>
    <td>A</td>
    <td>80</td>
                  </tr>              
</table>

          </div>

          <div className="detials">
              <p>GPA : 9.5</p>
              <p>Attendance : 82</p>
          </div>

          <h2>CHARTS & GRAPHS</h2>

          <div className="graph_btns">
              <button className='skill_btn'>Mathematical Skills</button>
              <button className='skill_btn'>Technical Skills</button>
          </div>
      
          {/* <a href="http://127.0.0.1:5000/login">Login</a> */}


    {/* <Graph/> */}

    </div>
  )
}

export default Semester1
