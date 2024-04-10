import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"


import Header from "../Components/Header"

import "./CSS/artist.css"

function Artist(){
	const params = useParams()
	let [artist, setArist] = useState([])
	let [albums, setAlbums] = useState([])

	useEffect(()=>{
		const artistID = params['id']

		async function getAlbums(){
			try {
				let url = `https://itunes.apple.com/lookup?id=${artistID}&entity=album&limit=2000`
				const res = await fetch(url, { mode: `cors` })
				if(!res.ok)
					throw new Error(res.error)
	
				let data = await res.json()
				console.log(data)

				setArist((a)=> [...a, data.results[0]])
				
				
				//for(let [key, value] of Object.entries(data.results[0]))
				//	artist.push({[key] : value})
	
				let temp = data.results.slice(1, data.resultCount)
				for(let i=0; i<temp.length; i++){
					if(temp[i].trackCount > 3)
						albums.push(temp[i])
				}
				//console.log(temp)
				return data
			} catch(error){
				console.log(error)
			}
		}

		getAlbums()
	}, [])

	return(<>
		<Header></Header>

		<div className="artistSection">
			<p>Primary Genre: </p>
			
		</div>

		<div className="albums">
			{albums.map((value, index)=> {
				
				return (
					<a key={index} href={'/album/' + value['collectionId']}>
						<img src={value['artworkUrl100']}/> 
						<p>{value['collectionName']}</p> 
					</a>)
			})}
		</div>

		
		
				
	</>)
}

export default Artist