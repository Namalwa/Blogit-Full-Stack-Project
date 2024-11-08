import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from 'react-query';
import { API_BASE } from "../../utils/apiBase";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import "./Login.css";

const Login = () => {
    const [loginData, setLoginData] = useState({
        usernameoremail: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const { mutateAsync, isLoading } = useMutation({
        mutationFn: async (userObj) => {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: "POST",
                body: JSON.stringify(userObj),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }
            return response.json(); 
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { usernameoremail, password } = loginData;

        try {
            const response = await mutateAsync({
                usernameoremail, 
                password
            });
            if (response) {
                toast("Login successful!");
                navigate("/explore");
            }
        } catch (error) {
            toast(error.message); 
        }
    };

    return (
        <div className="login-section">
            <h1 className="login-text">Login Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label>Username or Email Address:</label>
                    <input
                        type="text"
                        name="usernameoremail"
                        id="usernameoremail"
                        value={loginData.usernameoremail}
                        onChange={handleChange}
                        placeholder="Enter username or email"
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <div className="loginbtn-section">
                    <button type="submit" className="login-button" disabled={isLoading}>
                        {isLoading ? "Please wait..." : "Login"}
                    </button>
                </div>

                <div className="existing">
                <p>Don't have an account yet? <a href="/signup" className="signup-link">Signup</a></p>

                </div>
            </form>
        </div>
    );
};

export default Login;

