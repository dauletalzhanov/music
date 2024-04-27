import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Ranking({title, url}){
	const [songs, setSongs] = useState([])

	useEffect(()=>{
		async function getCharts(url) {
			let response = await fetch(url)
			response = await response.json()

			setSongs(response['data'])
			return response['data']
		}
		getCharts(url)
	}, [])

	
	return(<div className="ranking">
		<p className="ranking-title">{title}</p>

		{songs.map((song, index) => {
			let url = `/search/${song['artist']} - ${song['name']}%20`
			//let url = `/search/${song['artist']}/`
			

			return(<div key={index} className="song">
				<div className="leftie">
					<img src={song['image']}  alt={"album cover for "+ song.artist + " - " + song.name} />
					<p>{song['artist']} - {song['name']}</p>
				</div>
				<div className="rightie">
					<a className="search-song" href={url}> Search </a>
				</div>
				
			</div>)
		})}
		
		
	</div>)
}

export default Ranking