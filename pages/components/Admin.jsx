import styles from '@/styles/Home.module.css'
import { RiDashboardLine  } from "react-icons/Ri";
import { BsMessenger  } from "react-icons/Bs";
import { BsFillCalendarWeekFill  } from "react-icons/Bs";
import { RiSettingsFill  } from "react-icons/Ri";
import { ImSearch  } from "react-icons/Im";
import { BsDatabaseFillLock,BsFileBarGraphFill  } from "react-icons/Bs";
import React from 'react'

const Admin = () => {
  return (
    <div className='container' >

     <div className="left_box">
     
     <div className="logo">
        <h1>CUSAT</h1>
     </div>

    <div className="left">
    <div className="left_content"> <div className='content' > <RiDashboardLine  /> Dashboard</div></div>  
    <div className="left_content"><div className='content' > <BsMessenger  /> Messenger</div></div>
    <div className="left_content"><div className='content' > <BsFillCalendarWeekFill  /> Calender</div></div>
    <div className="left_content"><div className='content' > <BsDatabaseFillLock  /> Database</div></div>
    <div className="left_content"><div className='content' > <BsFileBarGraphFill  /> Attendance</div></div>
    <div className="left_content"><div className='content' > <RiSettingsFill  /> Settings</div></div>

     </div>
     </div>


    <div className="right">

        <div className="search">
            <div className='iconSearch' >
            <ImSearch/>
            </div>
            <input className='input_text' placeholder='Seach for student, teacher, document....' type='text' />
        </div>

        <h1 className='dashboard' >Dashboard</h1>

        <div className='cards_keeper' >

                <div className="card_content_1">

                    <img className='card_img' src="https://cdn-icons-png.flaticon.com/512/2416/2416471.png" alt="" />
                    <div className='left_of_card' >
                     <span className="card_text">Students</span>
                    <h2 className="card_number" >302</h2>
                    </div>

                </div>
                <div className="card_content_1">

                    <img className='card_img' src="https://cdn-icons-png.flaticon.com/512/206/206897.png" alt="" />
                    <div className='left_of_card' >
                     <span className="card_text">Teachers</span>
                    <h2 className="card_number" >14</h2>
                    </div>

                </div>

                <div className="card_content_1">

                    <img className='card_img' src="https://www.vhv.rs/dpng/d/438-4386153_office-clipart-office-staff-office-office-staff-transparent.png" alt="" />
                    <div className='left_of_card' >
                     <span className="card_text">Staff</span>
                    <h2 className="card_number" >10</h2>
                    </div>

                </div>

        </div>

    </div>

    </div>
  )
}

export default Admin
