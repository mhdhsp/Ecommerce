import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminManage() {
    const [admins,setAdmins]=useState([]);
    const [showForm,setShowForm]=useState(false);
    const [data,setData]=useState({name:"",pass:""})
    const navigate=useNavigate();
    useEffect(()=>{
       const fetchAdmins=async ()=>{
         let res=await axios.get(`http://localhost:3031/admins`);
        res=res.data;
        setAdmins(res);
       };
       fetchAdmins();
        
    },[]);

    const handleForm=()=>{
        console.log(showForm);
        
        setShowForm(true);

    }

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        console.log(data);
        
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        console.log(data);
        
        await axios.post(`http://localhost:3031/admins`,data)
        setData({name:"",pass:""});
        setShowForm(false);
        navigate(0);
    }
  return (
   <div className="row " style={{display:"flex", flexDirection:"column"}}>
        <button className='btn btn-primary ' style={{width:"150px", height:"50px", margin:"20px"}}
            onClick={handleForm}>Add new admin</button>

        {
            showForm &&
                <form className="p-4 border rounded bg-light shadow-sm" onSubmit={handleSubmit}>
  <div className="mb-3">
    <input
      type="text"
      name="name"
      className="form-control"
      value={data.name}
      placeholder="Enter the user name for new admin"
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <input
      type="text"
      name="pass"
      className="form-control"
      value={data.pass}
      placeholder="Enter the password for new admin"
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="btn btn-success w-100">Add Admin</button>
</form>

            
        }



        {admins.length === 0 ? (
          <p className="text-muted text-center">No admins found.</p>
        ) : (
          admins.map((admin, index) => (
            <div key={index} className="col-md-4 mb-4 ">
              <div className="card shadow-sm border-primary h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">Admin #{index + 1}</h5>
                  <p className="card-text">
                    <strong className="text-dark">Name:</strong> {admin.name}
                  </p>
                  <p className="card-text">
                    <strong className="text-dark">Password:</strong>{" "}
                    <span className="text-danger">{admin.pass}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
  )
}

export default AdminManage