import { useState } from "react"
import AdminNavBar from "./components/AdminNavbar"
import { useEffect } from "react"
import axios from "axios"
import ProfileView from "./components/ProfileView"




const ApproveUsers = () => {

    const [profiles,setProfiles] = useState([])

    useEffect(() => {

        axios.get('./api/getAllUserProfile').then(res => setProfiles(res.data)).catch(err => console.log(err))

    },[])

    const handleApprove = (reg_numm) => {
        axios.post('./api/approveUser',{reg_numm}).then(res => console.log(res)).catch(err => console.log(err))
        console.log(reg_numm)
    }
    const handleReject = (reg_numm) => {
        axios.post('./api/rejectUserProfile',{reg_numm}).then(res => console.log(res)).catch(err => console.log(err))
        console.log(reg_numm)
    }


  return (
    <div>
        <AdminNavBar/>

        {profiles?.map((profile,i) => 
        <div  >
        <ProfileView 
        name={profile.name} 
        branch={profile.branch} 
        registration_number={profile.registration_number} 
        phoneNumber={profile.phoneNumber} 
        email={profile.email} 
        yearOfAdmission={profile.yearOfAdmission} 
        catRank={profile.catRank} 
        religion={profile.religion} 
        caste={profile.caste} 
        blood_group={profile.blood_group} 
        fatherName={profile.fatherName} 
        fatherOccupation={profile.fatherOccupation} 
        fatherMobileNumber={profile.fatherMobileNumber} 
        permanentAddress={profile.permanentAddress} 
        fatherEmail={profile.fatherEmail} 
        age_dob={profile.age_dob} 
        photo={profile.image}
        />
        <button onClick={() => handleApprove(profile.registration_number)} >Approve</button>
        <button onClick={() => handleReject(profile.registration_number)} >Reject</button>
        </div>
        )}
      
    </div>
  )
}

export default ApproveUsers
