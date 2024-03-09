import { useState, useEffect } from "react"

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
		<h4>{title}</h4>

		{songs.map(song => {
			return(<div className="song">
				<div className="leftie">
					<img src={song['image']}  alt='album cover' />
					<p>{song['artist']} - {song['name']}</p>
				</div>
				<div className="rightie">
					<p>add</p>
				</div>
				
			</div>)
		})}
		
		
	</div>)
}

export default Ranking