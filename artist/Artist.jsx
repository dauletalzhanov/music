import React, {useState} from "react"
import Album from '../src/Album'


function Artist(){
	const [artist, setArist] = useState('')
	let [albums, setAlbums] = useState([])

	
	async function getAlbums(){
		try {
			let artistId = document.URL.split('@')[1]
			let url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=2000`
			const res = await fetch(url, { mode: `cors` })
			if(!res.ok)
				throw new Error(res.error)

			let data = await res.json()
			//data = data.results
			document.title = data.results[0].artistName
			setArist(data.results[0].artistName)

			let temp = data.results.slice(1, data.resultCount)
			for(let i=0; i<temp.length; i++){
				//setAlbums(a => [...a, temp[i].collectionName])
				if(temp[i].trackCount > 3)
					albums.push(temp[i])
			}
			//console.log(temp)

			//console.log(data)
			return data
		} catch(error){
			console.log(error)
		}
	}

	getAlbums()
	//{albums.map((i)=> <Album name={i}></Album>)}
		
	return(<>
		<h1>Artist: {artist} </h1>

		{albums.map((value, index)=> <Album key={index} album={value}></Album>)}
				
	</>)
}

export default Artist