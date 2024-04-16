import { Link } from "react-router-dom"
import Header from "../Components/Header"

import './CSS/no_page.css'

function NoPage(){
	document.title = "404: Page Not Found"
	return(<>
		<Header></Header>
		<div role="main" className="four0four">
			<h1>404: Page Not Found</h1>
			<Link to='/'>Go Home?</Link>
			<Link to='/charts'>See Charts?</Link>
			<Link to='/artist/159260351'>Magic</Link>
			<Link to='/profile'>Profile Page</Link>
			
		</div>

		

	</>)
}

export default NoPage