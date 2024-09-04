import React, { useContext, useEffect, useState } from 'react'
import {Context}  from "../store/appContext.js"
import { Link, useNavigate } from 'react-router-dom'
export default function SingUpForm() {
    const {actions}=useContext(Context)
    const navigate = useNavigate()

    const [data, setData] = useState({
        "name": "",
        "email": "",
        "password": ""
    })
    useEffect(()=>{
        actions.exampleFunction()
    },[])

    const handleInput=(e)=>{
+       setData({...data,[e.target.name]:e.target.value})
    }

    
    const handleButton=()=>{
        actions.singInUp(data)
        setData({
            "name": "",
            "email": "",
            "password": ""
        })
        navigate("/")

    }
    

    return (
        <form onClick={((e)=>{e.preventDefault()})} className='d-flex flex-column'>
            <h1>Sign Up</h1>
            <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" id='name' value={data.name} name='name' onChange={handleInput}/>
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={data.email} name='email' onChange={handleInput} />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={data.password} name='password' onChange={handleInput}/>
            </div>
            <Link to='/'>Have you an account?go to log in</Link>
            <button className='btn btn-primary w-25 m-auto' onClick={handleButton}>Sign Up</button>
        </form>
    )
}
