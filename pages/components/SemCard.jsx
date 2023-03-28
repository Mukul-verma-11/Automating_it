import styles from '../../styles/SemCard.module.css'
import Link from 'next/link';
import { useState } from 'react';

const SemCard = ({attendance,semester,gpa}) => {

    // console.log(attendance,'semcard');
    const [att,setAttendance] = useState(attendance)
    const [sem,setSemester] = useState(semester)
    // const [gpa,setGpa] = useState(gpa)
    // console.log(sem,'semcard');
    return (
    <div className={styles.sem_box}>
          
        {/* <div className={styles.sem_container}> */}
              
            <Link href={ `/semester/sem-${sem}`} className={styles.asd} >
            <div className={styles.sem_card} >
                <h2 className={styles.h2} >SEMESTER {sem} </h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : {att}%</p> 
                    <p>GPA : {gpa}</p> 
                    {/* <p>Subjects : 6</p>  */}
                </div>
              </div>
            </Link>
              
        {/* </div> */}
          
          
    </div>
  )
}

export default SemCard
