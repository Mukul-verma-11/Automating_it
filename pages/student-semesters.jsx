// import '../styles/Semesters.css'
import styles from '.././styles/Semesters.module.css'
import NavBar from './components/NavBar'
import SemCard from './components/SemCard'

const Semesters = () => {
  return (
    <div >
          <NavBar/>
         <div className={styles.semesters_box} >
         <h3 className={styles.h3} >CLICK ON ANY SEMESTER TO GET DETAILS</h3>
          <SemCard/>

         </div>
          
    </div>
  )
}

export default Semesters
