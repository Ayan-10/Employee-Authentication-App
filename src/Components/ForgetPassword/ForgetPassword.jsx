import React, { useState } from 'react'
import '../ForgetPassword/ForgetPassword.css'
import img1 from '../../Assests/Forgot password-bro.png'
import { useNavigate } from 'react-router-dom'
import { IoIosMail } from "react-icons/io";


const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        "email": ""
    });
    let navigate = useNavigate();


    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        setLoading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: data.username
                }
            )
        });
        const json = await response.json();
        alert("Password sent to your registered email");
        navigate("/login")
        setLoading(false)
    }

    return (
        <div className='forgetpass-main'>
            <div className="forgetpass-left">
            <div class="wrapper">
        <header>Forget Password</header>
        <form  onSubmit={handleClick}>
            <div class="field email">
                <div class="input-area">
                    <input type="email" name="email" placeholder='Enter Your Registered Email' onChange={onChange} required />
                    <IoIosMail class="icon"/>
                    {/* <i class="icon fas fa-user"></i> */}
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Name can't be blank</div>
            </div>

            

            {/* <div class="field email">
                <div class="input-area">
                    <input type="text" placeholder="Email Address" name="email" id="email" /> */}
                    {/* <i class="icon fas fa-envelope"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i> */}
                {/* </div>
                <div class="error error-txt">Email can't be blank</div>
            </div> */}
                <button className='btn-signup'>
                {
                                                    loading?"Loading...":"Sent Password"

                }
                                
                </button>
        </form>
        
    </div>

                {/* <div className="signup-heading">Forget Password</div>
                <div className="form-main-forget">
                    <form action="" className='form-content'>
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" className='input-field' placeholder='Enter Your Email' onChange={onChange} required />
                        <div className='btn-signup' onClick={handleClick}>
                            {
                                loading?"Loading...":"Sent Password"
                            }
                            </div>
                    </form>
                </div> */}
            </div>
            <div className="forgetpass-right">
                <div className="for-img">
                    <img src={img1} alt="" className='forimg' />
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword