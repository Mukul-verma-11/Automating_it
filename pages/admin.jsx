import React from 'react'
import styles from '../styles/admin.module.css'
import Csv from './components/Csv'

const admin = () => {
  return (
    <div className={styles.lol} >
      Admin
      <Csv />
    </div>
  )
}

export default admin
