import React, { useEffect, useState } from "react";
import "./EmployeeRecords.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_STATE } from "../models/user.model";
import UserForm from "./UserForm";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../redux/actions/auth";

function EmployeeRecords() {
  // for showing modals
  const [show, setShow] = useState(false);
  const [userToEdit, setUserToEdit] = useState<USER_STATE | null>(null);
  const dispatch = useDispatch()
  const handleShow = (user: USER_STATE | null = null) => {
    if (user) {
      setUserToEdit(user);
    }
    else{
      setUserToEdit(null)
    }
    setShow(true);
  };
  const handleClose = () => {
    setUserToEdit(null)
    setShow(false)
  };
  const [users, setUsers] = useState<USER_STATE[]>([]);
  const navigate = useNavigate();

  const handleError = ()=>{
    //on error log out from the application
    dispatch(setLoggedOut())
    localStorage.removeItem('userDeatils')
  }
  const updateUser = async(user: USER_STATE) => {
    try{
      if(userToEdit){
        const res = await axios({
          method: "put",
          url: `${process.env.REACT_APP_BASEURL}/user/${userToEdit.id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(user),
        });
        const userResponse = res.data.user
  
        setUsers((prev) => prev.map(x=>{
          if(x.id===userToEdit.id){
            return userResponse
          }
          else{
            return x
          }
        }));
      }
      else{
        const res = await axios({
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/user`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(user),
        });
        const userResponse = res.data.user
        setUsers((prev) => [...prev, userResponse]);
      }
    }
    catch(err:any){
      console.error(err.message)
      handleError()
    }
  };

  const handleDelete = async(id:number|string)=>{
    try{
      await axios.delete(`${process.env.REACT_APP_BASEURL}/user/${id}`)
      setUsers((prev)=> prev.filter(x=>x.id!==id))
    }
    catch(err:any){
      console.error(err.message)
      handleError()
    }
  }

  useEffect(() => {
    (async () => {
      const config = {
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/user`,
      };
      try {
        const res = await axios(config);
        setUsers(res.data.users);
      } catch (err: any) {
        localStorage.removeItem("userDeatils");
        navigate("../", { replace: true });
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-between table-header">
        <div className="col-4">
          <h1>Employee Records</h1>
        </div>
        <div className="col-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleShow(null)}
          >
            Add New+
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Emp ID</th>
            <th scope="col">Position</th>
            <th scope="col">Email</th>
            <th scope="col">DOJ</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: USER_STATE, idx) => {
            return (
              <tr key={idx}>
                <td>{user.name}</td>
                <td>{user.id}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.dateOfJoining.toString()}</td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={()=>handleDelete(user.id)}>
                    <i className="fa fa-trash delete"></i>
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-info edit"
                    onClick={() => handleShow(user)}
                  >
                    <i className="fa fa-edit edit"></i>Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {show && <UserForm
        show={show}
        handleClose={handleClose}
        user={userToEdit}
        updateUser={updateUser}
      />}
    </div>
  );
}

export default EmployeeRecords;
