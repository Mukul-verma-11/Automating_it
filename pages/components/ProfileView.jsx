import styles from "../../styles/ProfileView.module.css";

const ProfileView = ({
  name,
  photo,
  registration_number,
  branch,
  phoneNumber,
  email,
  catRank,
  religion,
  caste,
  blood_group,
  fatherOccupation,
  fatherName,
  fatherMobileNumber,
  permanentAddress,
  fatherEmail,
  yearOfAdmission
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.left}>

          <div className={styles.upper_left}>
            <img className={styles.photo} src={photo} />
          </div>

          <div className={styles.lower_left}>
            <p>{name}</p>
            <p>{registration_number}</p>
            <p>{phoneNumber}</p>
            <p>{email}</p>
          </div>

        </div>

        <div className={styles.right} >

          <div className={styles.right_content} >
            <p>BRANCH  </p>
            <div style={{width:'40%'}} >
            <p>{branch}</p>
            </div>
          </div>

          <div className={styles.right_content} >
            <p>YEAR OF ADMISSION  </p>
            <div style={{width:'40%'}} >
            <p>{yearOfAdmission}</p>
            </div>
          </div>

          <div className={styles.right_content} >
            <p>CUSAT CAT RANK  </p>
            <div style={{width:'40%'}} >
            <p>{catRank}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>RELIGION  </p>
            <div style={{width:'40%'}} >
            <p>{religion}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>CASTE  </p>
            <div style={{width:'40%'}} >
            <p>{caste}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>BLOOD GROUP  </p>
            <div style={{width:'40%'}} >
            <div style={{width:'40%'}} >
            </div>
            <p>{blood_group}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>FATHER'S NAME  </p>
            <div style={{width:'40%'}} >
            <p>{fatherName}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>FATHER'S OCCUPATION  </p>
            <div style={{width:'40%'}} >
            <p>{fatherOccupation}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>FATHER'S MOBILE  </p>
            <div style={{width:'40%'}} >
            <p>{fatherMobileNumber}</p>
            </div>
          </div>
          <div className={styles.right_content} >
            <p>FATHER'S EMAIL  </p>
            <div style={{width:'40%'}} >
            <p>{fatherEmail}</p>
            </div>
          </div>

          <div className={styles.right_content} >
            <p>PERMANENT ADDRESS  </p>
            <div style={{width:'40%'}} >
            <small>{permanentAddress}</small>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfileView;
