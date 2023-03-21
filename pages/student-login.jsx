import { setCookie } from 'cookies-next';
import { useState } from 'react';
import { deleteCookie } from 'cookies-next';
import styles from '.././styles/login.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'


const StudentLogin = () => {

const [regNo,setRegNo] = useState('')
const [password,setPassword] = useState('')
const router = useRouter()

const handleReg = (e)=> {
    setRegNo(e.currentTarget.value)
}
const handlePass = (e)=> {
  setPassword(e.currentTarget.value)
}

const handleSubmitbtn = async () => {
  const response = await axios.get('./api/studentLoginCredentials')
    const login_data = response.data 
    console.log(login_data);


    for (let data of login_data){
      console.log(data.registration_number == regNo);
      if(data.registration_number == regNo){
        if (data.password == password){
          console.log('correct credentials');
          setCookie('registration_number', regNo);
          router.push('/student-profile')
          break
        }
        else{
          alert('Incorrect credentials')
          console.log('password Incorrect');
        }
      }else{
        console.log('wrong credentials');
      }
    }

    



    
}
const del_cookie = () => {
    deleteCookie('registration_number');
}

const handleSubmit = (e) => {
  e.preventDefault()
}

  return (
    <div  >
      
      <div className={styles.container} onSubmit={handleSubmit} >

      <img className={styles.logo} src='/login_logo.png' alt="" />

      <form action="" className={styles.box}  >
      <h1 className={styles.login} >L O G I N</h1>
      <input className={styles.input} type='text' onChange={handleReg} value={regNo} required  placeholder='Enter Registration Number' /> <br />
      <input className={styles.input} type='password' onChange={handlePass} value={password} required  placeholder='Password' />
      <button className={styles.submit} type='submit' onClick={handleSubmitbtn} >SUBMIT</button>
      </form>

      </div>
{/* 
      <form action="">
      <button type='submit' onClick={del_cookie} >submit</button>
      </form> */}

    </div>
  )
}

export default StudentLogin
