import styles from '../../styles/SemCard.module.css'
import Link from 'next/link';

const SemCard = () => {
  return (
    <div className={styles.sem_box}>
          
        <div className={styles.sem_container}>
              
            <Link href='semester1' className={styles.asd} >
            <div className={styles.sem_card} >
                <h2 className={styles.h2} >SEMESTER 1</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 82%</p> 
                    <p>GPA : 9.5</p> 
                    <p>Subjects : 6</p> 
                </div>
              </div>
            </Link>
              <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 2</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 85%</p> 
                    <p>GPA : 8.4</p> 
                    <p>Subjects : 6</p> 
                </div>
              </div>
              
            <div className={styles.sem_card} >
                <h2 className={styles.h2} >SEMESTER 3</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 87%</p> 
                    <p>GPA : 8.9</p> 
                    <p>Subjects : 6</p> 
                </div>
            </div>
            <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 4</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 77%</p> 
                    <p>GPA : 8.6</p> 
                    <p>Subjects : 6</p> 
                </div>
            </div>
              <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 5</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 83%</p> 
                    <p>GPA : 9.6</p> 
                    <p>Subjects : 6</p> 
                </div>
            </div>
            <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 6</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 97%</p> 
                    <p>GPA : 9.1</p> 
                    <p>Subjects : 6</p> 
                </div>
            </div>
            <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 7</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 84%</p> 
                    <p>GPA : 9.5</p> 
                    <p>Subjects : 6</p> 
                </div>
            </div>
            <div className={styles.sem_card} >
                <h2 className={styles.h2}>SEMESTER 8</h2>
                <hr />
                <div className={styles.sem_detail}>
                    <p>Attendance : 79%</p> 
                    <p>GPA : 9.8</p> 
                    <p>Subjects : 4</p> 
                </div>
            </div>
              
        </div>
          
          
    </div>
  )
}

export default SemCard
