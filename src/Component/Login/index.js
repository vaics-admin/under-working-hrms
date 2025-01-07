import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';

import './login.css'

const Login = () =>{
   const navigate = useNavigate();
   const [userName , setUsername] = useState('');
   const [password , setPassword] = useState('');
   const [isMatch, setIsmatch] = useState('')

    const toAdminpage = () =>{
        navigate("/admin");
    }

    const changeUserName = (event) =>{
        setUsername (event.target.value)
    }

    const changePassword = (event) =>{
        setPassword(event.target.value);
    }

    const submitForm = async (event) =>{
        event.preventDefault()
        

        const response = await fetch('http://192.168.20.6:5000/login',{
            method : 'POST',
            headers : {
                'content-type' : 'application/json',
            },
            body : JSON.stringify({userName, password})
        })
       
        const data = await response.json()
        const message = data.message

        if (message === "Success"){
            localStorage.setItem("employee_id" , `${userName}`)
            setIsmatch(true)

            
            navigate("/shome")
        }else{
            setIsmatch(false)
        }
    }

    return (
        <div className = "login-container">
            <div className = "login-comp-logo">
                <img className="company-name" src="/vaics.jpg" alt = "comp-logo"/>
                <p className = "welcome-note">WELCOME TO VAICS</p>
            </div>
            <div className = "login-form-container">
                <form onSubmit={submitForm} className = "login-form">
                    <label className = "label" for = "username">User Name</label>
                    <input onChange={changeUserName} id = "username" className= "cred-input" type = "text"/>
                    <label className = "label" for = "password">Password</label>
                    <input onChange={changePassword} id = "password" className= "cred-input" type = "password"/>
                    {isMatch === false ? <p className='login-err'>User Name and Password didn't match</p> : ""}
                    <div className = "submit-button-login">
                        <button className = "button" type = 'submit'>Submit</button>
                    </div>
                </form>
                <button onClick={toAdminpage} className = "admin-login">Admin</button>
                
            </div>
        </div>
    )
}

export default Login