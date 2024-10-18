import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../style/login.css';

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    emailAddress: "",
    userPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();


  const validateInputs = ({ emailAddress, userPassword }) => {
    const errors = {};

    if (!emailAddress) {
      errors.emailAddress = "Email address is required.";
    }
    if (!userPassword) {
      errors.userPassword = "Password is required.";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs(loginDetails);

    if (JSON.stringify(validationErrors) !== '{}') {
      setErrorMessages(validationErrors);
      return;
    }

      const response = await axios.post("http://localhost:8000/login/", loginDetails);
      const result = response.data;

      if (response.status === 200) {
        navigate('/bookingform');
      } else {
        setErrorMessages(result);
      }

  };

  return (
    <div className="sign-in">
      <div className="login">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>

          <input
            type="email"
            name="emailAddress"
            placeholder="Email"
            onChange={handleInputChange}
            value={loginDetails.emailAddress}
          />
          <p className="error">{errorMessages.emailAddress}</p>

          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            onChange={handleInputChange}
            value={loginDetails.userPassword}
          />
          <p className="error">{errorMessages.userPassword}</p>

          <button type="submit" className="button_common">Log in</button>
        </form>
        <a className="link-signin" href="/signup">Not yet registered? Sign up Now</a>
      </div>
    </div>
  );
};

export default Login;
