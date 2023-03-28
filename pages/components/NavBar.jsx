import Link from 'next/link';
import styles from '../../styles/NavBar.module.css'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'

const NavBar = ({name,reg_num}) => {


  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('registration_number');
    router.push('/')
  }

  return (
    <div className={styles.navbarbox} >

        <Link href='/student-profile' >
            <img className={styles.logo_img} src='/cover.png' alt="asd" />
        </Link>

        <div className={styles.right_content} >
              <div className='contents' >
                  <span   className={styles.content} >{name} </span>
                  <Link href='student-profile'  className={styles.content} >PROFILE</Link>
                  <Link href='student-semesters'  className={styles.content} >SEMESTERS</Link>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout} >LOGOUT </button>
        </div>
    </div>
  )
}

export default NavBar
