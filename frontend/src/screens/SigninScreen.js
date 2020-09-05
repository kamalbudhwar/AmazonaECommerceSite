import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";

function SigninScreen(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignIn=useSelector((state)=>state.userSignin);
  const{loading,userInfo,error}=userSignIn;
  
    useEffect(() => {
        if(userInfo){
            props.history.push('/')
        }
    }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email,password));
   
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          {loading&&<li><div>Loading.......</div></li>}
          {error&&<li><div>{error}</div></li>}
          <li>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}  autoComplete="Current Password"></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to amazona??</li>
          <li>
            <Link to="/register" className="button secondry text-center">
              Create Your amazona account
            </Link>{" "}
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
