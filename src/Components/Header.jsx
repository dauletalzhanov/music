import { Link } from "react-router-dom"

function Header(){
	return(<>
		<div className="Header">
			<div><a href="/charts">Charts</a></div>
			<div><a href="/about">About Us</a></div>
			<div><a href="/">Search</a></div>
			<div><a href="/profile">Profile</a></div>
			
		</div>

	</>)
}

export default Header