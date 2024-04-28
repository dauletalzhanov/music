import { Form } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "@/Components/Header";

import "./CSS/login.css"

import "./CSS/album.css?inline"
import "./CSS/search.css?inline"
import "./CSS/profile.css?inline"
import "./CSS/no_page.css?inline"
import aaa from './CSS/search.css?inline' 




export default function LogIn(){
	const [user, setUser] = useCookies(["user"])

	function submitting(event){
		const value = event.target.parentNode.querySelector("#login-username").value
		console.log(value)

		setUser("user", value)
	}

	return(<>
		<Header></Header>
		
		<Form>
			<div>
				<label for="login-username"> Enter Username </label>
				<input type="text" name="username" id="login-username" />
			</div>
		
		
			<button type="submit" onClick={submitting}>Submit</button>
		</Form>
		
		


	
	</>)
}