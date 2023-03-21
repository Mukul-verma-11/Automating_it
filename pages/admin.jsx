import React from 'react'
import styles from '../styles/admin.module.css'
import Csv from './components/Csv'
import AdminNavBar from './components/AdminNavbar'

const admin = () => {
  return (
    <div className={styles.lol} >
      <AdminNavBar/>
    </div>
  )
}

export default admin

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if(!cookie){
    return {
      redirect: {
        destination: '/admin-login',
        permanent: false,
      },
    };

  }

  return{
    props:{

    }
  }
  
}