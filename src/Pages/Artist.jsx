import React, {useState, useEffect} from "react"
import Album from '../Components/Album'
import Header from "../Components/Header"

import './CSS/artist.css'

function Artist(){
	const [artist, setArist] = useState('')
	let [albums, setAlbums] = useState([])

	useEffect(()=>{
		let artist = document.URL.split('/')
		artist = artist[artist.length-1]
		console.log(artist)

		async function getAlbums(){
			try {
				let url = `https://itunes.apple.com/lookup?id=${artist}&entity=album&limit=2000`
				const res = await fetch(url, { mode: `cors` })
				if(!res.ok)
					throw new Error(res.error)
	
				let data = await res.json()
				document.title = `Artist: ${data.results[0].artistName}`
				setArist(data.results[0].artistName)
	
				let temp = data.results.slice(1, data.resultCount)
				for(let i=0; i<temp.length; i++){
					if(temp[i].trackCount > 3)
						albums.push(temp[i])
				}
				console.log(temp)
				return data
			} catch(error){
				console.log(error)
			}
		}

		getAlbums()
	}, [])
		
	return(<>
		<Header></Header>
		<h1>Artist: {artist} </h1>

		{albums.map((value, index)=> <Album key={index} album={value}></Album>)}
				
	</>)
}

export default Artist