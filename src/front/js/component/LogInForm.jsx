import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../store/appContext.js"
import { Link, useNavigate } from 'react-router-dom'

export default function LogInForm() {
    const { actions,store } = useContext(Context)
    const navigate = useNavigate()


    const [data, setData] = useState({
        "email": "",
        "password": ""
    })

    const handleInput = (e) => {
     setData({ ...data, [e.target.name]: e.target.value })
    }


    const handleButton = () => {
        actions.logIn(data)
        setData({
            "email": "",
            "password": ""
        })

    }

    useEffect(()=>{
        if(store.token){
            navigate("/private")
        }
    },[store.token])

    return (

        <form onClick={((e) => { e.preventDefault()})} className='d-flex flex-column' >
            <h1>Log In</h1>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={data.email} name='email' onChange={handleInput} />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' value={data.password} name='password' onChange={handleInput} />
            </div>
            <Link to='/singup'>Do not have an account ? go to singUp</Link>
            <button className='btn btn-primary w-25 m-auto' onClick={handleButton}>Log In</button>
        </form>
    )
}
