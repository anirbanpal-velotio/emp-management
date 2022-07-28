import React, { useEffect } from "react";
import "./signin.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_STATE } from "../models/user.model";
import { setLoggedIn } from "../redux/actions/auth";
axios.defaults.withCredentials=true

const SigninForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async(data: any) => {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const {email,name,role,id,age,dateOfJoining } = res.data.user;
    if(res.status===200){
      const user:USER_STATE = {
        id,name,email,role,age,dateOfJoining
      }
      dispatch(setLoggedIn(user))
      localStorage.setItem('userDeatils', JSON.stringify(user));
      navigate('../employeerecords', {replace: true})
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="form-group" >
        <div className="form">
          <h1>Sign In as User</h1>
          <div className="textbox">
            <span className="fa fa-user" aria-hidden="true"></span>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", { required: true , pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }})}
            />
            
          </div>
          {errors.email && <span className="error">Email is required</span>}
          <div className="textbox space">
            <span className="fa fa-lock" aria-hidden="true"></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {required: true,
              minLength: {
                value: 5,
                message: "min length is 5"
              }})}
            />
           
          </div>
          {errors.password && <span className="error">Password is required</span>}
          <div className="textbox-btn">
          <button type="submit"  className="btn">LOGIN</button>
          </div>
          
         
          <p>Or Sign in using social platforms</p>
          <div className="social-platforms">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-google" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-linkedin" aria-hidden="true"></i>
          </div>
        </div>
        </div>
      </form>
    </>
  );
};
export default SigninForm;
