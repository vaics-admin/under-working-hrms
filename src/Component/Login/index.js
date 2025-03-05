import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isMatch, setIsMatch] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');


   // Navigate to Admin page
   const toAdminpage = () => {
        navigate("/admin");
   }

   // Handle username change
   const changeUserName = (event) => {
        setUsername(event.target.value);
   }

   // Handle password change
   const changePassword = (event) => {
        setPassword(event.target.value);
   }

   // Handle form submission
   const submitForm = async (event) => {
        event.preventDefault();

        
        if (!userName || !password) {
            setErrorMessage("User Name and Password are required");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password }), // Using the backend's expected key names
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("empcode", userName); // Store empcode in localStorage
                setIsMatch(true);
                navigate("/shome");
            } else {
                setIsMatch(false);
                setErrorMessage(data.message || "Invalid credentials");
            }
        } catch (error) {
            setIsMatch(false);
            setErrorMessage("An error occurred. Please try again later.");
            console.error("Error:", error);
        }
    };


   return (
        <div className="login-container">
            <div className="login-comp-logo">
                <img className="company-name" src="/vaics.jpg" alt="comp-logo" />
                <p className="welcome-note">WELCOME TO VAICS</p>
            </div>
            <div className="login-form-container">
                <form onSubmit={submitForm} className="login-form">
                    <label className="label" htmlFor="username">User Name</label>
                    <input onChange={changeUserName} id="username" className="cred-input" type="text" />
                    
                    <label className="label" htmlFor="password">Password</label>
                    <input onChange={changePassword} id="password" className="cred-input" type="password" />
                    
                    {isMatch === false && <p className="login-err">User Name and Password didn't match</p>}
                    
                    <div className="submit-button-login">
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
                <button onClick={toAdminpage} className="admin-login">Admin</button>
            </div>
        </div>
   );
}

export default Login;
