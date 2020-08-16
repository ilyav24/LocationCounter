import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { authenticationRequest } from "./actions";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, token } = useSelector((state) => state.authentication);
  const handleSubmit = (event) => {
    const credentials = {
      username,
      password,
    };

    dispatch(authenticationRequest(credentials));
    event.preventDefault();
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {
    document.getElementById("root").className =
      "container-fluid h-100 bg-secondary";

    return () => (document.getElementById("root").className = "");
  }, []);

  return (
    <React.Fragment>
      {token && <Redirect to='/' />}
      <div className='row h-100 justify-content-center align-items-center'>
        <div className='rounded col-6 col-lg-4 bg-dark text-white p-4'>
          <LoginForm
            error={error}
            handleSubmit={handleSubmit}
            handleFieldChange={handleFieldChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
