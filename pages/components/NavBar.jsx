import Link from 'next/link';
import styles from '../../styles/NavBar.module.css'
import { deleteCookie, getCookies } from 'cookies-next';
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react';
import axios from 'axios';

const NavBar = () => {

  const [name,setName] = useState('')
  const [registration_number,setRegNum] = useState('')

  useEffect( () => {
    const cookies =  getCookies()
    const reg_num = cookies.registration_number
    setRegNum(reg_num)

    // axios.post('./api/getStudentAttendance',{'registration_number':reg_num})
    // .then(res => (setName(res.data[0].name)))
  },[])


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
