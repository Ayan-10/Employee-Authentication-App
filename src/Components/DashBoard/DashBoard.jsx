import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../DashBoard/DashBoard.css'
import { FaUserEdit } from "react-icons/fa";
import { redirectimport, Link } from 'react-router-dom';
import Dropdown from '../Dropdown/DropDown';
import ModalTest from '../Modal';


// function MyVerticallyCenteredModal(props) {

// }


const DashBoard = () => {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [showIndex, setshowIndex] = useState(0);

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
            const response = await fetch(`https://employee-app-3tf1.onrender.com/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem("token")
                }
            });
            const json = await response.json();
            setData(json.data);
            // console.log(data);
            setLoading(false)
        }
        else {
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

        <div className='dashboard-main'>

            <div className="dash-header">
                <div className="dashitems">
                    User Profile
                </div>

                <Dropdown />
            </div>
            {
                loading ?
                    "Loading"
                    :
                    data.map((item, index) => (
                        <div className="dash-body">
                            {/* <h1 className='dash-heading'>My Profile</h1> */}
                            <div className="dash-main-body">
                                <div className="drow1">
                                    <div className="item-name">First Name:</div>
                                    <div className="item-content">{item.first_name}</div>
                                    <div className="item-name">Last Name:</div>
                                    <div className="item-content">{item.last_name}</div>
                                    <button class style={{ backgroundColor: "white", color: "#57B2FB", border: "none", float: "right" }} onClick={() => { setModalShow(true); setshowIndex(index); }}>
                                        <FaUserEdit />
                                    </button>
                                    {/* <MyVerticallyCenteredModal
                                        show={modalShow}
                                        fetchData={data[showIndex]}
                                        onHide={() => setModalShow(false)}
                                    /> */}
                                    {modalShow &&<ModalTest
                                        show={modalShow}
                                        fetchData={data[showIndex]}
                                        onHide={() => setModalShow(false)}
                                    />}
                                    {/* <Link to={{
      pathname: '/update-user',
      state: {id: 1, name: 'sabaoon', shirt: 'green'}
    }} ><FaUserEdit /></Link> */}
                                </div>
                                <div className="row2">
                                    <div className="item-name" style={{ paddingRight: "1rem" }}>Email:</div>
                                    <div className="item-content">{item.email}</div>
                                </div>
                                <div className="row2">
                                    <div className="item-name" style={{ paddingRight: "1rem" }}>Ph-no:</div>
                                    <div className="item-content">{item.phone}</div>
                                </div>
                                <div className="row2">
                                    <div className="item-name" style={{ paddingRight: "1rem" }}>Address:</div>
                                    <div className="item-content">{item.address}</div>
                                </div>
                            </div>
                        </div>
                    ))


            }
        </div>
    )
}

export default DashBoard