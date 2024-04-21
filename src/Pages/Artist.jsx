import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"

import Header from "../Components/Header"

//import "./CSS/artist.css"
import styles from "./CSS/artist.module.css"

function Artist(){
	const params = useParams()
	let [albums, setAlbums] = useState([])
	let [artistInfo, setAristInfo] = useState({})

	useEffect(()=>{
		const artistID = params['id']

		async function getAlbums(){
			try {
				let url = `https://itunes.apple.com/lookup?id=${artistID}&entity=album&limit=2000`
				const res = await fetch(url, { mode: `cors` })
				if(!res.ok)
					throw new Error(res.error)
	
				let data = await res.json()
				data = data.results
				//console.log(data)

				setAristInfo({ ...data[0] })
				document.title = "Artist: " + artistInfo.artistName

				let alb = data.slice(1)
				alb = alb.filter(a => a.trackCount > 3)

				//alb.forEach(a => a.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb"))
				//alb.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb")
				//console.log(alb)

				for(let i=0; i<alb.length; i++){
					let albumCover = alb[i].artworkUrl100.replace("100x100bb", "1000x1000bb")
					alb[i].albumCover = albumCover
				}

				setAlbums([...alb])
				
				return data
			} catch(error){
				console.log(error)
			}
		}

		getAlbums()
	}, [artistInfo])

	return(<>
		<Header></Header>

		<div role="contentinfo" className={styles.artistSection}>
			<p>Artist Name: {artistInfo.artistName}</p>
			<p>Primary Genre: {artistInfo.primaryGenreName}</p>
			{artistInfo.artistType != "Artist" ? <p>Artist Type: {artistInfo.artistType}</p> : ""}
			<a href={artistInfo.artistLinkUrl}>iTunes</a>

			
		</div>

		<div role="main" className={styles.albums}>
			{albums.map((value, index)=> {
				return (
					<a key={index} href={'/album/' + value['collectionId']}>
						<img className={styles["artist-album-cover"]} alt={"album cover for: " + value["collectionName"]} src={value['albumCover']}/> 
						<p role="definition" >{value['collectionName']}</p> 
					</a>
				)})
			}
		</div>

	</>)
}

export default Artist