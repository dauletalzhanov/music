import React, {useState, useEffect} from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"

import Header from "../Components/Header"
import Player from "@/Components/Player"

//import "./CSS/artist.css"
import styles from "./CSS/artist.module.css"

function Artist(){
	const params = useParams()
	const { currentTrack } = useSelector((state) => state.player)

	let [albums, setAlbums] = useState([])
	let [artistInfo, setAristInfo] = useState({})
	let [dataResult, setDataResults] = useState([])
	let [orderDate, setOrderDate] = useState("desc")

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
				

				setAristInfo({ ...data[0] })
				//document.title = "Artist: " + artistInfo.artistName

				let alb = data.slice(1)

				setDataResults(alb)
				console.log(data)

				//alb = alb.filter(a => a.trackCount > 3)

				//alb.forEach(a => a.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb"))
				//alb.artworkUrl100 = alb.artworkUrl100.replace("100x100bb", "1000x1000bb")
				//console.log(alb)

				for(let i=0; i<alb.length; i++){
					let albumCover = alb[i].artworkUrl100.replace("100x100bb", "1000x1000bb")
					alb[i].albumCover = albumCover
				}

				alb = alb.filter(a => a.trackCount > 3)

				setAlbums([...alb])
				
				return data
			} catch(error){
				console.log(error)
			}
		}

		getAlbums()
	}, [])

	useEffect(()=>{
		//console.log(albums)

	}, [albums])

	function filterAlbums(event){

		const query = event.target.value.toLowerCase()

		
		let albumFiltered = dataResult.filter((album) => {
			let albumName = album.collectionName
			albumName = albumName.toLowerCase()

			
			return albumName.includes(query)
		})

		setAlbums(albumFiltered)

	}

	function sortDate(){
		let albumSorted = albums.sort((a, b) => {

			const firstDate = new Date(a.releaseDate.slice(0, 10)) 
			const seconDate = new Date(b.releaseDate.slice(0, 10)) 

			let returnVal = null
			if(orderDate == "desc"){
				returnVal = seconDate - firstDate
				setOrderDate("asc")
			} else {
				returnVal = firstDate - seconDate
				setOrderDate("desc")
			}


			return returnVal
		})

		setAlbums(albumSorted)

	}

	function getSingles(){
		let albumFiltered = dataResult.filter((album) => {
			let albumName = album.collectionName.toLowerCase()
			//console.log(albumName)

			return albumName.includes("single")
		})

		setAlbums(albumFiltered)
	}

	function setDefault(){

		let alb = dataResult.filter(a => a.trackCount > 3)
		setAlbums(alb)
	}

	return(<>
		<Header></Header>

		<div role="contentinfo" className={styles.artistSection}>
			<p>Artist Name: {artistInfo.artistName}</p>
			<p>Primary Genre: {artistInfo.primaryGenreName}</p>
			
			{artistInfo.artistType != "Artist" ? <p>Artist Type: {artistInfo.artistType}</p> : ""}

			<a href={artistInfo.artistLinkUrl}>iTunes</a>

			<form action="">
				<input type="text" name="filter-albums" id="filter-albums" onChange={filterAlbums}/>
				<button type="button" onClick={sortDate} >Sort by Date</button>
				<button type="button" onClick={getSingles} > Singles Only </button>
				<button type="button" onClick={setDefault} > Default </button>
				
				
			</form>

			
		</div>

		<div role="main" className={styles.albums}>
			{albums.map((value, index)=> {
				const altText = `album cover for "${ value.collectionName }"`
				const albumUrl = `/album/${ value.collectionId }`
				return (
					<Link key={index} to={albumUrl}>
						<img className={ styles["artist-album-cover"] } alt={altText} src={ value.albumCover } /> 
						
						<p role="definition" > { value.collectionName }</p> 
					</Link>
				)})
			}
		</div>

		{ currentTrack ? <Player /> : "" }

		<Helmet>
			<title> Artist: { artistInfo.artistName ? artistInfo.artistName : "Loading" } </title>
			<meta name="description" content="Browse Artist" />

		</Helmet>

	</>)
}

export default Artist