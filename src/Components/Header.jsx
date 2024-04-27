//import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"

function Header(){
	return(<>
		<div className="Header">
			<div aria-label="navigate to the charts" role="navigation"><NavLink to="/charts">Charts</NavLink></div>
			<div aria-label="navigate to the search page" role="navigation"><NavLink to="/">Search</NavLink></div>
			<div aria-label="navigate to the about us" role="navigation"><NavLink to="/landing">Landing</NavLink></div>
			<div aria-label="navigate to the profile page" role="navigation"><NavLink to="/profile">Profile</NavLink></div>

			
		</div>

	</>)
}

export default Header