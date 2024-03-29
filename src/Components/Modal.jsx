import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button';


const ModalTest = (props)=>{
    const [data, setData] = useState(props.fetchData);
    const [uloading, setUloading] = useState(false);

    useEffect(() => {
        //Runs only on the first render
        // console.log(props.fetchData);
    }, []);

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUloading(true)
        const response = await fetch(`https://employee-app-3tf1.onrender.com/api/users/edit`, {
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
                    role: data.role,
                    phone: data.phone,
                    address: data.address
                }
            )
        });
        // console.log(data);
        const json = await response.json();
        if (response.status == 200) {
            props.onHide();
            window.location.reload();
        }
        setUloading(false)
    }
    return (
        <Modal
            // {...props}
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form action="" className='form' onSubmit={handleUpdate}>
                    <label htmlFor="">First Name</label>
                    <input value={data.first_name} onChange={onChange} type="text" name='first_name' className='input-field' placeholder='Enter your First Name' required />
                    <label htmlFor="">Last Name</label>
                    <input type="text" name="last_name" value={data.last_name} onChange={onChange} className='input-field' placeholder='Enter your Last Name' required />

                    <label htmlFor="">Email</label>
                    <input type="text" name="email" value={data.email} className='input-field' onChange={onChange} placeholder='Enter Your Email' required />
                    <label htmlFor="role">Role</label>
                    <select name="role" value={data.role} className="input-field" onChange={onChange}>
                    <option value="user" selected={data.role === 'user'}>User</option>
                    <option value="admin" selected={data.role === 'admin'}>Admin</option>
                    </select>
                    <br></br>

                    <label htmlFor="phone">Contact No.</label>
                    <input type="tel" pattern="[1-9]{1}[0-9]{9}" name="phone" value={data.phone} onChange={onChange} className='input-field' placeholder='Enter your Ph-no' required />
                    <label htmlFor="">Address</label>
                    <textarea className='input-field' name='address' value={data.address} onChange={onChange} required /><br></br>
                    <button className="button-update" >
                        {
                            uloading ?
                                "Loading ..."
                                :
                                "Update"
                        }
                    </button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalTest