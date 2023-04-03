import styles from "../../styles/profileForm.module.css";
import { useState, useEffect } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [admission, setAdmission] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfAdmission, setyearOfAdmission] = useState("");
  const [catRank, setCatRank] = useState("");
  const [religion, setReligion] = useState("");
  const [age_dob, setAge_dob] = useState("");
  const [caste, setCaste] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [blood_group, setBlood_group] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [fatherMobileNumber, setFatherPhoneNumber] = useState("");
  const [fatherEmail, setFatherEmail] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [status, setStatus] = useState("NOT-APPROVED");
  const [registration_number, setRegNum] = useState("");
  const [profile, setProfile] = useState({});
  const [image , setImage] = useState('')

  const router = useRouter()

  useEffect(() => {
    const cookies = getCookies();
    const reg_num = cookies.registration_number;
    setRegNum(reg_num);

    axios.post("../api/getProfileData",cookies)
    .then(res => {
      setProfile(res.data,'response') 
      if(res.data.status === 'PENDING'){
        setStatus('PENDING')
      }}
    ) 
    .catch(err => console.log(err))
    

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("../api/getCondonationDetails");
        setCondoData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    await setData();
    
  };

  const setData = async () => {

    var get_image = ''
    const data = new FormData()
    data.append('file',image)
    data.append('upload_preset','cusat_image')
    data.append('cloud_name','drhiyxeip')

    for (var [key, value] of data.entries()) { 
      console.log(key, value);
  }
  
    const resp =  fetch(`https://api.cloudinary.com/v1_1/drhiyxeip/image/upload`, {
      method: 'post',
      body: data,
    }).then(res => res.json())
    .then(data =>{
    const imageUrl = data.url; // assign the URL value to a variable called imageUrl
    get_image = imageUrl

    const obj = {
      name: name,
      admission: admission,
      registration_number: registration_number,
      branch: branch,
      yearOfAdmission: yearOfAdmission,
      catRank: catRank,
      religion: religion,
      age_dob: age_dob,
      caste: caste,
      phoneNumber: phoneNumber,
      email: email,
      blood_group: blood_group,
      fatherOccupation: fatherOccupation,
      fatherName: fatherName,
      fatherMobileNumber: fatherMobileNumber,
      fatherEmail: fatherEmail,
      permanentAddress: permanentAddress,
      currentAddress: currentAddress,
      status: 'PENDING',
      image: get_image,
    };



    if (obj.phoneNumber.length > 0) {
      axios
      .post("../api/addUserProfile", obj)
      .then((res) => (
        console.log(res),
      alert('YOUR APPLICATION IS SUBMITTED'),
        setTimeout(() => {
          router.reload();
        }, 2000)
      ) )
      .catch((err) => console.log(err));

      axios.post('../api/addCondonation',obj).then(res => console.log(res)).catch(err => console.log(err,'poppppp'))

    };
    console.log(imageUrl,'url-------------------->');
    })
    .catch(err => console.log(err))

    

    
  }

  return (
    <div className={styles.profile_form}>
      <h2>STUDENT INFORMATION FORM</h2><ToastContainer />

      {
        status === 'NOT-APPROVED' ? 
        <form action="" onSubmit={e => e.preventDefault()} >
        <div className={styles.form_box}>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="name">
                Name
              </label>
              <input
                className={styles.name_input}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                type="text"
                required
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="Admission">
                Admission No.
              </label>
              <input
                required
                className={styles.name_input}
                value={admission}
                onChange={(e) => setAdmission(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>

          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="branch">
                Branch
              </label>
              <input
                required
                className={styles.name_input}
                value={branch}
                onChange={(e) => setBranch(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="Year of Admission">
                Year of Admission
              </label>
              <input
                required
                className={styles.name_input}
                value={yearOfAdmission}
                onChange={(e) => setyearOfAdmission(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>
        </div>

        <div className={styles.form_box}>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="catRank">
                CAT RANK
              </label>
              <input
                required
                className={styles.name_input}
                value={catRank}
                onChange={(e) => setCatRank(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="RELEGION">
                Age & DOB
              </label>
              <input
                required
                className={styles.name_input}
                value={age_dob}
                onChange={(e) => setAge_dob(e.currentTarget.value)}
                type="date"
              />
            </div>
          </div>

          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="relegion">
                Religion
              </label>
              <input
                required
                className={styles.name_input}
                value={religion}
                onChange={(e) => setReligion(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="caste">
                Caste
              </label>
              <input
                required
                className={styles.name_input}
                value={caste}
                onChange={(e) => setCaste(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>
        </div>

        <div className={styles.form_box}>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="catRank">
                Student PH No.
              </label>
              <input
                required
                className={styles.name_input}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="RELEGION">
                Student Email
              </label>
              <input
                required
                className={styles.name_input}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>

          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="relegion">
                Blood Group
              </label>
              <input
                required
                className={styles.name_input}
                value={blood_group}
                onChange={(e) => setBlood_group(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className="name" htmlFor="caste">
                Photo
              </label>
              <input 
              className='name_input' 
               onChange={(e) => (console.log(e.target.files[0]), 
              setImage(e.target.files[0]))}  
              type="file" id="img" name="img" />
            </div>
          </div>
        </div>

        <div className={styles.form_box}>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="catRank">
                Father's Name
              </label>
              <input
                required
                className={styles.name_input}
                value={fatherName}
                onChange={(e) => setFatherName(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="RELEGION">
                Father's Occupation
              </label>
              <input
                required
                className={styles.name_input}
                value={fatherOccupation}
                onChange={(e) => setFatherOccupation(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>

          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="relegion">
                Father's PH No.
              </label>
              <input
                required
                className={styles.name_input}
                value={fatherMobileNumber}
                onChange={(e) => setFatherPhoneNumber(e.currentTarget.value)}
                type="text"
              />
            </div>

            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="caste">
                Father's Email
              </label>
              <input
                required
                className={styles.name_input}
                value={fatherEmail}
                onChange={(e) => setFatherEmail(e.currentTarget.value)}
                type="text"
              />
            </div>
          </div>
        </div>

        <div className={styles.form_box}>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className="name" htmlFor="relegion">
                Permanent Address
              </label>{" "}
              <br />
              <textarea
                id="w3review"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.currentTarget.value)}
                type="text"
                name="w3review"
                rows="4"
                cols="50"
                required
              />
            </div>
          </div>
          <div className={styles.StudentForm}>
            <div className={styles.form_content}>
              <label className={styles.name} htmlFor="relegion">
                Current Address
              </label>{" "}
              <br />
              <textarea
                id="w3review"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.currentTarget.value)}
                type="text"
                name="w3review"
                rows="4"
                cols="50"
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.btnDiv}>
          <button className={styles.submit_form} onClick={handleSubmit}>
            SUBMIT FORM
          </button>
        </div>
      </form>
        :
        <div style={{display:'flex',height:'400px',justifyContent:'center',alignItems:'center'}} > <h1>YOUR APPLICATION IS PENDING</h1> </div>
        
      }


    
    </div>
  );
};

export default ProfileForm;
