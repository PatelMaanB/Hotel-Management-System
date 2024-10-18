import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import '../style/signup.css'

function Signup() {
    const [errorMessages, setErrorMessages] = useState({});
    const [formData, setFormData] = useState({name: "", emailAddress: "", userPassword: "", confirmPassword: "" });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value, }));
    };

    const validateInputs = ({ name, emailAddress, userPassword, confirmPassword }) => {
        const errors = {};

        if (!name) {
            errors.name = "Name is required.";
        }
        if (!emailAddress) {
            errors.emailAddress = "Email address is required.";
        }
        if (!userPassword) {
            errors.userPassword = "Password is required.";
        }
        if (userPassword !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs(formData);

        if (JSON.stringify(validationErrors) !== '{}') {
            setErrorMessages(validationErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/signup/", formData);
            const data = response.data;

            if (data.success) {
                navigate("/");
            } else {
                setErrorMessages(data);
            }
        } catch (error) {
            setErrorMessages({ message: "An error occurred. Please try again." });
        }
    };

    return (
        <div className="sign-up">
            <div className="register">
                <form onSubmit={handleSubmit}>
                    <h1>Create Your Account</h1>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>

                    <p className="error">{errorMessages.name}</p>

                    <input type="email" name="emailAddress" placeholder="Email Address" value={formData.emailAddress} onChange={handleChange} required/>
                    
                    <p className="error">{errorMessages.emailAddress}</p>

                    <input type="password" name="userPassword" placeholder="Password" value={formData.userPassword} onChange={handleChange} required/>
                    <p className="error">{errorMessages.userPassword}</p>

                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required/>
                    <p className="error">{errorMessages.confirmPassword}</p>

                    <button className="button_common" type="submit">
                        Sign Up
                    </button>
                </form>
                <a className="link-signup" href="/login">
                    Already registered? Sign in
                </a>
            </div>
        </div>
    );
}

export default Signup