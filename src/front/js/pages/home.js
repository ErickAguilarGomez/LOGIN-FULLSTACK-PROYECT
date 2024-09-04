import React, { useContext } from "react";
import { Context } from "../store/appContext";
import LogInForm from '../component/LogInForm.jsx'

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<LogInForm></LogInForm>
		</div>
	);
};
