import { Link } from "react-router-dom"

function Header(){
	return(<>
		<div className="Header">
			<div aria-label="navigate to the charts" role="navigation"><a href="/charts">Charts</a></div>
			<div aria-label="navigate to the about us" role="navigation"><a href="/about">About Us</a></div>
			<div aria-label="navigate to the search page" role="navigation"><a href="/">Search</a></div>
			<div aria-label="navigate to the profile page" role="navigation"><a href="/profile">Profile</a></div>
			
		</div>

	</>)
}

export default Header