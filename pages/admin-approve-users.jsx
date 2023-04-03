import { useState } from "react";
import AdminNavBar from "./components/AdminNavbar";
import { useEffect } from "react";
import axios from "axios";
import ProfileView from "./components/ProfileView";
import styles from ".././styles/approveUsers.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ApproveUsers = () => {
  const [profiles, setProfiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("./api/getAllUserProfile")
      .then((res) => setProfiles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleApprove = (reg_numm) => {
    axios
      .post("./api/approveUser", { reg_numm })
      .then(
        (res) => (
          console.log(res),
          toast("STUDENT APPROVED", {
            hideProgressBar: true,
            autoClose: 3000,
            type: "success",
            position: "top-right",
          }),
          setTimeout(() => {
            router.reload();
          }, 3000)
        )
      )
      .catch(
        (err) => (
          console.log(err),
          toast("STUDENT REJECTED", {
            hideProgressBar: true,
            autoClose: 3000,
            type: "warning",
            position: "top-right",
          })
        )
      );
    console.log(reg_numm);
  };
  const handleReject = (reg_numm) => {
    axios
      .post("./api/rejectUserProfile", { reg_numm })
      .then(
        (res) => (
          toast("STUDENT REJECTED", {
            hideProgressBar: true,
            autoClose: 3000,
            type: "error",
            position: "top-right",
          }),
          setTimeout(() => {
            router.reload();
          }, 3000)
        )
      )
      .catch((err) => console.log(err));
    console.log(reg_numm);
  };

  return (
    <div>
      <AdminNavBar />

      {profiles.length > 0 ? (
  profiles.filter(profile => profile.status === "PENDING").length > 0 ? (
    profiles.map((profile, i) =>
      profile.status === "PENDING" ? (
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
          <div className={styles.btns}>
            <button
              className={styles.approveBtn}
              onClick={() => handleApprove(profile.registration_number)}
            >
              APPROVE
            </button>
            <button
              className={styles.rejectBtn}
              onClick={() => handleReject(profile.registration_number)}
            >
              REJECT
            </button>
          </div>
        </div>
      ) : null
    )
  ) : (
    <div style={{display:'flex',height:'400px',justifyContent:'center',alignItems:'center'}} > <h1>NO STUDENT DATA TO BE APPROVED</h1> </div>
  )
) : (
    <div style={{display:'flex',height:'400px',justifyContent:'center',alignItems:'center'}} > <h1>NO STUDENT DATA TO BE APPROVED</h1> </div>
)}

      <ToastContainer />
    </div>
  );
};

export default ApproveUsers;
