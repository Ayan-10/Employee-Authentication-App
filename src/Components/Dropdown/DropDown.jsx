import React from 'react'
import '../Profile/UpdateProfile.css'
import { FaUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



const Dropdown = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        navigate("/login");
    }
    return (

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "white", color: "#57B2FB", border: "none",  }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="" onClick={()=>{navigate("/")}}>Dash Board</a></li>
                        <li><a className="dropdown-item" href="" onClick={()=>{navigate("/profile")}}>My Profile</a></li>
                        <li><a className="dropdown-item" href="" onClick={()=>{navigate("/update")}}>Update Profile</a></li>
                        <li><a className="dropdown-item" href="" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
           
    )
}

export default Dropdown