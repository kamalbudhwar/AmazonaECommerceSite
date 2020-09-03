import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //   useEffect(() => {}, []);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          <li>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
          </li>
          <li>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}></input>
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
