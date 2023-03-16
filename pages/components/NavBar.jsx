import Link from 'next/link';
import styles from '../../styles/NavBar.module.css'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'


const NavBar = () => {


  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('registration_number');
    router.push('/')
  }

  return (
    <div className={styles.navbarbox} >

        <Link href='/' >
            <img className={styles.logo_img} src='/cover.png' alt="asd" />
        </Link>

        <div className={styles.right_content} >
              <div className='contents' >
                  <Link href='profile'  className={styles.content} >PROFILE</Link>
                  <Link href='semesters'  className={styles.content} >SEMESTERS</Link>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout} >LOGOUT </button>
        </div>
    </div>
  )
}

export default NavBar
