import { Link } from "react-router-dom"

function SearchTerm(props){
//<img src='${results[i].artworkUrl100}'>
//</img><a href='/artist/{props.artistId}'>{props.artistName}</a>
//<Link src=''>{props.artistName}</Link>
//<p> - ${results[i].trackName} (${results[i].releaseDate.split('-')[0]})</p>`

	return(<>
		<li>
			<p>{props.artistName}</p>

		</li>
	</>)
}

export default SearchTerm