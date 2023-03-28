import styles from '../../styles/profileForm.module.css'
import { useState } from 'react';

const ProfileForm = () => {

  const[name,setName] = useState('')
  const[admission,setAdmission] = useState('')
  const[branch,setBranch] = useState('')
  const[yoa,setYoa] = useState('')
  const[catRank,setCatRank] = useState('')
  const[religion,setReligion] = useState('')
  const[age_dob,setAge_dob] = useState('')
  const[caste,setCaste] = useState('')
  const[phoneNumber,setPhoneNumber] = useState('')
  const[email,setEmail] = useState('')
  const[blood_group,setBlood_group] = useState('')
  

  return (
    <div className={styles.profile_form} >

          <h2>STUDENT INFORMATION FORM</h2>

    <form action="">
          
    <div className={styles.form_box}>
          <div className={styles.StudentForm}>
              
                  
              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="name">Name </label>
                <input className={styles.name_input} value={name} onChange={(e) => setName(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="Admission">Admission No. </label>
                <input className={styles.name_input} value={admission} onChange={(e) => setAdmission(e.currentTarget.value)} type="text" />
              </div>
              
          </div>

          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="branch">Branch </label>
                <input className={styles.name_input} value={branch} onChange={(e) => setBranch(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="Year of Admission">Year of Admission</label>
                <input className={styles.name_input} value={yoa} onChange={(e) => setYoa(e.currentTarget.value)} type="text" />
              </div>
            </div>
              
          </div>


    <div className={styles.form_box}>
          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="catRank">CAT RANK</label>
                <input className={styles.name_input} value={catRank} onChange={(e) => setCatRank(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="RELEGION">Age & DOB</label>
                <input className={styles.name_input} value={age_dob} onChange={(e) => setAge_dob(e.currentTarget.value)} type="date" />
              </div>
                  


            </div>

          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="relegion">Religion</label>
                <input className={styles.name_input} value={religion} onChange={(e) => setReligion(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="caste">Caste</label>
                <input className={styles.name_input} value={caste} onChange={(e) => setCaste(e.currentTarget.value)} type="text" />
              </div>
            </div>
              
          </div>


    <div className={styles.form_box}>
          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="catRank">Student PH No.</label>
                <input className={styles.name_input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="RELEGION">Student Email</label>
                <input className={styles.name_input} value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="text" />
              </div>
                  


            </div>

          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="relegion">Blood Group</label>
                <input className={styles.name_input} value={blood_group} onChange={(e) => setBlood_group(e.currentTarget.value)} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className='name' htmlFor="caste">Photo</label>
                <input className='name_input' type="file" id="img" name="img" accept="image/*" />
              </div>
            </div>
              
          </div>

          
    <div className={styles.form_box}>
          <div className={styles.StudentForm}>              
          
          <div className={styles.form_content}>
                <label className={styles.name} htmlFor="catRank">Father's Name</label>
                <input className={styles.name_input} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="RELEGION">Father's Occupation</label>
                <input className={styles.name_input} type="text" />
              </div>

            </div>

          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="relegion">Father's PH No.</label>
                <input className={styles.name_input} type="text" />
              </div>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="caste">Father's Email</label>
                <input className={styles.name_input} type="text" />
              </div>
            </div>
              
          </div>


    <div className={styles.form_box}>
        
          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className='name' htmlFor="relegion">Permanent Address</label> <br />
                <textarea id="w3review" name="w3review" rows="4" cols="50" />
                  </div>
                  
            </div>
          <div className={styles.StudentForm}>

              <div className={styles.form_content}>
                <label className={styles.name} htmlFor="relegion">Current Address</label> <br />
                <textarea id="w3review" name="w3review" rows="4" cols="50" />
                </div>
                  
            </div>
              
          </div>

          <button className={styles.submit_form}>SUBMIT FORM</button>
      
          </form>
    </div>
  )
}

export default ProfileForm
