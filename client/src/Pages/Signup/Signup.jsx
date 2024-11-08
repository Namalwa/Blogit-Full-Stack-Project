import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { API_BASE } from "../../utils/apiBase";

import "./Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    });

    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: async function (newUser) {
                const response = await fetch(`${API_BASE}/users`, {
                    method: "POST",
                    body: JSON.stringify(newUser),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok === false) {
                    const error = await response.json();
                    console.log(error);
                    throw new Error(error.message)
                }
                const data = await response.json();
                console.log(data);
                return data;
                
            },

            onSuccess: () => {
                toast("Registration successful",{
                    theme: "toast-error",
                    duration: 3000,
                });
                navigate("/login")
            },
            onError: (error) => {
                toast(error.message,{
                    theme: "toast-error",
                    duration: 3000,
            });
        } 
        })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match");
            return;
        }

        const dataToSubmit = { 
            firstname: formData.firstname, 
            lastname: formData.lastname, 
            email: formData.email, 
            username: formData.username, 
            password: formData.password 
        };
        mutate(dataToSubmit);
    };

    return (
        <div className="formdata-container">
            <h1 className="formheading">Signup Form</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="formgroup">
                    <label>
                        First Name:
                        <input 
                            type="text"
                            name="firstname"
                            value={formData.firstname} 
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="formgroup">
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="formgroup">
                    <label>
                        Email Address:
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="formgroup">
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange} 
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="formgroup">
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>

                <div className="formgroup">
                    <label>
                        Confirm Password:
                        <input 
                            type="password"
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                </div>
                
                <div className="createaccount-container">
                    <button type="submit" className="createaccount-btn">
                        {isLoading === true ? "Loading please wait.." : "Create Account"}
                    </button>
                </div>
                
                <div className="existing">
                <p>Already have an account? <a href="/login" className="login-link">Login</a></p>

                </div>
            </form>
        </div>
    );
};

export default Signup;
