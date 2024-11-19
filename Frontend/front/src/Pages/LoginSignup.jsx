import React from 'react'
import './CSS/LoginSingup.css'
import { useState } from 'react'

export const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("login", formData)
    
    let responseData;

    await fetch('http://localhost:8000/user/login', {
      method: 'POST',
        headers:{
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      }
      ).then((response) => response.json()).then((data) => responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }

  }

  const signup = async () => {
    console.log("Signup carai", formData)

    let responseData;

    await fetch('http://localhost:8000/user/signup', {
      method: 'POST',
        headers:{
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      }
      ).then((response) => response.json()).then((data) => responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors)
    }

  }

  return (
    <div className='loginsingup'>
      <div className="loginsingup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
          {state === "Sign up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Seu nome'/>:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='E-mail' />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Senha' />
        </div>
        <button onClick={() => {state === "Login"?login():signup()}}>Continue</button>
        {state === "Sign up" ? 
        <p className="loginsingup-login">Ja possui uma conta? <span onClick={() => {setState("Login")}}>Login aqui</span></p> 
        :<p className="loginsingup-login">Criar uma conta? <span onClick={() => {setState("Sign up")}}>Clique aqui</span></p>}
        
        
        <div className="loginsingup-agree">
          <input type="checkbox" name="" id="" />
          <p>Ao continuar, você concorda com todos os termos de uso e políticas de privacidade</p>
        </div>
        
      </div>
    </div>
  )
}
