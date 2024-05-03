//import { Link } from "react-router-dom"
import { NavLink, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"

function Header(){
	const [userCookie, setUserCookie] = useCookies(["user"])
	const location = useLocation()

	const profilePage = <div aria-label="navigate to the profile page" role="navigation"><NavLink to="/profile">Profile</NavLink></div>
	const loginPage = <div aria-label="navigate to the log in page" role="navigation"><NavLink to="/login">Log In</NavLink></div>
	const switchUser = <div aria-label="navigate to switch user" role="navigation"><NavLink to="/login">Switch User</NavLink></div>
	
	let check = ""
	
	//let check = userCookie.user == "" || userCookie.user == "guest" ? loginPage : profilePage
	if(userCookie.user == "" || userCookie.user == "guest")
		check = loginPage
	else if(location.pathname == "/profile")
		check = switchUser
	else 
		check = profilePage

	return(<>
		<div aria-label="Header navigation to different parts of the website" className="Header">
			<div aria-label="navigate to the charts" role="navigation"><NavLink to="/charts">Charts</NavLink></div>
			<div aria-label="navigate to the search page" role="navigation"><NavLink to="/">Search</NavLink></div>
			<div aria-label="navigate to the about us" role="navigation"><NavLink to="/landing">Landing</NavLink></div>
			{ check }
		</div>

	</>)
}

export default Header