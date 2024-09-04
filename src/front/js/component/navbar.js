import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext'

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	const handleLogout = () => {
		if (localStorage.getItem("token")) {
			actions.logOut()
			alert("TE SALISTE PASHA BOBO")
			navigate("/")
		}
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Go to home</span>
				</Link>
				<div className="ml-auto">
					<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</nav>
	);
};
