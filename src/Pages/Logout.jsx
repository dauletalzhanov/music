import Header from "../Components/Header"
import { Helmet } from "react-helmet"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import "./CSS/logout.css"
import "./CSS/logout_mobile.css"



export default function Logout(){
	const [userCookie, setCookie] = useCookies(["user"])
	const navigate = useNavigate()

	useEffect(() => {
		if(userCookie.user=="guest" || userCookie.user == ""){
			navigate("/login")
		}
	}, [])
	
	function signOut(){
		setCookie("user", "guest")
		navigate("/")

	}

	function leave(){
		navigate("/")
	}

	return(<>
		<Header></Header>

		<div id="logout">
			<p> Are you sure you want to log out? </p>

			<div id="logout-buttons">
				<button onClick={signOut}> Yes </button>
				<button onClick={leave}> No </button>
			</div>
		</div>

		<Helmet>
			<title>Log Out</title>
		</Helmet>
	
	</>)
}