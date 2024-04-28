import { Form, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";

import Header from "@/Components/Header";

import "./CSS/login.css"

import "./CSS/album.css?inline"
import "./CSS/search.css?inline"
import "./CSS/profile.css?inline"
import "./CSS/no_page.css?inline"
import aaa from './CSS/search.css?inline' 

export default function Login(){
	const [user, setUser] = useCookies(["user"])

	function submitting(event){
		const value = event.target.parentNode.querySelector("#login-username").value
		console.log(value)

		setUser("user", value)
	}

	return(<>
		<Header></Header>
		
		<Form className="login-form">
			<div className="login-inputs">
				<label for="login-username"> Enter Username </label>
				<input type="text" name="username" id="login-username" />
			</div>
		
			<button type="submit" id="login-button" onClick={submitting}>Submit</button>

			<p>Do not have an account? <Link to="/signup">Sign Up</Link></p>
		</Form>

		<Helmet>
			<title>Log In</title>
			<meta name="description" content="Log In to Add Songs to Charts" />
		</Helmet>	
	</>)
}