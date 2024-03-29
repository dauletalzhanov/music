import React, { useState, useEffect } from "react"

function Album(props){
	let [tracks, setTracks] = useState([])
	useEffect(()=>{
		async function getSongs(){
			let collectionId = props.album.collectionId
			let url = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song&limit=2000`
			const res = await fetch(url, { mode: `cors` })

	
			let data = await res.json()
			data = data.results
			let diskCount = 1
			for(let i=1; i<data.length; i++){
				if(diskCount < data[i].discNumber){
					tracks.push(``)
					diskCount++
				}
				tracks.push(`${data[i].trackNumber}. ${data[i].trackName} - ${formatTime(data[i].trackTimeMillis)}`)
			}
			console.log(data)

			return data
		}

		getSongs()
	}, [])
		
	function formatTime(value){
		let mins = Math.floor(value/1000/60)
		let secs = Math.floor(value/1000) - mins*60
		secs = secs < 10 ? '0'+secs : secs 

		return `${mins}:${secs}`
	}


	return(<>
		<h3 >{props.album.collectionName} ({props.album.releaseDate.slice(0,4)})</h3>
		<ul>
			{tracks.map((i) => <p>{i}</p>)}
		</ul>
		
		
	</>)
}

export default Album