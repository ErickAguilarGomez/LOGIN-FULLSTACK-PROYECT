import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../store/appContext.js"
import { useNavigate } from 'react-router-dom'

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
        <form onClick={((e) => { e.preventDefault() })}>
            <div>
                <label htmlFor="email"></label>
                <input type="email" id='email' value={data.email} name='email' onChange={handleInput} />
            </div>

            <div>
                <label htmlFor="password"></label>
                <input type="password" id='password' value={data.password} name='password' onChange={handleInput} />
            </div>

            <button className='btn btn-primary' onClick={handleButton}>Log In</button>
        </form>
    )
}
