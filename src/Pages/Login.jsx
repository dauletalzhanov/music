import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import bcrypt from "bcryptjs"

import { collection, doc, getDocs, getDoc, setDoc, where, query, orderBy, limit, deleteDoc } from "firebase/firestore"
import { db } from '../../firebase'

import Header from "@/Components/Header";

import "./CSS/login.css"
import "./CSS/login_mobile.css"


export default function Login(){
	const [user, setUser] = useCookies(["user"])
	const [errors, setErrors] = useState("")
	const navigate = useNavigate()

	async function submitting(event){
		
		event.preventDefault()

		const formData = new FormData(event.target)
		
		const username = formData.get("username")
		const password = formData.get("password")

		const docRef = doc(db, "user", username)
		const usersSnap = await getDoc(docRef)

		

		if(usersSnap.exists() == false){
			setErrors(`No such user: ${username}`)
			return
		}

		//console.log(usersSnap.data())
		const truePassword = usersSnap.data().password
		//console.log(truePassword)


		const compareResult = await bcrypt.compare(password, truePassword)
		if(compareResult == false){
			setErrors(`Wrong password`)
			return
		}
		//onst value = event.target.parentNode.querySelector("#login-username").value
		//console.log(value)
		//setUser("user", value)

		setUser("user", username)
		navigate("/profile")
		
	}

	return(<>
		<Header></Header>
		
		<fieldset>
			
			<form aria-label="login form" id="login-form" onSubmit={submitting}>
				<p className="login-errors">{errors}</p>
				<div className= { "login-inputs" }>
					<label htmlFor="login-username"> Enter Username </label>
					<input type="text" name="username" id="login-username" required/>
				</div>

				<div>
					<label htmlFor="login-password"> Enter Password </label>
					<input type="password" name="password" id="login-password" required />
				</div>

				<div className="seperator"></div>
			
				<button type="submit" id="login-button">Submit</button>

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