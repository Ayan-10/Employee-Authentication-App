import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Profile/Profile.css'
import { FaUser } from "react-icons/fa6";
import { redirect } from 'react-router-dom';
import Dropdown from '../Dropdown/DropDown';


const Profile = () => {
    let navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async (token) => {
        const tokenResponse = await fetch(`https://employee-app-3tf1.onrender.com/auth/verification`, {
            method: 'GET',
            headers: {
                // 'Content-Type': 'application/json',
                'token': token
            }
        });
        if (tokenResponse.status === 200) {

            const tokenJson = await tokenResponse.json();
            const response = await fetch(`https://employee-app-3tf1.onrender.com/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            setData(json.data);
            setLoading(false)
        }
        else{
            navigate("/login")
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);
    }, []);

    

    return (

        <div className='dashboard-main-profile'>

            <div className="dash-header">
                <div className="dashitems">
                    User Profile
                </div>
                
                    <Dropdown/>
            </div>
            {
                loading ?
                    "Loading"
                    :
                    <div className="dash-body-profile">
                        {/* <h1 className='dash-heading'>My Profile</h1> */}
                        <div className="dash-main-body-profile">
                            <div className="drow1">
                                <div className="item-name">First Name:</div>
                                <div className="item-content">{data.first_name}</div>
                                <div className="item-name">Last Name:</div>
                                <div className="item-content">{data.last_name}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Email:</div>
                                <div className="item-content">{data.email}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Ph-no:</div>
                                <div className="item-content">{data.phone}</div>
                            </div>
                            <div className="row2">
                                <div className="item-name" style={{ paddingRight: "1rem" }}>Address:</div>
                                <div className="item-content">{data.address}</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Profile