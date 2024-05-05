import { Helmet } from "react-helmet"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react"

import Header from "../Components/Header"


import white_logo from "../assets/white_logo.svg"
import "./CSS/signup.css"

export default function Signup(){
	const [userCookie, setCookie] = useCookies(["user"])
	const navigate = useNavigate()
	
	const really = userCookie.user == "guest" ? "" : <p id="really"> You want to make another account?!</p>
	function signUp(){
		console.log("epic")

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

				<form className="signup-form" aria-label="Sign Up Form">
					<fieldset className="signup-form">
						<div>
							<label htmlFor="username">Username:</label>
							<input type="text" name="username" id="username" aria-label="Username" />
						</div>

						<div>
							<label htmlFor="password">Password:</label>
							<input type="password" name="password" id="password" aria-label="Password" />
						</div>

						<div>
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input type="password" name="confirm-password" id="confirm-password" aria-label="Confirm Password" />
						</div>
					</fieldset>

					<button type="submit" onClick={signUp} className="signup-button">Sign Up</button>
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

		<Helmet>
			<title>Sign Up</title>
			<meta name="description" content="Sign up to Smoky Music Today! Sign up so that you can save songs into your personal playlists that you can come back to!" />
			<meta name="keywords" content="iTunes, Apple, Firebase, Google, Music, iTunes, React, Facebook, Meta, giphy, artist, song, billboard, top 100, top, play music, etc.," />

		</Helmet>
		
	</>)
}