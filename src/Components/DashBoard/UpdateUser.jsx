import React, { useEffect, useState } from 'react'
import '../Profile/UpdateProfile.css'
import { FaUser } from "react-icons/fa6";
import { useNavigate, Link, useLocation  } from 'react-router-dom';
import Dropdown from '../Dropdown/DropDown';


const UpdateUser = () => {
    let navigate = useNavigate();
    const { state } = useLocation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [uloading, setUloading] = useState(false);



    const fetchData = async (token) => {
        // console.log(state.name);
        setLoading(true)
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
        }
        else {
            navigate("/login")
        }
        setLoading(false)

    }



    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUloading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/api/user/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem("token")
            },
            body: JSON.stringify(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                }
            )
        });
        // console.log(data);
        const json = await response.json();
        if (response.status == 200) navigate("/")
        setUloading(false)
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) navigate("/login")
        //Runs only on the first render
        fetchData(token);
    }, []);


    return (
        <div className='update-dash'>

            <div className="dash-header">
                <div className="dashitems">
                    Update Profile Details
                </div>
                <Dropdown />
            </div>
            {
                loading ?
                    "loading"
                    :
                    <div className='das'>
                        <div className="update-dash-main">
                            <form action="" className='form-body' onSubmit={handleUpdate}>
                                <label htmlFor="">First Name</label>
                                <input value={data.first_name} onChange={onChange} type="text" name='first_name' className='input-field' placeholder='Enter your First Name' required />
                                <label htmlFor="">Last Name</label>
                                <input type="text" name="last_name" value={data.last_name} onChange={onChange} className='input-field' placeholder='Enter your Last Name' required />

                                <label htmlFor="">Email</label>
                                <input type="text" name="email" value={data.email} className='input-field' onChange={onChange} placeholder='Enter Your Email' required />

                                <label htmlFor="phone">Contact No.</label>
                                <input type="tel" pattern="[1-9]{1}[0-9]{9}" name="phone" value={data.phone} onChange={onChange} className='input-field' placeholder='Enter your Ph-no' required />
                                <label htmlFor="">Address</label>
                                <textarea className='input-field' name='address' value={data.address} onChange={onChange} required />
                                <button className="button-update" >
                                    {
                                        uloading ?
                                            "Loading ..."
                                            :
                                            "Update"
                                    }
                                </button>
                            </form>

                        </div>


                    </div>
            }
        </div>
    )
}

export default UpdateUser