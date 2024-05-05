import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";

import Header from "@/Components/Header";

import "./CSS/login.css"
import "./CSS/login_mobile.css"


export default function Login(){
	const [user, setUser] = useCookies(["user"])

	function submitting(event){
		event.preventDefault()

		const value = event.target.parentNode.querySelector("#login-username").value
		console.log(value)

		setUser("user", value)
	}

	return(<>
		<Header></Header>
		
		<fieldset>
			<legend>Log In!</legend>
			<form aria-label="login form" id="login-form">
				<div className= { "login-inputs" }>
					<label htmlFor="login-username"> Enter Username </label>
					<input type="text" name="username" id="login-username" />
				</div>

				<div>
					<label htmlFor="login-password"> Enter Password </label>
					<input type="password" name="password" id="login-password" />
				</div>

				<div className="seperator"></div>
			
				<button type="submit" id="login-button" onClick={submitting}>Submit</button>

				<p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
			</form>
		</fieldset>
		

		<Helmet>
			<title>Log In</title>
			<meta name="description" content="Log In to Add Songs to Charts" />
			<meta name="keywords" content="Log In, Login, Register, Signup, Sign Up, Log Out, Logout, iTunes, Apple, Firebase, Google, Music, iTunes, React, Facebook, Meta, giphy, artist, song, billboard, top 100, top, play music, etc.," />

		</Helmet>	
	</>)
}