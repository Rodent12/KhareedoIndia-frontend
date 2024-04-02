import React, { useState } from 'react'
import "./stylesheets/LoginSignup.css"

const LoginSignup = () => {

  const [state,setState] = useState("Sign Up");
  const [formData,setformData] = useState({
    username : "",
    password : "",
    email : ""
  });

  const handleState = ()=>{
    if(state === 'Sign Up'){
      setState('Login')
    }
    else{
      setState('Sign Up')
    }
  }

  const changeHandler = (e)=>{
    setformData({...formData,[e.target.name]: e.target.value})
  }

  const login = async()=>{
    console.log("Logging in",formData)
    let responseData;
    await fetch('https://khareedoindia-backend.onrender.com/login',{
      method : 'POST',
      headers : {
        Accept : 'application/form-data',
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify(formData),
    }).then((res)=> res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async()=>{
    console.log("Signing in",formData);
    let responseData;
    await fetch('https://khareedoindia-backend.onrender.com/signup',{
      method : 'POST',
      headers : {
        Accept : 'application/form-data',
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify(formData),
    }).then((res)=> res.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state ==='Sign Up' ? <input type="text" placeholder='Name' name = "username" value={formData.username} onChange={changeHandler}/> : <></> }
          <input type="email" placeholder='Email' name = "email" value={formData.email} onChange={changeHandler} />
          <input type="password"placeholder='Password' name = "password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={()=>{state === 'Login' ? login() : signup()}}>Continue</button>
        {state ==='Sign Up' ?
        <p className="loginsignup-login">Already have an account? <span onClick={handleState}>Login here</span></p>
        :
        <p className="loginsignup-login">Don't have an account? <span onClick={handleState}>Register here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}


export default LoginSignup;