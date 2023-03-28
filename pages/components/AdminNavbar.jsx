import Link from 'next/link';
import styles from '../../styles/AdminNavBar.module.css'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import { CgProfile  } from "react-icons/Cg";

const AdminNavBar = () => {


  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('registration_number');
    router.push('/')
  }

  return (
    <div className={styles.navbarbox} >

        <Link href='/admin' >
            <img className={styles.logo_img} src='/cover.png' alt="asd" />
        </Link>

        <div className={styles.right_content} >
              <div className='contents' >
                  {/* <Link href='profile'  className={styles.content} >PROFILE</Link> */}
                  <Link href='/admin-attendance'  className={styles.content} > ATTENDANCE</Link>
                  <Link href='/external-marks'  className={styles.content} > EXTERNAL</Link>
                  <Link href='/internal-marks'  className={styles.content} > INTERNAL</Link>
                  {/* <Link href='semesters'  className={styles.content} > PERFORMANCE</Link> */}
                  <Link href='semesters'  className={styles.content} style={{fontSize:'24px',fontWeight:'bold'}} > ADMIN</Link>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout} >LOGOUT </button>
        </div>
    </div>
  )
}

export default AdminNavBar
