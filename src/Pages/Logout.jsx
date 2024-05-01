import Header from "../Components/Header"
import { Helmet } from "react-helmet"
import { useCookies } from "react-cookie"
import { redirect, useNavigate } from "react-router-dom"
import { useEffect } from "react"


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

		<div>
			<p> Are you sure you want to log out? </p>

			<div>
				<button onClick={signOut}> Yes </button>
				<button onClick={leave}> No </button>
			</div>
		</div>

		<Helmet>
			<title>Log Out</title>
		</Helmet>
	
	</>)
}