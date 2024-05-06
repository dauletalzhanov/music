import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect, useState } from "react"
import bcrypt from "bcryptjs"

import { collection, doc, getDocs, getDoc, setDoc, where, query, orderBy, limit, deleteDoc } from "firebase/firestore"
import { db } from '../../firebase'

import Header from "../Components/Header"

import white_logo from "../assets/white_logo.svg"

import "./CSS/signup.css"
import "./CSS/signup_mobile.css"

export default function Signup(){
	const [userCookie, setCookie] = useCookies(["user"])
	const navigate = useNavigate()
	const [errors, setErrors] = useState([])
	
	const really = userCookie.user == "guest" ? "" : <p id="really"> You want to make another account?!</p>
	
	async function signUp(event){

		event.preventDefault();
		const formData = new FormData(event.target);

		const username = formData.get("username")
		const password = formData.get("password")
		const confirmpassword = formData.get("confirm_password")

		if(password !== confirmpassword){
			//alert("passwords dont match")
			if(errors.includes("Passwords do not match") == false)
				setErrors(c => [...c, "Passwords do not match"])
			return
		}

		
		const docRef = doc(db, "user", username)
		const usersSnap = await getDoc(docRef)
		
		if(usersSnap.exists()){
			console.log("user exists")
			if(errors.includes(`${username} already exists`) == false)
				setErrors(c => [...c, `${username} already exists`])
			return 
		}

		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		
		let newUser = {
			username: username,
			password: hash,
			mood: "find me"
		}

		console.log(newUser)

		await setDoc(doc(db, "user", username), newUser)
		setCookie("user", username)
		navigate("/profile")

	}
	
	return(<>
		
		<div id="background-signup" className="desktop-only" >
			<Header></Header>

			<main className="leftie-background-signup ">
				<div className="signup-texts">
					<p aria-label="welcome sign" role="banner" >Welcome to Smoky Music!</p>

					<p role="contentinfo" id="create-an-account">Create an Account!</p>
					<nav aria-label="Takes you to the log in page">
						<p >Already have an account? <Link role="link" to="/login" aria-label="Navigate to the log in page" >Log In</Link></p>
					</nav>
					
				</div>
				
				{ really }

				<form className="signup-form mobile-only" aria-label="Sign Up Form" onSubmit={signUp}>
					<div className="error-messages">
						{ errors.map((i) => <p>{i}</p>) }
					</div>
					<fieldset className="signup-form">
						<div>
							<label htmlFor="username">Username:</label>
							<input type="text" name="username" id="username" aria-label="Username" required />
						</div>

						<div>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" id="password" aria-label="Password" required />
						</div>

						<div>
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input type="password" name="confirm_password" id="confirm_password" aria-label="Confirm Password" required />
						</div>
					</fieldset>

					<button type="submit" className="signup-button">Sign Up</button>


				</form>
			</main>

			<div className="rightie-background-signup">
				<div className="signup-logo">
					<img src={white_logo} alt="logo in white color" />
					<p role="banner" aria-label="top-banner-signup">Smoky Music </p>
				</div>
				
				<p role="banner" aria-label="bottom-banner-signup"><strong>Millions</strong> of songs from iTunes can be saved in your playlist</p>

			</div>
			

		</div>

		<form className="signup-form mobile-only" aria-label="Sign Up Form" onSubmit={signUp}>
			<div className="error-messages">
				{ errors.map((i) => <p>{i}</p>) }
			</div>
			<fieldset className="signup-form">
				<div>
					<label htmlFor="username">Username:</label>
					<input type="text" name="username" id="username" aria-label="Username" required />
				</div>

				<div>
					<label htmlFor="password">Password:</label>
					<input type="password" name="password" id="password" aria-label="Password" required />
				</div>

				<div>
					<label htmlFor="confirm-password">Confirm Password:</label>
					<input type="password" name="confirm_password" id="confirm_password" aria-label="Confirm Password" required />
				</div>
			</fieldset>

			<button type="submit" className="signup-button">Sign Up</button>


		</form>

		

		<Helmet>
			<title>Sign Up</title>
			<meta name="description" content="Sign up to Smoky Music Today! Sign up so that you can save songs into your personal playlists that you can come back to!" />
			<meta name="keywords" content="iTunes, Apple, Firebase, Google, Music, iTunes, React, Facebook, Meta, giphy, artist, song, billboard, top 100, top, play music, etc.," />

		</Helmet>
		
	</>)
}