import { useState } from "react";
import AdminNavBar from "./components/AdminNavbar";
import { useEffect } from "react";
import axios from "axios";
import ProfileView from "./components/ProfileView";
import styles from ".././styles/approveUsers.module.css";
import { getCookies } from "cookies-next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ApproveUsers = () => {
  const [profiles, setProfiles] = useState([]);
  const router = useRouter();
  const [condoData, setCondoData] = useState([]);

  useEffect(() => {
    axios
      .get("./api/getAllUserProfile")
      .then((res) => setProfiles(res.data))
      .catch((err) => console.log(err));

      const cookies = getCookies();
      const reg_num = cookies.registration_number;
      const fetchData = async () => {
        try {
          const res = await axios.get("./api/getCondonationDetails");
          setCondoData(res.data.filter(d => d.registration_number == reg_num)[0].condonation_remaining);
          console.log(res.data.filter(d => d.registration_number == reg_num));
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
  }, []);

  return (
    <div>
      <AdminNavBar />

      {profiles.length > 0 ? (
  profiles.filter(profile => profile.status == "APPROVED").length > 0 ? (
    profiles.map((profile, i) =>
      profile.status === "APPROVED" ? (
        <div>
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
        </div>
      ) : null
    )
  ) : (
    <div style={{display:'flex',height:'400px',justifyContent:'center',alignItems:'center'}} > <h1>NO APPROVED STUDENTS </h1> </div>
  )
) : (
    <div style={{display:'flex',height:'400px',justifyContent:'center',alignItems:'center'}} > <h1>NO APPROVED STUDENTS</h1> </div>
)}

      <ToastContainer />
    </div>
  );
};

export default ApproveUsers;
