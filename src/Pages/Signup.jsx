import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

import Header from "../Components/Header"

export default function Signup(){
	const [userCookie, setCookie] = useCookies(["user"])
	const navigate = useNavigate()
	
	const really = userCookie.user !== "guest" ? <p>You want another account?!</p> : ""
	function signUp(){
		console.log("epic")

	}
	
	return(<>
		<Header></Header>

		{ really }

		<form>
			<div>
				<label htmlFor="username">Username:</label>
				<input type="text" name="username" id="username" />
			</div>

			<div>
				<label htmlFor="password">Password:</label>
				<input type="password" name="password" id="password" />
			</div>

			<div>
				<button onClick={signUp}>Sign Up</button>
			</div>

			<p>Already have an account? <Link to="/login">Log In</Link></p>
		</form>

		<Helmet>
			<title>Sign Up</title>

		</Helmet>
		
	</>)
}