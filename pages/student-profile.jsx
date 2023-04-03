import { getCookies } from "cookies-next";
import NavBar from "./components/NavBar";
import ProfileForm from "./components/ProfileForm";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ProfileView from "./components/ProfileView";

export default function Student({ cookie }) {
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState("PENDING");
  const [condoData, setCondoData] = useState([]);

  useEffect(() => {
    const cookies = getCookies();

    axios
      .post("../api/getProfileData", cookies)
      .then((res) => (setProfile(res.data), setStatus(res.data.status)))
      .catch((err) => setStatus("PENDING"));

      const reg_num = cookies.registration_number;

    const fetchData = async () => {
      try {
        const res = await axios.get("../api/getCondonationDetails");
        setCondoData(res.data.filter(d => d.registration_number == reg_num)[0].condonation_remaining);
        console.log(res.data.filter(d => d.registration_number == reg_num));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(condoData,'condoleft')

  return (
    <>
      <NavBar />
      {status === "APPROVED" ? (
        <ProfileView  condo_left = {condoData}
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
        photo={profile.image} />
      ) : (
        <ProfileForm  />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie;
  if (!cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie,
    },
  };
}
